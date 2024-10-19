import express from 'express'
import { createTutor, getTutors, getTutorsById, profileVisibility, putTutor } from '../controller/tutorsController'
import { EditTutorMiddleware, TutorMiddleware } from '../middlewares/tutorMiddleware'
import { idMiddleware } from '../middlewares/userMiddleware'
import { validation } from '../middlewares/validation'
const router = express.Router()

router.post('/', TutorMiddleware, validation, createTutor)
router.put('/', EditTutorMiddleware, validation, putTutor)
router.patch('/profile_visibility/:id', idMiddleware, validation, profileVisibility)
router.get('/', getTutors)
router.get('/:id', idMiddleware, validation, getTutorsById)

export default router