import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import RequestValidators from '../interfaces/RequestValidator'

export const validateRequest = (validators: RequestValidators)=> {
    return async (req: Request, res: Response, next: NextFunction)=>{
        try {
            if (validators.body) {
                req.body = await validators.body.parseAsync(req.body)
            }
            if (validators.query) {
                req.query = await validators.query.parseAsync(req.query)
            }
            if (validators.params) {
                req.params = await validators.params.parseAsync(req.params)
            }
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(422).json(error.errors.map((e) => e.message));
            }
           next(error);
        }
    }

}