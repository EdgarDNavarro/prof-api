import { NextFunction, Request, Response } from "express";
import { body, CustomValidator, param } from 'express-validator';
import { parseCurrency, parseLanguage } from "../utils";
import * as usersServices from '../services/usersServices'

const isValidUser: CustomValidator = value => {
    return usersServices.findUserByEmail(value).then(user => {
        if (user) {
            return Promise.reject('E-mail already in use');
        }
    });
};

export const idMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    await param("id").not().isEmpty({ ignore_whitespace: true }).withMessage("id is required").isUUID().withMessage("That doesn't look like a valid id").run(req)

    next()
}

export const UserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    await body("email").toLowerCase().isEmail().withMessage("that doesn't look like an email").custom(isValidUser).withMessage("This email is already in use").run(req)
    await body("password").not().isEmpty({ ignore_whitespace: true }).withMessage("password is required").isStrongPassword({ minLength: 8, minUppercase: 1, minLowercase: 1, minSymbols: 1 }).withMessage("The password must have at least 8 characters, 1 uppercase, 1 lowercase and 1 symbol").run(req)
    await body("password_confirmation").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Los Password no son iguales')
        }
        return true
    }).run(req)
    await body("language").isString().not().isEmpty({ ignore_whitespace: true }).withMessage("language is required").custom(async language => {
        parseLanguage(language)
    }).run(req)
    await body("currency").isString().not().isEmpty({ ignore_whitespace: true }).withMessage("Currency is required").custom(async language => {
        parseCurrency(language)
    }).run(req)

    next()
}

export const ConfirmMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    await body("email").toLowerCase().isEmail().withMessage("that doesn't look like an email").run(req)
    await body("token").notEmpty().withMessage("token is required").run(req)

    next()
}

export const RequestConfirmMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    await body("email").toLowerCase().isEmail().withMessage("that doesn't look like an email").withMessage("This email is already in use").run(req)

    next()
}

export const editCurrrencyMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    await body("currency").isString().not().isEmpty({ ignore_whitespace: true }).withMessage("Currency is required").custom(async language => {
        parseCurrency(language)
    }).run(req)

    next()
}

export const editLangMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    await body("language").isString().not().isEmpty({ ignore_whitespace: true }).withMessage("language is required").custom(async language => {
        parseLanguage(language)
    }).run(req)

    next()
}

export const editEmailMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    await body("id").not().isEmpty({ ignore_whitespace: true }).withMessage("id is required").isUUID().withMessage("That doesn't look like a valid id").run(req)
    await body("email").toLowerCase().isEmail().withMessage("that doesn't look like an email").custom(isValidUser).withMessage("This email is already in use").run(req)

    next()
}

export const editPasswordMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    await body("id").not().isEmpty({ ignore_whitespace: true }).withMessage("id is required").isUUID().withMessage("That doesn't look like a valid id").run(req)
    await body("password").not().isEmpty({ ignore_whitespace: true }).withMessage("password is required").isStrongPassword({ minLength: 8, minUppercase: 1, minLowercase: 1, minSymbols: 1 }).withMessage("The password must have at least 8 characters, 1 uppercase, 1 lowercase and 1 symbol").run(req)
    await body("new_password").not().isEmpty({ ignore_whitespace: true }).withMessage("new_password is required").isStrongPassword({ minLength: 8, minUppercase: 1, minLowercase: 1, minSymbols: 1 }).withMessage("The password must have at least 8 characters, 1 uppercase, 1 lowercase and 1 symbol").run(req)

    next()
}

export const loginMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    await body("email").toLowerCase().isEmail().withMessage("that doesn't look like an email").run(req)
    await body("password").not().isEmpty({ ignore_whitespace: true }).withMessage("password is required").run(req)
    next()
}