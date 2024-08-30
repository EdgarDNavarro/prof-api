import express from 'express'
import { verifyToken } from '../jwt/jwt'
import { idMiddleware } from '../middlewares/userMiddleware'
import { EditReviewMiddleware, ReviewMiddleware } from '../middlewares/reviewMiddleware'
import { createReview, deleteReview, getReviewById, getReviewsByTutorId, putReview } from '../controller/reviewsController'
const router = express.Router()

router.post('/', ReviewMiddleware, createReview)
router.get('/:id', idMiddleware, getReviewById)
router.get('/tutor_id/:id', idMiddleware, getReviewsByTutorId)
router.put('/', EditReviewMiddleware, putReview)
router.delete('/:id', idMiddleware, deleteReview)

export default router