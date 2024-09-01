import express from 'express'
import usersRouter from './usersRoutes'
import studentsRouter from './studentsRoutes'
import tutorsRouter from './tutorsRoutes'
import lessonsRouter from './lessonsRoutes'
import reviewRouter from './reviewsRoutes'
import profileRouter from './profileRoutes'
import studentLevelsRouter from './studentLevelsRoutes'

const router = express.Router()

router.use('/users', usersRouter)
router.use('/students', studentsRouter)
router.use('/tutors', tutorsRouter)
router.use('/lessons', lessonsRouter)
router.use('/reviews', reviewRouter)
router.use('/profile', profileRouter)
router.use('/student_level', studentLevelsRouter)

export default router