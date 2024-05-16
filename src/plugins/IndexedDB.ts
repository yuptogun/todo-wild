import { App } from "vue"
import TodoRepo from "../repositories/todoRepo.ts"

export default {
  install: (app: App) => {
    const repo = new TodoRepo()
    app.provide('repo', repo)
  }
}
