import { Switch, Route, Link } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import Blog from "@/pages/blog";
import Article from "@/pages/article";

// Import your articles here
import { UltimateGuideToColdEmailing } from "./articles/ultimate-guide-to-cold-emailing";
import { FiveCommonMistakes } from "./articles/5-common-mistakes-in-sales-outreach";
import { HowToPersonalize } from "./articles/how-to-personalize-cold-emails";
import { AnalyzingSubjectLines } from "./articles/analyzing-best-cold-email-subject-lines";
import { ABTestingGuide } from "./articles/ab-testing-your-cold-emails";
import { ArtOfTheFollowUp } from "./articles/art-of-the-follow-up";
import { NeverHeardOfYou } from "./articles/never-heard-of-you-emails";
import { SpamToSale } from "./articles/spam-to-sale-deliverability-guide";
import { FindingEmailAddress } from "./articles/finding-anyones-email-address";
import { PerfectCTA } from "./articles/crafting-the-perfect-cta";
import { AISupercharge } from "./articles/ai-supercharge-cold-email";
// Add these new imports
import { LegalSide } from "./articles/legal-side-of-cold-emailing";
import { EmailsIgnored } from "./articles/why-your-emails-are-ignored";
import { ProspectList } from "./articles/building-a-high-quality-prospect-list";
import { MetricsThatMatter } from "./articles/metrics-that-matter";
import { ColdVsWarm } from "./articles/cold-email-vs-warm-email";
import { DifferentIndustries } from "./articles/writing-for-different-industries";
import { PsychologyOfEmail } from "./articles/psychology-of-a-great-cold-email";
import { AutomatingOutreach } from "./articles/automating-cold-email-outreach";
import { CaseStudy } from "./articles/case-study-60-percent-open-rate";


function Header() {
  return (
    <header className="bg-[var(--dark-secondary)] border-b border-[var(--dark-tertiary)] p-4">
      <nav className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/">
          <a className="text-xl font-bold text-[var(--neon-yellow)]">FreeMailGen</a>
        </Link>
        <div>
          <Link href="/blog">
            <a className="text-white hover:text-[var(--neon-green)] transition-colors">Blog</a>
          </Link>
        </div>
      </nav>
    </header>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blog" component={Blog} />

      {/* Article Routes */}
      <Route path="/blog/ultimate-guide-to-cold-emailing"><Article title="The Ultimate Guide to Cold Emailing in 2025"><UltimateGuideToColdEmailing /></Article></Route>
      <Route path="/blog/5-common-mistakes-in-sales-outreach"><Article title="5 Common Mistakes to Avoid in Your Sales Outreach"><FiveCommonMistakes /></Article></Route>
      <Route path="/blog/how-to-personalize-cold-emails"><Article title="How to Personalize Cold Emails Without Being Creepy"><HowToPersonalize /></Article></Route>
      <Route path="/blog/analyzing-best-cold-email-subject-lines"><Article title="Analyzing the Best Cold Email Subject Lines We've Ever Seen"><AnalyzingSubjectLines /></Article></Route>
      <Route path="/blog/ab-testing-your-cold-emails"><Article title="A/B Testing Your Cold Emails: A Step-by-Step Guide"><ABTestingGuide /></Article></Route>
      <Route path="/blog/art-of-the-follow-up"><Article title="The Art of the Follow-Up: How to Craft a High-Converting Email Sequence"><ArtOfTheFollowUp /></Article></Route>
      <Route path="/blog/never-heard-of-you-emails"><Article title="`Never Heard of You`: How to Write Cold Emails That Get Replies"><NeverHeardOfYou /></Article></Route>
      <Route path="/blog/spam-to-sale-deliverability-guide"><Article title="From Spam to Sale: A Guide to Cold Email Deliverability"><SpamToSale /></Article></Route>
      <Route path="/blog/finding-anyones-email-address"><Article title="Finding Anyone's Email Address: 10 Reliable Methods"><FindingEmailAddress /></Article></Route>
      <Route path="/blog/crafting-the-perfect-cta"><Article title="Crafting the Perfect Call-to-Action (CTA) for Your Cold Emails"><PerfectCTA /></Article></Route>
      <Route path="/blog/ai-supercharge-cold-email"><Article title="How to Use AI to Supercharge Your Cold Email Outreach"><AISupercharge /></Article></Route>
      
      {/* Add these final routes */}
      <Route path="/blog/legal-side-of-cold-emailing"><Article title="The Legal Side of Cold Emailing: A Guide to CAN-SPAM and GDPR"><LegalSide /></Article></Route>
      <Route path="/blog/why-your-emails-are-ignored"><Article title="Why Your Cold Emails Are Being Ignored (and How to Fix It)"><EmailsIgnored /></Article></Route>
      <Route path="/blog/building-a-high-quality-prospect-list"><Article title="Building a High-Quality Prospect List for Your Campaigns"><ProspectList /></Article></Route>
      <Route path="/blog/metrics-that-matter"><Article title="Metrics That Matter: How to Measure the Success of Your Cold Emails"><MetricsThatMatter /></Article></Route>
      <Route path="/blog/cold-email-vs-warm-email"><Article title="Cold Email vs. Warm Email: What's the Difference and When to Use Each?"><ColdVsWarm /></Article></Route>
      <Route path="/blog/writing-for-different-industries"><Article title="Writing Cold Emails for Different Industries: SaaS, Real Estate, and More"><DifferentIndustries /></Article></Route>
      <Route path="/blog/psychology-of-a-great-cold-email"><Article title="The Psychology of a Great Cold Email: What Makes People Respond?"><PsychologyOfEmail /></Article></Route>
      <Route path="/blog/automating-cold-email-outreach"><Article title="How to Automate Your Cold Email Outreach Without Losing the Personal Touch"><AutomatingOutreach /></Article></Route>
      <Route path="/blog/case-study-60-percent-open-rate"><Article title="Case Study: How We Achieved a 60% Open Rate on Our Last Campaign"><CaseStudy /></Article></Route>

      <Route component={NotFound} />
    </Switch>
  );
}


function App() {
  return (
    <div className="dark">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Header />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
