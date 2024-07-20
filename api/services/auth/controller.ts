import { NextFunction, Request, Response } from 'express'
import db from '../../config/db';
import { User } from './interfaces/Auth';
import { createUser, getUserByEmail } from './model';
import { random  , authentication } from '../../utils/authentication';


const register = async (res:Response, req: Request<User>, next: NextFunction)=> {
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























































    // const isUserExist = await db.user.findUnique({
    //     where: {
    //         email
    //     }
    // });

    // if (isUserExist) {
    //     return res.json({
    //         message: 'User already exist'
    //     })
    // }
    // const insertedUser = await db.user.create({
    //     data: req.body
    // })
    // return res.json(insertedUser)
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