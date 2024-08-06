import { UserData } from "./validators";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

/**
 * @desc Extended request interface for authentication
 */
export interface AuthRequest extends Request {
    body: UserData;                 // The body of the request, expected to follow UserData schema
    user?: { id: string };          // Optional user object containing the user ID
    headers: { authorization?: string };  // Optional authorization header
}

/**
 * @desc Extended response interface for authentication
 */
export interface AuthResponse extends Response {
    body?: {                        // Optional body of the response
        status: string;             // Status of the response
        statusCode: number;         // HTTP status code
        message: string;            // Response message
        accessToken?: string;       // Optional access token
        refreshToken?: string;      // Optional refresh token
        data?: {};                 // Optional data field, can be any type
    };
    user?: string;                  // Optional user field for additional response information
}

/**
 * @desc Response object containing tokens
 */
export interface TokenResponse {
    accessToken: string;            // Access token for user authentication
    refreshToken: string;           // Refresh token for re-authentication
}

/**
 * @desc Decoded JWT token payload interface
 */
export interface DecodedToken extends JwtPayload {
    id: string;                     // User ID from the decoded token
}

/**
 * @desc Function type for middleware or controller functions
 */
export interface FnType {
    (req: AuthRequest, res: AuthResponse, next: NextFunction): Promise<AuthResponse | void>;
}
