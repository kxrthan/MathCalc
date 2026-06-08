"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { tools } from "@/lib/tools-registry";
import Link from "next/link";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof tools>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);
    if (q.length > 1) {
      setResults(
        tools.filter(
          (t) =>
            t.name.toLowerCase().includes(q.toLowerCase()) ||
            t.description.toLowerCase().includes(q.toLowerCase()) ||
            t.category.toLowerCase().includes(q.toLowerCase()) ||
            t.tags?.some((tag) => tag.includes(q.toLowerCase()))
        ).slice(0, 8)
      );
    } else {
      setResults([]);
    }
  };

  return (
    <div className="relative w-full max-w-sm">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search tools..."
          className="w-full h-10 rounded-md border border-input bg-background pl-8 pr-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:w-[300px] lg:w-[400px]"
          value={query}
          onChange={handleSearch}
          onKeyDown={(e) => {
            if (e.key === "Enter" && results.length > 0) {
              window.location.href = `/tools/${results[0].slug}`;
            }
          }}
        />
      </div>
      {results.length > 0 && (
        <div className="absolute top-full z-50 mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md max-h-64 overflow-y-auto">
          <ul className="py-2">
            {results.map((tool) => (
              <li key={tool.slug}>
                <Link
                  href={`/tools/${tool.slug}`}
                  className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                  onClick={() => {
                    setQuery("");
                    setResults([]);
                  }}
                >
                  <div className="font-medium">{tool.name}</div>
                  <div className="text-xs text-muted-foreground">{tool.category}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
