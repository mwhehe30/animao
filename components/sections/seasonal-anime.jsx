import AnimeSlider from "../common/AnimeSlider";

const SeasonalAnime = ({ animes }) => {
  return (
    <div className="mb-20">
      <div className="text-center py-8 px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-black via-indigo-400 to-black bg-clip-text text-transparent mb-4">
          Seasonal Anime
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent mx-auto"></div>
      </div>
      <AnimeSlider anime={animes} />
    </div>
  );
};

export default SeasonalAnime;
