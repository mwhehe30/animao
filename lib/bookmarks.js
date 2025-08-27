export const BOOKMARKS_KEY = "anime_bookmarks";

const ifWindowUndefined = () => typeof window === "undefined";

export const getBookmarks = () => {
  if (ifWindowUndefined()) return [];

  try {
    const bookmarks = localStorage.getItem(BOOKMARKS_KEY);
    const bookmarked = bookmarks ? JSON.parse(bookmarks) : [];
    return bookmarked;
  } catch (error) {
    console.error("Error getting bookmarks:", error);
    return [];
  }
};

export const addBookmark = (anime) => {
  if (ifWindowUndefined()) return false;

  try {
    const bookmarks = getBookmarks();

    if (bookmarks.some((bookmark) => bookmark.mal_id === anime.mal_id))
      return false;

    const bookmark = {
      mal_id: anime.mal_id,
      title: anime.title,
      title_english: anime.title_english,
      images: anime.images,
      score: anime.score,
      year: anime.year,
      episodes: anime.episodes,
      status: anime.status,
      genres: anime.genres,
      synopsis: anime.synopsis,
      bookmarkedAt: new Date().toISOString(),
    };

    const updateBookmarks = [bookmark, ...bookmarks];
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updateBookmarks));
    return true;
  } catch (error) {
    console.error("Error adding bookmark:", error);
    return false;
  }
};

export const removeBookmark = (animeId) => {
  if (ifWindowUndefined()) return false;

  try {
    const bookmark = getBookmarks();
    const updateBookmarks = bookmark.filter(
      (bookmark) => bookmark.mal_id !== animeId
    );
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updateBookmarks));
    return true;
  } catch (error) {
    console.error("Error removing bookmark:", error);
    return false;
  }
};

export const isBookmarked = (animeId) => {
  if (ifWindowUndefined()) return false;

  const bookmark = getBookmarks();
  return bookmark.some((bookmark) => bookmark.mal_id === animeId);
};

export const clearBookmarks = () => {
  if (ifWindowUndefined()) return false;

  try {
    localStorage.removeItem(BOOKMARKS_KEY);
    return true;
  } catch (error) {
    console.error("Error clearing bookmarks:", error);
    return false;
  }
};
