import { useState } from "react";

/**
 * This component's actual content, before this fix, was a duplicate copy
 * of Dashboard.jsx (the parent page) — including a line that imported
 * "CategoryTabs" FROM ITSELF (@/components/fleet/CategoryTabs), a
 * circular self-import. That resolves to undefined at render time, and
 * React throws trying to render an undefined component. Since Dashboard
 * is the index route for /fleet — the first page a fleet owner sees —
 * this was very likely crashing on load.
 *
 * Built as a real component here, matching the same category-pill
 * pattern already used in Fleet.tsx (vehicles page), since nothing
 * functional existed in this slot before at all.
 */
const CATEGORIES = ["All", "Economy", "Executive", "VIP"] as const;

const CategoryTabs = () => {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("All");

  return (
    <div className="mt-8 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => setActive(category)}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
            active === category ? "bg-zinc-900 text-white" : "bg-white text-zinc-600 shadow-sm"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
