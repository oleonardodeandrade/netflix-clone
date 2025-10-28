export type Movie = {
  id: string;
  previewUrl: string;
  posterUrl: string;
  backdropUrl: string;
  title: string;
  tags: string[];
  description?: string;
  episodes?: Episode[];
  rating: number;
  year: number;
  duration: string;
  cast: Actor[];
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
