import express from 'express'
import { verifyToken } from '../jwt/jwt'
import { idMiddleware } from '../middlewares/userMiddleware'
import { EditReviewMiddleware, ReviewMiddleware } from '../middlewares/reviewMiddleware'
import { createReview, deleteReview, getReviewById, getReviewsByTutorId, putReview } from '../controller/reviewsController'
import { validation } from '../middlewares/validation'
const router = express.Router()

router.post('/', ReviewMiddleware, validation, createReview)
router.get('/:id', idMiddleware, validation, getReviewById)
router.get('/tutor_id/:id', idMiddleware, validation, getReviewsByTutorId)
router.put('/', EditReviewMiddleware, validation, putReview)
router.delete('/:id', idMiddleware, validation, deleteReview)

export default router