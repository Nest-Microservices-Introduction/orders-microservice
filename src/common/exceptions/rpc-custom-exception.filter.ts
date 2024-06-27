import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    console.log('paso por aqui en nuestro custom');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const rpcError = exception.getError();
    if (
      typeof rpcError === 'object' &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      const status = rpcError.status;
      return response.status(status).json(rpcError);
    }

    response.status(400).json({
      status: 400,
      messs: rpcError,
    });
    // return throwError(() => exception.getError());
  }
}
