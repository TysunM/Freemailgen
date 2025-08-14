import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { GeneratedEmail } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Mail, ChevronDown, ChevronUp, Copy, Download } from "lucide-react";

interface GeneratedEmailsProps {
  emails: GeneratedEmail[];
}

export default function GeneratedEmails({ emails }: GeneratedEmailsProps) {
  const { toast } = useToast();
  const [openEmails, setOpenEmails] = useState<string[]>([emails[0]?.id || ""]);

  const toggleEmail = (emailId: string) => {
    setOpenEmails(prev => 
      prev.includes(emailId) 
        ? prev.filter(id => id !== emailId)
        : [...prev, emailId]
    );
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${label} copied to clipboard`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const copyAllEmails = async () => {
    const allEmailText = emails.map((email, index) => 
      `EMAIL ${index + 1} - ${email.stage}\n` +
      `Subject: ${email.subject}\n\n` +
      `${email.body}\n\n` +
      `${"=".repeat(50)}\n`
    ).join("\n");

    await copyToClipboard(allEmailText, "All emails");
  };

  const downloadEmails = () => {
    const allEmailText = emails.map((email, index) => 
      `EMAIL ${index + 1} - ${email.stage}\n` +
      `Subject: ${email.subject}\n\n` +
      `${email.body}\n\n` +
      `${"=".repeat(50)}\n`
    ).join("\n");

    const blob = new Blob([allEmailText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cold-email-sequence.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded!",
      description: "Email sequence downloaded as cold-email-sequence.txt",
    });
  };

  const getEmailColor = (index: number) => {
    const colors = [
      "bg-[var(--neon-green)] text-[var(--dark-primary)]",
      "bg-[var(--neon-yellow)] text-[var(--dark-primary)]",
      "bg-blue-500 text-white",
      "bg-red-500 text-white",
      "bg-purple-500 text-white"
    ];
    return colors[index] || "bg-gray-500 text-white";
  };

  if (emails.length === 0) return null;

  return (
    <div className="space-y-4 sm:space-y-6 mb-8 w-full max-w-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="flex items-center text-lg sm:text-xl lg:text-2xl font-bold text-[var(--neon-yellow)]">
          <Mail className="w-5 h-5 sm:w-6 sm:h-6 mr-3" />
          Generated Email Sequence
        </h2>
        <div className="flex gap-2 sm:gap-3">
          <Button 
            onClick={copyAllEmails}
            variant="outline"
            className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-[var(--dark-tertiary)] text-white border-[var(--dark-tertiary)] hover:bg-gray-600 transition-colors text-xs sm:text-sm"
          >
            <Copy className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Copy All
          </Button>
          <Button 
            onClick={downloadEmails}
            className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-[var(--neon-green)] text-[var(--dark-primary)] hover:bg-[var(--neon-green)]/90 transition-colors font-semibold text-xs sm:text-sm"
          >
            <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Download .txt
          </Button>
        </div>
      </div>

      {emails.map((email, index) => (
        <Card key={email.id} className="bg-[var(--dark-secondary)] rounded-xl border border-[var(--dark-tertiary)] overflow-hidden shadow-lg w-full max-w-none">
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <Collapsible 
              open={openEmails.includes(email.id)}
              onOpenChange={() => toggleEmail(email.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold mr-3 ${getEmailColor(index)}`}>
                    Email {index + 1}
                  </span>
                  <span className="text-gray-400 text-sm">{email.stage}</span>
                </div>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-[var(--neon-green)] hover:text-[var(--neon-yellow)] transition-colors">
                    {openEmails.includes(email.id) ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-300">Subject Line</label>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => copyToClipboard(email.subject, "Subject line")}
                    className="text-[var(--neon-green)] hover:text-[var(--neon-yellow)] text-sm"
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </Button>
                </div>
                <div className="bg-[var(--dark-primary)] rounded-lg p-3 border border-[var(--dark-tertiary)]">
                  <span className="text-white">{email.subject}</span>
                </div>
              </div>

              <CollapsibleContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-300">Email Body</label>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => copyToClipboard(email.body, "Email body")}
                      className="text-[var(--neon-green)] hover:text-[var(--neon-yellow)] text-sm"
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </Button>
                  </div>
                  <div className="bg-[var(--dark-primary)] rounded-lg p-4 border border-[var(--dark-tertiary)]">
                    <div className="text-white leading-relaxed whitespace-pre-line">
                      {email.body}
                    </div>
                  </div>
                </div>
              </CollapsibleContent>

              {!openEmails.includes(email.id) && (
                <div className="text-gray-400 text-sm flex items-center">
                  <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                  Email content collapsed - Click to expand
                </div>
              )}
            </Collapsible>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
