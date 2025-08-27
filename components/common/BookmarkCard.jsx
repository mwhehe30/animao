"use client";

import { animeStatus } from "@/data/animeStatus";
import { Calendar, Play, Star, Trash2 } from "lucide-react";
import Link from "next/link";

export default function BookmarkCard({ anime, onRemove }) {
  const statusClass =
    animeStatus[anime?.status] || "bg-gray-100 border-gray-300 text-gray-600";

  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
      title={anime.title}
    >
      {/* Remove button */}
      <div className="relative">
        <button
          onClick={() => onRemove(anime.mal_id)}
          className="absolute top-2 right-2 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition-colors duration-200 shadow-sm cursor-pointer"
          title="Remove from bookmarks"
        >
          <Trash2 className="size-5" />
        </button>

        {/* Image */}
        <Link href={`/anime/${anime.mal_id}`}>
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={
                anime.images?.webp?.large_image_url ||
                anime.images?.jpg?.large_image_url
              }
              alt={anime.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      </div>

      {/* Content */}
      <div className="p-4">
        <Link href={`/anime/${anime.mal_id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-indigo-600 transition-colors truncate">
            {anime.title}
          </h3>
        </Link>

        {anime.title_english && anime.title_english !== anime.title && (
          <p className="text-sm text-gray-600 mb-2 line-clamp-1 truncate">
            {anime.title_english}
          </p>
        )}

        {/* Stats */}
        <div className="flex flex-wrap gap-2 mb-3">
          {anime.score && (
            <div className="flex items-center gap-1 text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
              <Star className="w-3 h-3 fill-current" />
              {anime.score}
            </div>
          )}

          {anime.year && (
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
              {anime.year}
            </span>
          )}

          {anime.episodes && (
            <div className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              <Play className="w-3 h-3" />
              {anime.episodes} eps
            </div>
          )}
        </div>

        {/* Status */}
        <div className="mb-3">
          <span
            className={`${statusClass} px-2 py-1 rounded-full text-xs font-medium`}
          >
            {anime.status}
          </span>
        </div>

        {/* Genres */}
        {anime.genres && anime.genres.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {anime.genres.slice(0, 2).map((genre) => (
              <span
                key={genre.mal_id}
                className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md border border-indigo-200"
              >
                {genre.name}
              </span>
            ))}
            {anime.genres.length > 2 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{anime.genres.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Synopsis */}
        {anime.synopsis && (
          <p className="text-sm text-gray-600 line-clamp-3">{anime.synopsis}</p>
        )}

        {/* Bookmarked date */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            Bookmarked at{" "}
            {new Date(anime.bookmarkedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
