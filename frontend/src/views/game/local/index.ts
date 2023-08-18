// vectoriser la direction de la balle frappée par un paddle
// Peaufiner le skin
// animation de but marqué (reprendre confetti en smaller)
// effets de particules pour la trail de la balle
// soundtrack ?
// bouton 'READY ?' qui check les 2joueurs
// textured background
// explication des touches sur le startScreen

import Konva from 'konva'
import backgroundImageUrl from '../../../assets/ps-neutral.png'

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
    private startGameLayer!: Konva.Layer
    private gameStarted: boolean = false
    private backgroundLayer!: Konva.Layer

    constructor () {
        this.stage = this.generateStage()
        this.paddleLayer = new Konva.Layer
        this.stage.add(this.paddleLayer)
        this.paddleLeft = this.generatePaddle(`Left`, `#ff9a00`)
        this.paddleRight = this.generatePaddle(`Right`, `#9a198a`)
        this.paddleSpeed = 15

        // Bind les fonctions handler à la window, qui repère le user input
        window.addEventListener(`keydown`, this.handleKeyDown.bind(this))
        window.addEventListener(`keyup`, this.handleKeyUp.bind(this))

        this.backgroundLayer = new Konva.Layer

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
        this.scoreLayer.hide()
        this.player1Score = 0
        this.player2Score = 0
        this.updateScoreText()

        // Layer de victoire
        this.generateVictoryScreenLayer()

    }

/* ---------------------------------------- Loop ---------------------------------------- */    

  // Boucle du jeu, à opti pour plus de fps
  gameLoop() {
    if (!this.gameRunning || this.victoryScreenDisplayed || !this.gameStarted) return
  
    if (this.keysPressed[`ArrowUp`]) {
      this.movePaddleUp(this.paddleRight)
    }
    if (this.keysPressed[`ArrowDown`]) {
      this.movePaddleDown(this.paddleRight)
    }
    if (this.keysPressed[`s`]) {
      this.movePaddleUp(this.paddleLeft)
    }
    if (this.keysPressed[`w`]) {
      this.movePaddleDown(this.paddleLeft)
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

    generateStartGameLayer(): void {
    this.startGameLayer = new Konva.Layer()
    this.startGameLayer.opacity(0.8)
    this.stage.add(this.startGameLayer)

    // Define paddle colors
    const leftPaddleColor = `#ff9a00`
    const rightPaddleColor = `#9a198a`

    const backgroundRect = new Konva.Rect({
      x: 0,
      y: 0,
      width: this.stage.width(),
      height: this.stage.height(),
      fill: `black`,
    })
    this.startGameLayer.add(backgroundRect)

    // Linear gradient for the WELCOME TO PONG text
    const welcomeTextGradient = {
      start: { x: -this.stage.width() / 2, y: 0 },
      end: { x: this.stage.width() / 2, y: 0 },
      colorStops: [0, leftPaddleColor, 1, rightPaddleColor],
    }

    // Add the text with the linear gradient
    const welcomeText = new Konva.Text({
      x: this.stage.width() / 2,
      y: this.stage.height() / 2 - 150,
      text: `WELCOME TO PONG`,
      fontSize: 80,
      fontFamily: `BaseRetroWave`,
      fillLinearGradientStartPoint: welcomeTextGradient.start,
      fillLinearGradientEndPoint: welcomeTextGradient.end,
      fillLinearGradientColorStops: welcomeTextGradient.colorStops,
      shadowColor: `rgba(255, 154, 0, 0.9)`,
      shadowBlur: 10,
    })

    welcomeText.offsetX(welcomeText.width() / 2)
    this.startGameLayer.add(welcomeText)

    // Linear gradient for the START GAME button
    const buttonGradient = {
      start: { x: -150 / 2, y: 0 },
      end: { x: 150 / 2, y: 0 },
      colorStops: [0, leftPaddleColor, 1, rightPaddleColor],
    }

    // Add the button with the linear gradient
    const buttonWidth = 150
    const buttonHeight = 40
    const buttonX = (this.stage.width() - buttonWidth) / 2
    const buttonY = this.stage.height() / 2 - 20

    const startButtonRect = new Konva.Rect({
        x: buttonX,
        y: buttonY,
        width: buttonWidth,
        height: buttonHeight,
        fillLinearGradientStartPoint: buttonGradient.start,
        fillLinearGradientEndPoint: buttonGradient.end,
        fillLinearGradientColorStops: buttonGradient.colorStops,
        cornerRadius: 5,
        listening: true,
        shadowColor: `rgba(255, 154, 0, 0.9)`,
        shadowBlur: 10,
        strokeWidth: 2,
    })

    const startButtonText = new Konva.Text({
        x: buttonX + buttonWidth / 2,
        y: buttonY + buttonHeight / 2,
        text: `START GAME`,
        fontSize: 20,
        fontFamily: `BaseRetroWave`,
        color: `white`,
        fill: `white`,
        align: `center`,
        verticalAlign: `middle`,
        listening: false,
    })

    startButtonText.offsetX(startButtonText.width() / 2)
    startButtonText.offsetY(startButtonText.height() / 2)

    this.startGameLayer.add(startButtonRect)
    this.startGameLayer.add(startButtonText)

    startButtonRect.on(`mouseover`, () => {
      document.body.style.cursor = `pointer`
      // Make the button border glow in neon pink when hovered
      startButtonRect.stroke(`rgba(255, 0, 255, 0.8)`)
      this.startGameLayer.batchDraw()
  })

  startButtonRect.on(`mouseout`, () => {
      document.body.style.cursor = `default`
      // Revert back to the original border color when not hovered
      startButtonRect.stroke(``)
  })

    startButtonRect.on(`click`, this.startGame.bind(this))

    // Add player one controls text
    const playerOneControlsText = new Konva.Text({
      x: this.stage.width() / 2 - 400,
      y: this.stage.height() / 2 + 200, // Adjust the Y position as needed
      text: `Player one: ↑ S ↓ X`,
      fontSize: 20,
      fontFamily: `BaseRetroWave`,
      fill: `white`,
      shadowColor: `rgba(255, 154, 0, 0.9)`,
      shadowBlur: 10,
      align: `center`,
    })
    playerOneControlsText.offsetX(playerOneControlsText.width() / 2)
    this.startGameLayer.add(playerOneControlsText)

    // Add player two controls text
    const playerTwoControlsText = new Konva.Text({
      x: this.stage.width() / 2 + 400,
      y: this.stage.height() / 2 + 200, // Adjust the Y position as needed
      text: `Player two: ↑ arrowUp ↓ arrowDown`,
      fontSize: 20,
      fontFamily: `BaseRetroWave`,
      fill: `white`,
      shadowColor: `rgba(255, 154, 0, 0.9)`,
      shadowBlur: 10,
      align: `center`,
    })
    playerTwoControlsText.offsetX(playerTwoControlsText.width() / 2)
    this.startGameLayer.add(playerTwoControlsText)

    const ball = new Konva.Circle({
      x: this.stage.width() / 2,
      y: this.stage.height() / 2 + 100,
      radius: 20,
      fill: `rgba(0, 101, 255, 0.9)`,
      shadowColor: `rgba(0, 101, 255, 0.9)`,
      shadowBlur: 25,
      shadowOpacity: 1,
    })
  
    this.startGameLayer.add(ball)
  
    // Animation parameters
    const amplitude = 600
    const period = 3500
    const centerX = this.stage.width() / 2
  
    const anim = new Konva.Animation((frame) => {
      ball.x(
        amplitude * Math.sin(((frame?.time ?? 0) * 2 * Math.PI) / period) + centerX
      )
    }, this.startGameLayer)
  
    anim.start()

    this.startGameLayer.batchDraw()
  }

    private ballSpeed!: number
    private ballXDirection = 1
    private ballYDirection = 1
    private ballColor = `#0065FF`
    private ballBorderColor = `black`
    private ballRadius = 12
    private ballX = 0
    private ballY = 0

    // On set les propriétés de la ball dans un .Group
    generateBall(): Konva.Group {
      const ballRadius = this.ballRadius
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
    generatePaddle(side: `Left` | `Right`, color: string): Konva.Group {
      const paddleWidth = 15
      const paddleHeight = 150
      const stageHeight = this.stage.height()
    
      const paddleX = side === `Left` ? paddleWidth : this.stage.width() - paddleWidth * 2
      const paddleY = stageHeight / 2 - paddleHeight / 2
    
      const paddle = new Konva.Rect({
        x: 0,
        y: 0,
        width: paddleWidth,
        height: paddleHeight,
        fill: color,
        stroke: `black`,
        strokeWidth: 2,
        shadowColor: color,
        shadowBlur: 10,
        shadowOpacity: 1
      })
    
      const paddleGroup = new Konva.Group({
        x: paddleX,
        y: paddleY,
      })
    
      paddleGroup.add(paddle)
    
      return paddleGroup
    }

    startGame() {
      if (!this.gameStarted) {
          // Hide the start game screen and start the game loop
          this.startGameLayer.hide()
          this.gameStarted = true
          this.gameRunning = true
          this.scoreLayer.show()
          this.gameLoop()
      }
    }

      // Besoin d'aide pour le resize(responsive ?)
      generateStage(): Konva.Stage {
        const container = document.getElementById(`konvaRef`)
        if (!container) {
            throw new Error(`Container 'konvaRef' not found.`)
        }

        const stageWidth = container.clientWidth
        const stageHeight = container.clientHeight

        const stage = new Konva.Stage({
            container: `konvaRef`,
            width: stageWidth,
            height: stageHeight,
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
          fillLinearGradientStartPoint: { x: 0, y: 0 },
          fillLinearGradientEndPoint: { x: stage.width(), y: 0 },
          fillLinearGradientColorStops: [0.28, `rgba(140, 20, 90, 1)`, 1, `rgba(210, 100, 0, 1)`],
          stroke: `black`,
        })

        backgroundLayer.add(backgroundRect)
        stage.add(backgroundLayer)
        this.addBackgroundImage()

        // Layer for the score
        const scoreLayer = new Konva.Layer()
        stage.add(scoreLayer)

        this.stage = stage
        this.generateStartGameLayer()

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
      fontFamily: `BaseRetroWave`,
      fill: `black`,
      shadowColor: `rgba(255, 154, 0, 0.9)`,
      shadowBlur: 10,
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
    this.ballSpeed = 10
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
      this.stage.add(this.victoryScreenLayer)
    }

    displayVictoryScreen(winner: `player1` | `player2`) {
      // On stop le jeu (peut-être trouver mieux)
      this.gameRunning = false
    
      // Cache les autres layers / peut etre les delete est plus worth ?
      this.ball.hide()
      this.scoreLayer.hide()
    
      const darkeningRect = new Konva.Rect({
        x: 0,
        y: 0,
        width: this.stage.width(),
        height: this.stage.height(),
        fill: `black`,
        opacity: 0.8, // Set the opacity to darken the background
      })
      this.victoryScreenLayer.add(darkeningRect)

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
        cornerRadius: 10,
      })
    
      this.victoryScreenLayer.add(rect)
    
      const victoryTextGradient = {
        start: { x: -this.stage.width() / 2, y: 0 },
        end: { x: this.stage.width() / 2, y: 0 },
        colorStops: [0, `#ff9a00`, 1, `#9a198a`],
      }

      // On add le message de victoire du player concerné
      const text = new Konva.Text({
        x: this.stage.width() / 2,
        y: this.stage.height() / 2 - 60,
        text: `PLAYER ${winner === `player1` ? `1` : `2`} WINS!`,
        fontSize: 40,
        fontFamily: `BaseRetroWave`,
        fillLinearGradientStartPoint: victoryTextGradient.start,
        fillLinearGradientEndPoint: victoryTextGradient.end,
        fillLinearGradientColorStops: victoryTextGradient.colorStops,
        shadowBlur: 10,
      })
    
      text.offsetX(text.width() / 2)
    
      this.victoryScreenLayer.add(text)

      const gameOverText = `GAME OVER`
      const letterSpace = 45
      const letters: Konva.Text[] = []

      for (let i = 0; i < gameOverText.length; i++) {
        const letter = new Konva.Text({
          x: this.stage.width() / 2 - (gameOverText.length * letterSpace) / 2 + i * letterSpace,
          y: -80,
          text: gameOverText[i],
          fontSize: 80,
          fontFamily: `BaseRetroWave`,
          fillLinearGradientStartPoint: victoryTextGradient.start,
          fillLinearGradientEndPoint: victoryTextGradient.end,
          fillLinearGradientColorStops: victoryTextGradient.colorStops,
          shadowBlur: 10,
        })

        letters.push(letter)
        this.victoryScreenLayer.add(letter)
      }

      this.victoryScreenLayer.batchDraw()

      // Animate the falling letters
      const animationDuration = 2 // Duration of the falling animation in seconds
      const animationDelay = 0.1 // Delay between each letter's animation in seconds

      letters.forEach((letter, index) => {
        const targetY = this.stage.height() / 4
        const tween = new Konva.Tween({
          node: letter,
          y: targetY, // Move the letter downwards
          duration: animationDuration,
          easing: Konva.Easings.BounceEaseOut,
          delay: index * animationDelay,
          onFinish: () => {
            if (index === letters.length - 1) {
              // After the last letter's animation is complete
              tween.reverse()
              tween.play()
            }
          },
        })

        tween.play()
      })

      const confettiCount = 200 // Number of confetti particles
      const confettiColors = [`#ff9a00`, `#9a198a`, `#ff00f1`, `#fc8741`] // Colors for the confetti particles

      for (let i = 0; i < confettiCount; i++) {
        const confettiSize = Math.random() * 20 + 30 // Increase the size of each confetti
        const confetti = new Konva.Rect({
          x: this.stage.width() / 2,
          y: this.stage.height() / 2,
          width: confettiSize,
          height: confettiSize,
          fill: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        })
    
        this.victoryScreenLayer.add(confetti)
    
        const angle = Math.random() * Math.PI * 2 // Random angle for each confetti
        const power = 150 + Math.random() * 200 // Increase the power for each confetti
    
        // Set the confetti behind the 'GAME OVER' text
        confetti.zIndex(-10)
    
        const animation = new Konva.Tween({
          node: confetti,
          x: confetti.x() + Math.cos(angle) * power,
          y: confetti.y() + Math.sin(angle) * power,
          rotation: Math.random() * 360 * 5,
          opacity: 0,
          duration: 2.5,
          onFinish: () => {
            confetti.destroy()
            this.victoryScreenLayer.batchDraw()
          },
        })
    
        animation.play()
      }

      // Display du score sur le Vscreen (à bouger pour faire + beau)
      const scoreText = new Konva.Text({
        x: this.stage.width() / 2,
        y: this.stage.height() / 2,
        text: `${this.player1Score} : ${this.player2Score}`,
        fontSize: 30,
        fontFamily: `BaseRetroWave`,
        fill: `black`,
        shadowColor: `rgba(255, 154, 0, 0.9)`,
        shadowBlur: 10,
      })
    
      scoreText.offsetX(scoreText.width() / 2)
    
      this.victoryScreenLayer.add(scoreText)
    
      // Bouton `Rejouer`
      const buttonWidth = 150
      const buttonHeight = 40
      const buttonX = (this.stage.width() - buttonWidth) / 2
      const buttonY = this.stage.height() / 2 + 60

      const buttonGradient = {
        start: { x: -150 / 2, y: 0 },
        end: { x: 150 / 2, y: 0 },
        colorStops: [0, `#ff9a00`, 1, `#9a198a`],
      }
      const buttonRect = new Konva.Rect({
        x: buttonX,
        y: buttonY,
        width: buttonWidth,
        height: buttonHeight,
        fillLinearGradientStartPoint: buttonGradient.start,
        fillLinearGradientEndPoint: buttonGradient.end,
        fillLinearGradientColorStops: buttonGradient.colorStops,
        cornerRadius: 5,
        listening: true,
        shadowColor: `rgba(255, 154, 0, 0.9)`,
        shadowBlur: 10,
        strokeWidth: 2,
    })
    
      const buttonText = new Konva.Text({
        x: buttonX + buttonWidth / 2,
        y: buttonY + buttonHeight / 2,
        text: `PLAY AGAIN`,
        fontSize: 20,
        fontFamily: `BaseRetroWave`,
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
        buttonRect.stroke(`rgba(255, 0, 255, 0.8)`)
        this.startGameLayer.batchDraw()
      })
    
      // Et le repasse en default quand la souris sort
      buttonRect.on(`mouseout`, () => {
        document.body.style.cursor = `default`
        buttonRect.stroke(``)
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
      this.scoreLayer.draw()
    }

    resetVictoryScreen() {
      this.victoryScreenLayer.destroyChildren()
      this.victoryScreenLayer.hide()
    }

    addBackgroundImage() {
      const backgroundImage = new Image()
      backgroundImage.src = backgroundImageUrl

      backgroundImage.onload = () => {
          const background = new Konva.Image({
              image: backgroundImage,
              width: this.stage.width(),
              height: this.stage.height(),
          })

          this.backgroundLayer.add(background)
          this.backgroundLayer.draw()
      }
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
  const paddleHeight = 150

  // On check si la position de la balle se trouve à l'intérieur des coordonnées de la paddle
  // la paddle dans sa largeur est représentée par paddleX + paddleWidth _
  // la paddle en hauteur, c'est paddleY + paddleHeight |
  if ((this.ballX - ballRadius <= paddleLeftX + paddleWidth && this.ballY >= paddleLeftY && this.ballY <= paddleLeftY + paddleHeight))
    {
      this.ballX = (paddleLeftX + paddleWidth) + ballRadius
      this.ballXDirection *= -1
      this.ballSpeed += 0.5
    }
  if((this.ballX + ballRadius >= paddleRightX && this.ballY >= paddleRightY && this.ballY <= paddleRightY + paddleHeight))
    {
    this.ballX = paddleRightX - ballRadius
    this.ballXDirection *= -1
    this.ballSpeed += 0.5
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
        shadowColor: `rgba(0, 101, 255, 0.9)`,
        shadowBlur: 5,
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

        if (paddleY > -3) {
          paddle.y(paddleY)
        }
      }
      
      movePaddleDown(paddle: Konva.Group): void {
        const paddleY = paddle.y() + this.paddleSpeed
        const paddleHeight = paddle.height()
        const stageHeight = this.stage.height()
        
        // Check if the paddle's bottom position is below the stage's height - paddle's height
        if (paddleY < (stageHeight - paddleHeight) - 140) {
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