import express, { Application, Request, Response } from 'express';
import logger from 'morgan';
import auth from './services/auth/route/route';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import errorHandler from './middlewares/errorHandlerMiddleware';

const app: Application = express();

// Middleware setup
app.use(logger('dev'));          // Logging middleware
app.use(helmet());               // Security middleware to set various HTTP headers
app.use(cors());                 // Enable Cross-Origin Resource Sharing
app.use(express.json());         // Parse incoming JSON requests
app.use(compression());          // Compress response bodies for better performance
app.use(express.urlencoded({ extended: true }));

// Route mounting
app.use('/api/auth', auth);      // Mount authentication routes at /api/auth

// Default route
app.get('/', (req: Request, res: Response): void => {
    res.status(200).json({       // Set status code explicitly
        code: 200,
        message: 'Hello World'
    });
});

app.use(errorHandler);

// Export the app instance for use in server setup
export default app;
