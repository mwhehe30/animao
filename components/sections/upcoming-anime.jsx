import AnimeCard from "../common/AnimeCard";
import GridLayout from "../common/GridLayout";

const UpcomingAnime = ({ animes }) => {
  return (
    <GridLayout title="Upcoming Anime">
      {animes.slice(0, 10).map((anime) => (
        <AnimeCard key={anime.mal_id} anime={anime} />
      ))}
    </GridLayout>
  );
};

export default UpcomingAnime;
