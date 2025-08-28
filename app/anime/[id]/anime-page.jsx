"use client";

import CharacterList from "@/components/common/CharacterList";
import BookmarkButton from "@/components/ui/BookmarkButton";
import InfoItem from "@/components/ui/InfoItem";
import { animeStatus } from "@/data/animeStatus";
import { Calendar, Play, Star, Users } from "lucide-react";
import { useEffect, useState } from "react";

function formatedNumber(number) {
  return number.toLocaleString("en-US");
}

export default function AnimeDetailPage({ anime, characters }) {
  const [mounted, setMounted] = useState(false);
  const statusClass =
    animeStatus[anime?.status] || "bg-gray-100 border-gray-300 text-gray-600";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!anime) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Anime Not Found</h1>
          <p className="mt-2 text-gray-600">Anime detail not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[60vh] overflow-hidden">
        <img
          src={anime.images.webp.large_image_url || "/placeholder.svg"}
          alt={anime.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background from-10% via-background/20 via-40% to-transparent to-90% backdrop-blur-xs sm:backdrop-blur-sm lg:backdrop-blur-md" />

        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 md:items-end">
              {/* Poster - Hidden on mobile, shown on desktop */}
              <div className="hidden md:block flex-shrink-0">
                <img
                  src={anime.images.webp.large_image_url || "/placeholder.svg"}
                  alt={anime.title}
                  className="w-48 h-64 object-cover rounded-lg border-2 border-white/20"
                />
              </div>

              {/* Title and basic info */}
              <div className="flex-1">
                <div className="text-transparent bg-gradient-to-r from-black via-indigo-400 to-black bg-clip-text text-shadow-xl text-shadow-white">
                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 leading-tight">
                    {anime.title}
                  </h1>
                  {anime.title_english &&
                    anime.title_english !== anime.title && (
                      <h2 className="text-lg md:text-xl mb-1">
                        {anime.title_english}
                      </h2>
                    )}
                  {anime.title_japanese && (
                    <h3 className="text-sm md:text-base mb-4">
                      {anime.title_japanese}
                    </h3>
                  )}
                </div>

                {/* Quick stats */}
                <div className="flex flex-wrap gap-2 sm:gap-3 items-center mb-4">
                  <div className="flex items-center gap-1 bg-amber-200 border border-yellow-500 text-amber-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                    {anime.score || "N/A"}
                  </div>
                  <span className="bg-white/20 backdrop-blur-sm text-indigo-600 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border border-indigo-600">
                    {anime.year || "Unknown"}
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm text-purple-600 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border border-purple-600">
                    {anime.episodes ? `${anime.episodes} eps` : "Unknown"}
                  </span>
                  <span
                    className={`${statusClass} px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border`}
                  >
                    {anime.status}
                  </span>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2">
                  {anime.genres?.slice(0, 4).map((genre) => (
                    <span
                      key={genre.mal_id}
                      className="px-3 py-2 bg-indigo-500/80 backdrop-blur-sm text-white rounded-3xl text-xs font-medium"
                    >
                      {genre.name}
                    </span>
                  ))}
                  {anime.genres?.length > 4 && (
                    <span className="px-2 py-1 bg-gray-600/80 backdrop-blur-sm text-white rounded-md text-xs font-medium">
                      +{anime.genres.length - 4} more
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6">
                {mounted && (
                  <BookmarkButton anime={anime} className="w-full sm:w-auto" />
                )}
              </div>
            </div>

            {/* Action buttons */}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Synopsis */}
            {anime.synopsis && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                  Synopsis
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {anime.synopsis}
                </p>
              </div>
            )}

            <CharacterList characters={characters} />

            {/* Trailer Section */}
            {anime.trailer?.url && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                  Trailer
                </h2>
                <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-200">
                  <iframe
                    src={anime.trailer.embed_url}
                    className="w-full h-full"
                    title={`${anime.title} Trailer`}
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-6 text-gray-800">
                Information
              </h2>

              <div className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  <InfoItem
                    icon={<Star size={16} />}
                    label="Score"
                    value={anime.score || "N/A"}
                  />
                  <InfoItem
                    icon={<Users size={16} />}
                    label="Rank"
                    value={`#${anime.rank || "Unknown"}`}
                  />
                  <InfoItem
                    icon={<Play size={16} />}
                    label="Episodes"
                    value={anime.episodes || "Unknown"}
                  />
                  <InfoItem
                    icon={<Calendar size={16} />}
                    label="Aired"
                    value={anime.aired?.string || "Unknown"}
                  />

                  <div className="col-span-full pt-3 border-t border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-600 mb-3">
                      Statistics
                    </h4>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Popularity:</span>
                        <span className="font-medium">
                          #{formatedNumber(anime.popularity) || "Unknown"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Members:</span>
                        <span className="font-medium">
                          {formatedNumber(anime.members) || "0"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Favorites:</span>
                        <span className="font-medium">
                          {formatedNumber(anime.favorites) || "0"}
                        </span>
                      </div>
                      {anime.scored_by && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Scored by:</span>
                          <span className="font-medium">
                            {formatedNumber(anime.scored_by) || "0"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {anime.broadcast?.string && (
                    <InfoItem
                      label="Broadcast"
                      value={anime.broadcast.string}
                    />
                  )}
                  {anime.duration && (
                    <InfoItem label="Duration" value={anime.duration} />
                  )}
                  {anime.source && (
                    <InfoItem label="Source" value={anime.source} />
                  )}
                  {anime.rating && (
                    <InfoItem label="Rating" value={anime.rating} />
                  )}
                </div>

                {/* Studios */}
                {anime.studios && anime.studios.length > 0 && (
                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">
                      {anime.studios.length === 1 ? "Studio" : "Studios"}
                    </h4>
                    <div className="space-y-1">
                      {anime.studios.map((studio) => (
                        <span
                          key={studio.mal_id}
                          className="inline-block text-sm text-indigo-600 font-medium hover:text-indigo-700"
                        >
                          {studio.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Producers */}
                {anime.producers && anime.producers.length > 0 && (
                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">
                      Producers
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {anime.producers.slice(0, 3).map((producer) => (
                        <span
                          key={producer.mal_id}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
                        >
                          {producer.name}
                        </span>
                      ))}
                      {anime.producers.length > 3 && (
                        <span className="text-xs text-gray-500 px-2 py-1">
                          +{anime.producers.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* All Genres */}
                {anime.genres && anime.genres.length > 4 && (
                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">
                      All Genres
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {anime.genres.map((genre) => (
                        <span
                          key={genre.mal_id}
                          className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md border border-indigo-200"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
