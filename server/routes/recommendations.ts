import { Router } from 'express'
import { prisma } from '../lib/prisma'

const router = Router()

interface RecommendationCategory {
  title: string
  movieIds: string[]
}

interface RecommendationsResponse {
  categories: RecommendationCategory[]
}

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    const { profileId } = req.query

    const watchHistory = await prisma.watchHistory.findMany({
      where: { userId },
      orderBy: { watchedAt: 'desc' },
      take: 20,
    })

    const ratings = await prisma.rating.findMany({
      where: {
        userId,
        ...(profileId ? { profileId: profileId as string } : {})
      },
      orderBy: { rating: 'desc' },
    })

    const favorites = await prisma.favorite.findMany({
      where: {
        userId,
        ...(profileId ? { profileId: profileId as string } : {})
      },
    })

    const categories: RecommendationCategory[] = []

    const recentlyWatchedIds = watchHistory
      .filter(w => w.completed)
      .slice(0, 5)
      .map(w => w.movieId)

    if (recentlyWatchedIds.length > 0) {
      categories.push({
        title: 'Because You Recently Watched',
        movieIds: recentlyWatchedIds,
      })
    }

    const highRatedMovies = ratings
      .filter(r => r.rating >= 8)
      .slice(0, 5)
      .map(r => r.movieId)

    if (highRatedMovies.length > 0) {
      categories.push({
        title: 'Based on Your Ratings',
        movieIds: highRatedMovies,
      })
    }

    const favoriteMovieIds = favorites.slice(0, 5).map(f => f.movieId)

    if (favoriteMovieIds.length > 0) {
      categories.push({
        title: 'Similar to Your Favorites',
        movieIds: favoriteMovieIds,
      })
    }

    const response: RecommendationsResponse = {
      categories,
    }

    res.json(response)
  } catch (error) {
    console.error('Error fetching recommendations:', error)
    res.status(500).json({ error: 'Failed to fetch recommendations' })
  }
})

export const recommendationsRouter = router
