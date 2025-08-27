"use client";
import { useState } from "react";

export default function CharacterSection({ characters }) {
  const [showAll, setShowAll] = useState(false);

  if (!characters || characters.length === 0) return null;

  const displayed = showAll ? characters : characters.slice(0, 10);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-6 text-gray-800">
        Characters ({characters.length})
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {displayed.map((charData) => (
          <div
            key={charData.character.mal_id}
            className="text-center group hover:scale-105 transition-transform"
          >
            <div className="relative mb-2">
              <img
                src={
                  charData.character.images.webp.image_url ||
                  charData.character.images.jpg.image_url
                }
                alt={charData.character.name}
                className="w-full aspect-[3/4] object-cover rounded-lg shadow-md"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 rounded-b-lg">
                <span className="text-xs text-white font-medium">
                  {charData.role}
                </span>
              </div>
            </div>
            <h4 className="text-sm font-medium text-gray-800 line-clamp-2">
              {charData.character.name}
            </h4>
            {charData.voice_actors?.[0] && (
              <p className="text-xs text-gray-500 mt-1">
                <span className="text-blue-500">Voice Actor: </span>{charData.voice_actors[0].person.name}
              </p>
            )}
          </div>
        ))}
      </div>

      {characters.length > 10 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer"
          >
            {showAll
              ? "Show Less"
              : `View All Characters (${characters.length})`}
          </button>
        </div>
      )}
    </div>
  );
}
