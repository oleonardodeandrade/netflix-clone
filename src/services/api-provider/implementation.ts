import type { MovieService } from '../movieService';
import type { Movie, PaginatedResponse } from '../../types/movie';
import { apiClient } from './client';
import { mapToMovie, mapToMovieWithDetails, mapPaginatedResponse, getGenreId } from './adapter';

export class MovieServiceImplementation implements MovieService {
  async getPopularMovies(page = 1): Promise<PaginatedResponse<Movie>> {
    const response = await apiClient.getPopularMovies(page);
    return mapPaginatedResponse(response, mapToMovie);
  }

  async getTrendingMovies(timeWindow: 'day' | 'week' = 'week', page = 1): Promise<PaginatedResponse<Movie>> {
    const response = await apiClient.getTrending(timeWindow, page);
    return mapPaginatedResponse(response, mapToMovie);
  }

  async getMoviesByGenre(genre: string, page = 1): Promise<PaginatedResponse<Movie>> {
    const genreId = getGenreId(genre);
    if (!genreId) {
      throw new Error(`Invalid genre: ${genre}`);
    }
    const response = await apiClient.getMoviesByGenre(genreId, page);
    return mapPaginatedResponse(response, mapToMovie);
  }

  async searchMovies(query: string, page = 1): Promise<PaginatedResponse<Movie>> {
    const response = await apiClient.searchMovies(query, page);
    return mapPaginatedResponse(response, mapToMovie);
  }

  async getMovieDetails(movieId: string): Promise<Movie> {
    const response = await apiClient.getMovieDetails(movieId);
    return mapToMovieWithDetails(response);
  }

  async getNowPlayingMovies(page = 1): Promise<PaginatedResponse<Movie>> {
    const response = await apiClient.getNowPlaying(page);
    return mapPaginatedResponse(response, mapToMovie);
  }

  async getTopRatedMovies(page = 1): Promise<PaginatedResponse<Movie>> {
    const response = await apiClient.getTopRated(page);
    return mapPaginatedResponse(response, mapToMovie);
  }

  async getUpcomingMovies(page = 1): Promise<PaginatedResponse<Movie>> {
    const response = await apiClient.getUpcoming(page);
    return mapPaginatedResponse(response, mapToMovie);
  }
}

export const movieService = new MovieServiceImplementation();
