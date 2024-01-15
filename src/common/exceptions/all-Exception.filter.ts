import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { deleteFileInPublic } from '../utils/function';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
    catch(exception: unknown, host: ArgumentsHost): void {
      const { httpAdapter } = this.httpAdapterHost;
      
      
      const ctx = host.switchToHttp();
      const req=ctx.getRequest()
      // delete image if validation error
      if(req.file){
        deleteFileInPublic(req.file.path.substring(7));
       
      }
      let httpStatus: number, message: string;
      
      if (exception instanceof HttpException) {
         
        httpStatus = exception.getStatus();
        message = exception.message;
      } else {
        httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        message = new InternalServerErrorException().message;
        
      }
      const responseBody = {
        statusCode: httpStatus,
        timestamp: new Date().toISOString(),
        errors: {
          path: httpAdapter.getRequestUrl(ctx.getRequest()),
          message,
          data: [],
        },
      };
      
      
      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}
