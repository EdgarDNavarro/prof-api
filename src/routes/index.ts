import express from 'express'
import usersRouter from './usersRoutes'
import studentsRouter from './studentsRoutes'
import tutorsRouter from './tutorsRoutes'
import lessonsRouter from './lessonsRoutes'
import reviewRouter from './reviewsRoutes'
import profileRouter from './profileRoutes'
import studentLevelsRouter from './studentLevelsRoutes'
import authRouter from './authRoutes'
import calendarRouter from './calendarRoutes'

const router = express.Router()

router.use('/users', usersRouter)
router.use('/students', studentsRouter)
router.use('/tutors', tutorsRouter)
router.use('/lessons', lessonsRouter)
router.use('/reviews', reviewRouter)
router.use('/profile', profileRouter)
router.use('/student_level', studentLevelsRouter)

router.use('/auth', authRouter)
router.use('/calendar', calendarRouter)

export default router