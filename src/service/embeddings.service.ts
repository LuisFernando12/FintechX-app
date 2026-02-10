import { Chroma } from '@langchain/community/vectorstores/chroma';
import { Document } from '@langchain/core/documents';
import { OpenAIEmbeddings } from '@langchain/openai';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import {
  Inject,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { createHash } from 'node:crypto';
import { EnvService } from './env.service';
import { SchemaService } from './schema-loader.service';

interface ICompareChunks {
  pageContent: string;
  metadata: object;
  score: number;
}
interface IEmbedChunks {
  pageContent: string;
  metadata: object;
  id: string;
}
export class EmbeddingsService implements OnModuleInit {
  private readonly logger = new Logger(EmbeddingsService.name);
  private openAIEmbeddings: OpenAIEmbeddings;
  private vectorStore: Chroma;
  constructor(
    @Inject(EnvService) private readonly envService: EnvService,
    private readonly schemaService: SchemaService,
  ) {
    this.openAIEmbeddings = new OpenAIEmbeddings({
      model: this.envService.AIModelEmbeddings,
      configuration: {
        baseURL: this.envService.AIBaseURL,
        apiKey: this.envService.AIAPIKey,
      },
    });
    this.vectorStore = new Chroma(this.openAIEmbeddings, {
      collectionName: 'chunks',
      clientParams: {
        host: this.envService.ChromaHost,
        port: this.envService.ChromaPort,
      },
    });
  }
  async onModuleInit() {
    await this.embed();
  }

  async embed(): Promise<boolean> {
    this.logger.verbose('Starting embedding text or documents');
    const documents = await this.schemaService.getSummaryOfSchemas();
    try {
      this.logger.verbose('Text chunks generated called');
      const chunk = await this.chunkGenerate(documents);
      this.logger.verbose('Text chunks vetorized called');
      await this.chunkVetorize(chunk as Document<IEmbedChunks>[]);
      this.logger.verbose('Text embedDocuments on OpenAI called');
      return true;
    } catch (error: any) {
      this.logger.error('Error embedding text:', JSON.stringify(error));
      throw new InternalServerErrorException('Error embedding text');
    } finally {
      this.logger.verbose('End embedding text or documents');
    }
  }
  async chunkGenerate(
    document: Document[] | string[] | string,
  ): Promise<Document[] | string[]> {
    this.logger.verbose('Generating chunks');
    const recursiveCharacterTextSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 2000,
      chunkOverlap: 500,
      lengthFunction: (text) => text.length,
    });

    let chunks: string[] | Document[];
    if (typeof document === 'string') {
      this.logger.verbose('Generating chunks with splitText');
      chunks = await recursiveCharacterTextSplitter.splitText(document);
    } else {
      this.logger.verbose('Generating chunks with splitDocuments');
      const newDocuments = await recursiveCharacterTextSplitter.createDocuments(
        document as string[],
      );
      chunks =
        await recursiveCharacterTextSplitter.splitDocuments(newDocuments);
    }
    this.logger.verbose('Chunks successfully generated');
    this.logger.verbose(`Number of chunk generated:  ${chunks.length}`);
    return chunks;
  }
  async chunkVetorize(chunks: Document[] | string[]): Promise<void> {
    this.logger.verbose('Vetorizing chunks');
    try {
      this.logger.verbose('Saving chunks in ChromaDB');
      if (chunks[0] instanceof Document) {
        for (const chunk of chunks as Document<IEmbedChunks>[]) {
          chunk.id = createHash('sha256')
            .update(chunk.pageContent)
            .digest('hex');
        }
        const ids = (chunks as Document<IEmbedChunks>[]).map(
          (chunk) => chunk.id,
        );
        await this.vectorStore.addDocuments(chunks as Document[], {
          ids: ids as string[],
        });
      }
      this.logger.verbose(
        'Chunks successfully vetorized and saved in ChromaDB',
      );
      return;
    } catch (error: any) {
      this.logger.error('Error vetorizing chunks:', error);
      throw new InternalServerErrorException('Error vetorizing chunks');
    }
  }
  async compareEmbeddings(text: string): Promise<ICompareChunks[]> {
    this.logger.verbose('Comparing embeddings');
    const resultsSimilarity = await this.vectorStore.similaritySearchWithScore(
      text,
      4,
    );
    if (resultsSimilarity.length === 0) {
      throw new InternalServerErrorException('No similar chunks found');
    }
    const comparedChunks: ICompareChunks[] = [];
    if (resultsSimilarity.length === 0 || resultsSimilarity[0][1] < 0.7) {
      throw new InternalServerErrorException('No similar chunks found');
    }
    for (const result of resultsSimilarity) {
      comparedChunks.push({
        pageContent: result[0].pageContent,
        metadata: result[0].metadata,
        score: result[1],
      });
    }

    this.logger.verbose('Compare embeddings successfully compared');
    return comparedChunks;
  }
}
