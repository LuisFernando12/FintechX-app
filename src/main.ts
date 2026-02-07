import { AppModule } from '@/module/app.module';
import { ConsoleLogger, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'FintechX',
      logLevels: ['log', 'error', 'warn', 'debug', 'verbose'],
    }),
  });

  const config = new DocumentBuilder()
    .setTitle('FintechX')
    .setDescription('FintechX API Documentation')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap()
  .then(() => {
    Logger.log(
      `Application is running on: http://localhost:${process.env.PORT ?? 3000}`,
      'NestApplication',
    );
  })
  .catch((err) => {
    Logger.error(
      'Error starting application:',
      JSON.stringify(err),
      'NestApplication',
    );
  });
