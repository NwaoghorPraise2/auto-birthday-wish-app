import app from './app';
import { PORT } from './config/config';
import logger from './utils/logger';

// Convert PORT to a number, default to 3001 if not provided
const port: number = Number(PORT) || 3001;

/**
 * @desc Starts the Express server and listens on the specified port
 */
const startServer = (): void => {
    logger.info('_______________________________________')
    logger.info(`Server is starting on port ${port}`)
    logger.info('_______________________________________')
    app.listen(port, '0.0.0.0', (): void => {
        logger.info(`Server is running on port ${port}`);
        logger.info('_______________________________________')
    });
};

// Start the server
startServer();
