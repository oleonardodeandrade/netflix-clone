import { Router } from 'express'
import { prisma } from '../../src/lib/prisma'

export const favoritesRouter = Router()

favoritesRouter.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params

    const favorites = await prisma.favorite.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })

    res.json(favorites)
  } catch (error) {
    console.error('Error fetching favorites:', error)
    res.status(500).json({ error: 'Failed to fetch favorites' })
  }
})

favoritesRouter.post('/', async (req, res) => {
  try {
    const { userId, movieId } = req.body

    if (!userId || !movieId) {
      return res.status(400).json({ error: 'userId and movieId are required' })
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId,
        movieId,
      },
    })

    res.status(201).json(favorite)
  } catch (error) {
    console.error('Error creating favorite:', error)
    res.status(500).json({ error: 'Failed to create favorite' })
  }
})

favoritesRouter.delete('/:userId/:movieId', async (req, res) => {
  try {
    const { userId, movieId } = req.params

    await prisma.favorite.delete({
      where: {
        userId_movieId: {
          userId,
          movieId,
        },
      },
    })

    res.status(204).send()
  } catch (error) {
    console.error('Error deleting favorite:', error)
    res.status(500).json({ error: 'Failed to delete favorite' })
  }
})
