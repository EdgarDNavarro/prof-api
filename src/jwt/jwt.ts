import jwt, { SignOptions } from "jsonwebtoken";
import 'dotenv/config'
import { NextFunction, Request, Response } from "express";
import { respError } from "../utils";
import { User } from "../types";
import { findById } from "../services/usersServices";

declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}

const secret = process.env.JWT_SECRET as string

const sign = (payload: { id: string, email: string }, expiresIn = '3d') => {
    const jwtConfig: SignOptions = {
        algorithm: 'HS256',
        expiresIn
    }
    return jwt.sign(payload, secret, jwtConfig)
}

const verifyJWT = (token: string) => {
    return jwt.verify(token, secret);
};

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json(respError({msg: 'Unauthorized'}))
    }

    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, secret);

        if (!decoded) {
            return res.status(401).json(respError({msg: 'Unauthorized'}))
        }
    
        if(typeof decoded === 'object' && decoded.id) {
            const user = await findById(decoded.id)
            if(user) {
                req.user = user
            } else {
                return res.status(401).json(respError({msg: 'Unauthorized'}))
            }
        }
        
    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json(respError({msg: 'Token expired'})) 
        }
        return res.status(401).json(respError({msg: 'Unauthorized'})); 
    }
    
    next();
}

const createConfirmedToken = () => {
    const expiresIn = '10m'
    const jwtConfig: SignOptions = {
        algorithm: 'HS256',
        expiresIn
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    return {
        otp,
        otpToken: jwt.sign({otp}, secret, jwtConfig)
    }
}

export { sign, verifyToken, verifyJWT, createConfirmedToken }