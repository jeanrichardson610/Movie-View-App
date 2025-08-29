import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import heroImg from "./assets/hero.png";
import heroBg from "./assets/hero-bg.png";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import MovieCardSmall from "./components/MovieCardSmall";
import { useDebounce } from "react-use";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm]);

  // Fetch trending movies
  const loadTrendingMovies = async () => {
    try {
      const endpoint = `${API_BASE_URL}/trending/movie/week`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) throw new Error("Failed to fetch trending movies");

      const data = await response.json();
      setTrendingMovies((data.results || []).slice(0, 5)); // only top 5
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  // Fetch search or default movies
  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) throw new Error("Failed to fetch movies");

      const data = await response.json();
      setMovieList(data.results || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <header
        className={`relative w-screen ${
          searchTerm ? "h-[60vh]" : "h-screen"
        } flex flex-col items-center justify-center text-center px-4 m-0 transition-all duration-500`}
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <img
          src={heroImg}
          alt="Hero_Banner"
          className="relative z-10 max-w-lg w-full"
        />
        <h1 className="relative z-10 mt-6 text-4xl md:text-5xl font-bold text-white max-w-3xl">
          Find <span className="text-gradient">Movies</span> You'll Enjoy By{" "}
          <span className="text-gradient">Searching</span> Or{" "}
          <span className="text-gradient">Scrolling Down</span>!
        </h1>
        <div className="relative z-10 mt-8 w-full max-w-xl">
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </header>

      {/* Trending Movies - horizontal scroll, top 5 */}
{!searchTerm && trendingMovies.length > 0 && (
  <section className="trending px-4 mt-10">
    <h2 className="text-2xl font-bold text-white mb-6 text-center">
      Trending Movies
    </h2>
    <div className="overflow-x-auto hide-scrollbar">
      <ul className="flex gap-4 w-max mx-auto">
        {trendingMovies.map((movie) => (
          <li
            key={movie.id}
            className="flex-shrink-0 w-[10px] sm:w-[150px] md:w-[160px] lg:w-[180px] flex justify-center"
          >
            {/* Use same MovieCard but scaled down */}
            <MovieCardSmall movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  </section>
)}


      {/* All Movies */}
      <section className="all-movies flex flex-col items-center text-center px-4 mt-10">
        <h2 className="text-2xl font-bold text-white mb-4">
          {debouncedSearchTerm ? "Search Results" : "All Movies"}
        </h2>
        {isLoading ? (
          <Spinner />
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
          <ul className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movieList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default App;
