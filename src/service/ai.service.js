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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIService = void 0;
const env_service_1 = require("./env.service");
const common_1 = require("@nestjs/common");
const openai_1 = __importDefault(require("openai"));
let AIService = class AIService {
    envService;
    openAI;
    constructor(envService) {
        this.envService = envService;
        this.openAI = new openai_1.default({
            baseURL: this.envService.AIBaseURL,
            apiKey: this.envService.AIAPIKey,
        });
    }
    async executePrompt({ prompt, model, systemPrompt, }) {
        if (!model || !prompt || !systemPrompt) {
            throw new common_1.BadRequestException('Missing required parameters for AI prompt execution');
        }
        try {
            const response = await this.openAI.chat.completions.create({
                model: model,
                temperature: 0.3,
                messages: [
                    { role: 'system', content: systemPrompt },
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
            });
            if (!response.choices[0].message.content) {
                throw new common_1.InternalServerErrorException('AI response has no content');
            }
            console.log('Response AI OK ! ');
            return response.choices[0].message.content
                .replace('```json', '')
                .replace('```', '')
                .replace('```', '');
        }
        catch (error) {
            console.error('Error executing AI prompt:', error);
            throw new common_1.InternalServerErrorException('Error executing AI prompt');
        }
    }
};
exports.AIService = AIService;
exports.AIService = AIService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [env_service_1.EnvService])
], AIService);
//# sourceMappingURL=ai.service.js.map