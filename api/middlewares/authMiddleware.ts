import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config';
import { NextFunction } from 'express';
import { IAuthRequest } from '../services/auth/validators';
import {IAuthResponse, decodedToken} from '../interfaces/Response';


const JWT = JWT_SECRET as string;

export const grantAccess = (req: IAuthRequest, res: IAuthResponse, next: NextFunction) => {

    const accesstoken = req.headers.authorization;

    if (!accesstoken) {
        return res.status(401).json({
            status: 'Error',
            message: 'Access token not found!'
        })
    }

    try {
        const decoded = jwt.verify(accesstoken, JWT) as decodedToken;
        req.user = {id: decoded.id};
        next();
    } catch (error) {
        res.status(401).json({
            status: 'Error',
            message: 'Invalid token or expired'
        })
    }
}

export const generateToken = (id: string) => {
    return jwt.sign({id: id}, JWT_SECRET as string, {expiresIn: '1d', subject: 'accessApi'})
}

