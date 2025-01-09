import express from 'express'
import { confirmAccount, getUserById, getUsers, login, putCurrency, putEmail, putLang, putPass, registry, requestConfirmationCode } from '../controller/usersController'
import { ConfirmMiddleware, editCurrrencyMiddleware, editEmailMiddleware, editLangMiddleware, editPasswordMiddleware, idMiddleware, loginMiddleware, RequestConfirmMiddleware, UserMiddleware } from '../middlewares/userMiddleware'
import { verifyToken } from '../jwt/jwt'
import { validation } from '../middlewares/validation'
const router = express.Router()

router.get('/', verifyToken, getUsers)
router.get('/:id', idMiddleware, validation, getUserById)
router.post('/', UserMiddleware, validation, registry)
router.post('/confirm-account', ConfirmMiddleware, validation, confirmAccount)
router.post('/request-code', RequestConfirmMiddleware, validation, requestConfirmationCode)
router.put('/currency', verifyToken, editCurrrencyMiddleware, validation, putCurrency)
router.put('/language', verifyToken, editLangMiddleware, validation, putLang)
router.put('/email', editEmailMiddleware, validation, putEmail)
router.put('/password', editPasswordMiddleware, validation, putPass)
router.post('/login', loginMiddleware, validation, login)

export default router