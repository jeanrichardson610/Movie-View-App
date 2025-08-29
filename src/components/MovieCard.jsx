import React from "react";
import starIcon from "../assets/star.svg"; // Make sure this path is correct

const MovieCard = ({
  movie: { title, vote_average, poster_path, release_date, original_language },
}) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:-translate-y-1">
      {/* Movie Poster */}
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : "/no-movie.png"
        }
        alt={title}
        className="w-full h-auto"
      />

      {/* Movie Info */}
      <div className="p-4 flex flex-col gap-2">
        {/* Title */}
        <h3 className="text-white font-semibold text-lg truncate">{title}</h3>

        {/* Rating, Language, Year */}
        <div className="flex items-center gap-2 text-gray-300 text-sm flex-wrap">
          {/* Rating */}
          <div className="flex items-center gap-1">
            <img src={starIcon} alt="Star Icon" className="w-4 h-4" />
            <span>{vote_average ? vote_average.toFixed(1) : "N/A"}</span>
          </div>

          <span>•</span>

          {/* Language */}
          <span>{original_language}</span>

          <span>•</span>

          {/* Year */}
          <span>{release_date ? release_date.split("-")[0] : "N/A"}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
