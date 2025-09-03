import { Link } from "wouter";
import { ArrowLeft, Twitter, Linkedin, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ArticleProps {
  title: string;
  children: React.ReactNode;
  // You can pass these props from your App.tsx for each article
  publicationDate?: string; 
  author?: string;
}

// A simple component for social sharing links
const SocialShare = ({ title }: { title: string }) => {
  // In a real app, you would use the full URL of your site
  const articleUrl = `https://freemailgen.com/blog/your-article-slug`; 
  const text = `Check out this article: ${title}`;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-semibold text-gray-400">Share:</span>
      <a href={`https://twitter.com/intent/tweet?url=${articleUrl}&text=${text}`} target="_blank" rel="noopener noreferrer">
        <Button variant="outline" size="icon" className="bg-transparent border-gray-700 hover:bg-[var(--dark-tertiary)] hover:text-[var(--neon-green)]">
          <Twitter className="h-4 w-4" />
        </Button>
      </a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${articleUrl}`} target="_blank" rel="noopener noreferrer">
        <Button variant="outline" size="icon" className="bg-transparent border-gray-700 hover:bg-[var(--dark-tertiary)] hover:text-[var(--neon-green)]">
          <Linkedin className="h-4 w-4" />
        </Button>
      </a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${articleUrl}`} target="_blank" rel="noopener noreferrer">
        <Button variant="outline" size="icon" className="bg-transparent border-gray-700 hover:bg-[var(--dark-tertiary)] hover:text-[var(--neon-green)]">
          <Facebook className="h-4 w-4" />
        </Button>
      </a>
    </div>
  )
}

export default function Article({ 
  title, 
  children,
  publicationDate = "September 2, 2025", // Default date
  author = "The FreeMailGen Team" // Default author
}: ArticleProps) {
  return (
    <div className="min-h-screen bg-[var(--dark-primary)] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link 
            href="/blog" 
            className="flex items-center text-sm font-semibold text-[var(--neon-green)] hover:text-[var(--neon-yellow)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Articles
          </Link>
        </div>

        <main>
          {/* Article Header */}
          <div className="mb-8 border-b border-[var(--dark-tertiary)] pb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-yellow)] bg-clip-text text-transparent">
              {title}
            </h1>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <div>
                <span>By {author}</span>
                <span className="mx-2">·</span>
                <span>{publicationDate}</span>
              </div>
              <SocialShare title={title} />
            </div>
          </div>

          {/* Article Content */}
          <article className="prose prose-invert prose-lg max-w-none 
                              prose-p:leading-relaxed 
                              prose-headings:text-[var(--neon-yellow)] 
                              prose-a:text-[var(--neon-green)] hover:prose-a:text-[var(--neon-yellow)]
                              prose-strong:text-white
                              prose-blockquote:border-l-[var(--neon-green)] prose-blockquote:text-gray-300">
            {children}
          </article>
        </main>
        
        {/* Footer Navigation */}
        <div className="mt-12 pt-8 border-t border-[var(--dark-tertiary)] text-center">
            <h3 className="text-xl font-semibold mb-4 text-white">Ready to supercharge your outreach?</h3>
            <p className="text-gray-400 mb-6">Use our free AI tool to generate your next high-converting email sequence in seconds.</p>
            <Link href="/">
                <a className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-yellow)] text-[var(--dark-primary)] font-bold rounded-lg hover:scale-105 transform transition-all duration-200">
                    Generate Emails Now
                </a>
            </Link>
        </div>
      </div>
    </div>
  );
}
