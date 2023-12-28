import { defineStore } from 'pinia';

export const useTestStore = defineStore('test', {
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCounter: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
