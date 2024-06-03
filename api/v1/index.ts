import app from "../../app";
import { Application, Request, Response } from 'express';

export default (app: Application) => {

    
    app.get('/api/v1/test', (req: Request, res: Response) => {
        res.json({
            message: 'V1, up and running...',
        });
    });
};