import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  //**************************************************//
  //  EVENTS
  //**************************************************//

  handleConnection(@ConnectedSocket() socket: Socket, ...args: any[]) {
    console.log(`connection socket App`, socket.id, args)
  }

  handleDisconnect(@ConnectedSocket() socket: Socket, ...args: any[]) {
    console.log(`disconnect socket App`, socket.id, args)
  }

  //**************************************************//
  //  HANDLERS
  //**************************************************//
}
