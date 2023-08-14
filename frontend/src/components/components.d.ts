/* eslint-disable */
/* prettier-ignore */
import '@vue/runtime-core'

export { }

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    MyButton: typeof import('./myButton.vue')['default']
  }
}