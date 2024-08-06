
import { Request, Response, NextFunction } from "express";
import { FnType } from "../services/auth/types/auth.types";

/**
 * @desc Higher-order function to handle asynchronous route handlers
 * @param fn - Asynchronous route handler function
 * @returns Express middleware function that handles errors
 */
export default (fn: FnType) => (req: Request, res: Response, next: NextFunction) => {
    // Execute the async function and catch any errors, passing them to the next middleware
    Promise.resolve(fn(req, res, next)).catch(next);
};
