import { motion } from "framer-motion";
import { Hash } from "lucide-react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import type { TocItem } from "@/types";

interface TableOfContentsProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const ids = items.map((item) => item.id);
  const activeId = useScrollSpy(ids, 120);

  return (
    <nav className="sticky top-24">
      <h4 className="text-sm font-semibold text-gh-text mb-4 flex items-center gap-2">
        <Hash className="w-4 h-4 text-gh-green" />
        目录
      </h4>
      <ul className="space-y-1 text-sm border-l border-gh-border">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => {
                  const el = document.getElementById(item.id);
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className={`block py-2 px-4 -ml-px border-l-2 transition-all duration-200 w-full text-left ${
                  item.level === 3 ? "pl-6" : ""
                } ${
                  isActive
                    ? "border-gh-green text-gh-green bg-gh-green/5"
                    : "border-transparent text-gh-text-muted hover:text-gh-text hover:border-gh-text-muted/50"
                }`}
              >
                {item.text}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
