import express from 'express'
import { verifyToken } from '../jwt/jwt'
import { idMiddleware } from '../middlewares/userMiddleware'
import { DescriptionMiddleware } from '../middlewares/profileMiddleware'
import { createAndUpdateTutorDescription, getTutorDescriptions } from '../controller/profileController'
const router = express.Router()

router.post('/descriptions', DescriptionMiddleware, createAndUpdateTutorDescription)
router.get('/descriptions/:id', idMiddleware, getTutorDescriptions)

export default router