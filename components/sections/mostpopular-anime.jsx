import AnimeCard from "../common/AnimeCard";
import GridLayout from "../common/GridLayout";

const MostPopularAnime = ({ animes }) => {
  return (
    <GridLayout title="Most Popular Anime">
      {animes.slice(0, 10).map((anime) => (
        <AnimeCard key={anime.mal_id} anime={anime} />
      ))}
    </GridLayout>
  );
};

export default MostPopularAnime;
