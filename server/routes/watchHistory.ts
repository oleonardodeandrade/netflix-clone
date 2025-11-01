import { Router } from 'express'
import { prisma } from '../../src/lib/prisma'

export const watchHistoryRouter = Router()

watchHistoryRouter.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params

    const history = await prisma.watchHistory.findMany({
      where: { userId },
      orderBy: { watchedAt: 'desc' },
    })

    res.json(history)
  } catch (error) {
    console.error('Error fetching watch history:', error)
    res.status(500).json({ error: 'Failed to fetch watch history' })
  }
})

watchHistoryRouter.post('/', async (req, res) => {
  try {
    const { userId, movieId, progress, completed } = req.body

    if (!userId || !movieId) {
      return res.status(400).json({ error: 'userId and movieId are required' })
    }

    const existing = await prisma.watchHistory.findFirst({
      where: { userId, movieId },
    })

    let watchHistory

    if (existing) {
      watchHistory = await prisma.watchHistory.update({
        where: { id: existing.id },
        data: {
          progress: progress ?? existing.progress,
          completed: completed ?? existing.completed,
          watchedAt: new Date(),
        },
      })
    } else {
      watchHistory = await prisma.watchHistory.create({
        data: {
          userId,
          movieId,
          progress: progress ?? 0,
          completed: completed ?? false,
        },
      })
    }

    res.status(201).json(watchHistory)
  } catch (error) {
    console.error('Error creating/updating watch history:', error)
    res.status(500).json({ error: 'Failed to create/update watch history' })
  }
})

watchHistoryRouter.delete('/:userId/:movieId', async (req, res) => {
  try {
    const { userId, movieId } = req.params

    await prisma.watchHistory.deleteMany({
      where: {
        userId,
        movieId,
      },
    })

    res.status(204).send()
  } catch (error) {
    console.error('Error deleting watch history:', error)
    res.status(500).json({ error: 'Failed to delete watch history' })
  }
})
