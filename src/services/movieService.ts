import type { Movie, PaginatedResponse, Episode } from '../types/movie';

export interface MovieService {
  getPopularMovies(page?: number): Promise<PaginatedResponse<Movie>>;
  getTrendingMovies(timeWindow?: 'day' | 'week', page?: number): Promise<PaginatedResponse<Movie>>;
  getMoviesByGenre(genre: string, page?: number): Promise<PaginatedResponse<Movie>>;
  searchMovies(query: string, page?: number): Promise<PaginatedResponse<Movie>>;
  getMovieDetails(movieId: string): Promise<Movie>;
  getMovieById(movieId: string): Promise<Movie | null>;
  getNowPlayingMovies(page?: number): Promise<PaginatedResponse<Movie>>;
  getTopRatedMovies(page?: number): Promise<PaginatedResponse<Movie>>;
  getUpcomingMovies(page?: number): Promise<PaginatedResponse<Movie>>;
  getSimilarMovies(movieId: string, page?: number): Promise<PaginatedResponse<Movie>>;
  getPopularTvShows(page?: number): Promise<PaginatedResponse<Movie>>;
  getTrendingTvShows(timeWindow?: 'day' | 'week', page?: number): Promise<PaginatedResponse<Movie>>;
  getTvShowDetails(tvId: string): Promise<Movie>;
  getTvSeasonEpisodes(tvId: string, seasonNumber: number): Promise<Episode[]>;
  searchTvShows(query: string, page?: number): Promise<PaginatedResponse<Movie>>;
}
