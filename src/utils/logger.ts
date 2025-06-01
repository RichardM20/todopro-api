import winston from 'winston';
import ENV from '../config/env.config';

const isDev = ENV.NODE_ENV !== 'prod';

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level}: ${message}`;
  })
);

const transports: winston.transport[] = isDev
  ? [
      new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(
          winston.format.colorize(),
          logFormat
        )
      })
    ]
  : [
      new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
        format: logFormat
      }),
      new winston.transports.File({
        filename: 'logs/info.log',
        level: 'info',
        format: logFormat
      })
    ];

const logger = winston.createLogger({
  level: ENV.LOG_LEVEL || (isDev ? 'debug' : 'info'),
  transports,
  exitOnError: false
});

export default logger;
