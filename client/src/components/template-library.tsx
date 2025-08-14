import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen, Code, TrendingUp, ShoppingCart, Briefcase, Heart, GraduationCap } from "lucide-react";

const templates = [
  {
    icon: Code,
    name: "SaaS/Tech",
    description: "Templates for software and technology companies targeting B2B customers.",
    count: 4,
    color: "text-[var(--neon-green)]"
  },
  {
    icon: TrendingUp,
    name: "Consulting",
    description: "Professional service templates for consultants and agencies.",
    count: 3,
    color: "text-[var(--neon-yellow)]"
  },
  {
    icon: ShoppingCart,
    name: "E-commerce",
    description: "Templates for online stores and retail businesses.",
    count: 5,
    color: "text-blue-400"
  },
  {
    icon: Briefcase,
    name: "Finance",
    description: "Templates for financial services and fintech companies.",
    count: 3,
    color: "text-purple-400"
  },
  {
    icon: Heart,
    name: "Healthcare",
    description: "Compliant templates for healthcare and medical services.",
    count: 2,
    color: "text-red-400"
  },
  {
    icon: GraduationCap,
    name: "Education",
    description: "Templates for educational institutions and EdTech companies.",
    count: 3,
    color: "text-orange-400"
  }
];

export default function TemplateLibrary() {
  return (
    <Card className="bg-[var(--dark-secondary)] rounded-2xl p-4 sm:p-6 lg:p-8 mb-8 border border-[var(--dark-tertiary)] w-full max-w-none">
      <CardContent className="pt-0 px-0 sm:px-6">
        <h3 className="flex items-center text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-[var(--neon-yellow)]">
          <FolderOpen className="w-5 h-5 sm:w-6 sm:h-6 mr-3" />
          Email Template Library
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {templates.map((template, index) => (
            <div 
              key={index}
              className="p-3 sm:p-4 bg-[var(--dark-primary)] rounded-lg border border-[var(--dark-tertiary)] hover:border-[var(--neon-green)] transition-colors cursor-pointer"
            >
              <div className="flex items-center mb-2 sm:mb-3">
                <template.icon className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 ${template.color}`} />
                <span className="font-semibold text-white text-sm sm:text-base">{template.name}</span>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3">{template.description}</p>
              <span className="text-[var(--neon-green)] text-xs sm:text-sm font-medium">
                {template.count} Templates
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
