import express from 'express'
import { verifyToken } from '../jwt/jwt'
import { createTutorStudentLevel, deleteTutorStudentLevel, getStudentLevels, getTutorStudentLevels } from '../controller/studentLevelsController'
const router = express.Router()

router.post('/tutor', createTutorStudentLevel)
router.delete('/:student_level_id/tutor/:tutor_id', deleteTutorStudentLevel)
router.get('/tutor/:tutor_id', getTutorStudentLevels)
router.get('/', getStudentLevels)

export default router