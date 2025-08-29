import React from "react";

const MovieCardSmall = ({ movie: { poster_path, title } }) => {
  return (
    <div className="flex justify-center p-2">
      <div className="flex items-center justify-center h-[400px]"> {/* increased height */}
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/original${poster_path}`
              : "/no-movie.png"
          }
          alt={title}
          className="max-w-[180px] w-auto h-auto rounded-2xl shadow-inner shadow-light-100/10"
        />
      </div>
    </div>
  );
};

export default MovieCardSmall;
