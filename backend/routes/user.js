import express from 'express'
import user from '../controllers/user.js'

const router = express.Router()

router.post('/signup', user.create)
router.post('/login', user.login)
router.get('/profil', user.authenticateToken, user.getProfile);
router.post('/google', user.authenticateGoogleToken);
router.get('/error', (req, res) => {
    res.status(401).json({ message: 'Erreur d\'authentification Google' });
});

export default router
