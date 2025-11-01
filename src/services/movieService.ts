import type { Movie, PaginatedResponse } from '../types/movie';

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
}
