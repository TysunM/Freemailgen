import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { emailGeneratorService } from "./services/aiService"; 
import { emailGenerationInputSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Generate cold email sequence
  app.post("/api/generate-emails", async (req, res) => {
    try {
      console.log("Received email generation request:", req.body);
      
      const input = emailGenerationInputSchema.parse(req.body);
      console.log("Input validated successfully:", input);
      
      console.log("Starting email generation...");
      const result = await emailGeneratorService.generateEmailSequence(input);
      console.log("Email generation completed. Result:", result);
      
      // Save to storage
      console.log("Saving to storage...");
      const savedGeneration = await storage.saveEmailGeneration({
        ...input,
        generatedEmails: result.emails,
        deliverabilityAnalysis: result.deliverabilityAnalysis,
        abTestSuggestions: result.abTestSuggestions,
      });
      console.log("Saved to storage with ID:", savedGeneration.id);
      
      const response = {
        id: savedGeneration.id,
        emails: result.emails,
        deliverabilityAnalysis: result.deliverabilityAnalysis,
        abTestSuggestions: result.abTestSuggestions,
      };
      
      console.log("Sending response:", response);
      res.json(response);
    } catch (error) {
      if (error instanceof z.ZodError) {
      console.error("Error generating emails:", error);
      res.status(500).json({ 
        message: error.message || "Failed to generate email sequence." 
    });
}
      
      console.error("Error generating emails:", error);
      console.error("Error stack:", error.stack);
      res.status(500).json({ 
        message: "Failed to generate email sequence. Please check your API key configuration and try again." 
      });
    }
  });

  // Get recent generations
  app.get("/api/recent-generations", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const generations = await storage.getRecentGenerations(limit);
      res.json(generations);
    } catch (error) {
      console.error("Error fetching recent generations:", error);
      res.status(500).json({ message: "Failed to fetch recent generations" });
    }
  });

  // Get specific generation
  app.get("/api/generation/:id", async (req, res) => {
    try {
      const generation = await storage.getEmailGeneration(req.params.id);
      if (!generation) {
        return res.status(404).json({ message: "Generation not found" });
      }
      res.json(generation);
    } catch (error) {
      console.error("Error fetching generation:", error);
      res.status(500).json({ message: "Failed to fetch generation" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
