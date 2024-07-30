import jwt from 'jsonwebtoken';
import { JWT_SECRET, REFRESH_TOKEN_SECRET } from '../config/config';
import { NextFunction } from 'express';
import { IAuthRequest } from '../services/auth/validators';
import {IAuthResponse, decodedToken} from '../interfaces/Response';


export const grantAccess = (req: IAuthRequest, res: IAuthResponse, next: NextFunction) => {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
        return res.status(401).json({
            status: 'Error',
            message: 'Access token not found!'
        })
    }
    
    try {
        const decoded = jwt.verify(accessToken, JWT_SECRET as string) as decodedToken;
        req.user = {id: decoded.id};
        next();
    } catch (error) {
       return res.status(401).json({
            status: 'Error',
            message: 'Invalid token or expired'
        })
    }
}

export const generateToken = (id: string) => {
    return jwt.sign({id: id}, JWT_SECRET as string, {expiresIn: '1d', subject: 'accessApi'})
}

export const generateRefreshToken = (id: string) => {
    return jwt.sign({id: id}, REFRESH_TOKEN_SECRET as string, {expiresIn: '7d', subject: 'refreshApi'})
}

