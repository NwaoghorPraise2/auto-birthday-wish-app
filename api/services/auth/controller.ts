import { NextFunction, Request, Response } from 'express'
import { UserData } from './validators';
import { createUser, getUserByEmail, getUserWithPasswordByEmail } from './helpers';
import { authentication, comparePassword} from '../../utils/authentication';
import { generateToken } from '../../middlewares/authMiddleware';
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


export const login = async(req:Request<{}, any, UserData>, res:Response<ResponseType>, next:NextFunction): Promise<Response<ResponseType>> => {
    try {
        const {email, password} = req.body;
        const user = await getUserWithPasswordByEmail(email);
        if (!user) return res.status(400).json({
            status: 'Error', 
            message: 'User not found'
        });
       const isValid = comparePassword(password, user.password);
        if (!isValid) return res.status(400).json({
            status: 'Error',
            message: 'Invalid username or password'
        });

        const accessToken = generateToken(user.id);
        
        return res.status(200).json({
            status: 'Success',
            message: 'Login successful',
            accessToken: accessToken,
            data: user
        });
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            status: 'Error',
            message: 'Error occurred during login',
          });
    }    
}

export const getUser = async(req:Request<{}, any, UserData>, res:Response<ResponseType>, next:NextFunction): Promise<Response<ResponseType>> => {
    try {
        const {email} = req.body;
        const user = await getUserByEmail(email);
        if (!user) return res.status(400).json({
            status: 'Error',
            message: 'User not found'
        });
        return res.status(200).json({
            status: 'Success',
            message: 'User found',
            data: user
        });
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            status: 'Error',
            message: 'Error occurred during login',
          });
    }
}


const changePassword = (res:Response, req: Request): void => {
    
}
