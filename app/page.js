import MostPopularAnime from "@/components/sections/mostpopular-anime";
import SeasonalAnime from "@/components/sections/seasonal-anime";
import UpcomingAnime from "@/components/sections/upcoming-anime";
import { getAnimeSeasonal, getTopAnime, getUpcomingAnime } from "@/lib/api";

const Page = async () => {
  const topAnime = await getTopAnime();
  const seasonalAnime = await getAnimeSeasonal();
  const upcomingAnime = await getUpcomingAnime();
  return (
    <div>
      <SeasonalAnime animes={seasonalAnime} />
      <MostPopularAnime animes={topAnime} />
      <UpcomingAnime animes={upcomingAnime} />
    </div>
  );
};

export default Page;
