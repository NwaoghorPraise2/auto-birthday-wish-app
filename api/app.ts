import express, { Router, Application, Request, Response } from 'express';
import logger from 'morgan';
import auth from './services/auth/route';

const app: Application = express();

// Logging middleware
app.use(logger('dev'));


// Route mounting
app.use('/api/auth', auth);

// Default route
app.get('/', (req: Request, res: Response): void => {
    res.json({
        message: 'Hello World'
    });
});

export {Router}
export default app;