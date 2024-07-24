import { NextFunction, Request, Response } from 'express'
import { UserData } from './validators';
import { createUser, getUserByEmail } from './helpers';
import { authentication } from '../../utils/authentication';
import ResponseType from '../../interfaces/Response';


export const register = async ( req: Request<{}, any, UserData>, res:Response<ResponseType>, next: NextFunction): Promise<Response<ResponseType>>  => {
    try{

        const {email} = req.body;
        
        const checkExistingUser = await getUserByEmail(email);
        
        if (checkExistingUser) return res.status(400
        ).json({
            status: 'Error',
            message: 'User already exist'
        });

        const user = await createUser({
            ...req.body, password: authentication(req.body.password)
        });

        return res.status(201).json({
            status: 'Success',
            message: 'User created successfully',
            data: user    
        }).end();

    }catch(e){

        console.log(e);
        return res.status(400).json({
            status: 'Error',
            message: 'Error occurred during registration',
          });
    }
}


const login = (res:Response, req: Request): void => {
    
}


const changePassword = (res:Response, req: Request): void => {
    
}
