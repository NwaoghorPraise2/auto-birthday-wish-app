import app from './app';
import { PORT } from './config/config';

const port = Number(PORT || 3001);

const server = ():void =>{
    app.listen(port,'0.0.0.0',():void =>{
        console.log(`Server is running on port ${port}`);
    });
};

server();