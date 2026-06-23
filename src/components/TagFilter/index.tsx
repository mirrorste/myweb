import { Tag } from "lucide-react";

interface TagFilterProps {
  tags: string[];
  activeTag: string | null;
  onTagClick: (tag: string | null) => void;
}

const tagColors: Record<string, string> = {
  React: "bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20",
  TypeScript: "bg-blue-600/10 text-blue-500 border-blue-600/30 hover:bg-blue-600/20",
  "前端架构": "bg-purple-500/10 text-purple-400 border-purple-500/30 hover:bg-purple-500/20",
  "类型系统": "bg-purple-600/10 text-purple-500 border-purple-600/30 hover:bg-purple-600/20",
  "前端进阶": "bg-indigo-500/10 text-indigo-400 border-indigo-500/30 hover:bg-indigo-500/20",
  "Node.js": "bg-green-500/10 text-green-400 border-green-500/30 hover:bg-green-500/20",
  "性能优化": "bg-orange-500/10 text-orange-400 border-orange-500/30 hover:bg-orange-500/20",
  "后端开发": "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20",
  Docker: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/20",
  Kubernetes: "bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20",
  DevOps: "bg-violet-500/10 text-violet-400 border-violet-500/30 hover:bg-violet-500/20",
  CSS: "bg-pink-500/10 text-pink-400 border-pink-500/30 hover:bg-pink-500/20",
  布局: "bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20",
  "前端基础": "bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20",
  GraphQL: "bg-pink-600/10 text-pink-500 border-pink-600/30 hover:bg-pink-600/20",
  "API设计": "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30 hover:bg-fuchsia-500/20",
  "后端架构": "bg-teal-500/10 text-teal-400 border-teal-500/30 hover:bg-teal-500/20",
};

export default function TagFilter({ tags, activeTag, onTagClick }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-10">
      <button
        onClick={() => onTagClick(null)}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
          activeTag === null
            ? "bg-gh-green text-white border-gh-green"
            : "bg-gh-bg-tertiary text-gh-text-muted border-gh-border hover:text-gh-text hover:border-gh-green/50"
        }`}
      >
        全部
      </button>
      {tags.map((tag) => {
        const colorClass = tagColors[tag] || tagColors["React"];
        return (
          <button
            key={tag}
            onClick={() => onTagClick(tag)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
              activeTag === tag
                ? `${colorClass} ring-2 ring-offset-2 ring-offset-gh-bg`
                : "bg-gh-bg-tertiary text-gh-text-muted border-gh-border hover:text-gh-text hover:border-gh-green/50"
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            {tag}
          </button>
        );
      })}
    </div>
  );
}
