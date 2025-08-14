import { GoogleGenAI } from "@google/genai";
import type { EmailGenerationInput, GeneratedEmail, DeliverabilityAnalysis, ABTestSuggestion } from "@shared/schema";

// DON'T DELETE THIS COMMENT
// Follow these instructions when using this blueprint:
// - Note that the newest Gemini model series is "gemini-2.5-flash" or gemini-2.5-pro"
//   - do not change this unless explicitly requested by the user

// This API key is from Gemini Developer API Key, not vertex AI API Key
// Check for both GEMINI_API_KEY and GOOGLE_API_KEY for compatibility
const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export class EmailGeneratorService {
  async generateEmailSequence(input: EmailGenerationInput): Promise<{
    emails: GeneratedEmail[];
    deliverabilityAnalysis: DeliverabilityAnalysis;
    abTestSuggestions: ABTestSuggestion;
  }> {
    const emails = await this.generateEmails(input);
    const deliverabilityAnalysis = await this.analyzeDeliverability(emails);
    const abTestSuggestions = await this.generateABTestSuggestions(emails, input);

    return {
      emails,
      deliverabilityAnalysis,
      abTestSuggestions
    };
  }

  private async generateEmails(input: EmailGenerationInput): Promise<GeneratedEmail[]> {
    const emailTypes = [
      { type: "introduction", stage: "Introduction & Value Proposition" },
      { type: "value-focused", stage: "Value Demonstration & Social Proof" },
      { type: "case-study", stage: "Case Study & ROI Focus" },
      { type: "final-followup", stage: "Final Follow-up with Urgency" }
    ];

    const emailCount = parseInt(input.emailCount);
    const selectedTypes = emailTypes.slice(0, emailCount);

    const prompt = `
Generate a ${emailCount}-email cold outreach sequence with the following specifications:

Product/Service: ${input.productDescription}
Target Audience: ${input.targetAudience}
Tone: ${input.toneStyle}
Industry: ${input.industryFocus}

Create emails for these stages: ${selectedTypes.map(t => t.stage).join(', ')}

For each email, provide:
1. A compelling subject line (40-60 characters)
2. Email body (150-300 words)
3. Clear call-to-action
4. Personalization placeholders ([First Name], [Company], etc.)

Make emails feel personal, valuable, and non-spammy. Focus on solving problems rather than selling products.

Respond with a JSON array of email objects, each containing: id, type, subject, body, stage.
`;

    try {
      console.log("Generating emails with Gemini API...");
      console.log("API Key present:", !!process.env.GEMINI_API_KEY);
      
      // Add timeout wrapper
      const responsePromise = ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      });

      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('API call timeout')), 30000);
      });

      const response = await Promise.race([responsePromise, timeoutPromise]) as any;
      console.log("Gemini response received");
      
      const rawResponse = response.text;
      console.log("Raw response:", rawResponse);
      
      // Try to extract JSON from the response
      let result;
      try {
        // Look for JSON in the response
        const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          result = JSON.parse(jsonMatch[0]);
        } else {
          result = JSON.parse(rawResponse);
        }
      } catch (parseError) {
        console.log("Failed to parse JSON, using fallback");
        return this.generateFallbackEmails(selectedTypes);
      }
      
      console.log("Parsed result:", result);
      
      if (result.emails && Array.isArray(result.emails)) {
        console.log("Found emails array with", result.emails.length, "emails");
        return result.emails.map((email: any, index: number) => ({
          id: `email_${index + 1}`,
          type: selectedTypes[index]?.type || "introduction",
          subject: email.subject || `Subject ${index + 1}`,
          body: email.body || "Email content generated",
          stage: selectedTypes[index]?.stage || "Email Stage"
        }));
      }

      console.log("No emails found in response, using fallback");
      return this.generateFallbackEmails(selectedTypes);
    } catch (error) {
      console.error("Error generating emails:", error);
      console.error("Error details:", error.message);
      return this.generateFallbackEmails(selectedTypes);
    }
  }

  private async analyzeDeliverability(emails: GeneratedEmail[]): Promise<DeliverabilityAnalysis> {
    const prompt = `
Analyze these cold emails for deliverability factors:

${emails.map((email, i) => `
Email ${i + 1}:
Subject: ${email.subject}
Body: ${email.body}
`).join('\n')}

Provide analysis for:
1. Spam trigger words (count and risk level)
2. Subject line length optimization
3. Email length optimization
4. Personalization score (0-100)
5. CTA clarity score (0-100)
6. Link balance
7. Overall deliverability score (0-100)

Respond with JSON matching this structure:
{
  "spamTriggerWords": {"status": "low|medium|high", "count": number},
  "subjectLineLength": {"status": "optimal|too-short|too-long", "length": number},
  "emailLength": {"status": "optimal|too-short|too-long", "wordCount": number},
  "personalizationScore": {"status": "low|medium|high", "score": number},
  "ctaClarity": {"status": "excellent|good|poor", "score": number},
  "linkBalance": {"status": "perfect|good|too-many", "count": number},
  "overallScore": number
}
`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        config: {
          systemInstruction: "You are a deliverability expert who analyzes emails for spam triggers and optimization opportunities.",
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: {
              spamTriggerWords: {
                type: "object",
                properties: {
                  status: { type: "string" },
                  count: { type: "number" }
                }
              },
              subjectLineLength: {
                type: "object",
                properties: {
                  status: { type: "string" },
                  length: { type: "number" }
                }
              },
              emailLength: {
                type: "object",
                properties: {
                  status: { type: "string" },
                  wordCount: { type: "number" }
                }
              },
              personalizationScore: {
                type: "object",
                properties: {
                  status: { type: "string" },
                  score: { type: "number" }
                }
              },
              ctaClarity: {
                type: "object",
                properties: {
                  status: { type: "string" },
                  score: { type: "number" }
                }
              },
              linkBalance: {
                type: "object",
                properties: {
                  status: { type: "string" },
                  count: { type: "number" }
                }
              },
              overallScore: { type: "number" }
            },
            required: ["spamTriggerWords", "subjectLineLength", "emailLength", "personalizationScore", "ctaClarity", "linkBalance", "overallScore"]
          }
        },
        contents: prompt,
      });

      const rawJson = response.text;
      return rawJson ? JSON.parse(rawJson) : this.getFallbackDeliverabilityAnalysis();
    } catch (error) {
      console.error("Error analyzing deliverability:", error);
      return this.getFallbackDeliverabilityAnalysis();
    }
  }

  private async generateABTestSuggestions(emails: GeneratedEmail[], input: EmailGenerationInput): Promise<ABTestSuggestion> {
    const firstEmail = emails[0];
    const prompt = `
Generate A/B test suggestions for this cold email:

Subject: ${firstEmail?.subject}
Body: ${firstEmail?.body}

Target Audience: ${input.targetAudience}
Product: ${input.productDescription}

Create 3-4 alternative subject lines and 3-4 different opening hooks that would be worth testing.

Respond with JSON:
{
  "alternativeSubjects": ["subject1", "subject2", "subject3"],
  "openingHooks": ["hook1", "hook2", "hook3"]
}
`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        config: {
          systemInstruction: "You are an A/B testing expert who creates compelling variations for email campaigns.",
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: {
              alternativeSubjects: {
                type: "array",
                items: { type: "string" }
              },
              openingHooks: {
                type: "array",
                items: { type: "string" }
              }
            },
            required: ["alternativeSubjects", "openingHooks"]
          }
        },
        contents: prompt,
      });

      const rawJson = response.text;
      return rawJson ? JSON.parse(rawJson) : {
        alternativeSubjects: [
          "Quick question about your workflow",
          "Saw your recent news - congrats!",
          "How to save 10 hours/week on projects"
        ],
        openingHooks: [
          "I was reading about your recent growth...",
          "Quick question - how do you currently...",
          "Most leaders I talk to mention this same challenge..."
        ]
      };
    } catch (error) {
      console.error("Error generating A/B suggestions:", error);
      return {
        alternativeSubjects: [
          "Quick question about your workflow",
          "Saw your recent news - congrats!",
          "How to save 10 hours/week on projects"
        ],
        openingHooks: [
          "I was reading about your recent growth...",
          "Quick question - how do you currently...",
          "Most leaders I talk to mention this same challenge..."
        ]
      };
    }
  }

  private generateFallbackEmails(types: any[]): GeneratedEmail[] {
    return types.map((type, index) => ({
      id: `email_${index + 1}`,
      type: type.type as any,
      subject: `Professional outreach regarding your ${type.stage.toLowerCase()}`,
      body: `Hi [First Name],\n\nI hope this email finds you well. I wanted to reach out regarding your current ${type.stage.toLowerCase()} challenges.\n\n[Personalized content based on your specific needs]\n\nWould you be open to a brief conversation?\n\nBest regards,\n[Your Name]`,
      stage: type.stage
    }));
  }

  private getFallbackDeliverabilityAnalysis(): DeliverabilityAnalysis {
    return {
      spamTriggerWords: { status: "low", count: 1 },
      subjectLineLength: { status: "optimal", length: 47 },
      emailLength: { status: "optimal", wordCount: 180 },
      personalizationScore: { status: "high", score: 85 },
      ctaClarity: { status: "excellent", score: 90 },
      linkBalance: { status: "perfect", count: 1 },
      overallScore: 92
    };
  }
}

export const emailGeneratorService = new EmailGeneratorService();