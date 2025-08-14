import { Card, CardContent } from "@/components/ui/card";
import type { DeliverabilityAnalysis } from "@shared/schema";
import { Shield, CheckCircle, AlertTriangle, Trophy } from "lucide-react";

interface DeliverabilityAnalysisProps {
  analysis: DeliverabilityAnalysis;
}

export default function DeliverabilityAnalysis({ analysis }: DeliverabilityAnalysisProps) {
  const getStatusIcon = (status: string) => {
    if (status === "low" || status === "optimal" || status === "excellent" || status === "perfect" || status === "high") {
      return <CheckCircle className="text-green-500 mr-3" size={20} />;
    }
    return <AlertTriangle className="text-yellow-500 mr-3" size={20} />;
  };

  const getStatusColor = (status: string) => {
    if (status === "low" || status === "optimal" || status === "excellent" || status === "perfect" || status === "high") {
      return "text-green-500";
    }
    return "text-yellow-500";
  };

  const getStatusText = (category: keyof DeliverabilityAnalysis) => {
    const item = analysis[category];
    if (typeof item === 'object' && item !== null && 'status' in item) {
      switch (category) {
        case 'spamTriggerWords':
          return item.status === 'low' ? 'Low Risk' : item.status === 'medium' ? 'Medium Risk' : 'High Risk';
        case 'subjectLineLength':
          return item.status === 'optimal' ? `Optimal (${(item as any).length} chars)` : 
                 item.status === 'too-short' ? 'Too Short' : 'Too Long';
        case 'emailLength':
          return item.status === 'optimal' ? 'Optimal' : 
                 item.status === 'too-short' ? 'Too Short' : 'Could Be Shorter';
        case 'personalizationScore':
          return item.status === 'high' ? `High (${(item as any).score}%)` :
                 item.status === 'medium' ? `Medium (${(item as any).score}%)` : `Low (${(item as any).score}%)`;
        case 'ctaClarity':
          return item.status.charAt(0).toUpperCase() + item.status.slice(1);
        case 'linkBalance':
          return item.status === 'perfect' ? 'Perfect' : 
                 item.status === 'good' ? 'Good' : 'Too Many';
        default:
          return item.status;
      }
    }
    return 'Unknown';
  };

  const analysisItems = [
    { key: 'spamTriggerWords', label: 'Spam Trigger Words' },
    { key: 'subjectLineLength', label: 'Subject Line Length' },
    { key: 'emailLength', label: 'Email Length' },
    { key: 'personalizationScore', label: 'Personalization Score' },
    { key: 'ctaClarity', label: 'CTA Clarity' },
    { key: 'linkBalance', label: 'Link Balance' },
  ] as const;

  return (
    <Card className="bg-[var(--dark-secondary)] rounded-2xl p-4 sm:p-6 lg:p-8 mb-8 border border-[var(--dark-tertiary)] w-full max-w-none">
      <CardContent className="pt-0 px-0 sm:px-6">
        <h3 className="flex items-center text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-[var(--neon-yellow)]">
          <Shield className="w-5 h-5 sm:w-6 sm:h-6 mr-3" />
          Deliverability Analysis
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {analysisItems.slice(0, 3).map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between p-3 sm:p-4 bg-[var(--dark-primary)] rounded-lg border border-[var(--dark-tertiary)]">
              <div className="flex items-center">
                {getStatusIcon(analysis[key]?.status || '')}
                <span className="text-white text-sm sm:text-base">{label}</span>
              </div>
              <span className={`font-semibold text-xs sm:text-sm ${getStatusColor(analysis[key]?.status || '')}`}>
                {getStatusText(key)}
              </span>
            </div>
          ))}
          
          {analysisItems.slice(3).map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between p-3 sm:p-4 bg-[var(--dark-primary)] rounded-lg border border-[var(--dark-tertiary)]">
              <div className="flex items-center">
                {getStatusIcon(analysis[key]?.status || '')}
                <span className="text-white text-sm sm:text-base">{label}</span>
              </div>
              <span className={`font-semibold text-xs sm:text-sm ${getStatusColor(analysis[key]?.status || '')}`}>
                {getStatusText(key)}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-green-900/30 to-green-800/30 rounded-lg border border-green-500/30">
          <div className="flex items-center mb-2">
            <Trophy className="text-[var(--neon-green)] mr-3" />
            <span className="text-[var(--neon-green)] font-semibold">
              Overall Deliverability Score: {analysis.overallScore}/100
            </span>
          </div>
          <p className="text-gray-300 text-sm">
            {analysis.overallScore >= 90 
              ? "Excellent! Your emails have a high probability of reaching the inbox."
              : analysis.overallScore >= 70
              ? "Good! Your emails should reach the inbox with minor optimizations."
              : "Needs improvement. Consider revising your emails to improve deliverability."
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
