import app from './app';

const PORT = Number(process.env.PORT || 3001);

const server = ():void =>{
    app.listen(PORT,'0.0.0.0',():void =>{
        console.log(`Server is running on port ${PORT}`);
    });
};

server();