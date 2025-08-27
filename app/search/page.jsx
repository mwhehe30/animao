import SearchPage from "./search-page";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const query = params.q || "";
  const title = query ? `Search Anime - ${query}` : "Search Anime";

  return {
    title,
  };
}

export default function Page({ searchParams }) {
  return <SearchPage searchParams={searchParams} />;
}
