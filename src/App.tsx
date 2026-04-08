import { useState } from "react";
import fetchMovies from "./services/movieService";
import SearchBar from "./components/SearchBar/SearchBar";
import { Toaster, toast } from "react-hot-toast";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import MovieGrid from "./components/MovieGrid/MovieGrid";
import type { Movie } from "./types/movie";
import MovieModal from "./components/MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSubmit = async (query: string) => {
    try {
      setMovies([]);
      setError(false);
      setLoading(true);
      const data = await fetchMovies(query);
      setMovies(data);
      if (data.length <= 0) {
        toast.error("No movies found for your request.");
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieGrid
          onSelect={(movie) => setSelectedMovie(movie)}
          movies={movies}
        />
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
      <Toaster />
    </>
  );
}
