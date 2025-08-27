"use client";

import BookmarkCard from "@/components/common/BookmarkCard";
import GridLayout from "@/components/common/GridLayout";
import { useBookmarks } from "@/hooks/useBookmarks";
import {
  ArrowLeft,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const SwalContent = withReactContent(Swal);
const ITEMS_PER_PAGE = 25;

const BookmarksPage = () => {
  const { bookmarks, loading, removeBookmark } = useBookmarks();
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const showSwal = (title, html, icon) => {
    return SwalContent.fire({
      title,
      html,
      icon,
      confirmButtonText: "Yes",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalPages = Math.ceil(bookmarks.length / ITEMS_PER_PAGE);

  const currentBookmarks = bookmarks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleRemoveBookmark = async (animeId, animeTitle) => {
    const result = await showSwal(
      "Are you sure?",
      `Are you sure you want to remove <span class="text-indigo-600">${animeTitle}</span> from your bookmarks?`,
      "warning"
    );
    if (result.isConfirmed) {
      removeBookmark(animeId);
      if (currentBookmarks.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const clearAllBookmarks = async () => {
    const result = await showSwal(
      "Are you sure?",
      'Are you sure you want to <span class="text-red-600">clear all bookmarks</span>? This action cannot be undone.',
      "warning"
    );
    if (result.isConfirmed) {
      bookmarks.forEach((bookmark) => removeBookmark(bookmark.mal_id));
      setCurrentPage(1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (!mounted) {
    return (
      <GridLayout title="Bookmarks">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading bookmarks...</p>
          </div>
        </div>
      </GridLayout>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <Bookmark className="w-8 h-8 text-indigo-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  My Bookmarks
                </h1>
                <p className="text-gray-600 mt-1">
                  {bookmarks.length}{" "}
                  {bookmarks.length === 1 ? "anime" : "anime"} saved
                </p>
              </div>
            </div>

            {bookmarks.length > 0 && (
              <div className="md:self-center">
                <button
                  onClick={clearAllBookmarks}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200 w-full md:w-auto justify-center md:justify-start"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </button>
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading bookmarks...</p>
            </div>
          </div>
        ) : bookmarks.length === 0 ? (
          <div className="text-center py-16">
            <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              No bookmarks yet
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start exploring anime and bookmark your favorites to see them
              here!
            </p>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Browse Anime
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {currentBookmarks.map((anime) => (
                <BookmarkCard
                  key={anime.mal_id}
                  anime={anime}
                  onRemove={() =>
                    handleRemoveBookmark(anime.mal_id, anime.title)
                  }
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-12 overflow-x-auto">
                <nav className="flex items-center gap-1">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-md ${
                      currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {getPageNumbers().map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`min-w-10 h-10 rounded-md flex items-center justify-center mx-1 ${
                        currentPage === page
                          ? "bg-indigo-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-md ${
                      currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;
