import { Router } from 'express'
import { prisma } from '../lib/prisma'

const router = Router()

interface Top10Movie {
  movieId: string
  rank: number
  viewCount: number
}

interface Top10Response {
  movies: Top10Movie[]
}

router.get('/', async (req, res) => {
  try {
    const watchHistory = await prisma.watchHistory.groupBy({
      by: ['movieId'],
      _count: {
        movieId: true,
      },
      orderBy: {
        _count: {
          movieId: 'desc',
        },
      },
      take: 10,
    })

    const movies: Top10Movie[] = watchHistory.map((item, index) => ({
      movieId: item.movieId,
      rank: index + 1,
      viewCount: item._count.movieId,
    }))

    const response: Top10Response = {
      movies,
    }

    res.json(response)
  } catch (error) {
    console.error('Error fetching top 10:', error)
    res.status(500).json({ error: 'Failed to fetch top 10 movies' })
  }
})

export const top10Router = router
