import { useState, useEffect } from "react";

export function useScrollSpy(ids: string[], offset = 100): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      let currentActiveId: string | null = null;
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element && element.offsetTop <= scrollPosition) {
          currentActiveId = id;
        }
      }
      setActiveId(currentActiveId);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ids, offset]);

  return activeId;
}
