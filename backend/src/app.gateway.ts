import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  ConnectedSocket,
} from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'
import { PongSession } from './pongSession'
import { GamesService } from './games/games.service'

export type primitive = string | number | boolean | undefined | null
export type DeepReadonly<T> = T extends primitive ? T : DeepReadonlyObject<T>
export type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
}

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly gameService: GamesService) {}
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
      pongSession.gameOverDisconnect()
      //envoyer GameDone Error + roomId
      this.server.to(roomId).emit(`updatePongData`, pongSession.pongData)
    }
    console.log(`disconnection socket App`, socket.id, args)
  }

  @SubscribeMessage(`changedPage`)
  userChangedPageDisconnect(socket: Socket, ...args: any[]) {
    const { roomId } = socket.data
    if (roomId === undefined) return
    const pongSession = this.pongSessions.get(roomId)
    if (pongSession) {
      pongSession.playerLeave(socket)
      if (pongSession.gameIsEmpty) this.pongSessions.delete(roomId)
      socket.leave(roomId)
      socket.data.roomID = undefined
      pongSession.gameOverDisconnect()
      this.server.to(roomId).emit(`updatePongData`, pongSession.pongData)
    }
    console.log(
      `A user changed page and is no longer in game, has been disconnected`,
      args,
    )
  }

  /*------------  GAME ACTIONS ------------*/

  @SubscribeMessage(`setPlayerPosition`)
  setPlayerPosition(socket: Socket, position: number) {
    const { roomId } = socket.data
    const pongSession = this.pongSessions.get(roomId)
    pongSession.setPlayerPosition(socket, position)
    this.server.to(roomId).emit(`updatePongData`, pongSession.pongData)
  }

  @SubscribeMessage(`pauseGameRequest`)
  pauseGame(socket: Socket) {
    const { roomId } = socket.data
    const pongSession = this.pongSessions.get(roomId)
    console.log(`a client requested a pause`)
    if (!pongSession.pongData.playerA || !pongSession.pongData.playerB) return
    if (this.isInCountdown) return
    pongSession.setGamePause()
    pongSession.stopGameLoop()
    if (pongSession)
      this.server.to(roomId).emit(`gameIsPaused`, pongSession.pongData)
  }

  @SubscribeMessage(`unpauseGameRequest`)
  unpauseGame(socket: Socket) {
    const { roomId } = socket.data
    const pongSession = this.pongSessions.get(roomId)
    console.log(`a client wants to unpause`)
    if (!pongSession.pongData.playerA || !pongSession.pongData.playerB) return
    // if (!this.isInCountdown) {
    // this.isInCountdown = true
    this.countdownUnpause(pongSession, 3, socket)
    pongSession.setGameUnpause()
    if (pongSession)
      this.server.to(roomId).emit(`gameIsUnpaused`, pongSession.pongData)
  }

  @SubscribeMessage(`setHardMode`)
  setHardMode(socket: Socket) {
    const { roomId } = socket.data
    const pongSession = this.pongSessions.get(roomId)
    console.log(`requested hard mode`)
    if (!pongSession.pongData.playerA || !pongSession.pongData.playerB) return
    pongSession.setHardMode(socket)
    this.server.to(roomId).emit(`updatePongData`, pongSession.pongData)
    if (pongSession) {
      if (
        pongSession.pongData.playerA.askHardMode &&
        !pongSession.pongData.playerB.askHardMode
      )
        this.server.to(roomId).emit(`playerAskHardMode`, `Player A`)
      else if (
        pongSession.pongData.playerB.askHardMode &&
        !pongSession.pongData.playerB.askHardMode
      )
        this.server.to(roomId).emit(`playerAskHardMode`, `Player B`)
    }
    if (pongSession.allPlayersAskHardMode) pongSession.startHardMode()
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
      this.countdownGameReady(pongSession, 3, socket)
    }
  }

  @SubscribeMessage(`switchPaused`)
  switchPaused(socket: Socket) {
    const { roomId } = socket.data
    const pongSession = this.pongSessions.get(roomId)
    pongSession.switchPaused(socket)
    this.server.to(roomId).emit(`updatePongData`, pongSession.pongData)
  }

  /*------------  GAME ACTIONS UTILS ------------*/

  countdownGameReady(pongSession: PongSession, amount = 3, socket: Socket) {
    const serverTime = Date.now()
    if (amount === 0) {
      this.server
        .to(pongSession.roomId)
        .emit(`setCountdown`, { amount: 0, serverTime })
      this.server
        .to(pongSession.roomId)
        .emit(`updatePongData`, pongSession.pongData)
      pongSession.enableShowBall()
      pongSession.resetBall()
      this.startGameLoop(this.server, socket)
    } else {
      this.server
        .to(pongSession.roomId)
        .emit(`setCountdown`, { amount, serverTime })
      setTimeout(
        () => this.countdownGameReady(pongSession, --amount, socket),
        1000,
      )
    }
  }

  private isInCountdown: boolean
  countdownUnpause(pongSession: PongSession, amount = 3, socket: Socket) {
    this.isInCountdown = true
    const serverTime = Date.now()
    if (amount === 0) {
      this.server
        .to(pongSession.roomId)
        .emit(`setCountdown`, { amount: 0, serverTime })
      this.resumeGameLoop(this.server, socket)
    } else {
      this.server
        .to(pongSession.roomId)
        .emit(`setCountdown`, { amount, serverTime })
      setTimeout(
        () => this.countdownUnpause(pongSession, --amount, socket),
        1000,
      )
    }
  }

  startGameLoop(server: Server, socket: Socket) {
    const { roomId } = socket.data
    const pongSession = this.pongSessions.get(roomId)
    if (pongSession.gameLoopRunning) return
    pongSession.startGameLoop()
  }

  resumeGameLoop(server: Server, socket: Socket) {
    this.isInCountdown = false
    const { roomId } = socket.data
    const pongSession = this.pongSessions.get(roomId)
    if (pongSession.gameLoopRunning) return
    pongSession.resumeGameLoop()
  }

  /*------------  JOIN AND LEAVE ------------*/

  @SubscribeMessage(`joinRoom`)
  joinRoom(socket: Socket, roomId: string) {
    const joinSessionSuccess = (pongSession: PongSession) => {
      if (pongSession.pongData.gameDone) {
        joinSessionError(`THE GAME IS ALREADY FINISHED! TRY ANOTHER ONE.`)
        return
      }
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
      if (session.gameIsFull) {
        joinSessionError(`ROOM IS FULL! TRY ANOTHER ONE.`, session)
        return
      }
      if (session.playerJoin(socket)) joinSessionSuccess(session)
      else joinSessionSuccess(session)
    } else {
      const pongSession = new PongSession(
        roomId,
        socket,
        this.server,
        this.gameService,
      )
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
      //envoyer gameData

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
      leaveSessionError(`emit player socket roomId is not define`)
    }
    if (!this.pongSessions.has(roomId)) {
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
