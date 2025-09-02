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
// Add these new imports
import { FindingEmailAddress } from "./articles/finding-anyones-email-address";
import { PerfectCTA } from "./articles/crafting-the-perfect-cta";
import { AISupercharge } from "./articles/ai-supercharge-cold-email";
// ... import all 20 articles

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
      <Route path="/blog/ultimate-guide-to-cold-emailing">
        <Article title="The Ultimate Guide to Cold Emailing in 2025">
          <UltimateGuideToColdEmailing />
        </Article>
      </Route>
      <Route path="/blog/5-common-mistakes-in-sales-outreach">
        <Article title="5 Common Mistakes to Avoid in Your Sales Outreach">
          <FiveCommonMistakes />
        </Article>
      </Route>
      <Route path="/blog/how-to-personalize-cold-emails">
        <Article title="How to Personalize Cold Emails Without Being Creepy">
          <HowToPersonalize />
        </Article>
      </Route>
      <Route path="/blog/analyzing-best-cold-email-subject-lines">
        <Article title="Analyzing the Best Cold Email Subject Lines We've Ever Seen">
          <AnalyzingSubjectLines />
        </Article>
      </Route>
      <Route path="/blog/ab-testing-your-cold-emails">
        <Article title="A/B Testing Your Cold Emails: A Step-by-Step Guide">
          <ABTestingGuide />
        </Article>
      </Route>
      <Route path="/blog/art-of-the-follow-up">
        <Article title="The Art of the Follow-Up: How to Craft a High-Converting Email Sequence">
          <ArtOfTheFollowUp />
        </Article>
      </Route>
      <Route path="/blog/never-heard-of-you-emails">
        <Article title="`Never Heard of You`: How to Write Cold Emails That Get Replies">
          <NeverHeardOfYou />
        </Article>
      </Route>
      <Route path="/blog/spam-to-sale-deliverability-guide">
        <Article title="From Spam to Sale: A Guide to Cold Email Deliverability">
          <SpamToSale />
        </Article>
      </Route>

      {/* Add these new routes */}
      <Route path="/blog/finding-anyones-email-address">
        <Article title="Finding Anyone's Email Address: 10 Reliable Methods">
          <FindingEmailAddress />
        </Article>
      </Route>
      <Route path="/blog/crafting-the-perfect-cta">
        <Article title="Crafting the Perfect Call-to-Action (CTA) for Your Cold Emails">
          <PerfectCTA />
        </Article>
      </Route>
      <Route path="/blog/ai-supercharge-cold-email">
        <Article title="How to Use AI to Supercharge Your Cold Email Outreach">
          <AISupercharge />
        </Article>
      </Route>
      {/* ... add a route for each of the 20 articles */}

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
