// Opti les redraw / les fps
// Refacto les init
// vectoriser la direction de la balle frappée par un paddle
// Peaufiner le skin

import Konva from 'konva'

export class Pong {
    
    private stage: Konva.Stage
    private paddleLeft: Konva.Group
    private paddleRight: Konva.Group
    private ball: Konva.Group
    private paddleSpeed: number
    private scoreLayer: Konva.Layer
    private player1Score: number
    private player2Score: number
    private victoryScreenLayer!: Konva.Layer // Promesse que la Layer sera bien init
    private victoryScreenDisplayed: boolean = false
    private animationFrameId?: number // on trivialise le FrameId qu'on settera dans la loop
    private gameRunning: boolean = true
    private keysPressed: { [key: string]: boolean } = {}
    private paddleLayer: Konva.Layer

    constructor () {
        this.stage = this.generateStage()
        this.paddleLayer = new Konva.Layer
        this.stage.add(this.paddleLayer)
        this.paddleLeft = this.generatePaddle(`Left`)
        this.paddleRight = this.generatePaddle(`Right`)
        this.paddleSpeed = 10

        // Bind les fonctions handler à la window, qui repère le user input
        window.addEventListener(`keydown`, this.handleKeyDown.bind(this))
        window.addEventListener(`keyup`, this.handleKeyUp.bind(this))

        // Création de la ballz
        this.ball = this.generateBall()
        // Set les base values ici pour init
        this.ballSpeed = 10
        this.ballX = this.stage.width() / 2
        this.ballY = this.stage.height() / 2

        // Layer des paddles
        this.paddleLayer.add(this.paddleLeft)
        this.paddleLayer.add(this.paddleRight)

        // Layer ball
        const gameLayer = new Konva.Layer()
        gameLayer.add(this.ball)
        this.stage.add(gameLayer)
        gameLayer.draw()

        // Layer de score
        this.scoreLayer = new Konva.Layer()
        this.stage.add(this.scoreLayer)
        this.player1Score = 0
        this.player2Score = 0
        this.updateScoreText()

        // Layer de victoire
        this.generateVictoryScreenLayer()

        this.gameLoop()
    }

/* ---------------------------------------- Loop ---------------------------------------- */    

  // Boucle du jeu, à opti pour plus de fps
  gameLoop() {
    if (!this.gameRunning || this.victoryScreenDisplayed) return
  
    if (this.keysPressed[`ArrowUp`]) {
      this.movePaddleUp(this.paddleLeft)
    }
    if (this.keysPressed[`ArrowDown`]) {
      this.movePaddleDown(this.paddleLeft)
    }
    if (this.keysPressed[`s`]) {
      this.movePaddleUp(this.paddleRight)
    }
    if (this.keysPressed[`w`]) {
      this.movePaddleDown(this.paddleRight)
    }
  
    this.collisionCheck()
    this.moveBall()
  
    this.drawBall()
    this.drawPaddles()
  
    this.animationFrameId = requestAnimationFrame(() => this.gameLoop())
  }

  updateStage() {
    this.stage.batchDraw()
  }

  drawPaddles() {
    this.paddleLayer.batchDraw()
  }
/* ---------------------------------------- Initialization ---------------------------------------- */

  // Peut-être à refactor plus tard pour opti les init
    generateGame() {

    }

    private ballSpeed!: number
    private ballXDirection = 1
    private ballYDirection = 1
    private ballColor = `red`
    private ballBorderColor = `black`
    private ballRadius = 5
    private ballX = 0
    private ballY = 0

    // On set les propriétés de la ball dans un .Group
    generateBall(): Konva.Group {
      const ballRadius = 5
      const gameWidth = this.stage.width() - ballRadius * 2
      const gameHeight = this.stage.height() - ballRadius * 2
  
      const ballXDirection = Math.random() < 0.5 ? 1 : -1 // 50%
      const ballYDirection = Math.random() * 2 - 1 // -1 à 1
  
      this.ballX = gameWidth / 2
      this.ballY = gameHeight / 2
  
      this.ballXDirection = ballXDirection
      this.ballYDirection = ballYDirection
      
      return new Konva.Group()
    }

    // On représente les paddles par un .Group de .Rect
    generatePaddle(side: `Left` | `Right`): Konva.Group {
      const paddleWidth = 10
      const paddleHeight = 100
      const stageHeight = 600
    
      const paddleX = side === `Left` ? paddleWidth : this.stage.width() - paddleWidth * 2
      const paddleY = stageHeight / 2 - paddleHeight / 2
    
      const paddle = new Konva.Rect({
        x: 0,
        y: 0,
        width: paddleWidth,
        height: paddleHeight,
        fill: `white`,
        stroke: `black`,
        strokeWidth: 2,
      })
    
      const paddleGroup = new Konva.Group({
        x: paddleX,
        y: paddleY,
      })
    
      paddleGroup.add(paddle)
    
      return paddleGroup
    }

      // Besoin d'aide pour le resize(responsive ?)
      generateStage(): Konva.Stage {
        const container = document.getElementById(`konvaRef`)
        if (!container) {
            throw new Error(`Container 'konvaRef' not found.`)
        }

        const stageWidth = 800
        const stageHeight = 600

        const stage = new Konva.Stage({
            container: `konvaRef`,
            width: 800,
            height: 600,
        })

        // /!\ Stage set en dur, voir plus tard les @media queries
        stage.width(stageWidth)
        stage.height(stageHeight)
      
        // Nouveau layer pour le bg
        const backgroundLayer = new Konva.Layer()
        const backgroundRect = new Konva.Rect({
          x: 0,
          y: 0,
          width: stage.width(),
          height: stage.height(),
          fill: `lightgrey`,
          stroke: `black`,
        })

        backgroundLayer.add(backgroundRect)
        stage.add(backgroundLayer)

        // Layer for the score
        const scoreLayer = new Konva.Layer()
        stage.add(scoreLayer)

        return stage
      }

/* ---------------------------------------- Scores ---------------------------------------- */

  updateScoreText() {
    const scoreText = `${this.player1Score} : ${this.player2Score}`
    // Nouvel objet konva pour display les scores
    const text = new Konva.Text({
      x: this.stage.width() / 2,
      y: 10, // `margin-top: en gros`
      text: scoreText,
      fontSize: 30,
      // voir pour la base-font du projet
      fontFamily: `Arial`,
      fill: `black`,
    })

    // remove les child déjà présents, et ajoute le nouveau avant de draw la layer
    text.offsetX(text.width() / 2)
    this.scoreLayer.destroyChildren()
    this.scoreLayer.add(text)
    this.scoreLayer.batchDraw()

    // met en cache le layer score après l'avoir update
    this.scoreLayer.cache()
  }

  // Incrémente les scores en fonction du joueur qui marque le but / lance le victory screen à scoreMax
  updateScore(player: `player1` | `player2`) {
    if (player === `player1`) {
      this.player1Score += 1
      if (this.player1Score === 11) {
        this.displayVictoryScreen(`player1`)
        return
      }
    } else if (player === `player2`) {
      this.player2Score += 1
      if (this.player2Score === 11) {
        this.displayVictoryScreen(`player2`)
        return
      }
    }
  
    this.updateScoreText()
  }

    // Créé la new layer pour le Vscreen / peut etre à reskin
    generateVictoryScreenLayer(): void {
      this.victoryScreenLayer = new Konva.Layer()
      this.victoryScreenLayer.opacity(0.8)
      this.stage.add(this.victoryScreenLayer)
    }

    displayVictoryScreen(winner: `player1` | `player2`) {
      // On stop le jeu (peut-être trouver mieux)
      this.gameRunning = false
    
      // Cache les autres layers / peut etre les delete est plus worth ?
      this.paddleLeft.hide()
      this.paddleRight.hide()
      this.ball.hide()
      this.scoreLayer.hide()
    
      // Display
      this.victoryScreenLayer.show()
      this.victoryScreenLayer.moveToTop() // Pour s'assurer que la layer soit en z-axis max
    
      // On fait une box pour le victory Text
      const rectWidth = this.stage.width() / 2
      const rectHeight = this.stage.height() / 2
      const rectX = (this.stage.width() - rectWidth) / 2
      const rectY = (this.stage.height() - rectHeight) / 2
    
      const rect = new Konva.Rect({
        x: rectX,
        y: rectY,
        width: rectWidth,
        height: rectHeight,
        fill: `black`,
        cornerRadius: 10,
      })
    
      this.victoryScreenLayer.add(rect)
    
      // On add le message de victoire du player concerné
      const text = new Konva.Text({
        x: this.stage.width() / 2,
        y: this.stage.height() / 2 - 20,
        text: `Player ${winner === `player1` ? `1` : `2`} wins!`,
        fontSize: 30,
        fontFamily: `Arial`,
        fill: `white`,
      })
    
      text.offsetX(text.width() / 2)
    
      this.victoryScreenLayer.add(text)
    
      // Display du score sur le Vscreen (à bouger pour faire + beau)
      const scoreText = new Konva.Text({
        x: this.stage.width() / 2,
        y: this.stage.height() / 2 + 20,
        text: `${this.player1Score} : ${this.player2Score}`,
        fontSize: 30,
        fontFamily: `Arial`,
        fill: `black`,
      })
    
      scoreText.offsetX(scoreText.width() / 2)
    
      this.victoryScreenLayer.add(scoreText)
    
      // Bouton `Rejouer`
      const buttonWidth = 150
      const buttonHeight = 40
      const buttonX = (this.stage.width() - buttonWidth) / 2
      const buttonY = this.stage.height() - 100
    
      const buttonRect = new Konva.Rect({
        x: buttonX,
        y: buttonY,
        width: buttonWidth,
        height: buttonHeight,
        fill: `green`,
        cornerRadius: 5,
        listening: true, // Pour rendre le bouton clickable
      })
    
      const buttonText = new Konva.Text({
        x: buttonX + buttonWidth / 2,
        y: buttonY + buttonHeight / 2,
        text: `PLAY AGAIN`,
        fontSize: 20,
        fontFamily: `Arial`,
        fill: `white`,
        align: `center`,
        verticalAlign: `middle`,
        listening: false, // A l'inverse, c'est pour ignorer l'intéraction du texte et passer sur celle du bouton
      })

        buttonText.offsetX(buttonText.width() / 2)
        buttonText.offsetY(buttonText.height() / 2)

        this.victoryScreenLayer.add(buttonRect)
        this.victoryScreenLayer.add(buttonText)
      
      // On change le curseur pdt l'hover
      buttonRect.on(`mouseover`, () => {
        document.body.style.cursor = `pointer`
      })
    
      // Et le repasse en default quand la souris sort
      buttonRect.on(`mouseout`, () => {
        document.body.style.cursor = `default`
      })
    
      // On lie les events au clic du bouton
      buttonRect.on(`click`, () => {
        this.resetScore()
        this.resetVictoryScreen()

        // On remontre les autres layers (comme dit plus haut, peut être devoir les redraw)
        this.paddleLeft.show()
        this.paddleRight.show()
        this.ball.show()
        this.scoreLayer.show()
    
        this.gameRunning = true
        this.gameLoop()
      })
    
      this.victoryScreenLayer.add(buttonRect)
    
      // on redraw tous les éléments du Vscreen
      this.victoryScreenLayer.batchDraw()
    }
    
    resetScore() {
      this.player1Score = 0
      this.player2Score = 0
      this.updateScoreText()
    }

    resetVictoryScreen() {
      this.victoryScreenLayer.destroyChildren()
      this.victoryScreenLayer.hide()
    }

/* ---------------------------------------- Collisions ---------------------------------------- */

collisionCheck() {
  const ballRadius = this.ballRadius
  const ballNextY = this.ballY + this.ballSpeed * this.ballYDirection

  // Murs top / bot
  if (ballNextY <= ballRadius || ballNextY >= this.stage.height() - ballRadius) {
    this.ballYDirection *= -1
  }

  // Check si collision paddle (on récup les pos)
  const paddleLeftX = this.paddleLeft.x()
  const paddleLeftY = this.paddleLeft.y()
  const paddleRightX = this.paddleRight.x()
  const paddleRightY = this.paddleRight.y()
  const paddleWidth = 10
  const paddleHeight = 100

  // On check si la position de la balle se trouve à l'intérieur des coordonnées de la paddle
  // la paddle dans sa largeur est représentée par paddleX + paddleWidth _
  // la paddle en hauteur, c'est paddleY + paddleHeight |
  if (
    (this.ballX - ballRadius <= paddleLeftX + paddleWidth &&
      this.ballY >= paddleLeftY &&
      this.ballY <= paddleLeftY + paddleHeight) ||
    (this.ballX + ballRadius >= paddleRightX &&
      this.ballY >= paddleRightY &&
      this.ballY <= paddleRightY + paddleHeight)
  ) {
    this.ballXDirection *= -1
  }

  // Check si un `BUT` est marqué
  if (this.ballX - ballRadius <= 0) {
    // Reset la balle + update le score
    this.updateScore(`player2`)
    this.ballX = this.stage.width() / 2
    this.ballY = this.stage.height() / 2
    this.ballXDirection = Math.random() < 0.5 ? 1 : -1
    this.ballYDirection = Math.random() * 2 - 1
  } 
  else if (this.ballX + ballRadius >= this.stage.width()) {
    this.updateScore(`player1`)
    this.ballX = this.stage.width() / 2
    this.ballY = this.stage.height() / 2
    this.ballXDirection = Math.random() < 0.5 ? 1 : -1
    this.ballYDirection = Math.random() * 2 - 1
  }
}

/* ---------------------------------------- Ball Movement ---------------------------------------- */

    // Besoin d'add les collisions avec les paddle (--> move dans collisionCheck())
    moveBall() {
    
      const ballX = this.ballX + this.ballSpeed * this.ballXDirection
      const ballY = this.ballY + this.ballSpeed * this.ballYDirection
    
      // Update la pos de la balle
      this.ballX = ballX
      this.ballY = ballY
    }
    

  drawBall() {
    // Cherche la forme 'ball' dans le ball.group via son id 'ball-shape'
    const ball = this.ball.findOne(`.ball-shape`) as Konva.Circle

    if (!ball) {
      // Créé et ajoute la balle au ball.group si none
      const newBall = new Konva.Circle({
        x: this.ballX,
        y: this.ballY,
        radius: this.ballRadius,
        fill: this.ballColor,
        stroke: this.ballBorderColor,
        strokeWidth: 2,
        name: `ball-shape`,
      })

      this.ball.add(newBall)
    } else {
      // Update la position de l'objet ball en assignant ballX et ballY
      ball.position({ x: this.ballX, y: this.ballY })
    }
    this.updateStage()
  }

/* ---------------------------------------- KeyHandlers ---------------------------------------- */

    movePaddleUp(paddle: Konva.Group): void {
        const paddleY = paddle.y() - this.paddleSpeed
      
        if (paddleY > 0) {
          paddle.y(paddleY)
        }
      }
      
    movePaddleDown(paddle: Konva.Group): void {
        const paddleY = paddle.y() + this.paddleSpeed
        const paddleHeight = paddle.height()
        const stageHeight = this.stage.height()
        
        // Check si la paddle sort par le bas (Marche pas, need help)
        if (paddleY < stageHeight + paddleHeight) {
            paddle.y(paddleY)
        }
    }

    // Throttle pour fluidifier les movements (limiter le nombre de calls fonction)
    // Bougé la logique de dispatch dans gameLoop, pour laisser le browser décider du rate
    handleKeyDown(event: KeyboardEvent): void {
      this.keysPressed[event.key] = true
    }

    handleKeyUp(event: KeyboardEvent): void {
      this.keysPressed[event.key] = false
    }
}