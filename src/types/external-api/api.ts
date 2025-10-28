export interface ApiMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  popularity: number;
  video: boolean;
}

export interface ApiMovieDetails extends ApiMovie {
  runtime: number;
  genres: { id: number; name: string }[];
  credits?: {
    cast: ApiCast[];
  };
  videos?: {
    results: ApiVideo[];
  };
  similar?: {
    results: ApiMovie[];
  };
}

export interface ApiCast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface ApiVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface ApiResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface ApiGenre {
  id: number;
  name: string;
}

export interface ApiGenresResponse {
  genres: ApiGenre[];
}
