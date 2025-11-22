import type { ApiMovie, ApiMovieDetails, ApiResponse, ApiGenresResponse } from '../../types/external-api/api';

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

if (!API_KEY) {
  console.error('Movie API Key is missing! Add VITE_TMDB_API_KEY to your .env.local');
}

const buildUrl = (endpoint: string, params: Record<string, string | number> = {}) => {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', API_KEY);
  url.searchParams.append('language', 'pt-BR');

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  return url.toString();
};

async function fetchAPI<T>(endpoint: string, params?: Record<string, string | number>): Promise<T> {
  try {
    const url = buildUrl(endpoint, params);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
}

export const apiClient = {
  getPopularMovies: async (page = 1): Promise<ApiResponse<ApiMovie>> => {
    return fetchAPI<ApiResponse<ApiMovie>>('/movie/popular', { page });
  },

  getTrending: async (timeWindow: 'day' | 'week' = 'week', page = 1): Promise<ApiResponse<ApiMovie>> => {
    return fetchAPI<ApiResponse<ApiMovie>>(`/trending/movie/${timeWindow}`, { page });
  },

  getMoviesByGenre: async (genreId: number, page = 1): Promise<ApiResponse<ApiMovie>> => {
    return fetchAPI<ApiResponse<ApiMovie>>('/discover/movie', {
      with_genres: genreId,
      page,
    });
  },

  searchMovies: async (query: string, page = 1): Promise<ApiResponse<ApiMovie>> => {
    return fetchAPI<ApiResponse<ApiMovie>>('/search/movie', {
      query,
      page,
    });
  },

  getMovieDetails: async (movieId: string | number): Promise<ApiMovieDetails> => {
    return fetchAPI<ApiMovieDetails>(`/movie/${movieId}`, {
      append_to_response: 'credits,videos,similar',
    });
  },

  getGenres: async (): Promise<ApiGenresResponse> => {
    return fetchAPI<ApiGenresResponse>('/genre/movie/list');
  },

  getNowPlaying: async (page = 1): Promise<ApiResponse<ApiMovie>> => {
    return fetchAPI<ApiResponse<ApiMovie>>('/movie/now_playing', { page });
  },

  getTopRated: async (page = 1): Promise<ApiResponse<ApiMovie>> => {
    return fetchAPI<ApiResponse<ApiMovie>>('/movie/top_rated', { page });
  },

  getUpcoming: async (page = 1): Promise<ApiResponse<ApiMovie>> => {
    return fetchAPI<ApiResponse<ApiMovie>>('/movie/upcoming', { page });
  },

  getSimilarMovies: async (movieId: string | number, page = 1): Promise<ApiResponse<ApiMovie>> => {
    return fetchAPI<ApiResponse<ApiMovie>>(`/movie/${movieId}/similar`, { page });
  },
};

export const getImageUrl = (path: string | null, size: 'w200' | 'w300' | 'w500' | 'original' = 'w500'): string => {
  if (!path) return 'https://via.placeholder.com/500x750/1a1a1a/666?text=No+Image';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const getBackdropUrl = (path: string | null, size: 'w780' | 'w1280' | 'original' = 'original'): string => {
  if (!path) return 'https://via.placeholder.com/1920x1080/1a1a1a/666?text=No+Image';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
