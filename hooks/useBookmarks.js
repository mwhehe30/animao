"use client";

import {
  addBookmark,
  getBookmarks,
  isBookmarked,
  removeBookmark,
} from "@/lib/bookmarks";
import { useEffect, useState } from "react";

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookmarks = () => {
      const savedBookmarks = getBookmarks();
      setBookmarks(savedBookmarks);
      setLoading(false);
    };

    loadBookmarks();
  }, []);

  const handleAddBookmark = (anime) => {
    const success = addBookmark(anime);

    if (success) {
      setBookmarks(getBookmarks());
      return true;
    }
    return false;
  };

  const handleRemoveBookmark = (animeId) => {
    const success = removeBookmark(animeId);

    if (success) {
      setBookmarks(getBookmarks());
      return true;
    }
    return false;
  };

  const toggleBookmark = (anime) => {
    if (isBookmarked(anime.mal_id)) {
      return handleRemoveBookmark(anime.mal_id);
    } else {
      return handleAddBookmark(anime);
    }
  };

  const checkIsBookmarked = (animeId) => {
    return isBookmarked(animeId);
  };

  return {
    bookmarks,
    loading,
    addBookmark: handleAddBookmark,
    removeBookmark: handleRemoveBookmark,
    toggleBookmark,
    isBookmarked: checkIsBookmarked,
  };
};
