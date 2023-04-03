import { UseGuards } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { WsAuthGuard } from 'src/auth/guards/ws-auth.guard';
import { GamesService } from './games.service';

@WebSocketGateway()
export class GamesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private gamesService: GamesService) {}
  @WebSocketServer()
  server: Server;

  //**************************************************//
  //  EVENTS
  //**************************************************//

  handleConnection(@ConnectedSocket() socket: Socket, ...args: any[]) {
    console.log(`connection socket Game`, socket.id, args);
  }

  handleDisconnect(@ConnectedSocket() socket: Socket, ...args: any[]) {
    console.log(`disconnect socket Game`, socket.id, args);
  }

  //**************************************************//
  //  HANDLERS
  //**************************************************//

  @SubscribeMessage(`join_room`)
  handleJoinRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() roomId: string,
  ) {
    socket.join(roomId);
  }

  @SubscribeMessage(`leave_room`)
  handleLeaveRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() roomId: string,
  ) {
    socket.leave(roomId);
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage(`update_room`)
  handleUpdate(
    @ConnectedSocket() socket: Socket,
    @MessageBody() position: number,
  ) {
    this.server.to(socket.rooms[0]).emit(`update_room`, position);
  }
}
