import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { emailGenerationInputSchema } from "@shared/schema";
import type { EmailGenerationInput, GeneratedEmail, DeliverabilityAnalysis, ABTestSuggestion } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Wand2, Box, Users, Settings, Loader2 } from "lucide-react";

interface EmailGeneratorProps {
  onEmailsGenerated: (data: {
    emails: GeneratedEmail[];
    deliverabilityAnalysis: DeliverabilityAnalysis;
    abTestSuggestions: ABTestSuggestion;
  }) => void;
  onGenerationStart: () => void;
  onGenerationError: () => void;
  isGenerating: boolean;
}

export default function EmailGenerator({
  onEmailsGenerated,
  onGenerationStart,
  onGenerationError,
  isGenerating
}: EmailGeneratorProps) {
  const { toast } = useToast();
  const [progress, setProgress] = useState(0);
  const [progressStep, setProgressStep] = useState("");
  
  const form = useForm<EmailGenerationInput>({
    resolver: zodResolver(emailGenerationInputSchema),
    defaultValues: {
      productDescription: "SaaS productivity tool that helps remote teams manage projects and track time. Features include automated reporting, team collaboration tools, and integration with 50+ popular apps. Starting at $29/month per team.",
      targetAudience: "CTOs and Engineering Managers at tech startups (50-200 employees). Pain points: struggling with project visibility, time tracking inaccuracies, and team coordination. Currently using basic tools like Trello or Asana but need more advanced features.",
      emailCount: "2",
      toneStyle: "professional",
      industryFocus: "technology"
    },
  });

  // Progress tracking effect
  useEffect(() => {
    if (isGenerating) {
      setProgress(0);
      setProgressStep("Initializing...");
      
      const progressSteps = [
        { step: "Analyzing your target audience...", progress: 15 },
        { step: "Crafting email sequence strategy...", progress: 30 },
        { step: "Generating personalized emails...", progress: 60 },
        { step: "Analyzing deliverability factors...", progress: 80 },
        { step: "Finalizing A/B test suggestions...", progress: 95 },
        { step: "Complete!", progress: 100 }
      ];

      let currentStepIndex = 0;
      const stepInterval = setInterval(() => {
        if (currentStepIndex < progressSteps.length && isGenerating) {
          const currentStep = progressSteps[currentStepIndex];
          setProgress(currentStep.progress);
          setProgressStep(currentStep.step);
          currentStepIndex++;
        } else {
          clearInterval(stepInterval);
        }
      }, 1500); // Progress every 1.5 seconds

      return () => clearInterval(stepInterval);
    } else {
      setProgress(0);
      setProgressStep("");
    }
  }, [isGenerating]);

  const onSubmit = async (data: EmailGenerationInput) => {
    try {
      onGenerationStart();
      
      const response = await apiRequest("POST", "/api/generate-emails", data);
      const result = await response.json();
      
      onEmailsGenerated(result);
      
      toast({
        title: "Success!",
        description: "Your cold email sequence has been generated successfully.",
      });
    } catch (error) {
      console.error("Error generating emails:", error);
      onGenerationError();
      
      toast({
        title: "Error",
        description: "Failed to generate email sequence. Please check your API key configuration and try again.",
        variant: "destructive",
      });
    }
  };

  if (isGenerating) {
    return (
      <Card className="bg-[var(--dark-secondary)] rounded-2xl p-8 mb-8 border border-[var(--dark-tertiary)] shadow-2xl">
        <CardContent className="pt-0">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-yellow)] rounded-full mb-6">
              <Loader2 className="text-[var(--dark-primary)] text-2xl animate-spin" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Generating Your 2-Email Sequence</h3>
            <div className="max-w-md mx-auto">
              <div className="bg-[var(--dark-primary)] rounded-full h-3 mb-4 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-yellow)] h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-[var(--neon-green)] font-semibold">{progress}%</span>
                <span className="text-[var(--neon-yellow)] font-semibold">Powered by Claude AI</span>
              </div>
              <p className="text-gray-300 text-sm">{progressStep}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[var(--dark-secondary)] rounded-2xl p-4 sm:p-6 lg:p-8 mb-8 border border-[var(--dark-tertiary)] shadow-2xl w-full max-w-none">
      <CardContent className="pt-0 px-0 sm:px-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Product/Service Description */}
              <FormField
                control={form.control}
                name="productDescription"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="flex items-center text-sm font-semibold text-[var(--neon-green)] mb-2">
                      <Box className="w-4 h-4 mr-2" />
                      Product/Service Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your product or service in detail. Include key features, benefits, pricing, and what makes it unique. The more specific you are, the better your cold emails will be."
                        rows={6}
                        className="w-full bg-[var(--dark-primary)] border border-[var(--dark-tertiary)] rounded-xl px-3 sm:px-4 py-3 text-sm sm:text-base text-white placeholder-gray-400 focus:border-[var(--neon-green)] focus:ring-2 focus:ring-[var(--neon-green)]/20 focus:outline-none transition-all duration-200 resize-none"
                        {...field}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Target Audience Details */}
              <FormField
                control={form.control}
                name="targetAudience"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="flex items-center text-sm font-semibold text-[var(--neon-green)] mb-2">
                      <Users className="w-4 h-4 mr-2" />
                      Target Audience Details
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Define your ideal customer. Include demographics, job titles, company size, industry, pain points, current solutions they use, and buying behavior."
                        rows={6}
                        className="w-full bg-[var(--dark-primary)] border border-[var(--dark-tertiary)] rounded-xl px-3 sm:px-4 py-3 text-sm sm:text-base text-white placeholder-gray-400 focus:border-[var(--neon-green)] focus:ring-2 focus:ring-[var(--neon-green)]/20 focus:outline-none transition-all duration-200 resize-none"
                        {...field}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Generation Settings */}
            <Card className="bg-[var(--dark-primary)] rounded-xl p-6 border border-[var(--dark-tertiary)]">
              <h3 className="flex items-center text-lg font-semibold mb-4 text-[var(--neon-yellow)]">
                <Settings className="w-5 h-5 mr-2" />
                Generation Settings
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <FormField
                  control={form.control}
                  name="toneStyle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-medium text-gray-300 mb-2">Tone Style</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="w-full bg-[var(--dark-secondary)] border border-[var(--dark-tertiary)] rounded-lg px-3 py-2 text-white focus:border-[var(--neon-green)] focus:outline-none">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="direct">Direct</SelectItem>
                          <SelectItem value="consultative">Consultative</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="industryFocus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-medium text-gray-300 mb-2">Industry Focus</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="w-full bg-[var(--dark-secondary)] border border-[var(--dark-tertiary)] rounded-lg px-3 py-2 text-white focus:border-[var(--neon-green)] focus:outline-none">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="consulting">Consulting</SelectItem>
                          <SelectItem value="ecommerce">E-commerce</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Generate Button */}
              <div className="text-center px-4">
                <Button 
                  type="submit"
                  disabled={isGenerating}
                  className="inline-flex items-center px-6 py-4 bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-yellow)] text-[var(--dark-primary)] font-bold text-base sm:text-lg rounded-xl hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-[var(--neon-green)]/50 focus:outline-none focus:ring-4 focus:ring-[var(--neon-green)]/30 w-full max-w-xs"
                >
                  <Wand2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                  Generate Cold Email Sequence
                </Button>
              </div>
            </Card>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
