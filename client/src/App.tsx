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
function App() {
  return (
    <div className="dark">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
