import express from 'express'
import cors from 'cors'
import { favoritesRouter } from '../server/routes/favorites'
import { watchHistoryRouter } from '../server/routes/watchHistory'
import { ratingsRouter } from '../server/routes/ratings'
import { profilesRouter } from '../server/routes/profiles'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/profiles', profilesRouter)
app.use('/api/favorites', favoritesRouter)
app.use('/api/watch-history', watchHistoryRouter)
app.use('/api/ratings', ratingsRouter)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

export default app
