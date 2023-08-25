import { Socket } from 'socket.io'
export type primitive = string | number | boolean | undefined | null
export type DeepReadonly<T> = T extends primitive ? T : DeepReadonlyObject<T>
export type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
}

export interface PongPlayer {
  socketId: string
  isReady: boolean
  position?: number
  score: number
}

export interface PongData {
  isPaused: boolean
  playerA?: PongPlayer
  playerB?: PongPlayer
  ball: {
    position: {
      x: number
      y: number
    }
    velocity: {
      x: number
      y: number
    }
  }
}

export class PongSession {
  private _pongData: PongData = {
    isPaused: false,
    ball: {
      position: {
        x: 800 / 2,
        y: 600 / 2,
      },
      velocity: {
        x: 0,
        y: 0,
      },
    },
  }

  constructor(readonly roomId: string, socket: Socket) {
    this.playerJoin(socket)
  }

  /*------------  SETTER ------------*/

  public playerJoin({ id }: Socket): boolean {
    const playerData: PongPlayer = {
      socketId: id,
      isReady: false,
      score: 0,
    }
    if (this._pongData.playerA === undefined)
      this._pongData.playerA = playerData
    else if (this._pongData.playerB === undefined)
      this._pongData.playerB = playerData
    else return false
    return true
  }

  public playerLeave({ id }: Socket): boolean {
    if (this.socketIdIsPlayerA(id)) this._pongData.playerA = undefined
    else if (this.socketIdIsPlayerB(id)) this._pongData.playerB = undefined
    else return false
    return true
  }

  // ALEDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
  public incrementPlayerScore(socket: Socket): boolean {
    const playerId = socket.id
    if (this.socketIdIsPlayerA(playerId)) {
      this._pongData.playerA.score += 1
      return true
    } else if (this.socketIdIsPlayerB(playerId)) {
      this._pongData.playerB.score += 1
      return true
    }
    // console.log(this.findMyPlayerWitSocketId(socketId).score)
    // this.findMyPlayerWitSocketId(socket.id).score += 1
    // console.log(this.findMyPlayerWitSocketId(socket.id).score)
  }

  public setPlayerPosition(socket: Socket, newY: number) {
    this.findMyPlayerWitSocketId(socket.id).position = newY
  }

  public setPlayerReady(socket: Socket) {
    this.findMyPlayerWitSocketId(socket.id).isReady = true
  }

  public switchPaused(socket: Socket) {
    this.findMyPlayerWitSocketId(socket.id)
    this._pongData.isPaused = !this._pongData.isPaused
  }

  public resetBall() {
    this._pongData.ball.position.x = 800 / 2
    this._pongData.ball.position.y = 600 / 2
    const { velocity } = this._pongData.ball
    //console.log(`backend`, velocity)
    const minAngle = Math.PI / 6
    const maxAngle = (5 * Math.PI) / 6
    let randomAngle = Math.random() * (maxAngle - minAngle) + minAngle
    const avoidAngles = [Math.PI / 2, (3 * Math.PI) / 2]
    while (avoidAngles.some((angle) => Math.abs(randomAngle - angle) < 0.1)) {
      randomAngle = Math.random() * (maxAngle - minAngle) + minAngle
    }
    if (Math.random() < 0.5) {
      velocity.x = Math.sin(randomAngle)
      velocity.y = Math.cos(randomAngle)
    } else {
      velocity.x = -Math.sin(randomAngle)
      velocity.y = -Math.cos(randomAngle)
    }
  }

  /*------------  GETTER ------------*/

  get gameIsEmpty(): Readonly<boolean> {
    return !this._pongData.playerA && !this._pongData.playerB
  }

  get pongData(): DeepReadonly<PongData> {
    return this._pongData
  }

  get allPlayersReady(): Readonly<boolean> {
    const { playerA, playerB } = this._pongData
    return playerA.isReady === true && playerB.isReady === true
  }

  /*------------  UTILS ------------*/

  private socketIdIsPlayerA(socketId: string): boolean {
    return this._pongData.playerA?.socketId === socketId
  }

  private socketIdIsPlayerB(socketId: string): boolean {
    return this._pongData.playerB?.socketId === socketId
  }

  private findMyPlayerWitSocketId(socketId: string) {
    if (this.socketIdIsPlayerA(socketId)) return this._pongData.playerA
    if (this.socketIdIsPlayerB(socketId)) return this._pongData.playerB
    throw new Error()
  }
}
