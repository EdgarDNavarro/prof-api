import express from 'express'
import { verifyToken } from '../jwt/jwt'
import { idMiddleware } from '../middlewares/userMiddleware'
import { DescriptionMiddleware } from '../middlewares/profileMiddleware'
import { createAndUpdateTutorDescription, getTutorDescriptions } from '../controller/profileController'
import { validation } from '../middlewares/validation'
const router = express.Router()

router.post('/descriptions', DescriptionMiddleware, validation, createAndUpdateTutorDescription)
router.get('/descriptions/:id', idMiddleware, validation, getTutorDescriptions)

export default router