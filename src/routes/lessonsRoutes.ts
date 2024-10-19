import express from 'express'
import { verifyToken } from '../jwt/jwt'
import { idMiddleware } from '../middlewares/userMiddleware'
import { createCustomPrice, createLesson, getCustomPrice, getLessonById, getLessons, getLessonsByStudentId, getLessonsByTutorId, scheduleLesson, statusLesson } from '../controller/lessonsController'
import { CustomPriceMiddleware, GetCustomPriceMiddleware, LessonMiddleware, LessonStatusMiddleware, ScheduleMiddleware } from '../middlewares/lessonMiddleware'
import { validation } from '../middlewares/validation'
const router = express.Router()

router.post('/', LessonMiddleware, validation, createLesson)
router.put('/schedule', ScheduleMiddleware, validation, scheduleLesson)
router.put('/status', LessonStatusMiddleware, validation, statusLesson)
router.get('/', getLessons)
router.get('/:id', idMiddleware, getLessonById)
router.get('/tutor_id/:id', idMiddleware, validation, getLessonsByTutorId)
router.get('/student_id/:id', idMiddleware, validation, getLessonsByStudentId)

router.post('/custom_price', CustomPriceMiddleware, validation, createCustomPrice)
router.get('/custom_price/:student_id/:tutor_id', GetCustomPriceMiddleware, validation, getCustomPrice)


export default router