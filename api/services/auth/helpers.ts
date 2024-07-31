import db from '../../config/db';
import { generateRefreshToken, generateToken } from '../../middlewares/authMiddleware';
import {UserData, TokenResponse} from './validators';


export const getUserById = (id: string) => {
    return db.user.findUnique({where: {id}})
}

export const getUserByEmail = (email: string) => {
    return db.user.findUnique({where: {email}})
}

export const createUser = (User: UserData) => {
    return db.user.create({data: User})
};


//Refactor This
export const getUserWithPasswordByEmail = (email: string) => {
    return db.user.findUnique({
        where: {email},
        select: {
            id: true,
            password: true,
            email: true,
            username: true,
        }
    })
}


export const generateAccessTokenAndRefreshToken = async (id: string): Promise<TokenResponse> => {
    const user = await getUserById(id);
    if (!user) {
        throw new Error('User not found');
    }

    // Generate the access and refresh tokens
    const accessToken = generateToken(id);
    const refreshToken = generateRefreshToken(id);

    // Update the user's refresh token in the database
    await db.user.update({
        where: { id },
        data: { refreshToken },
    });

    // Return the tokens and the updated user information
    return { accessToken, refreshToken};
};

