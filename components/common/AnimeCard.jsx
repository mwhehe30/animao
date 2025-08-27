"use client";

import { animeStatus } from "@/data/animeStatus";
import { Star } from "lucide-react";
import Link from "next/link";

const AnimeCard = ({ anime }) => {
  const statusClass =
    animeStatus[anime.status] ||
    "bg-gray-200/80 border-gray-400/30 text-gray-700";

  return (
    <Link
      href={`/anime/${anime.mal_id}`}
      title={anime.title}
      className="group relative block bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-indigo-400/20 transition-all duration-300 hover:border-indigo-400/50 transform hover:-translate-y-1"
    >
      {/* Layout berubah: horizontal untuk mobile/tablet, vertikal untuk lg+ */}
      <div className="flex flex-row lg:flex-col">
        {/* Container gambar - responsif */}
        <div className="relative overflow-hidden w-1/2 lg:w-full aspect-[3/4] lg:aspect-[3/4] p-2 flex-shrink-0">
          <img
            src={anime.images.webp.image_url}
            alt={anime.title}
            loading="lazy"
            className="w-full h-full object-cover rounded-xl transition-all duration-300 ease-out"
          />

          <div className="absolute inset-2 rounded-xl bg-gradient-to-t from-indigo-600/40 via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="absolute inset-2 rounded-xl bg-gradient-to-br from-indigo-400/30 via-transparent to-purple-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div
            className={`absolute top-4 right-4 ${statusClass} backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 border`}
          >
            {anime.status || "N/A"}
          </div>
          <div
            className={`absolute bottom-4 left-4 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 border border-white text-white text-shadow-xl text-shadow-white`}
          >
            {anime.rating ? anime.rating.split(" - ")[0] : "N/A"}
          </div>
        </div>

        {/* Container konten - responsif */}
        <div className="relative flex-1 px-4 py-3 lg:pb-4 flex flex-col justify-between">
          <div className="space-y-2 lg:space-y-3">
            <h3 className="text-sm md:text-base font-bold text-gray-900 leading-tight line-clamp-2 lg:truncate max-w-full">
              {anime.title}
            </h3>

            {/* Synopsis - hanya tampil di mobile/tablet */}
            {anime.synopsis && (
              <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 lg:hidden">
                {anime.synopsis}
              </p>
            )}

            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 bg-yellow-50 px-2.5 py-1.5 rounded-full text-gray-700">
                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                <span className="font-medium">{anime.score || "N/A"}</span>
              </span>
              <span className="bg-indigo-50 text-indigo-600 px-2.5 py-1.5 rounded-full font-medium">
                {anime.year || "?"}
              </span>
            </div>

            {/* Info tambahan - rank dan episodes */}
            <div className="flex items-center justify-between text-xs gap-2">
              {anime.rank && (
                <span className="bg-purple-50 text-purple-600 px-2.5 py-1.5 rounded-full font-medium">
                  #{anime.rank}
                </span>
              )}
              {anime.episodes && (
                <span className="bg-blue-50 text-blue-600 px-2.5 py-1.5 rounded-full font-medium">
                  {anime.episodes} EP
                </span>
              )}
              {!anime.rank && !anime.episodes && <div className="w-full"></div>}
            </div>
          </div>

          {/* Genre section - selalu di bawah */}
          {anime.genres && anime.genres.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2 lg:mt-3">
              {anime.genres.slice(0, 1).map((genre) => (
                <span
                  key={genre.mal_id}
                  className="text-xs bg-gray-50 text-gray-600 px-2.5 py-1 rounded-full border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  {genre.name}
                </span>
              ))}

              {anime.genres.length > 1 && (
                <span className="text-xs bg-gray-50 text-gray-600 px-2.5 py-1 rounded-full border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  +{anime.genres.length - 1}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Gradient overlay - hanya untuk vertikal */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/80 to-transparent pointer-events-none hidden lg:block"></div>
    </Link>
  );
};

export default AnimeCard;
