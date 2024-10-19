import express from 'express'
import { verifyToken } from '../jwt/jwt'
import { createStudent, getStudentById, getStudentByUserId, getStudents, putStudent } from '../controller/studentsController'
import { editStudentMiddleware, StudentMiddleware, UserIdParamMiddleware } from '../middlewares/studentMiddleware'
import { idMiddleware } from '../middlewares/userMiddleware'
import { validation } from '../middlewares/validation'
const router = express.Router()

router.post('/', StudentMiddleware, validation, createStudent)
router.get('/', getStudents)
router.get('/:id', idMiddleware, validation, getStudentById)
router.get('/user_id/:user_id', UserIdParamMiddleware, validation, getStudentByUserId)
router.put('/', editStudentMiddleware, validation, putStudent)

export default router