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

export interface ApiCrew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface ApiMovieDetails extends ApiMovie {
  runtime: number;
  genres: { id: number; name: string }[];
  credits?: {
    cast: ApiCast[];
    crew: ApiCrew[];
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

export interface ApiTvShow {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  popularity: number;
}

export interface ApiTvShowDetails extends ApiTvShow {
  number_of_seasons: number;
  number_of_episodes: number;
  seasons: ApiSeason[];
  episode_run_time: number[];
  genres: { id: number; name: string }[];
  created_by?: { id: number; name: string }[];
  credits?: {
    cast: ApiCast[];
    crew: ApiCrew[];
  };
  videos?: {
    results: ApiVideo[];
  };
  similar?: {
    results: ApiTvShow[];
  };
}

export interface ApiSeason {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  episode_count: number;
  air_date: string;
}

export interface ApiSeasonDetails {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  episodes: ApiEpisode[];
  air_date: string;
}

export interface ApiEpisode {
  id: number;
  name: string;
  overview: string;
  still_path: string | null;
  episode_number: number;
  season_number: number;
  air_date: string;
  runtime: number;
  vote_average: number;
}
