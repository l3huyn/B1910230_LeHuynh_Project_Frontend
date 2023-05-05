import { defineStore } from 'pinia'
export const useStore = defineStore('stores', {
  state: () => ({
   account: {},
   checkLogin: Boolean

  }),
  getters: {
    
  },
  actions: {
    onAccount(data) {
      this.account = data
      this.checkLogin = true
      console.log(this.account);
      console.log(this.checkLogin);
    }
  },
})