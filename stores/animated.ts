import { defineStore } from 'pinia';

export const useAnimatedStore = defineStore('animated', {
  state: () => ({
    animated: true,
  }),
  actions: {
    toggle() {
      this.animated = !this.animated;
    },
    turnon() {
      this.animated = true;
    },
    turnoff() {
      this.animated = false;
    },
  },
});
