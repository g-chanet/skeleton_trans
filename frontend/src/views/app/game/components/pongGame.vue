<template>
  <title>Pong!</title> 

  <div id="sidebar">

    <div class='description'>
      <p>
        Press <b>1</b> for a single player game.<br>
        Press <b>2</b> for a local multiplayer game.<br>
        Press <b>0</b> to watch the computer play itself.
      </p>
      <p>
        Player 1 moves using the <b>Q</b> and <b>A</b> keys.<br>
        Player 2 moves using the <b>P</b> and <b>L</b> keys.
      </p>
      <p>
        <b>Esc</b> can be used to abandon a game.
      </p>
    </div>

    <div class='settings'>
      <label for='sound'>sound: </label>
      <input type='checkbox' id='sound'>
    </div>

    <div class='settings'>
      <label for='stats'>stats: </label>
      <input type='checkbox' id='stats' checked>
    </div>

    <div class='settings'>
      <label for='footprints'>footprints: </label>
      <input type='checkbox' id='footprints'>
    </div>

    <div class='settings'>
      <label for='predictions'>predictions: </label>
      <input type='checkbox' id='predictions'>
    </div>

  </div>

  <canvas id="game">
    <div id="unsupported">
      Sorry, game cannot be run because your browser does not support the canvas element
    </div>
  </canvas>
</template>

<script lang="ts">

import { ready, start, addEvent, Pong } from './pong.js'

export default {
  mounted() {
    ready(() => {
      const gameCanvas = document.getElementById(`game`)
      const sound = document.getElementById(`sound`) as HTMLInputElement
      const stats = document.getElementById(`stats`) as HTMLInputElement
      const footprints = document.getElementById(`footprints`) as HTMLInputElement
      const predictions = document.getElementById(`predictions`) as HTMLInputElement

      const pong = start(gameCanvas, Pong, {
        sound: sound.checked,
        stats: stats.checked,
        footprints: footprints.checked,
        predictions: predictions.checked
      })

      addEvent(sound, `change`, () => {
        pong.enableSound(sound.checked)
      })

      addEvent(stats, `change`, () => {
        pong.showStats(stats.checked)
      })

      addEvent(footprints, `change`, () => {
        pong.showFootprints(footprints.checked)
      })

      addEvent(predictions, `change`, () => {
        pong.showPredictions(predictions.checked)
      })
    })
  }
}
</script>

<style scoped lang="sass">
.unsupported
  border: 1px solid yellow
  color: black
  background-color: #FFFFAD
  padding: 2em
  margin: 1em
  display: inline-block

.sidebar
  width: 18em
  height: 40em
  float: left
  font-size: 0.825em
  background-color: #333
  border: 1px solid white
  padding: 1em

.sidebar h2
  color: white
  text-align: center
  margin: 0

.sidebar .parts
  padding-left: 1em
  list-style-type: none
  margin-bottom: 2em
  text-align: right

.sidebar .parts li a
  color: white
  text-decoration: none

.sidebar .parts li a:visited
  color: white

.sidebar .parts li a:hover
  color: white
  text-decoration: underline

.sidebar .parts li a.selected
  color: #F08010

.sidebar .parts li a i
  color: #AAA

.sidebar .parts li a.selected i
  color: #F08010

.sidebar .settings
  line-height: 1.2em
  height: 1.2em
  text-align: right

.sidebar .settings.speed
  margin-bottom: 1em

.sidebar .settings label
  vertical-align: middle

.sidebar .settings input
  vertical-align: middle

.sidebar .settings select
  vertical-align: middle

.sidebar .description
  margin-bottom: 2em

.sidebar .description b
  font-weight: normal
  color: #FFF

@media screen and (min-width: 0px)
  .sidebar
    display: none
  .game
    display: block
    width: 480px
    height: 360px
    margin: 0 auto

@media screen and (min-width: 800px)
  .game
    width: 640px
    height: 480px

@media screen and (min-width: 1000px)
  .sidebar
    display: block
  .game
    margin-left: 18em

@media screen and (min-width: 1200px)
  .game
    width: 800px
    height: 600px

@media screen and (min-width: 1600px)
  .game
    width: 1024px
    height: 768px
</style>
