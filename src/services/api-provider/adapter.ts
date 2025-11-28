import type { Movie, Actor, PaginatedResponse, Season, Episode } from '../../types/movie';
import type { ApiMovie, ApiMovieDetails, ApiCast, ApiResponse, ApiTvShow, ApiTvShowDetails, ApiSeasonDetails, ApiEpisode } from '../../types/external-api/api';
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

const LANGUAGE_MAP: Record<string, string> = {
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  it: 'Italian',
  pt: 'Portuguese',
  ja: 'Japanese',
  ko: 'Korean',
  zh: 'Chinese',
  hi: 'Hindi',
  ru: 'Russian',
  ar: 'Arabic',
};

export const mapCastToActor = (cast: ApiCast): Actor => ({
  id: String(cast.id),
  fullName: cast.name,
  profileUrl: getImageUrl(cast.profile_path, 'w200'),
  character: cast.character,
});

export const mapToMovie = (apiMovie: ApiMovie): Movie => {
  const year = apiMovie.release_date
    ? new Date(apiMovie.release_date).getFullYear()
    : 0;

  const tags = apiMovie.genre_ids
    ? apiMovie.genre_ids.map(id => GENRE_MAP[id] || 'other').filter(Boolean)
    : [];

  const movieId = apiMovie.id;
  const randomSeed = movieId % 10;
  const currentYear = new Date().getFullYear();
  const isRecent = year >= currentYear - 1;

  const maturityRatings = ['TV-MA', 'TV-14', 'PG-13', 'R', 'TV-PG'];
  const maturityRating = maturityRatings[movieId % maturityRatings.length];

  const quality: 'HD' | '4K' | undefined = apiMovie.vote_average > 7.5 ? '4K' : 'HD';

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
    maturityRating,
    quality,
    isNew: isRecent && randomSeed === 1,
    isRecentlyAdded: isRecent && randomSeed === 2,
    isLeavingSoon: randomSeed === 3,
    hasNewSeason: randomSeed === 4,
    top10Rank: randomSeed === 0 ? (movieId % 10) + 1 : undefined,
  };
};

export const mapToMovieWithDetails = (apiDetails: ApiMovieDetails): Movie => {
  const baseMovie = mapToMovie(apiDetails);

  const cast = apiDetails.credits?.cast
    ? apiDetails.credits.cast.slice(0, 10).map(mapCastToActor)
    : [];

  const director = apiDetails.credits?.crew?.find(c => c.job === 'Director')?.name;

  const runtime = apiDetails.runtime
    ? `${apiDetails.runtime}min`
    : '120min';

  const tags = apiDetails.genres
    ? apiDetails.genres.map(g => g.name.toLowerCase())
    : baseMovie.tags;

  const trailerUrl = getTrailerUrl(apiDetails);

  const originalLanguage = LANGUAGE_MAP[apiDetails.original_language] || apiDetails.original_language?.toUpperCase();

  const similar = apiDetails.similar?.results
    ? apiDetails.similar.results.slice(0, 12).map(mapToMovie)
    : [];

  return {
    ...baseMovie,
    cast,
    director,
    duration: runtime,
    tags,
    originalLanguage,
    previewUrl: trailerUrl || baseMovie.previewUrl,
    similar,
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

export const mapToTvShow = (apiTvShow: ApiTvShow): Movie => {
  const year = apiTvShow.first_air_date
    ? new Date(apiTvShow.first_air_date).getFullYear()
    : 0;

  const tags = apiTvShow.genre_ids
    ? apiTvShow.genre_ids.map(id => GENRE_MAP[id] || 'other').filter(Boolean)
    : [];

  const tvId = apiTvShow.id;
  const randomSeed = tvId % 10;
  const currentYear = new Date().getFullYear();
  const isRecent = year >= currentYear - 1;

  const maturityRatings = ['TV-MA', 'TV-14', 'PG-13', 'R', 'TV-PG'];
  const maturityRating = maturityRatings[tvId % maturityRatings.length];

  const quality: 'HD' | '4K' | undefined = apiTvShow.vote_average > 7.5 ? '4K' : 'HD';

  return {
    id: String(apiTvShow.id),
    title: apiTvShow.name,
    description: apiTvShow.overview,
    posterUrl: getImageUrl(apiTvShow.poster_path, 'w500'),
    backdropUrl: getBackdropUrl(apiTvShow.backdrop_path, 'original'),
    previewUrl: getImageUrl(apiTvShow.poster_path, 'w300'),
    rating: Math.round(apiTvShow.vote_average * 10) / 10,
    year,
    duration: 'Series',
    tags,
    cast: [],
    episodes: [],
    maturityRating,
    quality,
    isNew: isRecent && randomSeed === 1,
    isRecentlyAdded: isRecent && randomSeed === 2,
    isLeavingSoon: randomSeed === 3,
    hasNewSeason: randomSeed === 4,
    top10Rank: randomSeed === 0 ? (tvId % 10) + 1 : undefined,
    isTvShow: true,
  };
};

export const mapToTvShowWithDetails = (apiDetails: ApiTvShowDetails): Movie => {
  const baseTvShow = mapToTvShow(apiDetails);

  const cast = apiDetails.credits?.cast
    ? apiDetails.credits.cast.slice(0, 10).map(mapCastToActor)
    : [];

  const director = apiDetails.created_by?.[0]?.name;

  const runtime = apiDetails.episode_run_time?.[0]
    ? `${apiDetails.episode_run_time[0]}min/ep`
    : 'Series';

  const tags = apiDetails.genres
    ? apiDetails.genres.map(g => g.name.toLowerCase())
    : baseTvShow.tags;

  const seasons: Season[] = apiDetails.seasons
    ?.filter(s => s.season_number > 0)
    .map(s => ({
      id: String(s.id),
      seasonNumber: s.season_number,
      name: s.name,
      overview: s.overview,
      posterUrl: getImageUrl(s.poster_path, 'w300'),
      episodeCount: s.episode_count,
      airDate: s.air_date,
    })) || [];

  const trailerUrl = getTvTrailerUrl(apiDetails);

  const originalLanguage = LANGUAGE_MAP[apiDetails.original_language] || apiDetails.original_language?.toUpperCase();

  const similar = apiDetails.similar?.results
    ? apiDetails.similar.results.slice(0, 12).map(mapToTvShow)
    : [];

  return {
    ...baseTvShow,
    cast,
    director,
    duration: runtime,
    tags,
    seasons,
    originalLanguage,
    numberOfSeasons: apiDetails.number_of_seasons,
    numberOfEpisodes: apiDetails.number_of_episodes,
    previewUrl: trailerUrl || baseTvShow.previewUrl,
    similar,
  };
};

export const mapToEpisodes = (apiSeasonDetails: ApiSeasonDetails, tvShowId: string): Episode[] => {
  return apiSeasonDetails.episodes.map((ep: ApiEpisode) => ({
    id: String(ep.id),
    movieId: tvShowId,
    title: ep.name,
    description: ep.overview,
    previewUrl: getImageUrl(ep.still_path, 'w300'),
    episodeNumber: ep.episode_number,
    seasonNumber: ep.season_number,
    runtime: ep.runtime,
    airDate: ep.air_date,
    tags: [],
  }));
};

export const getTvTrailerUrl = (apiDetails: ApiTvShowDetails): string | null => {
  if (!apiDetails.videos?.results) return null;

  const trailer = apiDetails.videos.results.find(
    video => video.type === 'Trailer' && video.site === 'YouTube'
  );

  return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
};
