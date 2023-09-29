import {
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	OnGatewayConnection,
	OnGatewayDisconnect,
	ConnectedSocket,
} from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'
import { GamesService } from './games.service'

@WebSocketGateway()
export class GamesGateway implements OnGatewayConnection, OnGatewayDisconnect {
	constructor(private gamesService: GamesService) { }
	@WebSocketServer()
	server: Server

	//**************************************************//
	//  EVENTS
	//**************************************************//

	handleConnection(@ConnectedSocket() socket: Socket, ...args: any[]) {
		console.log(`connection socket Game`, socket.id, args)
	}

	handleDisconnect(@ConnectedSocket() socket: Socket, ...args: any[]) {
		console.log(`disconnect socket Game`, socket.id, args)
	}

	//**************************************************//
	//  HANDLERS
	//**************************************************//

	@SubscribeMessage(`join_room`)
	handleJoinRoom(
		@ConnectedSocket() socket: Socket,
		@MessageBody() roomId: string,
	) {
		this.leaveCurrentRoom(socket)
		socket.data.currentRoomId = roomId
		socket.join(roomId)
	}

	@SubscribeMessage(`leave_room`)
	handleLeaveRoom(@ConnectedSocket() socket: Socket) {
    this.leaveCurrentRoom(socket)
	}

	@SubscribeMessage(`update_room`)
	handleUpdate(
		@ConnectedSocket() socket: Socket,
		@MessageBody() position: number,
	) {
		const { currentRoomId } = socket.data
		this.server.to(currentRoomId).emit(`update_room`, position)
	}

	//**************************************************//
	//  UTILS
	//**************************************************//

	private leaveCurrentRoom(socket: Socket) {
		if (socket.data.currentRoomId === null) return
		socket.leave(socket.data.currentRoomId)
		delete socket.data.currentRoomId
	}
}
