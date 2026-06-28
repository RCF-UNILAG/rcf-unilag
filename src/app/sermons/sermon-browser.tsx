"use client";

import { useState, useMemo } from "react";
import { SermonCard } from "@/components/sermon-card";
import { type Sermon } from "@/lib/sermons";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SermonBrowserProps {
  initialSermons: Sermon[];
}

export function SermonBrowser({ initialSermons }: SermonBrowserProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSermons = useMemo(() => {
    if (!searchQuery.trim()) return initialSermons;

    const lowerQuery = searchQuery.toLowerCase();
    return initialSermons.filter(
      (sermon) =>
        sermon.title.toLowerCase().includes(lowerQuery) ||
        sermon.speaker.toLowerCase().includes(lowerQuery) ||
        sermon.description.toLowerCase().includes(lowerQuery),
    );
  }, [searchQuery, initialSermons]);

  return (
    <div className="flex flex-col gap-8">
      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto w-full">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <Input
          type="text"
          className="block w-full pl-11"
          placeholder="Search sermons by title, speaker, or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Results */}
      {filteredSermons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {filteredSermons.map((sermon) => (
            <SermonCard key={sermon.id} sermon={sermon} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
          <Search className="h-10 w-10 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">
            No sermons found
          </h3>
          <p className="mt-1 text-gray-500">
            We could&apos;t find anything matching &quot;{searchQuery}&quot;.
            Try a different term.
          </p>
        </div>
      )}
    </div>
  );
}
