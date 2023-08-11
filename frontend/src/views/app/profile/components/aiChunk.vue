<template>
	<div class="ai-chunk">
	  <b class="loading" @click="handleClick">{{ buttonText }}</b>
	</div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue'
  
  export default defineComponent({
	data() {
	  return {
		buttonText: `VALIDATE`,
		toggle: true,
		timeout: null,
	  }
	},
	methods: {
	  handleClick() {
		clearTimeout(this.timeout)
		this.toggle = !this.toggle
		this.$emit(`reset`)
	  },
	  handleSaved() {
		this.buttonText = `OK`
		this.$el.classList.add(`ok`)
		this.$el.classList.remove(`danger`)
	  },
	  handleError() {
		this.buttonText = `ERROR`
		this.$el.classList.add(`danger`)
		this.$el.classList.remove(`ok`)
	  },
	  handleReset() {
		this.buttonText = `Validate`
		this.$el.classList.remove(`ok`, `danger`)
		this.timeout = setTimeout(() => {
		  if (!this.toggle) {
			this.$emit(`saved`)
		  } else {
			this.$emit(`error`)
		  }
		}, 3000)
	  },
	},
	mounted() {
	  this.handleReset()
	},
  })
  </script>
  
  <style lang="scss">
  $bg: #17262b29;
  $glow1: #00d8ff;
  $glow2: #ff3f00;
  $glow3: #3bff00;

  
  $size: 15em;
  
  .ai-chunk {
	text-align: center;
  
	.loading {
      z-index: 100;
	  cursor: pointer;
	  font-size: .5em;
	  color: white;
	  font-weight: 100;
	  width: $size * 1.8;
	  height: $size * 1.8;
	  line-height: $size * 1.8;
	  text-align: center;
	  position: fixed;
	  left: 47%;
	  top: 50%;
	  margin-left: -($size / 2);
	  margin-top: -($size / 2);
	  border-radius: 100%;
	  background: black;
  
	  border: 2px solid $glow1;
  
	  box-shadow: 0 0 0 0 $bg, 0 0 2px 3px $glow1, 0 0 4px 25px $bg, 0 0 1px 32px $bg, 0 0 32px 25px $glow1,
		0 0 32px 25px $bg;
  
	  animation: pulse 3.4s linear infinite;
	  transition: all 3.3s ease;
  
	  &::before {
		$multi: 3.55;
  
		box-sizing: border-box;
		content: "";
		border-radius: 100%;
  
		animation: rotate 2.45s linear infinite;
  
		transition: opacity 2s ease 2.6s, border 2.4s ease 2s, width 2.4s ease 2.2s, height 2.4s ease 2.2s,
		  margin 2.4s ease 2.2s;
  
		position: absolute;
		left: 50%;
		top: 50%;
  
		width: $size * $multi;
		height: $size * $multi;
		margin-left: -(($size * $multi) / 2);
		margin-top: -(($size * $multi) / 2);
  
		border-top: 1px solid $glow3;
		border-bottom: 1px solid $glow2;
	  }
  
	  &.danger {
		border-color: $glow2;
		box-shadow: 0 0 10px 2px $glow2;
		animation: none;
  
		&::before {
		  border-color: $glow2;
		  opacity: 0;
  
		  $multi: 7;
		  width: $size * $multi;
		  height: $size * $multi;
		  margin-left: -(($size * $multi) / 2);
		  margin-top: -(($size * $multi) / 2);
		}
	  }
  
	  &.ok {
		border-color: $glow3;
		box-shadow: 0 0 10px 0px $glow3;
		animation: none;
  
		&::before {
		  border-color: $glow3;
		  opacity: 0;
  
		  $multi: 3.6;
		  width: $size * $multi;
		  height: $size * $multi;
		  margin-left: -(($size * $multi) / 2);
		  margin-top: -(($size * $multi) / 2);
		}
	  }
	}
  }
  
  @keyframes rotate {
	0% {
	  transform: rotate(0deg);
	}
	100% {
	  transform: rotate(360deg);
	}
  }
  
  @keyframes pulse {
	0% {
	  box-shadow: 0 0 0 0 $bg, 0 0 2px 3px $glow1, 0 0 1px 32px $bg, 0 0 32px 25px $glow1;
	}
  
	49.9% {
	  box-shadow: 0 0 1px 32px $bg, 0 0 32px 25px $glow1, 0 0 1px 64px $bg, 0 0 60px 25px $glow1;
	}
  
	50% {
	  box-shadow: 0 0 0 0 $bg, 0 0 2px 3px $glow1, 0 0 1px 32px $bg, 0 0 32px 25px $glow1;
	}
  
	100% {
	  box-shadow: 0 0 1px 32px $bg, 0 0 32px 25px $glow1, 0 0 1px 64px $bg, 0 0 60px 25px $glow1;
	}
  }

  </style>
  