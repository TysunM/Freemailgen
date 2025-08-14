import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { ABTestSuggestion } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { FlaskConical, Copy } from "lucide-react";

interface ABTestSuggestionsProps {
  suggestions: ABTestSuggestion;
}

export default function ABTestSuggestions({ suggestions }: ABTestSuggestionsProps) {
  const { toast } = useToast();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Text copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-[var(--dark-secondary)] rounded-2xl p-8 mb-8 border border-[var(--dark-tertiary)]">
      <CardContent className="pt-0">
        <h3 className="flex items-center text-xl font-bold mb-6 text-[var(--neon-yellow)]">
          <FlaskConical className="w-6 h-6 mr-3" />
          A/B Test Suggestions
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Alternative Subject Lines</h4>
            <div className="space-y-3">
              {suggestions.alternativeSubjects?.map((subject, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[var(--dark-primary)] rounded-lg border border-[var(--dark-tertiary)]">
                  <span className="text-white flex-1">{subject}</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => copyToClipboard(subject)}
                    className="text-[var(--neon-green)] hover:text-[var(--neon-yellow)] text-sm ml-4"
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Opening Hook Variations</h4>
            <div className="space-y-3">
              {suggestions.openingHooks?.map((hook, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[var(--dark-primary)] rounded-lg border border-[var(--dark-tertiary)]">
                  <span className="text-white flex-1">"{hook}"</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => copyToClipboard(hook)}
                    className="text-[var(--neon-green)] hover:text-[var(--neon-yellow)] text-sm ml-4"
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
