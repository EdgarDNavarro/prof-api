import express from 'express'
import { verifyToken } from '../jwt/jwt'
import { idMiddleware } from '../middlewares/userMiddleware'
import { createCustomPrice, createLesson, getCustomPrice, getLessonById, getLessons, getLessonsByStudentId, getLessonsByTutorId, scheduleLesson, statusLesson } from '../controller/lessonsController'
import { CustomPriceMiddleware, GetCustomPriceMiddleware, LessonMiddleware, LessonStatusMiddleware, ScheduleMiddleware } from '../middlewares/lessonMiddleware'
const router = express.Router()

router.post('/', LessonMiddleware, createLesson)
router.put('/schedule', ScheduleMiddleware, scheduleLesson)
router.put('/status', LessonStatusMiddleware, statusLesson)
router.get('/', getLessons)
router.get('/:id', idMiddleware, getLessonById)
router.get('/tutor_id/:id', idMiddleware, getLessonsByTutorId)
router.get('/student_id/:id', idMiddleware, getLessonsByStudentId)

router.post('/custom_price', CustomPriceMiddleware, createCustomPrice)
router.get('/custom_price/:student_id/:tutor_id', GetCustomPriceMiddleware, getCustomPrice)


export default router