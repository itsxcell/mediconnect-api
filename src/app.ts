import express from 'express'
import cors from 'cors'
import { env } from './config/env'
import connectDB from './config/db'
import authRoutes from './modules/auth/auth.routes'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'MediConnect API is running' })
})

app.use('/api/auth', authRoutes)

const start = async () => {
  await connectDB()
  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`)
  })
}

start()

export default app