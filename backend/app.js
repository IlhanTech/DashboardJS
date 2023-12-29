import 'dotenv/config.js'
import express from 'express'
import cors from 'cors'

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: false }))
server.use(cors())

server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content,Accept,Content-Type,Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
    next()
})

server.get('/', (req, res) => {
    res.status(200).json({
        message: 'Server is working !',
    })
})

import userRoutes from './routes/user.js'
import steamRouter from './routes/steam.js'

server.use('/api/user', userRoutes)
server.use('/api/steam', steamRouter)

server.listen(process.env.SERVER_PORT)

export default server
