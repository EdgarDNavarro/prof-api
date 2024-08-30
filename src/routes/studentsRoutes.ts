import express from 'express'
import { verifyToken } from '../jwt/jwt'
import { createStudent, getStudentById, getStudentByUserId, getStudents, putStudent } from '../controller/studentsController'
import { editStudentMiddleware, StudentMiddleware, UserIdParamMiddleware } from '../middlewares/studentMiddleware'
import { idMiddleware } from '../middlewares/userMiddleware'
const router = express.Router()

router.post('/', StudentMiddleware, createStudent)
router.get('/', getStudents)
router.get('/:id', idMiddleware, getStudentById)
router.get('/user_id/:user_id', UserIdParamMiddleware, getStudentByUserId)
router.put('/', editStudentMiddleware, putStudent)

export default router