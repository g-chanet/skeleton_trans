import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  ConnectedSocket,
} from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'
// import { Pong } from '../../frontend/src/views/game/online/index'
import { PongSession } from './pongSession'

export type primitive = string | number | boolean | undefined | null
export type DeepReadonly<T> = T extends primitive ? T : DeepReadonlyObject<T>
export type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
}

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  private pongSessions: Map<string, PongSession> = new Map()

  handleConnection(@ConnectedSocket() socket: Socket, ...args: any[]) {
    console.log(`connection socket App`, socket.id, args)
  }

  handleDisconnect(@ConnectedSocket() socket: Socket, ...args: any[]) {
    const { roomId } = socket.data
    if (roomId === undefined) return
    const pongSession = this.pongSessions.get(roomId)
    if (pongSession) {
      pongSession.playerLeave(socket)
      if (pongSession.gameIsEmpty) this.pongSessions.delete(roomId)
      socket.leave(roomId)
      socket.data.roomId = undefined
      this.server.to(roomId).emit(`updatePongData`, pongSession.pongData)
    }
  }

  /*------------  GAME ACTIONS ------------*/

  @SubscribeMessage(`setPlayerPosition`)
  setPlayerPosition(socket: Socket, position: number) {
    const { roomId } = socket.data
    const pongSession = this.pongSessions.get(roomId)
    pongSession.setPlayerPosition(socket, position)
    this.server.to(roomId).emit(`updatePongData`, pongSession.pongData)
  }

  @SubscribeMessage(`setPlayerReady`)
  setPlayerReady(socket: Socket) {
    const { roomId } = socket.data
    const pongSession = this.pongSessions.get(roomId)
    if (!pongSession.pongData.playerA || !pongSession.pongData.playerB) {
      console.log(`Waiting for your opponent!`)
      return
    }
    pongSession.setPlayerReady(socket)
    this.server.to(roomId).emit(`updatePongData`, pongSession.pongData)
    console.log(
      pongSession.pongData.playerA.isReady,
      pongSession.pongData.playerB.isReady,
    )
    if (pongSession) {
      if (
        pongSession.pongData.playerA.isReady &&
        !pongSession.pongData.playerB.isReady
      )
        this.server.to(roomId).emit(`playerReady`, `Player A`)
      else if (
        pongSession.pongData.playerB.isReady &&
        !pongSession.pongData.playerB.isReady
      )
        this.server.to(roomId).emit(`playerReady`, `Player B`)
    }
    if (pongSession.allPlayersReady) {
      pongSession.resetBall()
      this.countdownGameReady(pongSession)
    }
  }

  @SubscribeMessage(`switchPaused`)
  switchPaused(socket: Socket) {
    const { roomId } = socket.data
    const pongSession = this.pongSessions.get(roomId)
    pongSession.switchPaused(socket)
    this.server.to(roomId).emit(`updatePongData`, pongSession.pongData)
  }

  //ALEDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
  @SubscribeMessage(`goalScored`)
  goalScored(socket: Socket) {
    const { roomId } = socket.data
    const pongSession = this.pongSessions.get(roomId)
    if (socket) {
      if (pongSession) {
        pongSession.incrementPlayerScore(socket)
        pongSession.resetBall()
      }
    }
    if (roomId) {
      this.server
        .to(pongSession.roomId)
        .emit(`updatePongData`, pongSession.pongData)
    }
    console.log(
      pongSession.pongData.playerA.score,
      pongSession.pongData.playerB.score,
    )
  }

  /*------------  GAME ACTIONS UTILS ------------*/

  countdownGameReady(pongSession: PongSession, amount = 3) {
    const serverTime = Date.now()
    if (amount === 0) {
      this.server
        .to(pongSession.roomId)
        .emit(`setCountdown`, { amount: 0, serverTime })
      pongSession.resetBall
      this.server
        .to(pongSession.roomId)
        .emit(`updatePongData`, pongSession.pongData)
    } else {
      this.server
        .to(pongSession.roomId)
        .emit(`setCountdown`, { amount, serverTime })
      setTimeout(() => this.countdownGameReady(pongSession, --amount), 1000)
    }
  }

  /*------------  JOIN AND LEAVE ------------*/

  @SubscribeMessage(`joinRoom`)
  joinRoom(socket: Socket, roomId: string) {
    const joinSessionSuccess = (pongSession: PongSession) => {
      socket.join(pongSession.roomId)
      socket.data.roomId = pongSession.roomId
      socket.emit(`joinRoomSuccess`, pongSession.pongData)
      socket.to(roomId).emit(`updatePongData`, pongSession.pongData)
    }

    const joinSessionError = (message: string, pongSession?: PongSession) => {
      console.log(`joinRoomError`)
      socket.emit(`joinRoomError`, { message })
    }

    if (this.pongSessions.has(roomId)) {
      const session = this.pongSessions.get(roomId)
      if (session.playerJoin(socket)) joinSessionSuccess(session)
      else joinSessionSuccess(session)
    } else {
      const pongSession = new PongSession(roomId, socket)
      console.log(`Socket Id:`, socket.id)
      this.pongSessions.set(roomId, pongSession)
      joinSessionSuccess(pongSession)
    }
  }

  @SubscribeMessage(`leaveRoom`)
  leaveRoom(socket: Socket) {
    const leaveSessionSuccess = (pongSession: PongSession) => {
      socket.leave(pongSession.roomId)
      socket.data.roomId = undefined
      socket.emit(`leaveRoomSuccess`)

      if (pongSession.gameIsEmpty) {
        this.pongSessions.delete(pongSession.roomId)
      } else {
        this.server.to(roomId).emit(`updatePongData`, pongSession.pongData)
      }
    }

    const leaveSessionError = (message: string) => {
      socket.emit(`leaveRoomError`, { message })
    }

    const { roomId } = socket.data
    if (roomId === undefined) {
      // emit player socket roomId is not define
      leaveSessionError(`emit player socket roomId is not define`)
    }
    if (!this.pongSessions.has(roomId)) {
      // emit player pongSession not exist
      leaveSessionError(`emit player pongSession not exist`)
    }
    const pongSession = this.pongSessions.get(roomId)
    pongSession.playerLeave(socket)

    if (pongSession.gameIsEmpty) {
      this.pongSessions.delete(roomId)
    }
    leaveSessionSuccess(pongSession)
  }
}
