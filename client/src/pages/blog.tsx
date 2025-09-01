import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

// In a real application, you would fetch this from a CMS or a local file system
const articles = [
  { slug: "ultimate-guide-to-cold-emailing", title: "The Ultimate Guide to Cold Emailing in 2025", description: "Everything you need to know to master the art of cold outreach." },
  { slug: "5-common-mistakes-in-sales-outreach", title: "5 Common Mistakes to Avoid in Your Sales Outreach", description: "Avoid these common pitfalls to improve your response rates." },
  { slug: "how-to-personalize-cold-emails", title: "How to Personalize Cold Emails Without Being Creepy", description: "Learn the fine art of personalization that builds rapport." },
  { slug: "analyzing-best-cold-email-subject-lines", title: "Analyzing the Best Cold Email Subject Lines", description: "We break down what makes a subject line irresistible." },
  { slug: "ab-testing-your-cold-emails", title: "A/B Testing Your Cold Emails: A Step-by-Step Guide", description: "A practical guide to optimizing your email campaigns with data." },
  { slug: "art-of-the-follow-up", title: "The Art of the Follow-Up", description: "Craft a follow-up sequence that gets replies without being annoying." },
  { slug: "never-heard-of-you-emails", title: "\"Never Heard of You\": How to Write Cold Emails That Get Replies", description: "Strategies for breaking through the noise and getting noticed." },
  { slug: "spam-to-sale-deliverability-guide", title: "From Spam to Sale: A Guide to Cold Email Deliverability", description: "Ensure your emails land in the inbox, not the spam folder." },
  { slug: "finding-anyones-email-address", title: "Finding Anyone's Email Address: 10 Reliable Methods", description: "Actionable techniques for finding the right contact information." },
  { slug: "crafting-the-perfect-cta", title: "Crafting the Perfect Call-to-Action (CTA)", description: "How to write CTAs that compel prospects to take the next step." },
  { slug: "ai-supercharge-cold-email", title: "How to Use AI to Supercharge Your Cold Email Outreach", description: "Leverage artificial intelligence to scale your efforts effectively." },
  { slug: "legal-side-of-cold-emailing", title: "The Legal Side of Cold Emailing: CAN-SPAM and GDPR", description: "Stay compliant and avoid legal trouble with this essential guide." },
  { slug: "why-your-emails-are-ignored", title: "Why Your Cold Emails Are Being Ignored (and How to Fix It)", description: "Diagnose and fix the reasons your emails aren't getting responses." },
  { slug: "building-a-high-quality-prospect-list", title: "Building a High-Quality Prospect List", description: "The foundation of any successful cold email campaign." },
  { slug: "metrics-that-matter", title: "Metrics That Matter: Measuring Cold Email Success", description: "Focus on the KPIs that truly drive results in your outreach." },
  { slug: "cold-email-vs-warm-email", title: "Cold Email vs. Warm Email: What's the Difference?", description: "Understand the nuances and when to use each approach." },
  { slug: "writing-for-different-industries", title: "Writing Cold Emails for Different Industries", description: "Tailor your approach for SaaS, Real Estate, and more." },
  { slug: "psychology-of-a-great-cold-email", title: "The Psychology of a Great Cold Email", description: "What makes people tick and, more importantly, what makes them reply." },
  { slug: "automating-cold-email-outreach", title: "How to Automate Outreach Without Losing the Personal Touch", description: "Scale your campaigns while maintaining a human connection." },
  { slug: "case-study-60-percent-open-rate", title: "Case Study: How We Achieved a 60% Open Rate", description: "A real-world example of a successful cold email campaign." }
];


export default function Blog() {
  return (
    <div className="min-h-screen bg-[var(--dark-primary)] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-yellow)] bg-clip-text text-transparent">
            The Cold Email Blog
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Tips, strategies, and insights to help you master the art of cold emailing.
          </p>
        </header>

        <div className="grid gap-8">
          {articles.map((article) => (
            <Link key={article.slug} href={`/blog/${article.slug}`}>
              <Card className="bg-[var(--dark-secondary)] border border-[var(--dark-tertiary)] rounded-2xl hover:border-[var(--neon-green)] transition-all duration-300 cursor-pointer group">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white group-hover:text-[var(--neon-yellow)] transition-colors">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 pt-2">
                    {article.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm font-semibold text-[var(--neon-green)]">
                    Read More <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
