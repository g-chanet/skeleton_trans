import { MessageBody, SubscribeMessage } from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'
import { GamesService } from './games.service'

export class GamesGateway {
  constructor(private gamesService: GamesService) {}
}
