import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import TerminalHero from "@/components/TerminalHero";
import PostCard from "@/components/PostCard";
import TagFilter from "@/components/TagFilter";
import { posts } from "@/data/posts";
import { Sparkles } from "lucide-react";

export default function HomePage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet);
  }, []);

  const filteredPosts = useMemo(() => {
    if (!activeTag) return posts;
    return posts.filter((post) => post.tags.includes(activeTag));
  }, [activeTag]);

  return (
    <div>
      <TerminalHero />

      <section id="posts" className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title">
              <span className="text-gh-text">最新文章</span>
              <Sparkles className="w-6 h-6 text-gh-orange" />
            </h2>
            <p className="text-gh-text-muted mb-8 -mt-4">
              分享技术心得与开发经验
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TagFilter
              tags={allTags}
              activeTag={activeTag}
              onTagClick={setActiveTag}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map((post, index) => (
              <PostCard key={post.slug} post={post} index={index} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-gh-text-muted text-lg">
                暂无相关文章
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
