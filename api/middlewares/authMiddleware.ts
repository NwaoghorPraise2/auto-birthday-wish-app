import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN, JWT_SECRET, REFRESH_TOKEN_EXPIRES_IN, REFRESH_TOKEN_SECRET } from '../config/config';
import { NextFunction } from 'express';
import { AuthRequest, AuthResponse, DecodedToken} from '../services/auth/types/auth.types';
import ApiError from '../utils/ApiErrorHandler';

/**
 * @desc Middleware to grant access by verifying JWT token
 * @param req - Express request object, extended to include user information
 * @param res - Express response object
 * @param next - Express next middleware function
 * @access Protected
 */
export const grantAccess = (req: AuthRequest, res: AuthResponse, next: NextFunction) => {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
        return next(new ApiError(401, 'Unauthorized'));
    }
    
    try {
        const decoded = jwt.verify(accessToken, JWT_SECRET as string) as DecodedToken;
        req.user = { id: decoded.id };
        next();
    } catch (error) {
        return next(new ApiError(401, 'Expired or Invalid Token'));
    }
};

/**
 * @desc Generate JWT access token
 * @param id - User ID
 * @returns Signed JWT token
 */
export const generateToken = (id: string): string => {
    return jwt.sign({ id }, JWT_SECRET as string, { expiresIn: JWT_EXPIRES_IN, subject: 'accessApi' });
};

/**
 * @desc Generate JWT refresh token
 * @param id - User ID
 * @returns Signed JWT refresh token
 */
export const generateRefreshToken = (id: string): string => {
    return jwt.sign({ id }, REFRESH_TOKEN_SECRET as string, { expiresIn: REFRESH_TOKEN_EXPIRES_IN, subject: 'refreshApi' });
};
