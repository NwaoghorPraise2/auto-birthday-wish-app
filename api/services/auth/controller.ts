import { NextFunction, Request, Response } from 'express'
import db from '../../config/db';
import { UserData } from './interfaces/Auth';
import { createUser, getUserByEmail } from './model';
import { authentication } from '../../utils/authentication';
import { User } from '@prisma/client';
import ResponseType from '../../interfaces/Response';


export const register = async ( req: Request<{}, any, UserData>, res:Response<ResponseType>, next: NextFunction): Promise<Response<ResponseType>>  => {
    try{

        const {email} = req.body;
        
        const checkExistingUser = await getUserByEmail(email);
        
        if (checkExistingUser) return res.status(400
        ).json({
            statuscode: 400,
            message: 'User already exist'
        });

        const user = await createUser({
            ...req.body, password: authentication(req.body.password)
        });

        return res.status(201).json({
            statuscode: 201,
            message: 'User created successfully',
            data: user    
        }).end();

    }catch(e){

        console.log(e);
        return res.status(400).json({
            statuscode: 400,
            message: 'Error occurred during registration',
          });
    }
}


const login = (res:Response, req: Request): void => {
    
}


const changePassword = (res:Response, req: Request): void => {
    
}
