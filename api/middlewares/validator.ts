import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import RequestValidators from './RequestValidator';
import ApiError from '../utils/ApiErrorHandler';

/**
 * @desc Middleware to validate request data using Zod schemas
 * @param validators - An object containing Zod schema validators for body, query, and params
 * @returns Express middleware function
 */
export const validateRequest = (validators: RequestValidators) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (validators.body) {
                req.body = await validators.body.parseAsync(req.body);
            }
            if (validators.query) {
                req.query = await validators.query.parseAsync(req.query);
            }
            if (validators.params) {
                req.params = await validators.params.parseAsync(req.params);
            }
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                return next(new ApiError(422, error.message));
            }
            next(error);
        }
    };
};

