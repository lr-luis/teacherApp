import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes.js'

const app = express()

app.use(
  cors({
    origin: 'https://localhost:5173/',
    credential: true
  })
)

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use('/api', authRoutes)

export default app