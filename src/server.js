import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { routes } from './routes/index.js'

export const server = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
server.use('/', express.static(path.join(__dirname, 'public')))

server.use(morgan('tiny'))
server.use(cors())
server.use(express.json())

server.use('/api', routes)

server.get('/hello', (_, res) => {
  res.send('hello world')
})


