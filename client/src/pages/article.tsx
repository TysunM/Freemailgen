import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

interface ArticleProps {
  title: string;
  children: React.ReactNode;
}

export default function Article({ title, children }: ArticleProps) {
  return (
    <div className="min-h-screen bg-[var(--dark-primary)] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/blog" className="flex items-center text-sm font-semibold text-[var(--neon-green)] hover:text-[var(--neon-yellow)] transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
        <article className="prose prose-invert prose-lg max-w-none prose-headings:text-[var(--neon-yellow)] prose-a:text-[var(--neon-green)] hover:prose-a:text-[var(--neon-yellow)]">
          <h1>{title}</h1>
          {children}
        </article>
      </div>
    </div>
  );
}
