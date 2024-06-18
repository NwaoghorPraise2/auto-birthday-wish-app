import express, {Application, Request, Response} from 'express';
import morgan from 'morgan';

//Start Application
const app: Application = express();
const PORT = Number(process.env.PORT || 3001);



app.use(morgan('dev'));



app.get('/',(req:Request, res:Response):void =>{
    res.send('Hello TypeScript');
});


const server = ():void =>{
    app.listen(PORT,'0.0.0.0',():void =>{
        console.log(`Server is running on port ${PORT}`);
    });
};

server();