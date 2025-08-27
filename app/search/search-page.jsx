"use client";

import { getAnimeSearch } from "@/lib/api";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import AnimeCard from "@/components/common/AnimeCard";
import GridLayout from "@/components/common/GridLayout";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const query = searchParams.get("q") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const searchInput = useRef(null);

  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!query) {
      setAnimes([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(true);

    getAnimeSearch(query, currentPage, 25)
      .then((res) => setAnimes(res || []))
      .finally(() => setLoading(false));
  }, [query, currentPage]);

  useEffect(() => {
    console.log("shortcut effect mounted");

    const handleKeyDown = (e) => {
      if (pathname !== "/search" || window.innerWidth < 768) {
        return;
      }

      if (e.ctrlKey && e.code === "KeyK") {
        e.preventDefault();
        console.log("Ctrl+K pressed");
        searchInput.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const hasNextPage = animes.length >= 25;

  return (
    <div className="p-4">
      <form className="flex gap-2 mb-6 max-w-6xl mx-auto">
        <input
          type="text"
          name="q"
          defaultValue={query}
          placeholder="Cari anime..."
          className="w-full border-2 px-3 py-2 rounded-lg border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          ref={searchInput}
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white font-bold hover:from-indigo-500 hover:to-purple-600 px-4 py-2 rounded-lg"
        >
          Search
        </button>
      </form>

      {loading ? (
        <div className="flex items-center justify-center">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {hasSearched && animes.length === 0 ? (
            <p>Tidak ada hasil untuk "{query}"</p>
          ) : (
            animes.length > 0 && (
              <GridLayout title="Search Results">
                {animes.map((anime) => (
                  <AnimeCard key={anime.mal_id} anime={anime} />
                ))}
              </GridLayout>
            )
          )}
        </>
      )}

      {query && animes.length > 0 && (
        <div className="flex items-center justify-center mt-12">
          <nav className="flex items-center gap-2">
            {currentPage > 1 && (
              <Link
                href={`/search?q=${query}&page=${currentPage - 1}`}
                className={`p-2 rounded-md text-gray-700 hover:bg-gray-100`}
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>
            )}

            <span
              className={`w-10 h-10 rounded-md flex items-center justify-center bg-gradient-to-r from-indigo-400 to-purple-500 text-white`}
            >
              {currentPage}
            </span>

            {hasNextPage && (
              <Link
                href={`/search?q=${query}&page=${currentPage + 1}`}
                className={`p-2 rounded-md text-gray-700 hover:bg-gray-100`}
              >
                <ChevronRight className="w-5 h-5" />
              </Link>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
