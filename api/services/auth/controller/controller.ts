import { NextFunction, Request, Response } from 'express';
import { createUser, generateAccessTokenAndRefreshToken, getUserByEmail, getUserById, getUserWithPasswordByEmail } from '../helpers/helpers';
import { authenticate, comparePassword } from '../../../utils/authentication';
import asyncHandler from '../../../utils/asyncHandler';
import { AuthRequest, AuthResponse, TokenResponse } from '../types/auth.types';
import ApiError from '../../../utils/ApiErrorHandler';

/**
 * @desc Register a new user
 * @route POST /api/auth/signup
 * @access Public
 */
export const register = asyncHandler(async (req: AuthRequest, res: AuthResponse, next: NextFunction) => {
    // TODO: Add email verification before saving the user
    // TODO: Remove password from the returned user details

    const { email } = req.body;
    const checkExistingUser = await getUserByEmail(email);

    if (checkExistingUser) {
        return next(new ApiError(400, 'User Already Exists'));
    }

    const user = await createUser({
        ...req.body, password: authenticate(req.body.password)
    });

    if (!user) {
        return next(new ApiError(400, 'Error Occurred During Registration'));
    }

    return res.status(201).json({
        status: 'Success',
        statusCode: 201,
        message: 'Registration Successful',
        data: user
    });
});

/**
 * @desc Login a user
 * @route POST /api/auth/login
 * @access Public
 */
export const login = asyncHandler(async (req: AuthRequest, res: AuthResponse, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await getUserWithPasswordByEmail(email);

    if (!user) {
        return next(new ApiError(400, 'User not found'));
    }

    const isValid = comparePassword(password, user.password);
    if (!isValid) {
        return next(new ApiError(400, 'Invalid username or password'));
    }

    const { accessToken, refreshToken }: TokenResponse = await generateAccessTokenAndRefreshToken(user.id);

    return res.status(200).json({
        status: 'Success',
        statusCode: 200,
        message: 'Login successful',
        accessToken,
        refreshToken,
        data: user
    });
});

/**
 * @desc Get logged-in user information
 * @route GET /api/auth/user
 * @access Private
 */
export const getUser = asyncHandler(async (req: AuthRequest, res: AuthResponse, next: NextFunction) => {
    if (!req.user || !req.user.id) {
        return next(new ApiError(400, 'User not authenticated'));
    }

    const user = await getUserById(req.user.id);

    if (!user) {
        return next(new ApiError(400, 'User not found'));
    }

    return res.status(200).json({
        status: 'Success',
        statusCode: 200,
        message: 'User found',
        data: user
    });
});

/**
 * @desc Change user password
 * @route POST /api/auth/change-password
 * @access Private
 */
const changePassword = (req: Request, res: Response): void => {
    // TODO: Implement change password functionality
};
