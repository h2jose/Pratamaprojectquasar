import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 0,
    dataFirebase:[],
    dataPromo:[],
    keranjang:[],
    dataLogin:[]
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
    getdataFirebase:(state)=> state.dataFirebase.reverse(),
    getdataPromo:(state)=> state.dataPromo.reverse(),
    getkeranjang:(state)=> state.keranjang.reverse(),
    getdatalogin:(state)=> state.dataLogin,
  },
  actions: {
    increment() {
      this.counter++;
    },
    // AUTENTIFIKASI
    tambahdatalogin(p){
      this.dataLogin = p
    },
    userLogouthapus(){
      this.dataLogin = null
    },
    getalldataFirebase(doc){
      this.dataFirebase.push({id:doc.id,data:doc.data()})
    },
      getallPromoData(doc){
      // console.log("tolol")
      // console.log(doc)
      this.dataPromo.push({id:doc.id,data:doc.data()})
    },
    masukkeranjang(p){
      this.keranjang.push(p)
      console.log("Darto dqw")
      console.log(p)
      // localstorage.setItem
    },
    hapusdatafirebase(){
      this.dataFirebase = null
    },
    logoutlogin(){
      this.dataLogin = ""
      console.log(this.dataLogin)
    }
  },
});
