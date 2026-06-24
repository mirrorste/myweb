import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  User,
  Share2,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { posts } from "@/data/posts";
import { profile } from "@/data/profile";
import TableOfContents from "@/components/TableOfContents";
import type { TocItem } from "@/types";

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-4xl font-bold text-gh-text mb-4">文章未找到</h1>
        <p className="text-gh-text-muted mb-8">
          抱歉，您访问的文章不存在或已被删除。
        </p>
        <Link to="/" className="gh-btn-primary">
          <ArrowLeft className="w-4 h-4" />
          返回首页
        </Link>
      </div>
    );
  }

  const tocItems: TocItem[] = post.content
    .split("\n")
    .filter((line) => line.match(/^##{1,3}\s/))
    .map((line) => {
      const level = line.match(/^#+/)?.[0].length || 2;
      const text = line.replace(/^#+\s/, "");
      const id = text
        .toLowerCase()
        .replace(/[^\w\u4e00-\u9fa5]+/g, "-")
        .replace(/^-|-$/g, "");
      return { id, text, level };
    });

  const getHeadingId = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fa5]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  return (
    <div className="py-12">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gh-text-muted hover:text-gh-green transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回文章列表
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <article className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <header className="mb-10">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="px-3 py-1 rounded-full text-sm bg-gh-blue/10 text-gh-blue border border-gh-blue/30">
                    {post.category}
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm text-gh-text-muted">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm text-gh-text-muted">
                    <Clock className="w-4 h-4" />
                    {post.readTime} 分钟阅读
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gh-text mb-6 leading-tight font-mono">
                  {post.title}
                </h1>

                <p className="text-xl text-gh-text-muted leading-relaxed mb-8">
                  {post.description}
                </p>

                <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-gh-border">
                  <div className="flex items-center gap-3">
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="w-10 h-10 rounded-full bg-gh-bg-tertiary"
                    />
                    <div>
                      <div className="font-medium text-gh-text">
                        {profile.name}
                      </div>
                      <div className="text-sm text-gh-text-muted">
                        {profile.title}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-auto">
                    <button className="p-2 rounded-md text-gh-text-muted hover:text-gh-text hover:bg-gh-bg-tertiary transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-6">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="tag-pill"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </header>

              <div className="prose prose-invert max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children, ...props }) => {
                      const id = getHeadingId(String(children));
                      return (
                        <h1
                          id={id}
                          className="text-3xl font-bold mt-12 mb-6 text-gh-text font-mono scroll-mt-24"
                        >
                          {children}
                        </h1>
                      );
                    },
                    h2: ({ children, ...props }) => {
                      const id = getHeadingId(String(children));
                      return (
                        <h2
                          id={id}
                          className="text-2xl font-bold mt-10 mb-4 text-gh-text font-mono scroll-mt-24 flex items-center gap-3"
                        >
                          <span className="text-gh-green">#</span>
                          {children}
                        </h2>
                      );
                    },
                    h3: ({ children, ...props }) => {
                      const id = getHeadingId(String(children));
                      return (
                        <h3
                          id={id}
                          className="text-xl font-semibold mt-8 mb-3 text-gh-text font-mono scroll-mt-24"
                        >
                          {children}
                        </h3>
                      );
                    },
                    p: ({ children, ...props }) => (
                      <p
                        className="text-gh-text leading-7 mb-4"
                        {...props}
                      >
                        {children}
                      </p>
                    ),
                    ul: ({ children, ...props }) => (
                      <ul
                        className="list-disc list-inside mb-4 text-gh-text space-y-2"
                        {...props}
                      >
                        {children}
                      </ul>
                    ),
                    ol: ({ children, ...props }) => (
                      <ol
                        className="list-decimal list-inside mb-4 text-gh-text space-y-2"
                        {...props}
                      >
                        {children}
                      </ol>
                    ),
                    li: ({ children, ...props }) => (
                      <li className="text-gh-text" {...props}>
                        {children}
                      </li>
                    ),
                    blockquote: ({ children, ...props }) => (
                      <blockquote
                        className="border-l-4 border-gh-green bg-gh-green/5 px-6 py-4 my-6 rounded-r-lg text-gh-text italic"
                        {...props}
                      >
                        {children}
                      </blockquote>
                    ),
                    code({ node, inline, className, children, ...props }: any) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <div className="my-6 rounded-lg overflow-hidden">
                          <SyntaxHighlighter
                            style={oneDark}
                            language={match[1]}
                            PreTag="div"
                            customStyle={{
                              margin: 0,
                              borderRadius: "0.5rem",
                              fontSize: "0.875rem",
                              lineHeight: "1.7",
                            }}
                            {...props}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        </div>
                      ) : (
                        <code
                          className="px-1.5 py-0.5 rounded bg-gh-bg-tertiary text-gh-green text-sm font-mono"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                    a: ({ children, href, ...props }) => (
                      <a
                        href={href}
                        className="text-gh-blue hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                        {...props}
                      >
                        {children}
                      </a>
                    ),
                    strong: ({ children, ...props }) => (
                      <strong className="font-semibold text-gh-text" {...props}>
                        {children}
                      </strong>
                    ),
                    hr: ({ ...props }) => (
                      <hr className="my-8 border-gh-border" {...props} />
                    ),
                    table: ({ children, ...props }) => (
                      <div className="my-6 overflow-x-auto rounded-lg border border-gh-border">
                        <table
                          className="w-full text-sm text-left"
                          {...props}
                        >
                          {children}
                        </table>
                      </div>
                    ),
                    thead: ({ children, ...props }) => (
                      <thead
                        className="bg-gh-bg-tertiary text-gh-text"
                        {...props}
                      >
                        {children}
                      </thead>
                    ),
                    th: ({ children, ...props }) => (
                      <th
                        className="px-4 py-3 font-semibold border-b border-gh-border"
                        {...props}
                      >
                        {children}
                      </th>
                    ),
                    td: ({ children, ...props }) => (
                      <td
                        className="px-4 py-3 border-b border-gh-border text-gh-text"
                        {...props}
                      >
                        {children}
                      </td>
                    ),
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </motion.div>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              <TableOfContents items={tocItems} />

              <div className="gh-card p-6">
                <h4 className="font-semibold text-gh-text mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-gh-green" />
                  关于作者
                </h4>
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-12 h-12 rounded-full bg-gh-bg-tertiary"
                  />
                  <div>
                    <div className="font-medium text-gh-text">
                      {profile.name}
                    </div>
                    <div className="text-sm text-gh-text-muted">
                      {profile.title}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gh-text-muted mb-4 line-clamp-3">
                  {profile.bio}
                </p>
                <div className="flex gap-2">
                  <a
                    href={profile.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md text-gh-text-muted hover:text-gh-green hover:bg-gh-green/10 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={profile.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md text-gh-text-muted hover:text-gh-blue hover:bg-gh-blue/10 transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href={profile.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md text-gh-text-muted hover:text-gh-blue hover:bg-gh-blue/10 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
