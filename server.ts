import app from './app';

const PORT = Number(process.env.PORT || 3000);

const server = ():void =>{
    app.listen(PORT,():void =>{
        console.log(`Server is running on port ${PORT}`);
    });
};

server();