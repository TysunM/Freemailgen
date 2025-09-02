import { emailGeneratorService as claudeService } from './claude';
import { emailGeneratorService as geminiService } from './gemini';

const aiProvider = process.env.AI_PROVIDER || 'claude'; // Default to claude

let emailGeneratorService;

if (aiProvider.toLowerCase() === 'gemini') {
  console.log("Using Gemini AI Service");
  emailGeneratorService = geminiService;
} else {
  console.log("Using Claude AI Service");
  emailGeneratorService = claudeService;
}

export { emailGeneratorService };
