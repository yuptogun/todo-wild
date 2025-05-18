import { App } from "vue";
import LocalStorage from "../repositories/localStorage.ts";

export default {
  install: (app: App) => {
    const repo = new LocalStorage();
    app.provide('localStorage', repo);
  }
}
