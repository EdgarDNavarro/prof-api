import express from 'express'
import { verifyToken } from '../jwt/jwt'
import { createTutorStudentLevel, deleteTutorStudentLevel, getStudentLevels, getTutorStudentLevels } from '../controller/studentLevelsController'
import { ParamsStudentLevelMiddleware, StudentLevelMiddleware } from '../middlewares/studentLevelMiddleware'
import { idMiddleware } from '../middlewares/userMiddleware'
import { validation } from '../middlewares/validation'
const router = express.Router()

router.post('/tutor', StudentLevelMiddleware, validation, createTutorStudentLevel)
router.delete('/:student_level_id/tutor/:tutor_id', ParamsStudentLevelMiddleware, validation, deleteTutorStudentLevel)
router.get('/tutor/:id', idMiddleware, validation, getTutorStudentLevels)
router.get('/', getStudentLevels)

export default router