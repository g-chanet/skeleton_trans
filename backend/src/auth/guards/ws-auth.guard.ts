import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { serialize, parse } from 'cookie';

@Injectable()
export class WsAuthGuard extends AuthGuard(`jwt`) {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    return context.switchToWs().getClient().handshake;
  }
}
