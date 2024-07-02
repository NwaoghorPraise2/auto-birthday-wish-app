import { Request, Response } from 'express'
import db from '../../config/db';


const register = (res:Response, req: Request): void=> {
    try {
        const { username, email, password } = req.body;
        db.query(
            "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
            [username, email, password],
            (err, result) => {
              if (err) {
                console.error(err);
                res.status(500).send("Error registering user");
              } else {
                res.status(201).json({
                  message: "User registered successfully",
                  user: result.rows[0],
                });
              }
            }
          );
    } catch (error) {
        console.log(error)
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