<script setup>
  import {ref,onMounted} from 'vue'
  import { useCounterStore } from 'stores/belanja';
   const store = useCounterStore();
  import { getAuth, signOut } from "firebase/auth";
  import {app} from 'src/firebase/firebase.js'
  import Kamubelumlogin from 'src/components/Kamubelumlogin.vue'
  import Resetakun from 'src/components/Resetakun.vue'

  let dialoglogin = ref(false)
const auth = getAuth(app);
let datauser = ref(store.dataLogin)
let dialoggantipassword = ref(false)

onMounted(async()=>{
// GET STORE LOGIN
await store.dataLogin
})
  // LOGOUT
function logoutbtn(){
  signOut(auth).then(() => {
}).catch((error) => {
  console.log(error)
})
}

</script>
<template>
  <q-page>
  <!-- JIKA ADA USER -->
   <div class="column q-pa-md" v-if="store.dataLogin !== null">
    <div class="row">
      <div class="text-h6">Informasi Akun anda</div>
    </div>
    <div class="row justify-center">
      <q-card class="q-pa-md">
        <div class="column">
          <div class="row">
            <div class="text-h6">{{datauser.displayName}}</div>
          </div>
          <div class="row ">
            <div class="text-body1 text-bold">{{datauser.email}}</div>
          </div>
        </div>
      </q-card>
    </div>
    <div class="row q-pa-md">
      <div class="text-subtitle1 text-bold">Pengaturan</div>
    </div>
    <div class="row q-pa-md" q-ripple>
      <q-list bordered separato style="width: 100%;">
      <q-item clickable v-ripple>
        <q-item-section @click="dialoggantipassword=true">Ganti Password anda</q-item-section>
      </q-item>
      </q-list>
    </div>
    <div class="row justify-center q-pa-md">
      <q-btn color="red"  full-width icon="logout"
      @click="logoutbtn"
      >Logout</q-btn>
    </div>
  </div>

    <!-- Jika LOGOUT -->
    <div v-else class="q-mt-lg">
      <div class="column justify-center">
        <div class="row justify-center">
          <img src="~assets/anim_login.gif"
        style="max-width:200px" 
         alt="">
        </div>
      <div class="row justify-center">
        <div class="text-body1 text-bold">kamu belum Login</div>
      </div>
       <div class="row justify-center">
        <q-btn color="primary"
        @click="dialoglogin=true"
        >Hubungkan Akun email anda</q-btn>
      </div>
    </div>
    </div>


    <!-- dialog login -->
    <q-dialog v-model="dialoglogin" position="bottom">
      <q-card>
        <Kamubelumlogin/>
      </q-card>
    </q-dialog>


    <!-- dialog GANTI PASSWORD -->
    <q-dialog v-model="dialoggantipassword" maximized
     transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <q-card-section>
          <q-btn icon="arrow_back" @click="dialoggantipassword=false" flat></q-btn>
        </q-card-section>
        <q-card-section>
         <Resetakun/>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>