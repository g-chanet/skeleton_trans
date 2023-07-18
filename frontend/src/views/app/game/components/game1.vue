<template>
    <div class="gameContainer">
        <canvas class="canvas" ref="gameBoard" width="800" height="400"></canvas>
        <div class="scoreText">0 : 0</div>
        <button class="resetButton">RESET</button>
    </div>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import { onMounted } from 'vue'

const gameBoard = ref<null | HTMLCanvasElement>(null)
const ctx = gameBoard.value?.getContext(`2d`)
const scoreText = document.querySelector(`.scoreText`)
const resetButton = document.querySelector(`#resetButton`)
const gameWidth = gameBoard.value?.width
const gameHeight = gameBoard.value?.height
const boardBackground = `lightblue`
const paddle1Color = `grey`
const paddle2Color = `grey`
const paddleBorder = `black`
const ballColor = `lightred`
const ballBorderColor = `black`
const ballRadius = 12.5
const paddleSpeed = 50

let intervalID: ReturnType<typeof setTimeout>
let ballSpeed = 1
let ballX = (gameWidth ?? 0) / 2
let ballY = (gameHeight ?? 0) / 2
let ballXDirection = 0
let ballYDirection = 0
let player1Score = 0
let player2Score = 0

interface Paddle {
  width: number
  height: number
  x: number
  y: number
}

let paddle1: Paddle = {
  width: 25,
  height: 100,
  x: 0,
  y: 0,
}

let paddle2: Paddle = {
  width: 25,
  height: 100,
  x: (gameWidth ?? 0) - 25,
  y: (gameHeight ?? 0) - 100,
}

onMounted(() => {
  window.addEventListener(`keydown`, changeDirection)
  resetButton?.addEventListener(`click`, resetGame)
  gameStart()
})

drawPaddles()

function gameStart() {
  createBall()
  drawPaddles()
  drawBall(ballX, ballY)
  nextTick()
}

function nextTick() {
  intervalID = setTimeout(() => {
    clearBoard()
    drawPaddles()
    moveBall()
    drawBall(ballX, ballY)
    checkCollision()
    nextTick()
  }, 10)
}

function clearBoard() {
  if (ctx) {
    ctx.fillStyle = boardBackground
    ctx.fillRect(0, 0, gameWidth || 0, gameHeight || 0)
  }
}

function drawPaddles() {
    if (ctx) {
  ctx.strokeStyle = paddleBorder

  ctx.fillStyle = paddle1Color
  ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height)
  ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height)

  ctx.fillStyle = paddle2Color
  ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height)
  ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height)
    }
}

function createBall() {
  ballSpeed = 1
  if (Math.round(Math.random()) === 1) {
    ballXDirection = 1
  } else {
    ballXDirection = -1
  }
  if (Math.round(Math.random()) === 1) {
    ballYDirection = Math.random() * 1
  } else {
    ballYDirection = Math.random() * -1
  }
  ballX = (gameWidth ?? 0) / 2
  ballY = (gameHeight ?? 0) / 2
  drawBall(ballX, ballY)
}

function moveBall() {
  ballX += ballSpeed * ballXDirection
  ballY += ballSpeed * ballYDirection
}

function drawBall(ballX: number, ballY: number) {
  if (ctx) {
    ctx.fillStyle = ballColor
    ctx.strokeStyle = ballBorderColor
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.fill()
  }
}

function checkCollision() {
  if (ballY <= 0 + ballRadius) {
    ballYDirection *= -1
  }
  if (ballY >= (gameHeight ?? 0) - ballRadius) {
    ballYDirection *= -1
  }
  if (ballX <= 0) {
    player2Score += 1
    updateScore()
    createBall()
    return
  }
  if (ballX >= (gameWidth ?? 0)) {
    player1Score += 1
    updateScore()
    createBall()
    return
  }
  if (ballX <= paddle1.x + paddle1.width + ballRadius) {
    if (ballY > paddle1.y && ballY < paddle1.y + paddle1.height) {
      ballX = paddle1.x + paddle1.width + ballRadius //in case ball is stuck
      ballXDirection *= -1
      ballSpeed += 0.5
    }
  }
  if (ballX <= paddle2.x - ballRadius) {
    if (ballY > paddle2.y && ballY < paddle2.y + paddle2.height) {
      ballX = paddle2.x - ballRadius //in case ball is stuck
      ballXDirection *= -1
      ballSpeed += 1
    }
  }
}

function changeDirection(event: KeyboardEvent) {
  const keyPressed = event.keyCode
  const paddle1Up = 87
  const paddle1Down = 83
  const paddle2Up = 38
  const paddle2Down = 40

  switch (keyPressed) {
    case paddle1Up:
      if (paddle1.y > 0) paddle1.y -= paddleSpeed
      break
    case paddle1Down:
      if (paddle1.y > (gameHeight ?? 0) - paddle1.height) paddle1.y += paddleSpeed
      break
    case paddle2Up:
      if (paddle2.y > 0) paddle2.y += paddleSpeed
      break
    case paddle2Down:
      if (paddle2.y > (gameHeight ?? 0) - paddle2.height) paddle2.y += paddleSpeed
      break
    default:
      break
  }
}

function updateScore() {
    if(scoreText)
    scoreText.textContent = `${player1Score} : ${player2Score}`
}

function resetGame() {
  player1Score = 0
  player2Score = 0
  paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0,
  }
  paddle2 = {
    width: 25,
    height: 100,
    x: (gameWidth ?? 0) - 25,
    y: (gameHeight ?? 0) - 100,
  }
  ballSpeed = 1
  ballX = 0
  ballY = 0
  ballXDirection = 0
  ballYDirection = 0
  updateScore()
  clearInterval(intervalID)
  gameStart()
}


</script>

<style scoped lang="sass">

.canvas
    background-color: lightblue
.gameContainer
    display: flex
    flex-direction: column
    text-align: center
    width: 80%
    height: 80%
.gameBoard
    border: 3px solid

.scoreText
    font-size: 100px

.resetButton
    font-size: 22px
    width: 100px
    height: 50px
    border: 4px solid
    border-radius: 15px
    cursor: pointer

</style>