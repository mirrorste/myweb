import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Archive, Calendar, Tag, ChevronRight, Search } from "lucide-react";
import { posts } from "@/data/posts";

export default function ArchivePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    const query = searchQuery.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  const postsByYear = useMemo(() => {
    const grouped: Record<string, typeof posts> = {};
    filteredPosts.forEach((post) => {
      const year = new Date(post.date).getFullYear().toString();
      if (!grouped[year]) {
        grouped[year] = [];
      }
      grouped[year].push(post);
    });
    return Object.entries(grouped).sort(
      (a, b) => Number(b[0]) - Number(a[0])
    );
  }, [filteredPosts]);

  return (
    <div className="py-16">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gh-purple/10 border border-gh-purple/30 mb-6">
            <Archive className="w-8 h-8 text-gh-purple" />
          </div>
          <h1 className="text-4xl font-bold text-gh-text mb-4 font-mono">
            文章归档
          </h1>
          <p className="text-gh-text-muted text-lg">
            共 {posts.length} 篇文章，记录成长的每一步
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gh-text-muted" />
            <input
              type="text"
              placeholder="搜索文章..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gh-bg-secondary border border-gh-border rounded-lg text-gh-text placeholder-gh-text-muted focus:outline-none focus:border-gh-green/50 focus:ring-1 focus:ring-gh-green/30 transition-all"
            />
          </div>
        </motion.div>

        <div className="space-y-12">
          {postsByYear.map(([year, yearPosts], yearIndex) => (
            <motion.div
              key={year}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + yearIndex * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-gh-text font-mono">
                  {year}
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-gh-bg-tertiary text-gh-text-muted">
                  {yearPosts.length} 篇
                </span>
                <div className="flex-1 h-px bg-gh-border" />
              </div>

              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gh-border" />

                <ul className="space-y-4">
                  {yearPosts.map((post, postIndex) => (
                    <motion.li
                      key={post.slug}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.3 + yearIndex * 0.1 + postIndex * 0.05,
                      }}
                    >
                      <Link
                        to={`/blog/${post.slug}`}
                        className="group relative pl-12 block"
                      >
                        <div className="absolute left-2.5 top-6 w-3 h-3 rounded-full bg-gh-bg border-2 border-gh-border group-hover:border-gh-green group-hover:bg-gh-green transition-all" />

                        <div className="gh-card gh-card-hover p-5">
                          <div className="flex flex-wrap items-center gap-3 mb-2">
                            <span className="inline-flex items-center gap-1.5 text-sm text-gh-text-muted">
                              <Calendar className="w-4 h-4" />
                              {post.date}
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-xs bg-gh-blue/10 text-gh-blue border border-gh-blue/30">
                              {post.category}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-gh-text group-hover:text-gh-green transition-colors mb-2 font-mono">
                            {post.title}
                          </h3>
                          <p className="text-sm text-gh-text-muted line-clamp-1 mb-3">
                            {post.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-1.5">
                              {post.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gh-bg-tertiary text-gh-text-muted"
                                >
                                  <Tag className="w-3 h-3 mr-1" />
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <span className="inline-flex items-center text-sm text-gh-green opacity-0 group-hover:opacity-100 transition-opacity">
                              查看
                              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-gh-text-muted text-lg">
              没有找到匹配的文章
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
