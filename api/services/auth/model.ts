import db from '../../config/db';
import { User } from '@prisma/client';


export const getUserById = (id: string) => {
    return db.user.findUnique({where: {id}})
}

export const getUserByEmail = (email: string) => {
    return db.user.findUnique({where: {email}})
}

export const createUser = (User: User) => {
    return db.user.create({data: User})
};