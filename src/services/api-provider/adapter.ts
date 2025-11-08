import type { Movie, Actor, PaginatedResponse } from '../../types/movie';
import type { ApiMovie, ApiMovieDetails, ApiCast, ApiResponse } from '../../types/external-api/api';
import { getImageUrl, getBackdropUrl } from './client';

const GENRE_MAP: Record<number, string> = {
  28: 'action',
  12: 'adventure',
  16: 'animation',
  35: 'comedy',
  80: 'crime',
  99: 'documentary',
  18: 'drama',
  10751: 'family',
  14: 'fantasy',
  36: 'history',
  27: 'horror',
  10402: 'music',
  9648: 'mystery',
  10749: 'romance',
  878: 'scifi',
  10770: 'tv',
  53: 'thriller',
  10752: 'war',
  37: 'western',
};

export const mapCastToActor = (cast: ApiCast): Actor => ({
  id: String(cast.id),
  fullName: cast.name,
  profileUrl: getImageUrl(cast.profile_path, 'w200'),
});

export const mapToMovie = (apiMovie: ApiMovie): Movie => {
  const year = apiMovie.release_date
    ? new Date(apiMovie.release_date).getFullYear()
    : 0;

  const tags = apiMovie.genre_ids
    ? apiMovie.genre_ids.map(id => GENRE_MAP[id] || 'other').filter(Boolean)
    : [];

  return {
    id: String(apiMovie.id),
    title: apiMovie.title,
    description: apiMovie.overview,
    posterUrl: getImageUrl(apiMovie.poster_path, 'w500'),
    backdropUrl: getBackdropUrl(apiMovie.backdrop_path, 'original'),
    previewUrl: getImageUrl(apiMovie.poster_path, 'w300'),
    rating: Math.round(apiMovie.vote_average * 10) / 10,
    year,
    duration: '120min',
    tags,
    cast: [],
    episodes: [],
  };
};

export const mapToMovieWithDetails = (apiDetails: ApiMovieDetails): Movie => {
  const baseMovie = mapToMovie(apiDetails);

  const cast = apiDetails.credits?.cast
    ? apiDetails.credits.cast.slice(0, 10).map(mapCastToActor)
    : [];

  const runtime = apiDetails.runtime
    ? `${apiDetails.runtime}min`
    : '120min';

  const tags = apiDetails.genres
    ? apiDetails.genres.map(g => g.name.toLowerCase())
    : baseMovie.tags;

  const trailerUrl = getTrailerUrl(apiDetails);

  return {
    ...baseMovie,
    cast,
    duration: runtime,
    tags,
    previewUrl: trailerUrl || baseMovie.previewUrl,
  };
};

export const mapPaginatedResponse = <T, R>(
  apiResponse: ApiResponse<T>,
  mapFn: (item: T) => R
): PaginatedResponse<R> => ({
  page: apiResponse.page,
  results: apiResponse.results.map(mapFn),
  totalPages: apiResponse.total_pages,
  totalResults: apiResponse.total_results,
});

export const getTrailerUrl = (apiDetails: ApiMovieDetails): string | null => {
  if (!apiDetails.videos?.results) return null;

  const trailer = apiDetails.videos.results.find(
    video => video.type === 'Trailer' && video.site === 'YouTube'
  );

  return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
};

export const getGenreName = (genreId: number): string => {
  return GENRE_MAP[genreId] || 'other';
};

export const getGenreId = (genreName: string): number | null => {
  const entry = Object.entries(GENRE_MAP).find(
    ([_, name]) => name === genreName.toLowerCase()
  );
  return entry ? Number(entry[0]) : null;
};
