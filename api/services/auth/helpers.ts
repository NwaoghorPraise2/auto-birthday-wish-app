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

    const accessToken = generateToken(id);
    const refreshToken = generateRefreshToken(id);

    await db.user.update({
        where: { id },
        data: { refreshToken },
    });

    return { accessToken, refreshToken};
};

