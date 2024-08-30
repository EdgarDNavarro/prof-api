import { NextFunction, Request, Response } from "express";
import { body, param } from 'express-validator';

export const TutorMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    await body("user_id").not().isEmpty({ignore_whitespace: true}).withMessage("user_id is required").isUUID().withMessage("That doesn't look like a valid id").run(req)
    await body("first_name").isString().not().isEmpty({ignore_whitespace: true}).withMessage("first_name is required").run(req)
    await body("class_price").not().isEmpty({ignore_whitespace: true}).withMessage("price is required").isDecimal().withMessage("class_price has to be DECIMAL(4,2)").run(req)
    await body("last_name").isString().not().isEmpty({ignore_whitespace: true}).withMessage("last_name is required").run(req)
    await body("timezone").isString().not().isEmpty({ignore_whitespace: true}).withMessage("timezone is required").run(req)
    await body("country_of_birth").isString().not().isEmpty({ignore_whitespace: true}).withMessage("country_of_birth is required").run(req)
    await body("years_of_experience").isInt().withMessage("years_of_experience has to be integer").not().isEmpty({ignore_whitespace: true}).withMessage("years_of_experience is required").run(req)

    next()
}
export const EditTutorMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    await body("id").not().isEmpty({ignore_whitespace: true}).withMessage("id is required").isUUID().withMessage("That doesn't look like a valid id").run(req)
    await body("first_name").isString().not().isEmpty({ignore_whitespace: true}).withMessage("first_name is required").run(req)
    await body("class_price").not().isEmpty({ignore_whitespace: true}).withMessage("price is required").isDecimal().withMessage("class_price has to be DECIMAL(4,2)").run(req)
    await body("last_name").isString().not().isEmpty({ignore_whitespace: true}).withMessage("last_name is required").run(req)
    await body("timezone").isString().not().isEmpty({ignore_whitespace: true}).withMessage("timezone is required").run(req)
    await body("country_of_birth").isString().not().isEmpty({ignore_whitespace: true}).withMessage("country_of_birth is required").run(req)
    await body("years_of_experience").isInt().withMessage("years_of_experience has to be integer").not().isEmpty({ignore_whitespace: true}).withMessage("years_of_experience is required").run(req)

    next()
}

export const ProfileVisibilityTutorMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    await body("id").not().isEmpty({ignore_whitespace: true}).withMessage("id is required").isUUID().withMessage("That doesn't look like a valid id").run(req)
    await body("profile_hidden").isBoolean().withMessage("profile_hidden must be of type boolean").not().isEmpty({ignore_whitespace: true}).withMessage("profile_hidden is required").run(req)

    next()
}