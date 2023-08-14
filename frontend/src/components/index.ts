import type { App } from "vue"
import MyButton from "./myButton.vue"

export const cmp = {
  install(app: App) {
    app.component(`MyButton`, MyButton)
  }
}
