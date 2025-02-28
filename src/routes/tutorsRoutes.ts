import express from 'express'
import { createTutor, getTutors, getTutorsById, profileVisibility, putTutor, updateClassPrice } from '../controller/tutorsController'
import { EditTutorMiddleware, TutorMiddleware, UpdateClassPriceMiddleware } from '../middlewares/tutorMiddleware'
import { idMiddleware } from '../middlewares/userMiddleware'
import { validation } from '../middlewares/validation'
const router = express.Router()

router.post('/', TutorMiddleware, validation, createTutor)
router.put('/', EditTutorMiddleware, validation, putTutor)
router.put('/profile_visibility/:id', idMiddleware, validation, profileVisibility)
router.put('/class_price/:id', UpdateClassPriceMiddleware, validation, updateClassPrice)
router.get('/', getTutors)
router.get('/:id', idMiddleware, validation, getTutorsById)

export default router