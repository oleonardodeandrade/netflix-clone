import { memo, useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { useAtom, useAtomValue } from "jotai";
import type { Movie } from "../../types/movie";
import { favoriteMoviesAtom } from "../../store/movies";
import { autoplayPreviewsAtom } from "../../store/settings";
import { useToggleFavorite } from "../../hooks/useToggleFavorite";
import { Badge, Top10Badge } from "../badges";
import { movieService } from "../../services";

type MovieCardProps = {
  movie: Movie;
  onClick?: (movie: Movie) => void;
};

function extractYouTubeId(url: string): string | null {
  if (!url || !url.includes("youtube")) return null;
  const match = url.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

const trailerCache = new Map<string, string | null>();

export const MovieCard = memo(function MovieCard({
  movie,
  onClick,
}: MovieCardProps) {
  const navigate = useNavigate();
  const [favorites] = useAtom(favoriteMoviesAtom);
  const autoplayPreviews = useAtomValue(autoplayPreviewsAtom);
  const toggleFavorite = useToggleFavorite();

  const [isHovered, setIsHovered] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [isLoadingTrailer, setIsLoadingTrailer] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fetchAbortRef = useRef<AbortController | null>(null);

  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  const existingVideoId = extractYouTubeId(movie.previewUrl);
  const cachedTrailerUrl = trailerCache.get(movie.id);
  const effectiveTrailerUrl = trailerUrl || cachedTrailerUrl || (existingVideoId ? movie.previewUrl : null);

  const fetchTrailer = useCallback(async () => {
    if (trailerCache.has(movie.id)) {
      const cached = trailerCache.get(movie.id);
      if (cached) setTrailerUrl(cached);
      return;
    }

    if (isLoadingTrailer) return;

    setIsLoadingTrailer(true);
    fetchAbortRef.current = new AbortController();

    try {
      const details = await movieService.getMovieDetails(movie.id);
      const fetchedVideoId = extractYouTubeId(details.previewUrl);

      if (fetchedVideoId) {
        trailerCache.set(movie.id, details.previewUrl);
        setTrailerUrl(details.previewUrl);
      } else {
        trailerCache.set(movie.id, null);
      }
    } catch {
      trailerCache.set(movie.id, null);
    } finally {
      setIsLoadingTrailer(false);
    }
  }, [movie.id, isLoadingTrailer]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);

    if (!autoplayPreviews) return;

    if (!existingVideoId && !trailerCache.has(movie.id)) {
      fetchTrailer();
    }

    hoverTimeoutRef.current = setTimeout(() => {
      const currentVideoId = extractYouTubeId(trailerCache.get(movie.id) || effectiveTrailerUrl || "");
      if (currentVideoId || existingVideoId) {
        setShowTrailer(true);
      }
    }, 800);
  }, [autoplayPreviews, existingVideoId, movie.id, fetchTrailer, effectiveTrailerUrl]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setShowTrailer(false);
    setIsMuted(true);
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    if (fetchAbortRef.current) {
      fetchAbortRef.current.abort();
      fetchAbortRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (fetchAbortRef.current) {
        fetchAbortRef.current.abort();
      }
    };
  }, []);

  useEffect(() => {
    if (isHovered && trailerUrl && autoplayPreviews && !showTrailer) {
      const vid = extractYouTubeId(trailerUrl);
      if (vid) {
        setShowTrailer(true);
      }
    }
  }, [trailerUrl, isHovered, autoplayPreviews, showTrailer]);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/watch/${movie.id}`);
  };

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await toggleFavorite(movie, isFavorite);
  };

  const handleMoreInfo = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.(movie);
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  const displayVideoId = extractYouTubeId(effectiveTrailerUrl || "");

  return (
    <div
      className="group relative cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 hover:z-20"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative overflow-hidden rounded-sm bg-zinc-900">
        {showTrailer && displayVideoId ? (
          <div className="relative w-full aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${displayVideoId}?autoplay=1&mute=${
                isMuted ? 1 : 0
              }&controls=0&showinfo=0&modestbranding=1&loop=1&playlist=${displayVideoId}&start=0`}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={movie.title}
            />
            <button
              onClick={handleToggleMute}
              className="absolute bottom-2 right-2 w-7 h-7 flex items-center justify-center bg-zinc-900/80 hover:bg-zinc-800 border border-white/40 rounded-full transition-all z-10"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <svg
                  className="w-3.5 h-3.5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                  />
                </svg>
              ) : (
                <svg
                  className="w-3.5 h-3.5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                </svg>
              )}
            </button>
          </div>
        ) : (
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full aspect-video object-cover"
            loading="lazy"
          />
        )}

        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {movie.top10Rank && <Top10Badge rank={movie.top10Rank} />}
          {movie.isNew && <Badge variant="new" />}
          {movie.isRecentlyAdded && <Badge variant="recently-added" />}
          {movie.isLeavingSoon && <Badge variant="leaving-soon" />}
          {movie.hasNewSeason && <Badge variant="new-season" />}
        </div>

        <div
          className={`absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`absolute bottom-0 left-0 right-0 p-3 space-y-2 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex items-center gap-2">
              <button
                onClick={handlePlay}
                className="w-8 h-8 flex items-center justify-center bg-white hover:bg-white/80 rounded-full transition-all"
                aria-label="Play"
              >
                <svg
                  className="w-4 h-4 text-black ml-0.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>

              <button
                onClick={handleFavoriteClick}
                className="w-8 h-8 flex items-center justify-center bg-zinc-800/90 hover:bg-zinc-700 border border-white/40 hover:border-white rounded-full transition-all"
                aria-label={
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }
              >
                <svg
                  className={`w-4 h-4 transition-colors ${
                    isFavorite ? "text-red-500 fill-current" : "text-white"
                  }`}
                  fill={isFavorite ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>

              <button
                onClick={handleMoreInfo}
                className="w-8 h-8 flex items-center justify-center bg-zinc-800/90 hover:bg-zinc-700 border border-white/40 hover:border-white rounded-full transition-all ml-auto"
                aria-label="More info"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            <h3 className="text-sm font-bold text-white line-clamp-1">
              {movie.title}
            </h3>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-green-400 font-semibold">
                {Math.round(movie.rating * 10)}% Match
              </span>
              <span className="text-white/70">{movie.year}</span>
            </div>

            {movie.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {movie.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs text-white/60 capitalize">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
