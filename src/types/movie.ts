export type Movie = {
  id: string;
  previewUrl: string;
  posterUrl: string;
  backdropUrl: string;
  title: string;
  tags: string[];
  description?: string;
  episodes?: Episode[];
  seasons?: Season[];
  rating: number;
  year: number;
  duration: string;
  cast: Actor[];
  maturityRating?: string;
  quality?: 'HD' | '4K' | 'HDR' | 'Ultra HD 4K';
  isNew?: boolean;
  isRecentlyAdded?: boolean;
  isLeavingSoon?: boolean;
  hasNewSeason?: boolean;
  top10Rank?: number;
  isTvShow?: boolean;
  numberOfSeasons?: number;
  numberOfEpisodes?: number;
};

export type Season = {
  id: string;
  seasonNumber: number;
  name: string;
  overview?: string;
  posterUrl?: string;
  episodeCount: number;
  airDate?: string;
};

export type Episode = {
  id: string;
  movieId: string;
  previewUrl: string;
  title: string;
  tags: string[];
  description?: string;
  episodeNumber: number;
  seasonNumber: number;
  runtime?: number;
  airDate?: string;
};

export type Actor = {
  id: string;
  fullName: string;
  profileUrl: string;
};

export type Genre = 'comedy' | 'romance' | 'horror' | 'action' | 'drama' | 'thriller' | 'scifi' | 'all';

export type DashboardMap = Map<string, Movie[]>;

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  totalPages: number;
  totalResults: number;
}
