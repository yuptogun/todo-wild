import { App } from "vue";
import { useStorage } from "@vueuse/core";

export default {
  install: (app: App) => {
    app.provide('localStorage', useStorage("todo_wild", {
      selected_list_id: 0,
      show_clock: {
        online: false,
        offline: true,
      },
    }, localStorage));
  }
}
