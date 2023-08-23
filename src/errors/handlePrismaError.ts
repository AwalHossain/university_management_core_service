import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";



const handlePrismaError = (error: PrismaClientKnownRequestError) => {

    let statusCode = 500;
    let message = 'Something went wrong !';
    
    if(error.code === 'P2002') {
        statusCode = 400;
        message = 'Duplicate entry';
        
    } else if(error.code === 'P2003') {
        statusCode = 400;
        message = 'Foreign key constraint failed';
    } else if(error.code === 'P2025') {
        statusCode = 404;
        message = 'Record does not exist';

    } else {
        message = error.message;
    }

    console.log(statusCode, message,'error');

    return {
       statusCode, message
    }
}

export default handlePrismaError;