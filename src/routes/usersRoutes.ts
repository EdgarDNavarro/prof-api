import express from 'express'
import { getUserById, getUsers, login, putEmail, putLangCurrency, putPass, registry } from '../controller/usersController'
import { editEmailMiddleware, editLangAndCurrrencyMiddleware, editPasswordMiddleware, idMiddleware, loginMiddleware, UserMiddleware } from '../middlewares/userMiddleware'
import { verifyToken } from '../jwt/jwt'
import { validation } from '../middlewares/validation'
const router = express.Router()

router.get('/', getUsers)
router.get('/:id', idMiddleware, validation, getUserById)
router.post('/', UserMiddleware, validation, registry)
router.put('/lang-currency', editLangAndCurrrencyMiddleware, validation, putLangCurrency)
router.put('/email', editEmailMiddleware, validation, putEmail)
router.put('/password', editPasswordMiddleware, validation, putPass)
router.post('/login', loginMiddleware, validation, login)

export default router