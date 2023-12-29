import axios from 'axios'

export default {
    async getAppList(req, res) {
        try {
            const response = await axios.get(
                `https://api.steampowered.com/ISteamApps/GetAppList/v2/?key=${process.env.STEAM_API_KEY}&format=json`
            )
            res.json(response.data)
        } catch (error) {
            console.error('Error fetching game data:', error.message)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    },
    async getPlayerCount(req, res) {
        const { appid } = req.query

        try {
            const response = await axios.get(
                `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${appid}&key=${process.env.STEAM_API_KEY}&format=json`
            )
            res.json(response.data)
        } catch (error) {
            console.error('Error fetching player count data:', error.message)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    },
}
