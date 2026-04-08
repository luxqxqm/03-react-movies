import axios from "axios";

import type { Movie } from "../types/movie";

interface FetchMoviesProps {
    results: Movie[]
}

export default async function fetchMovies(query: string):Promise<Movie[]> {
    
    const url =
    "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1";
  const options = {
    params: {
      query: query,
    },
    headers: {
      Authorization:
        `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
    };
    
    const response = await axios.get<FetchMoviesProps>(url, options);
    
    return response.data.results;
}