import app from './app';

const PORT: Number = Number(process.env.PORT || 3000);

const server = ()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    });
};

server();