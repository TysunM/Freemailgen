import { useState } from "react";
import EmailGenerator from "@/components/email-generator";
import GeneratedEmails from "@/components/generated-emails";
import DeliverabilityAnalysis from "@/components/deliverability-analysis";
import ABTestSuggestions from "@/components/ab-test-suggestions";
import TemplateLibrary from "@/components/template-library";
import AdSpace from "@/components/ad-space";
import { Mail } from "lucide-react";
import type { GeneratedEmail, DeliverabilityAnalysis as DeliverabilityType, ABTestSuggestion } from "@shared/schema";

export default function Home() {
  const [generatedEmails, setGeneratedEmails] = useState<GeneratedEmail[]>([]);
  const [deliverabilityAnalysis, setDeliverabilityAnalysis] = useState<DeliverabilityType | null>(null);
  const [abTestSuggestions, setAbTestSuggestions] = useState<ABTestSuggestion | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleEmailsGenerated = (data: {
    emails: GeneratedEmail[];
    deliverabilityAnalysis: DeliverabilityType;
    abTestSuggestions: ABTestSuggestion;
  }) => {
    setGeneratedEmails(data.emails);
    setDeliverabilityAnalysis(data.deliverabilityAnalysis);
    setAbTestSuggestions(data.abTestSuggestions);
    setIsGenerating(false);
  };

  const handleGenerationStart = () => {
    setIsGenerating(true);
  };

  const handleGenerationError = () => {
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-[var(--dark-primary)] text-white overflow-x-hidden w-full">
      {/* Top Ad Banner */}
      <AdSpace type="banner-top" />

      {/* Desktop Layout - Hidden on mobile */}
      <div className="hidden xl:flex xl:min-h-screen">
        {/* Left Sidebar Ad */}
        <div className="w-80 border-r border-[var(--dark-tertiary)] flex-shrink-0">
          <div className="sticky top-4 p-4 space-y-4">
            <AdSpace type="sidebar-left-1" />
            <AdSpace type="sidebar-left-2" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-4xl mx-auto px-4 py-8">
          <header className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-yellow)] rounded-full mb-6 animate-pulse">
              <Mail className="text-[var(--dark-primary)] text-2xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-yellow)] bg-clip-text text-transparent">
              AI Cold Email Generator
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Generate high-converting cold email sequences that feel personal and valuable. 
              Free forever with AI-powered deliverability optimization.
            </p>
          </header>

          <EmailGenerator 
            onEmailsGenerated={handleEmailsGenerated}
            onGenerationStart={handleGenerationStart}
            onGenerationError={handleGenerationError}
            isGenerating={isGenerating}
          />

          {generatedEmails.length > 0 && (
            <>
              <GeneratedEmails emails={generatedEmails} />
              
              {deliverabilityAnalysis && (
                <DeliverabilityAnalysis analysis={deliverabilityAnalysis} />
              )}
              
              {abTestSuggestions && (
                <ABTestSuggestions suggestions={abTestSuggestions} />
              )}
            </>
          )}

          <TemplateLibrary />
        </div>

        {/* Right Sidebar Ad */}
        <div className="w-80 border-l border-[var(--dark-tertiary)] flex-shrink-0">
          <div className="sticky top-4 p-4 space-y-4">
            <AdSpace type="sidebar-right-1" />
            <AdSpace type="sidebar-right-2" />
          </div>
        </div>
      </div>

      {/* Mobile Layout - Visible only on mobile */}
      <div className="xl:hidden w-full px-4 py-8">
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-yellow)] rounded-full mb-4 animate-pulse">
            <Mail className="text-[var(--dark-primary)] text-lg" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-3 bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-yellow)] bg-clip-text text-transparent">
            AI Cold Email Generator
          </h1>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed px-2">
            Generate high-converting cold email sequences that feel personal and valuable. 
            Free forever with AI-powered deliverability optimization.
          </p>
        </header>

        <EmailGenerator 
          onEmailsGenerated={handleEmailsGenerated}
          onGenerationStart={handleGenerationStart}
          onGenerationError={handleGenerationError}
          isGenerating={isGenerating}
        />

        {generatedEmails.length > 0 && (
          <>
            <GeneratedEmails emails={generatedEmails} />
            
            {deliverabilityAnalysis && (
              <DeliverabilityAnalysis analysis={deliverabilityAnalysis} />
            )}
            
            {abTestSuggestions && (
              <ABTestSuggestions suggestions={abTestSuggestions} />
            )}
          </>
        )}

        <TemplateLibrary />
        
        {/* Footer */}
        <footer className="text-center mt-12 py-8">
          <p className="text-gray-500 text-sm">
            web by tmp - if it's a webpage made by tmp, you can rest assured it's 100% FREE.
          </p>
        </footer>
      </div>
    </div>
  );
}
