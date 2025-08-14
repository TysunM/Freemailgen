import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { EmailGenerationInput, GeneratedEmail, DeliverabilityAnalysis, ABTestSuggestion } from "@shared/schema";

interface EmailGenerationResult {
  id: string;
  emails: GeneratedEmail[];
  deliverabilityAnalysis: DeliverabilityAnalysis;
  abTestSuggestions: ABTestSuggestion;
}

export function useEmailGenerator() {
  const [generatedEmails, setGeneratedEmails] = useState<GeneratedEmail[]>([]);
  const [deliverabilityAnalysis, setDeliverabilityAnalysis] = useState<DeliverabilityAnalysis | null>(null);
  const [abTestSuggestions, setAbTestSuggestions] = useState<ABTestSuggestion | null>(null);

  const generateEmailsMutation = useMutation({
    mutationFn: async (input: EmailGenerationInput): Promise<EmailGenerationResult> => {
      const response = await apiRequest("POST", "/api/generate-emails", input);
      return response.json();
    },
    onSuccess: (data) => {
      setGeneratedEmails(data.emails);
      setDeliverabilityAnalysis(data.deliverabilityAnalysis);
      setAbTestSuggestions(data.abTestSuggestions);
    },
  });

  const clearResults = () => {
    setGeneratedEmails([]);
    setDeliverabilityAnalysis(null);
    setAbTestSuggestions(null);
  };

  return {
    generateEmails: generateEmailsMutation.mutate,
    isGenerating: generateEmailsMutation.isPending,
    error: generateEmailsMutation.error,
    generatedEmails,
    deliverabilityAnalysis,
    abTestSuggestions,
    clearResults,
  };
}
