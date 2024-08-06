import app from './app';
import { PORT } from './config/config';

// Convert PORT to a number, default to 3001 if not provided
const port: number = Number(PORT) || 3001;

/**
 * @desc Starts the Express server and listens on the specified port
 */
const startServer = (): void => {
    app.listen(port, '0.0.0.0', (): void => {
        console.log(`Server is running on port ${port}`);
    });
};

// Start the server
startServer();
