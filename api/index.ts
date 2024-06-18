import express, {Application, Request, Response} from 'express';

const app: Application = express();
const PORT = Number(process.env.PORT || 3001);

app.get('/',(req:Request, res:Response):void =>{
    res.send('Hello TypeScript');
});


const server = ():void =>{
    app.listen(PORT,():void =>{
        console.log(`Server is running on port ${PORT}`);
    });
};

server();