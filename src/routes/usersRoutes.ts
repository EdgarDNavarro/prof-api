import express from 'express'
import { getUserById, getUsers, login, putEmail, putLangCurrency, putPass, registry } from '../controller/usersController'
import { editEmailMiddleware, editLangAndCurrrencyMiddleware, editPasswordMiddleware, idMiddleware, loginMiddleware, UserMiddleware } from '../middlewares/userMiddleware'
import { verifyToken } from '../jwt/jwt'
const router = express.Router()

router.get('/', getUsers)
router.get('/:id', idMiddleware, getUserById)
router.post('/', UserMiddleware, registry)
router.put('/lang-currency', editLangAndCurrrencyMiddleware, putLangCurrency)
router.put('/email', editEmailMiddleware, putEmail)
router.put('/password', editPasswordMiddleware, putPass)
router.post('/login', loginMiddleware, login)

export default router