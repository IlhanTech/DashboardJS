import pkg from '@prisma/client'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.GoogleClientID);

const { PrismaClient } = pkg
const prisma = new PrismaClient()
const { User } = prisma

const generateToken = (userId) => {
    const secretKey = process.env.JWT_SECRET
    const header = {
        alg: 'HS256',
        typ: 'JWT',
    }
    const payload = {
        userId,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
    }

    const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64')
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64')

    const signature = crypto
        .createHmac('sha256', secretKey)
        .update(`${encodedHeader}.${encodedPayload}`)
        .digest('base64')
    return `${encodedHeader}.${encodedPayload}.${signature}`
}

export default {
    async create(req, res) {
        const { name, email, password } = req.body

        try {
            if (!name || !email || !password) {
                return res.status(400).json({ message: 'Veuillez fournir tous les champs requis' })
            }

            const existingUser = await User.findUnique({ where: { email } })
            if (existingUser) {
                return res.status(400).json({ message: "L'utilisateur existe déjà" })
            }

            const salt = bcrypt.genSaltSync(10)
            const hashedPassword = bcrypt.hashSync(password, salt)
            const newUser = await User.create({
                data: {
                    name,
                    email,
                    hashedPassword,
                    salt,
                },
            })

            res.status(201).json({ id: newUser.id, createdAt: newUser.createdAt })
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: "Une erreur est survenue lors de la création de l'utilisateur" })
        }
    },

    async login(req, res) {
        const { email, password } = req.body

        try {
            const user = await User.findUnique({ where: { email } })

            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' })
            }

            const passwordMatch = bcrypt.compareSync(password, user.hashedPassword)

            if (!passwordMatch) {
                return res.status(401).json({ message: 'Mot de passe incorrect' })
            }

            const token = generateToken(user.id)

            res.json({ token })
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Une erreur est survenue lors de la connexion' })
        }
    },

    async getProfile(req, res) {
        try {
          const userId = req.user.userId;
          const userProfile = await User.findUnique({ where: { id: userId } });

          if (!userProfile) {
            return res.status(404).json({ message: 'Profil utilisateur introuvable' });
          }

          res.json({
            userId: userProfile.id,
            name: userProfile.name,
            email: userProfile.email,
            createdAt: userProfile.createdAt,
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du profil' });
        }
    },

    async authenticateToken(req, res, next) {
        const token = req.headers.authorization?.split(' ')[1]

        if (!token) {
            return res.status(401).json({ message: 'Non autorisé' })
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Accès interdit' })
            }

            req.user = user
            next()
        })
    },
    async authenticateGoogleToken(req, res, next) {
        const { idToken } = req.body;
        try {
            console.log('Received idToken:', idToken);
            const ticket = await client.verifyIdToken({
                idToken,
                audience: "275680451382-uhvnc62mdu5mchr9scrbhh3mq03d3n3f.apps.googleusercontent.com",
            });
            console.log('Ticket verified:', ticket);
            const payload = ticket.getPayload();
            const userId = payload['sub'];
            const authToken = generateToken(userId);
            res.json({ authToken });
            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Une erreur est survenue lors de l\'authentification Google' });
        }
    },
}