import { NextFunction, Request, Response } from "express";
import { body, param } from 'express-validator';
import { parseLessonMinutes, parseLessonStatus } from "../utils";

export const LessonMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    await body("duration_minutos").isInt().withMessage("duration_minutos has to be integer").not().isEmpty({ignore_whitespace: true}).withMessage("duration_minutos is required").custom(async minutes => {
        parseLessonMinutes(minutes)
    }).run(req)
    await body("scheduled_at").not().isEmpty().withMessage("scheduled_at is required").isISO8601().withMessage("That doesn't look like a ISO Date").run(req)
    await body("student_id").not().isEmpty({ignore_whitespace: true}).withMessage("student_id is required").isUUID().withMessage("That doesn't look like a valid id").run(req)
    await body("tutor_id").not().isEmpty({ignore_whitespace: true}).withMessage("tutor_id is required").isUUID().withMessage("That doesn't look like a valid id").run(req)

    next()
}

export const EditLessonMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    await body("duration_minutos").isInt().withMessage("duration_minutos has to be integer").not().isEmpty({ignore_whitespace: true}).withMessage("duration_minutos is required").custom(async minutes => {
        parseLessonMinutes(minutes)
    }).run(req)
    await body("student_id").not().isEmpty({ignore_whitespace: true}).withMessage("student_id is required").isUUID().withMessage("That doesn't look like a valid id").run(req)
    await body("tutor_id").not().isEmpty({ignore_whitespace: true}).withMessage("tutor_id is required").isUUID().withMessage("That doesn't look like a valid id").run(req)
    await body("id").not().isEmpty({ignore_whitespace: true}).withMessage("id is required").isUUID().withMessage("That doesn't look like a valid id").run(req)

    next()
}

export const ScheduleMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    await body("id").not().isEmpty({ignore_whitespace: true}).withMessage("id is required").isUUID().withMessage("That doesn't look like a valid id").run(req)
    await body("scheduled_at").not().isEmpty().withMessage("scheduled_at is required").isISO8601().withMessage("That doesn't look like a ISO Date").run(req)

    next()
}

export const LessonStatusMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    await body("id").not().isEmpty({ignore_whitespace: true}).withMessage("id is required").isUUID().withMessage("That doesn't look like a valid id").run(req)
    await body("status").isString().not().isEmpty().withMessage("status is required").custom(async status => {
        parseLessonStatus(status)
    }).run(req)

    next()
}

export const CustomPriceMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    await body("price").not().isEmpty({ignore_whitespace: true}).withMessage("price is required").isDecimal().withMessage("price has to be DECIMAL(4,2)").run(req)
    await body("student_id").not().isEmpty({ignore_whitespace: true}).withMessage("student_id is required").isUUID().withMessage("That doesn't look like a valid id").run(req)
    await body("tutor_id").not().isEmpty({ignore_whitespace: true}).withMessage("tutor_id is required").isUUID().withMessage("That doesn't look like a valid id").run(req)

    next()
}

export const GetCustomPriceMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    await param("student_id").not().isEmpty({ignore_whitespace: true}).withMessage("student_id is required").isUUID().withMessage("That doesn't look like a valid id").run(req)
    await param("tutor_id").not().isEmpty({ignore_whitespace: true}).withMessage("tutor_id is required").isUUID().withMessage("That doesn't look like a valid id").run(req)

    next()
}