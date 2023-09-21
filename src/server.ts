import { Server } from 'http';
import app from './app';
import subscribeEvent from './app/event';
import config from './config';
import { errorlogger, logger } from './shared/logger';
import { RedisClient } from './shared/redis';


async function bootstrap() {

  const server: Server = app.listen(config.port, () => {
    logger.info(`Server running on port ${config.port}`);
  });


  // Redis client connection and subscribe to event
  await RedisClient.connect().then(() => {
    subscribeEvent();
  });

  const exitHandler = () => {

    if (server) {
      server.close(() => {
        logger.info('Server closed');
      });
    }
    process.exit(1);
  };

  const unexpectedErrorHandler = (error: unknown) => {
    errorlogger.error(error);
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);

  process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
      server.close();
    }
  });
}

bootstrap();