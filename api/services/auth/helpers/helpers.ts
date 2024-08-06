import db from '../../../config/db';
import { generateRefreshToken, generateToken } from '../../../middlewares/authMiddleware';
import ApiError from '../../../utils/ApiErrorHandler';
import { TokenResponse } from '../types/auth.types';
import { UserData } from '../types/validators';

/**
 * @desc Retrieve a user by their unique ID
 * @param id - User ID
 * @returns User data or null if not found
 */
export const getUserById = (id: string) => {
    return db.user.findUnique({ where: { id } });
};

/**
 * @desc Retrieve a user by their email address
 * @param email - User email
 * @returns User data or null if not found
 */
export const getUserByEmail = (email: string) => {
    return db.user.findUnique({ where: { email } });
};

/**
 * @desc Create a new user
 * @param userData - User data
 * @returns Created user data
 */
export const createUser = (userData: UserData) => {
    return db.user.create({ data: userData });
};

/**
 * @desc Retrieve a user by their email address with password included
 * @param email - User email
 * @returns User data with password, or null if not found
 */
export const getUserWithPasswordByEmail = (email: string) => {
    return db.user.findUnique({
        where: { email },
        select: {
            id: true,
            password: true,
            email: true,
            username: true,
        },
    });
};

/**
 * @desc Generate access and refresh tokens for a user and update the user's refresh token in the database
 * @param id - User ID
 * @returns Object containing access and refresh tokens
 */
export const generateAccessTokenAndRefreshToken = async (id: string): Promise<TokenResponse> => {
    // Retrieve user to ensure existence
    const user = await getUserById(id);
    if (!user) {
        throw new ApiError(401, 'User not found');
    }

    // Generate tokens
    const accessToken = generateToken(id);
    const refreshToken = generateRefreshToken(id);

    // Update user with the new refresh token
    await db.user.update({
        where: { id },
        data: { refreshToken },
    });

    return { accessToken, refreshToken };
};
