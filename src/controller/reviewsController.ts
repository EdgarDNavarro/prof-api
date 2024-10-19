import { NextFunction, Request, Response } from "express"
import { Review, NewReview } from "../types"
import { respError, respOk } from "../utils"
import * as reviewsServices from '../services/reviewsServices'

export const createReview = async (req: Request, res: Response, next: NextFunction) => {
    const { comment, rating, tutor_id, student_id } = req.body as NewReview

    try {
        const newReview: NewReview = { comment, rating, student_id, tutor_id }
    
        const addedReview = await reviewsServices.addReview(newReview)
    
        res.json(respOk(addedReview))
    } catch (error: any) {
        next(error)
    }
}

export const getReviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const review = await reviewsServices.findReviews()
        res.json(respOk(review))
    } catch (error) {
        next(error)
    }
}

export const getReviewById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as Review['id']
        const review = await reviewsServices.findReviewById(id)
        if(!review) {
            return res.status(404).json(respError({msg: 'Review not found'}))
        }
        res.json(respOk(review))
    } catch (error) {
        next(error)
    }
}

export const getReviewsByTutorId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tutor_id = req.params.id as Review['tutor_id']
        const review = await reviewsServices.findReviewsByTutorId(tutor_id)

        res.json(respOk(review))
    } catch (error) {
        next(error)
    }
}

export const putReview = async (req: Request, res: Response, next: NextFunction) => {
    const { id, rating, comment } = req.body as Pick<Review, 'id' | 'rating' | 'comment'>

    try {
    
        const review = await reviewsServices.findReviewById(id)
        if(!review) {
            return res.status(404).json(respError({msg: 'review not found'}))
        }

        review.set({rating, comment})
        await review.save()
    
        res.json(respOk(review))
    } catch (error: any) {
        next(error)
    }
}

export const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as Review['id']
        const review = await reviewsServices.findReviewById(id)
        if(!review) {
            return res.status(404).json(respError({msg: 'Review not found'}))
        }
        await review.destroy()
        res.json(respOk({msg: 'Revivew deleted'}))
    } catch (error) {
        next(error)
    }
}