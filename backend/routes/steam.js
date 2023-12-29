import express from 'express'
import steam from '../controllers/steam.js'

const steamRouter = express.Router()

steamRouter.get('/getAppList/', steam.getAppList)
steamRouter.get('/getPlayerCount/', steam.getPlayerCount)

export default steamRouter