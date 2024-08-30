import { NextFunction, Request, Response } from "express";
import { body, param } from 'express-validator';

export const StudentMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    await body("first_name").isString().not().isEmpty({ignore_whitespace: true}).withMessage("first_name is required").run(req)
    await body("last_name").isString().not().isEmpty({ignore_whitespace: true}).withMessage("last_name is required").run(req)
    await body("timezone").isString().not().isEmpty({ignore_whitespace: true}).withMessage("timezone is required").run(req)
    await body("user_id").not().isEmpty({ignore_whitespace: true}).withMessage("id is required").isUUID().withMessage("That doesn't look like a valid id").run(req)

    next()
}

export const editStudentMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    await body("id").not().isEmpty({ignore_whitespace: true}).withMessage("idid is required").isUUID().withMessage("That doesn't look like a valid id").run(req)
    await body("first_name").isString().not().isEmpty({ignore_whitespace: true}).withMessage("first_name is required").run(req)
    await body("last_name").isString().not().isEmpty({ignore_whitespace: true}).withMessage("last_name is required").run(req)
    await body("timezone").isString().not().isEmpty({ignore_whitespace: true}).withMessage("timezone is required").run(req)

    next()
}

export const UserIdParamMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    await param("user_id").not().isEmpty({ignore_whitespace: true}).withMessage("user_id is required").isUUID().withMessage("That doesn't look like a valid id").run(req)

    next()
}