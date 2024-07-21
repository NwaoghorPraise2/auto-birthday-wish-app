import db from '../../config/db';
import {UserData} from './interfaces/Auth';


export const getUserById = (id: string) => {
    return db.user.findUnique({where: {id}})
}

export const getUserByEmail = (email: string) => {
    return db.user.findUnique({where: {email}})
}

export const createUser = (User: UserData) => {
    return db.user.create({data: User})
};