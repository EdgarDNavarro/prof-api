import { NextFunction, Request, Response } from "express";
import { body, param } from 'express-validator';

export const ReviewMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    await body("comment").isString().not().isEmpty({ignore_whitespace: true}).withMessage("comment is required").isLength({min: 30, max: 100}).withMessage("Minimum 30 characters maximum 1000").run(req)
    await body("rating").not().isEmpty().withMessage("rating is required").isInt({min: 1, max: 5}).withMessage("Only values ​​between 1 and 5").run(req)
    await body("student_id").not().isEmpty({ignore_whitespace: true}).withMessage("student_id is required").isUUID().withMessage("That doesn't look like a valid id").run(req)
    await body("tutor_id").not().isEmpty({ignore_whitespace: true}).withMessage("tutor_id is required").isUUID().withMessage("That doesn't look like a valid id").run(req)

    next()
}

export const EditReviewMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    await body("comment").isString().not().isEmpty({ignore_whitespace: true}).withMessage("comment is required").isLength({min: 30, max: 1000}).withMessage("Minimum 30 characters maximum 1000").run(req)
    await body("rating").not().isEmpty().withMessage("rating is required").isInt({min: 1, max: 5}).withMessage("Only values ​​between 1 and 5").run(req)
    await body("id").not().isEmpty({ignore_whitespace: true}).withMessage("id is required").isUUID().withMessage("That doesn't look like a valid id").run(req)

    next()
}