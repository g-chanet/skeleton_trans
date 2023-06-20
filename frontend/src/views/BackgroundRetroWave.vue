<template>
  <div class="background-scene">
    <div class="top">
      <div class="startails">
        <div class="startail-r" />
        <div class="startail-l" />
        <div class="startail-m" />
      </div>
      <div class="top-lines" />
      <div class="brand">
        <div class=".triangle" />
        <div class=".kode-text" />
      </div>
      <div class="sun" />
    </div>
    <div class="bottom">
      <div class="m0" />
      <div class="m1" />
      <div class="m2" />
      <div class="bottom-overlay" />
    </div>
    <div id="stars" />
  </div>
</template>

<script setup lang="ts">
const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}

const render = () => {
  // Create stars ✨
  const stars = document.getElementById("stars")
  stars!.innerHTML = ""
  const w = window.innerWidth
  const h = window.innerHeight
  const starCount = getRandomInt(42, 100)

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div")
    star.classList.add("star")
    const x = getRandomInt(0, w)
    const y = getRandomInt(0, h)
    star.style.setProperty("$--x", `${x}px`)
    star.style.setProperty("$--y", `${y}px`)
    stars!.appendChild(star)
  }
}

requestAnimationFrame(render)
window.addEventListener("resize", () => requestAnimationFrame(render))
</script>

<style scoped lang="scss">
@property --shift {
  syntax: "<number>";
  inherits: false;
  initial-value: 0;
}

$--labs-sys-color-background: #111;
$--labs-sys-color-on-background: white;
$--base-speed: 4s;

$--labs-sys-color-grid: #fac4ff;
$--labs-sys-color-grid-glow: #df7373;
$--labs-sys-color-sun-1: #fdb428;
$--labs-sys-color-sun-2: #f672ca;
$--labs-sys-color-sun-glow: #b9f;

$--labs-sys-color-star: #f6c0c0;

$--color-palm-trunk: #333;
$--color-palm-leaf: #333;
$--color-palm-leaf-2: #b9f;
$--labs-sys-color-triangle: #6eccee;

$--labs-sys-color-volume: $--labs-sys-color-triangle;

@mixin sun-lines {
  $lines: "";
  $end: 0;
  $lineCount: 8;
  @for $i from 1 to $lineCount {$start: $i + $end;
    $end: $start + $lineCount - $i;
    $lines: $lines + " #000 calc(#{$start}% + (3.5% * var(--shift))), 0%, #0000 calc(#{$end}%  + (2.8% * var(--shift))), 0%,";
  }
  $lines: $lines + "#000 calc(56% + (2.5% * var(--shift)))";
  --shift: 1;
  mask: linear-gradient(to top, #{$lines});
  mask-size: 100% 120%;
  -webkit-mask-size: 100% 120%;
  animation: sun calc($--base-speed / 4) linear infinite;
}

.sun {
  position:absolute;
  display: table;
  z-index: 0;
  text-align:center;
  /* Adjust the initial position of the sun */
  top: 26%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(40vmin, 40%);
  aspect-ratio: 1;
  border-radius: 50%;
  // sun 🌅
  &:after {
    content: "";
    position: absolute;
    inset: 0;
    @include sun-lines;
    border-radius: inherit;
    background-image: linear-gradient(to bottom, $--labs-sys-color-sun-1, $--labs-sys-color-sun-2 60%);
  }
  // reflection
  &:before {
    content: "";
    position: absolute;
    inset: 0;
    opacity: 0.6;
    background-image: linear-gradient(
      to top,
      $--labs-sys-color-sun-1,
      $--labs-sys-color-sun-2 55%,
      $--labs-sys-color-triangle 65%,
      $--labs-sys-color-sun-2 69%
    );
    border-radius: inherit;
    //Adjust reflection's position
    transform: translateY(170%) rotateX(40deg) scaleY(1);
    perspective: 6.25rem;
    filter: blur(20px);
  }
  filter: drop-shadow(0 0 4rem $--labs-sys-color-sun-glow);
}

@keyframes sun {
  from {
    --shift: 1;
  }

  to {
    --shift: 3.8;
  }
}

.top-lines {
  background: linear-gradient(
    to bottom,
    $--labs-sys-color-sun-2 0.2vmin,
    transparent 0.2vmin
  );
  background-size: 125rem 0.4vmin;
  position: absolute;
  inset: 0;
  mix-blend-mode: overlay;
  opacity: 0.06;
  pointer-events: none;
}

.top {
  z-index: 1;
  padding-top: 4rem;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-end;
  position: relative;

  // 🏔️
  &:after {
    content: "";
    position: absolute;
    bottom: -0.5vmin;
    left: 0;
    right: 0;
    background: #222;
    height: 5vmin;
    clip-path: polygon(
      0% 38%,
      2.6% 40%,
      5.4% 24%,
      8.7% 59%,
      13.6% 72%,
      18.5% 22%,
      21.7% 35%,
      27.2% 8%,
      34% 53%,
      39.4% 81%,
      49.1% 85%,
      54.5% 64%,
      60% 53%,
      71.4% 80%,
      73.4% 15%,
      79.8% 29%,
      86.5% 15%,
      94.1% 36%,
      100% 27%,
      100% 100%,
      0% 100%
    );
  }
  // 🏔️
  &:before {
    content: "";
    position: absolute;
    bottom: -1vmin;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.2);
    mix-blend-mode: soft-light;
    height: 15vmin;
    backdrop-filter: blur(20px);
    // ⚙️ gen: https://unused-css.com/tools/clip-path-generator?p=22AwLgzAHANATAdANhAFmFArHZIbKhOAdhHQE4oBGMREQmSg9HemCo8dWQuGEaMbOjBQwpLHwpRkYin07pkcJgjwJQQqITa9CaQghq58bbGgjdZVKKUW8YhSsFBh6FJyDdpQngNx+AxE5BwEA
    clip-path: polygon(
      0% 38%,
      2.6% 40%,
      5.4% 24%,
      8.7% 59%,
      13.6% 72%,
      18.5% 22%,
      21.7% 35%,
      27.2% 8%,
      34% 53%,
      39.4% 81%,
      49.1% 85%,
      54.5% 64%,
      60% 53%,
      71.2% 70%,
      76.6% 24%,
      81.4% 0%,
      87.1% 13%,
      94.2% 27%,
      100% 32%,
      100% 100%,
      0% 100%
    );
  }
}

.bottom-overlay {
  perspective: 14.5rem;
  flex: 0 0 12.5rem;
  position: absolute;
  z-index: 10000;
  right: 0;
  left: 0;
  bottom: 0;
  height: 12.5rem;
  background: radial-gradient(
    ellipse at center,
    transparent 50%,
    rgba(30, 30, 30, 0.9) 70%
  );
}

// 🏁
.bottom {
  background: inherit;
  perspective: 14.5rem;
  flex: 0 0 12.5rem;
  position: relative;

  // grid
  &:before {
    content: "";
    position: absolute;
    inset: 0;
    $--line-width: 0.0635rem;
    background: linear-gradient(
        to right,
        $--labs-sys-color-grid $--line-width,
        transparent $--line-width
      ),
      linear-gradient(
        to bottom,
        $--labs-sys-color-grid $--line-width,
        transparent $--line-width
      );
    background-size: 2rem 125rem, 125rem 2rem;
    transform: rotateX(53deg) scale(1.8) translateZ(43px);
    animation: grid calc($--base-speed * 1) linear infinite;
    border-top: 1px solid $--labs-sys-color-grid;
    filter: drop-shadow(0 0 2px $--labs-sys-color-grid-glow);
  }
}

@keyframes grid {
  from {
    background-position-y: -30rem;
  }

  to {
    background-position-y: 0%;
  }
}

// ✨
#stars {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 20rem;
  overflow: hidden;
  left: 0;
  z-index: -1;

  .star {
    position: absolute;
    background: $--labs-sys-color-star;
    width: 0.15rem;
    height: 0.15rem;
    border-radius: 50%;
    transform: translate(var(--x), var(--y));
    box-shadow: 0 0 0.25rem $--labs-sys-color-sun-glow;
  }
  animation: stars 20s linear;
}

@keyframes stars {
  from {
    transform: translateX(0);
  }
  60% {
    transform: translateX(3vmax) rotate(1deg);
  }
  to {
    transform: translateX(0);
  }
}

.startails {
  position: absolute;
  inset: 0;
  overflow: hidden;
  mix-blend-mode: lighten;
}

.startail-r {
  position: absolute;
  left: 75vw;
  bottom: 0;
  background: linear-gradient(
    to right,
    $--labs-sys-color-sun-glow 10%,
    $--labs-sys-color-triangle 50%,
    transparent 80%
  );
  height: 0.2vmin;
  width: 15vmin;
  border-radius: 50%;
  filter: drop-shadow(0 0 15px white);
  transform: translateY(-32vmin) rotate(-20deg);
}

.startail-l {
  position: absolute;
  left: 16vw;
  bottom: 0;
  background: linear-gradient(
    to right,
    $--labs-sys-color-sun-glow 10%,
    $--labs-sys-color-triangle 30%,
    transparent 60%
  );
  height: 0.2vmin;
  width: 17vmin;
  border-radius: 50%;
  filter: drop-shadow(0 0 15px white);
  transform: translateY(-7vmin) rotate(-20deg);
}

.startail-m {
  position: absolute;
  left: 18vw;
  bottom: 0;
  background: linear-gradient(
    to right,
    $--labs-sys-color-sun-glow 10%,
    $--labs-sys-color-triangle 50%,
    transparent 80%
  );
  height: 0.2vmin;
  width: 14vmin;
  border-radius: 50%;
  filter: drop-shadow(0 0 15px white);
  transform: translateY(-18vmin) rotate(-20deg);
  opacity: 0.5;
}

// 🌎
.background-scene {
  position: fixed;
  background-color: $--labs-sys-color-background;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;

  &:after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: url(https://assets.codepen.io/907471/noise.svg);
    opacity: 0.7;
    mix-blend-mode: overlay;
    filter: invert(1);
    z-index: 20000;
  }
}

body {
  background-color: $--labs-sys-color-background;
  color: $--labs-sys-color-on-background;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  color: $--labs-sys-color-triangle;
}

a.labs-follow-me {
  right: unset;
  left: -0.5rem;
}

* {
  user-select: none;
  box-sizing: border-box;
  outline-color: $--labs-sys-color-sun-2;
}
</style>
