import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import type { Post } from "@/types";

interface PostCardProps {
  post: Post;
  index?: number;
}

export default function PostCard({ post, index = 0 }: PostCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="gh-card gh-card-hover group cursor-pointer overflow-hidden"
    >
      <Link to={`/blog/${post.slug}`} className="block p-6">
        <div className="flex items-center gap-4 mb-4 text-sm text-gh-text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {post.date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {post.readTime} 分钟阅读
          </span>
          <span className="ml-auto px-2 py-0.5 rounded-full text-xs bg-gh-blue/10 text-gh-blue border border-gh-blue/30">
            {post.category}
          </span>
        </div>

        <h3 className="text-xl font-bold mb-3 text-gh-text group-hover:text-gh-green transition-colors font-mono">
          {post.title}
        </h3>

        <p className="text-gh-text-muted mb-5 line-clamp-2 leading-relaxed">
          {post.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag-pill">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
          <span className="inline-flex items-center gap-1 text-sm text-gh-green opacity-0 group-hover:opacity-100 transition-opacity">
            阅读更多
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
