import { Router } from 'express'
import { prisma } from '../lib/prisma'

export const profilesRouter = Router()

profilesRouter.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params

    const profiles = await prisma.profile.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    })

    res.json(profiles)
  } catch (error) {
    console.error('Error fetching profiles:', error)
    res.status(500).json({ error: 'Failed to fetch profiles' })
  }
})

profilesRouter.post('/', async (req, res) => {
  try {
    const { userId, name, avatar, isKids } = req.body

    if (!userId || !name) {
      return res.status(400).json({ error: 'userId and name are required' })
    }

    const profileCount = await prisma.profile.count({
      where: { userId },
    })

    if (profileCount >= 5) {
      return res.status(400).json({ error: 'Maximum of 5 profiles per account' })
    }

    const profile = await prisma.profile.create({
      data: {
        userId,
        name,
        avatar: avatar || 'default',
        isKids: isKids || false,
      },
    })

    res.status(201).json(profile)
  } catch (error) {
    console.error('Error creating profile:', error)
    res.status(500).json({ error: 'Failed to create profile' })
  }
})

profilesRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { name, avatar, isKids } = req.body

    if (!name) {
      return res.status(400).json({ error: 'name is required' })
    }

    const profile = await prisma.profile.update({
      where: { id },
      data: {
        name,
        ...(avatar && { avatar }),
        ...(typeof isKids === 'boolean' && { isKids }),
      },
    })

    res.json(profile)
  } catch (error) {
    console.error('Error updating profile:', error)
    res.status(500).json({ error: 'Failed to update profile' })
  }
})

profilesRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const profileCount = await prisma.profile.count({
      where: { userId: (await prisma.profile.findUnique({ where: { id } }))?.userId },
    })

    if (profileCount <= 1) {
      return res.status(400).json({ error: 'Cannot delete the last profile' })
    }

    await prisma.profile.delete({
      where: { id },
    })

    res.status(204).send()
  } catch (error) {
    console.error('Error deleting profile:', error)
    res.status(500).json({ error: 'Failed to delete profile' })
  }
})
