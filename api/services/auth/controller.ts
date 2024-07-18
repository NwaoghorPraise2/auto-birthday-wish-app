import { Request, Response } from 'express'
import db from '../../config/db';
// import { User } from '@prisma/client'
import { User } from './interfaces/Auth';


const register = async (res:Response, req: Request<User>)=> {
    try{
    const {email, password, name, phone_number} = req.body;

    const isUserExist = await db.user.findUnique({
        where: {
            email
        }
    });

    if (isUserExist) {
        return res.json({
            message: 'User already exist'
        })
    }
    const insertedUser = await db.user.create({
        data: req.body
    })
    return res.json(insertedUser)
    }catch(e){
        return res.json(e)
    }
    // const result = User.parse(req.body);
    // const insertedUser = await db.user.create({})
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