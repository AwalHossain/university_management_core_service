/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import config from '../../config';
import ApiError from '../../errors/ApiError';

import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ZodError } from 'zod';
import handleCastError from '../../errors/handleCastError';
import handlePrismaError from '../../errors/handlePrismaError';
import handleZodError from '../../errors/handleZodError';
import { IGenericErrorMessage } from '../../interfaces/error';
import { errorlogger } from '../../shared/logger';

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  config.env === 'development'
    ? console.log(`🐱‍🏍 globalErrorHandler ~~`, { error })
    : errorlogger.error(`🐱‍🏍 globalErrorHandler ~~`, error);

  let statusCode = 500;
  let message = 'Something went wrong !';
  let errorMessages: IGenericErrorMessage[] = [];

 if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
  //  console.log(`🐱‍🏍 checking error ~~`, { error instanceof PrismaClientKnownRequestError});
   
      // extract error object here
      const prismaError = error as PrismaClientKnownRequestError;
      const prismaErrorCode = prismaError.code;
      const prismaErrorMeta = prismaError.meta?.cause;
      console.log(`🐱‍🏍 checking prisma error code ~~`, { prismaErrorCode, prismaErrorMeta });
      if(prismaError){
   const err =   handlePrismaError(prismaError);
    statusCode = err.statusCode;
    message = err.message;
      }else{
              message = error?.message;
              errorMessages = error?.message
                ? [
                    {
                      path: '',
                      message: error?.message,
                    },
                  ]
                : [];
      }
  } else if( error instanceof PrismaClientKnownRequestError) {
    console.log(`🐱‍🏍 checking prisma eirro ~~`, { error });
    
    const prismaError = handlePrismaError(error);
    statusCode = prismaError.statusCode;
    message = prismaError.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
