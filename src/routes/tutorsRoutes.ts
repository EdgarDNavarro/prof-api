import express from 'express'
import { createTutor, getTutors, getTutorsById, profileVisibility, putTutor } from '../controller/tutorsController'
import { EditTutorMiddleware, ProfileVisibilityTutorMiddleware, TutorMiddleware } from '../middlewares/tutorMiddleware'
import { idMiddleware } from '../middlewares/userMiddleware'
const router = express.Router()

router.post('/', TutorMiddleware, createTutor)
router.put('/', EditTutorMiddleware, putTutor)
router.put('/profile_visibility', ProfileVisibilityTutorMiddleware, profileVisibility)
router.get('/', getTutors)
router.get('/:id', idMiddleware, getTutorsById)

export default router