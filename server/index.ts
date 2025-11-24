import express from 'express'
import cors from 'cors'
import { favoritesRouter } from './routes/favorites'
import { watchHistoryRouter } from './routes/watchHistory'
import { ratingsRouter } from './routes/ratings'
import { profilesRouter } from './routes/profiles'
import { recommendationsRouter } from './routes/recommendations'
import { top10Router } from './routes/top10'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api/favorites', favoritesRouter)
app.use('/api/watch-history', watchHistoryRouter)
app.use('/api/ratings', ratingsRouter)
app.use('/api/profiles', profilesRouter)
app.use('/api/recommendations', recommendationsRouter)
app.use('/api/top10', top10Router)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
