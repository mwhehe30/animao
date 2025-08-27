export const getAnimeDetail = async (id) => {
  try {
    const req = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`, {
      next: { revalidate: 300 },
    });
    const res = await req.json();
    return res.data;
  } catch (error) {
    console.error("Error fetching anime detail:", error);
    return null;
  }
};

export const getAnimeCharacter = async (id) => {
  try {
    const req = await fetch(`https://api.jikan.moe/v4/anime/${id}/characters`, {
      next: { revalidate: 300 },
    });
    const res = await req.json();
    return res.data;
  } catch (error) {
    console.error("Error fetching anime character:", error);
    return null;
  }
};

export const getAnimeSeasonal = async () => {
  try {
    const req = await fetch(`https://api.jikan.moe/v4/seasons/now`, {
      next: { revalidate: 300 },
    });
    const res = await req.json();
    return res.data;
  } catch (error) {
    console.error("Error fetching anime seasonal:", error);
    return null;
  }
};

export const getTopAnime = async () => {
  try {
    const req = await fetch(`https://api.jikan.moe/v4/top/anime`, {
      next: { revalidate: 300 },
    });
    const res = await req.json();

    if (res.data) {
      return res.data.sort((a, b) => a.rank - b.rank);
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching anime top:", error);
    return null;
  }
};

export const getAnimeSearch = async (query, page = 1) => {
  try {
    const req = await fetch(
      `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(
        query
      )}&page=${page}`,
      {
        next: { revalidate: 300 },
      }
    );
    const res = await req.json();
    return res.data;
  } catch (error) {
    console.error("Error fetching anime search:", error);
    return null;
  }
};

export const getUpcomingAnime = async () => {
  try {
    const req = await fetch(`https://api.jikan.moe/v4/seasons/upcoming`, {
      next: { revalidate: 300 },
    });
    const res = await req.json();
    return res.data;
  } catch (error) {
    console.error("Error fetching anime upcoming:", error);
    return null;
  }
};
