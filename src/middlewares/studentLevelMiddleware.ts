import { NextFunction, Request, Response } from "express";
import { body, param } from 'express-validator';

export const StudentLevelMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    await body("student_level_id").not().isEmpty({ignore_whitespace: true}).withMessage("student_level_id is required").isInt({min: 1, max: 6}).withMessage("Only accepts values from 1 to 6").run(req)
    await body("tutor_id").not().isEmpty({ignore_whitespace: true}).withMessage("tutor_id is required").isUUID().withMessage("That doesn't look like a valid id").run(req)

    next()
}

export const ParamsStudentLevelMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    await param("student_level_id").not().isEmpty({ignore_whitespace: true}).withMessage("student_level_id is required").isInt({min: 1, max: 6}).withMessage("Only accepts values from 1 to 6").run(req)
    await param("tutor_id").not().isEmpty({ignore_whitespace: true}).withMessage("tutor_id is required").isUUID().withMessage("That doesn't look like a valid id").run(req)

    next()
}