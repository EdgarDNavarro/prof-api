import { NextFunction, Request, Response } from "express";
import { body, param } from 'express-validator';
import { parseDescriptionType } from "../utils";

export const DescriptionMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    await body("type").isString().not().isEmpty({ignore_whitespace: true}).withMessage("type is required").custom(async type => {
        parseDescriptionType(type)
    }).run(req)
    await body("content").isString().not().isEmpty({ignore_whitespace: true}).withMessage("content is required").isLength({min: 30, max: 700}).withMessage("Minimum 30 characters maximum 700").run(req)
    await body("tutor_id").not().isEmpty({ignore_whitespace: true}).withMessage("tutor_id is required").isUUID().withMessage("That doesn't look like a valid id").run(req)

    next()
}
