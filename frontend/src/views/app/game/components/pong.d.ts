// eslint-disable-next-line
declare module 'Pong' {
    export const Pong: {
      initialize(runner: any, cfg: any): void;
      startDemo(): void;
      startSinglePlayer(): void;
      startDoublePlayer(): void;
      stop(ask: boolean): void;
      level(playerNo: number): number;
      goal(playerNo: number): void;
      update(dt: number): void;
      draw(ctx: any): void;
      onkeydown(keyCode: number): void;
      onkeyup(keyCode: number): void;
      showStats(on: boolean): void;
      showFootprints(on: boolean): void;
      showPredictions(on: boolean): void;
      enableSound(on: boolean): void;
    }
  
    export const Colors: {
      walls: string;
      ball: string;
      score: string;
      footprint: string;
      predictionGuess: string;
      predictionExact: string;
    }
  
    export const Images: string[]
  
    export const Levels: {
      aiReaction: number;
      aiError: number;
    }[]
  
    export module Menu {
      function initialize(pong: any): void;
      function declareWinner(playerNo: number): void;
      function draw(ctx: any): void;
    }
  
    export module Sounds {
      function initialize(pong: any): void;
      function ping(): void;
      function pong(): void;
      function wall(): void;
      function goal(): void;
    }
  
    export module Court {
      function initialize(pong: any): void;
      function draw(ctx: any, scorePlayer1: number, scorePlayer2: number): void;
      function drawDigit(
        ctx: any,
        n: number,
        x: number,
        y: number,
        w: number,
        h: number
      ): void;
    }
  
    export module Paddle {
      function initialize(pong: any, rhs: boolean): void;
      function setpos(x: number, y: number): void;
      function setdir(dy: number): void;
      function setAuto(on: boolean, level: number): void;
      function setLevel(level: number): void;
      function update(dt: number, ball: any): void;
      function ai(dt: number, ball: any): void;
      function predict(ball: any, dt: number): void;
      function draw(ctx: any): void;
      function moveUp(): void;
      function moveDown(): void;
      function stopMovingUp(): void;
      function stopMovingDown(): void;
    }
  
    export module Ball {
      function initialize(pong: any): void;
      function reset(playerNo: number): void;
      function setpos(x: number, y: number): void;
      function setdir(dx: number, dy: number): void;
      function footprint(): void;
      function update(dt: number, leftPaddle: any, rightPaddle: any): void;
      function draw(ctx: any): void;
    }
  
    export module Helper {
      function accelerate(
        x: number,
        y: number,
        dx: number,
        dy: number,
        accel: number,
        dt: number
      ): {
        nx: number;
        ny: number;
        x: number;
        y: number;
        dx: number;
        dy: number;
      };
      function intercept(
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        x3: number,
        y3: number,
        x4: number,
        y4: number,
        d: string
      ): {
        x: number;
        y: number;
        d: string;
      } | null;
      function ballIntercept(
        ball: any,
        rect: any,
        nx: number,
        ny: number
      ): {
        x: number;
        y: number;
        d: string;
      } | null;
    }
    export {}
  }
  