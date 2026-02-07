"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const ai_service_1 = require("./ai.service");
const common_1 = require("@nestjs/common");
const systemPromp_1 = require("../constants/systemPromp");
const env_service_1 = require("./env.service");
const schema_loader_service_1 = require("./schema-loader.service");
const sql_service_1 = require("./sql.service");
let AnalyticsService = class AnalyticsService {
    aiService;
    envService;
    schemaService;
    sqlService;
    constructor(aiService, envService, schemaService, sqlService) {
        this.aiService = aiService;
        this.envService = envService;
        this.schemaService = schemaService;
        this.sqlService = sqlService;
    }
    async createSQL(prompt) {
        const relevantTables = await this.relevantTables(prompt);
        const context = await this.schemaService.buildContextForPrompt(relevantTables.tables);
        const sqlGenerated = await this.sqlService.generateSQL(context, prompt);
        const sql = this.sqlService.clearSQL(sqlGenerated);
        if (!this.sqlService.validateSQL(sql)) {
            throw new common_1.InternalServerErrorException('Invalid SQL generated');
        }
        const resultExecuteQuerySQL = await this.sqlService.executeQuerySQL(sql);
        const explanetedResult = await this.sqlService.explainResultQuerySQL(prompt, sql, resultExecuteQuerySQL);
        return {
            sql: sqlGenerated,
            relevantTables: relevantTables.tables,
            result: resultExecuteQuerySQL,
            explanation: explanetedResult,
        };
    }
    async relevantTables(question) {
        const aiResponse = await this.aiService.executePrompt({
            prompt: question,
            model: this.envService.AIModel,
            systemPrompt: systemPromp_1.systemPrompt.RELEVANT_TABLES(await this.schemaService.getSummaryOfSchemas()),
        });
        return { tables: JSON.parse(aiResponse) };
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ai_service_1.AIService,
        env_service_1.EnvService,
        schema_loader_service_1.SchemaService,
        sql_service_1.SQLService])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map