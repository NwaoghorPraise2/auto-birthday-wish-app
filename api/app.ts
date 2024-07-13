import express, {Application, Request, Response} from 'express';
import logger from 'morgan';
import auth from './services/auth/route';
import helmet from 'helmet';
import cors from 'cors';

const app: Application = express();

// Logging middleware
app.use(logger('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

// Route mounting
app.use('/api/auth', auth);

// Default route
app.get('/', (req: Request, res: Response): void => {
    res.json({
        code: 200,
        message: 'Hello World'
    });
});


export default app;