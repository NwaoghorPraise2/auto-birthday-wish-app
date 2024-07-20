import { NextFunction, Request, Response } from 'express'
import db from '../../config/db';
import { User } from './interfaces/Auth';
import { createUser, getUserByEmail } from './model';
import { random  , authentication } from '../../utils/authentication';
// import { User } from '@prisma/client';


const register = async (res:Response, req: Request, next: NextFunction) => {
    try{

    //Deconstruct Request Body
    const {username, email, password, name, phone_number} = req.body;
    
    // if (!username || !email || !password){
    //     return res.status(400).json({
    //         message: 'Please fill all fields';
    //     });
    // }   I'm not sure I really need this here.
    //Check if User already Exists
    const checkExistingUser = await getUserByEmail(email);
    if (checkExistingUser) return res.status(400
    ).json({message: 'User already exist'});

    const salt = random();

    const user = await createUser(
        {   
            username,
            email, 
            password: authentication(salt, password), 
            name, 
            phone_number, 
            salt
        }
    );

    return res.status(201).json(user).end();

    }catch(e){
        console.log(e);
        return res.status(400).json(e)
    }
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