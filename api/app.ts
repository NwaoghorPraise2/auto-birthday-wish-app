import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import auth from './services/auth/route/route';
import helmet from 'helmet';
import logger from './utils/logger';
import cors from 'cors';
import compression from 'compression';
import errorHandler from './middlewares/errorHandlerMiddleware';

const app: Application = express();

// Middleware setup
const morganFormat = ":method :url :status :response-time ms";

app.use(
    morgan(morganFormat, {
      stream: {
        write: (message) => {
          const logObject = {
            method: message.split(" ")[0],
            url: message.split(" ")[1],
            status: message.split(" ")[2],
            responseTime: message.split(" ")[3],
          };
          logger.info(JSON.stringify(logObject));
        },
      },
    })
  );


// app.use(morgan('dev'));          // Logging middleware
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
