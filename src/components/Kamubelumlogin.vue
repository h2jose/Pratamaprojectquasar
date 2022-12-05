<script setup>
  import Daftarpage from 'src/components/Daftarpage.vue'
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  import {app} from 'src/firebase/firebase.js'
  import {ref} from 'vue'
import {useRouter} from 'vue-router'
  let dialoglogin = ref(false)
  let isPwd = ref(true)
  let dialogregister = ref(false)
  let username = ref("")
  let password = ref("")

const router = useRouter()
let dialogloginerror = ref(false)
let msgeror = ref()
  // FUNGSI LOGIN
const auth = getAuth(app);
function loginbtn(){
  let email = username.value
  let pwd = password.value
signInWithEmailAndPassword(auth, email, pwd)
  .then((userCredential) => {
    const user = userCredential.user;
    if(user.email == username.value){
      dialoglogin.value = false
}
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
dialogloginerror.value = true
msgeror.value = errorMessage
  });
}
</script>
<template>
<div>
<div class="column">
 <div class="row justify-center">
    <img src="~assets/anim_login.gif"
  style="max-height: 150px;max-width: 200px;" 
   alt="">
 </div>
 <div class="row justify-center">
   <q-btn class="bg-primary text-white" @click="dialoglogin=true">Login Sekarang</q-btn>
 </div>
 
</div>
</div>
<q-dialog v-model="dialoglogin" 
  transition-show="slide-left"
  maximized
      transition-hide="slide-right"
      >
  <q-card style="width:100%;height: 100%;">
   <q-card-section>
      <div class="column">
        <div class="row ">
          <q-btn icon="close" flat color="primary"
          @click="dialoglogin=false"
          ></q-btn>
        </div>
        <div class="row justify-center ">
          <div class="text-h6">Masuk Ke Akun anda</div>
        </div>
        <div class="row justify-center q-pa-md">
        <q-input rounded outlined v-model="username" 
        style="width: 100%;"
        label="Email" />
   </div>
   <div class="row justify-center q-pa-md">
     <q-input v-model="password" 
        style="width: 100%;"
      label="password"
     rounded outlined :type="isPwd ? 'password' : 'text'" >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
   </div>
   <div class="row justify-center q-pa-md">
     <q-btn color="primary" style="width: 100%;"
     @click="loginbtn"
     >Login</q-btn>
   </div>
   <div class="row justify-center q-pa-md">
    <div class="text-subtitle2">Belum punya akun ? <q-btn flat
   @click="dialogregister=true"
      >Daftar </q-btn></div>
   </div>

    </div>
   </q-card-section>
  </q-card>
</q-dialog>

<!-- DIALOG DAFTAR -->
<q-dialog v-model="dialogregister"
    transition-show="slide-up"
      transition-hide="slide-down"
  maximized
>
  <q-card class="bg-primary text-white">
    <q-card-section>
        <div class="row ">
          <q-btn icon="arrow_back" flat color="white"
          @click="dialogregister=false"
          ></q-btn>
     <div class="text-h6">Register</div>
        </div>
        <div class="row justify-center">
      <Daftarpage/>
        </div>
    </q-card-section>
  </q-card>
</q-dialog>

<q-dialog v-model="dialogloginerror"
    transition-show="slide-up"
      transition-hide="slide-down"
  position="bottom"
>
  <q-card class="bg-primary text-white">
    <q-card-section>
        <div class="row ">
          <div class="text-body1">Login Anda Salah</div>
          <div class="text-caption">Detail : {{msgeror}}</div>
         </div>
    </q-card-section>
  </q-card>
</q-dialog>
</template>