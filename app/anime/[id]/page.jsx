import { getAnimeCharacter, getAnimeDetail } from "@/lib/api";
import AnimeDetailPage from "./anime-page";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const anime = await getAnimeDetail(id);
  if (!anime) {
    return {
      title: "Anime Not Found",
      description: "Anime detail not available",
    };
  }
  return {
    title: anime.title,
    description: anime.synopsis || "No description available",
  };
}

export default async function Page({ params }) {
  const { id } = await params;
  const anime = await getAnimeDetail(id);
  const characters = await getAnimeCharacter(id);

  return <AnimeDetailPage anime={anime} characters={characters} />;
}
