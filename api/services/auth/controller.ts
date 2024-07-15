import { Request, Response } from 'express'
import db from '../../config/db';
import { User } from '@prisma/client';


const register = (res:Response, req: Request<User>): void=> {
   //validate the input
   //if error, throw error to user
   //else, persist data to database
   //sign token
   // respond to user with a message
}


const login = (res:Response, req: Request): void => {
    
}


const changePassword = (res:Response, req: Request): void => {
    
}


export {
    register,
    login,
    changePassword
}