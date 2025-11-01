import { Router } from 'express'
import { prisma } from '../../src/lib/prisma'

export const ratingsRouter = Router()

ratingsRouter.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params

    const ratings = await prisma.rating.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
    })

    res.json(ratings)
  } catch (error) {
    console.error('Error fetching ratings:', error)
    res.status(500).json({ error: 'Failed to fetch ratings' })
  }
})

ratingsRouter.get('/:userId/:movieId', async (req, res) => {
  try {
    const { userId, movieId } = req.params

    const rating = await prisma.rating.findUnique({
      where: {
        userId_movieId: {
          userId,
          movieId,
        },
      },
    })

    if (!rating) {
      return res.status(404).json({ error: 'Rating not found' })
    }

    res.json(rating)
  } catch (error) {
    console.error('Error fetching rating:', error)
    res.status(500).json({ error: 'Failed to fetch rating' })
  }
})

ratingsRouter.post('/', async (req, res) => {
  try {
    const { userId, movieId, rating } = req.body

    if (!userId || !movieId || rating === undefined) {
      return res.status(400).json({ error: 'userId, movieId, and rating are required' })
    }

    if (rating < 1 || rating > 10) {
      return res.status(400).json({ error: 'Rating must be between 1 and 10' })
    }

    const existingRating = await prisma.rating.findUnique({
      where: {
        userId_movieId: {
          userId,
          movieId,
        },
      },
    })

    let movieRating

    if (existingRating) {
      movieRating = await prisma.rating.update({
        where: { id: existingRating.id },
        data: { rating },
      })
    } else {
      movieRating = await prisma.rating.create({
        data: {
          userId,
          movieId,
          rating,
        },
      })
    }

    res.status(201).json(movieRating)
  } catch (error) {
    console.error('Error creating/updating rating:', error)
    res.status(500).json({ error: 'Failed to create/update rating' })
  }
})

ratingsRouter.delete('/:userId/:movieId', async (req, res) => {
  try {
    const { userId, movieId } = req.params

    await prisma.rating.delete({
      where: {
        userId_movieId: {
          userId,
          movieId,
        },
      },
    })

    res.status(204).send()
  } catch (error) {
    console.error('Error deleting rating:', error)
    res.status(500).json({ error: 'Failed to delete rating' })
  }
})
