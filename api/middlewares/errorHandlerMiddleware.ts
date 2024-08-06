import { NextFunction, Request, Response } from 'express';
import { NODE_ENV } from '../config/config';

// Define an interface for the error object to include optional properties
interface ApiError extends Error {
    statusCode?: number;          // HTTP status code for the error
    status?: string;              // Error status (e.g., 'error' or 'fail')
    isOperational?: boolean;     // Indicates if the error is operational or programming
}

// Handle errors specifically for the production environment
const handleProductionError = (err: ApiError, res: Response): void => {
    const { isOperational, statusCode, status, message } = err;

    // Respond with a structured error message if the error is operational
    if (isOperational) {
        res.status(statusCode as number).json({
            status,
            message,
        });
    } else {
        // Generic error response for non-operational errors
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong',
        });
    }
};

// Centralized error handling middleware for Express
export default (err: ApiError, req: Request, res: Response, next: NextFunction): void => {
    const statusCode = err.statusCode || 500; // Default to 500 if no status code provided
    const status = err.status || 'error';     // Default to 'error' if no status provided

    // Determine the environment and handle errors accordingly
    if (NODE_ENV === 'production') {
        handleProductionError(err, res);
    } else {
        // Log detailed error information for development
        console.error(`Error: ${err.message}`, err); 

        // Respond with detailed error information for debugging
        res.status(statusCode).json({
            status,
            message: err.message,
            stack: err.stack,        // Include stack trace for debugging in development
            error: err,              // Include the full error object for detailed inspection
        });
    }
};
