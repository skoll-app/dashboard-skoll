import { defineStore } from "pinia";

export const useLoadingStore = defineStore({
  id: "loading",
  state: () => ({
    active: false,
  }),
  getters: {},
  actions: {
    hide() {
      this.active = false;
    },
    show() {
      this.active = true;
    },
  },
});
