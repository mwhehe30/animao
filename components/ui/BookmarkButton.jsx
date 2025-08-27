"use client";

import { useBookmarks } from "@/hooks/useBookmarks";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useEffect, useState } from "react";

export default function BookmarkButton({ anime, className = "" }) {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (anime?.mal_id) {
      setBookmarked(isBookmarked(anime.mal_id));
    }
  }, [anime?.mal_id, isBookmarked]);

  const handleToggleBookmark = async () => {
    if (!anime || loading) return;

    setLoading(true);
    try {
      const success = toggleBookmark(anime);
      if (success) {
        setBookmarked(!bookmarked);
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleBookmark}
      disabled={loading}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        bookmarked
          ? "bg-amber-100 text-amber-700 border border-amber-300 hover:bg-amber-200"
          : "bg-indigo-100 text-indigo-600 border border-indigo-300 hover:bg-indigo-200"
      } ${loading ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {bookmarked ? (
        <BookmarkCheck className="w-4 h-4" />
      ) : (
        <Bookmark className="w-4 h-4" />
      )}
      {loading ? "Loading..." : bookmarked ? "Bookmarked" : "Add to Bookmark"}
    </button>
  );
}
