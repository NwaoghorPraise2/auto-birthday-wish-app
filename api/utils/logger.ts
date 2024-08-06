import { createLogger, format, transports } from "winston";
const { combine, timestamp, json, colorize, prettyPrint } = format;

// Custom format for console logging with colors
const consoleLogFormat = format.combine(
  format.colorize(),
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  prettyPrint(),
  format.printf(({ level, message, timestamp }) => {
    return ` ${timestamp} ${level}: ${message}`;
  })
);

// Create a Winston logger
const logger = createLogger({
  level: "info",
  format: combine(colorize(), timestamp(), json()),
  transports: [
    new transports.Console({
      format: consoleLogFormat,
    }),
    new transports.File({ filename: "app.log" }),
  ],
});

export default logger;














// const logger = winston.createLogger({
//     level: 'info',
//     format: combine(
//         timestamp(),
//         printf(({ timestamp, level, message }) => {
//             return `${timestamp} ${level}: ${message}`;
//         })
//     ),
//     transports: [
//         new winston.transports.Console(),
//         new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
//         new winston.transports.File({ filename: 'logs/combined.log' })
//     ]
// })