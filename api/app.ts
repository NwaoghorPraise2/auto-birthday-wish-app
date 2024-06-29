import express, {Application, Request, Response} from 'express';
import {Router} from 'express';
import logger from 'morgan';

const app:Application = express();
export const router = Router();


app.use(logger('dev'));

app.get('/',(req:Request, res:Response):void =>{
    res.json({
        message: 'Hello World'
    });
});


export default app;