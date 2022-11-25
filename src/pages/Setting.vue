<script setup>
  import {ref,onMounted,computed} from 'vue' 
  import { useCounterStore } from 'stores/belanja';
  import Kamubelumlogin from 'src/components/Kamubelumlogin.vue'
  const store = useCounterStore();
  let dialoglogout = ref(false)
  let dialogmaulogin = ref(false)
  let userdata = ref([])

// SIGNOUT
  import {app} from 'src/firebase/firebase.js'
  import { getAuth, signOut,onAuthStateChanged } from "firebase/auth";
const auth = getAuth(app);
// GET LOCALSOTRAGE
function checkuser(){
  onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
  } else {
    console.log("belum ada user")
  }
})
}
// logout btn
  function logoutbtn(){
    signOut(auth).then(() => {
  store.logoutlogin()
  let dialoglogout = ref(true)
  userdata.value = null
  store.logoutlogin()
  console.log(userdata)
  checkuser()
}).catch((error) => {
  console.log(error)
});
  }

onMounted(async()=>{
  checkuser()
userdata.value.push(store.dataLogin)
console.log(store.getdatalogin)
})
 
</script>
<template>
  <q-page padding>
    <div class="column">
      <div class="row text-bold text-h6">Setting</div>
      <!-- JIKA ADA USER -->
      <div v-if="userdata.length > 0 && store.dataLogin.email != undefined">
        <div v-for="p in userdata">
          <q-card class="q-pa-md">
              <div class="column">
                <div class="row ">
                <img :src="p.photoURL"
                style="max-height: 200px;"
                 alt="">
              </div>
              <div class="row ">
                 <div class="text-body1">{{p.displayName}}</div>
              </div>
              <div class="row">
                 <div class="text-subtitle2">{{p.email}}</div>
              </div>
              </div>
          </q-card>
          <div class="column q-pa-md">
            <div class="row ">
              <q-btn color="red" @click="logoutbtn">logout</q-btn>
            </div>
          </div>
        </div>
      </div>


      <!-- JIKA TIDAK ADA USER -->
      <div v-else>
        <div class="column " style="margin-top:50%">
          <div class="row justify-center">
        
          <div class="text-h5">kamu Belum Login</div>
      </div>
      <div class="row justify-center">
        <img src="~/assets/anim_login.gif"
        style="height: 200px;" 
         alt="">
      </div>
      <div class="row justify-center">
          <q-btn color="primary" 
          @click="dialogmaulogin=true"
          >Hubungkan akun email</q-btn>
      </div>
        </div>  
    </div>



    <!-- KOSONGAN ELSE -->
    
      </div>
      <!-- dialog SUccess logout -->
  <q-dialog v-model="dialoglogout" position="top">
    <q-card>
      <q-card-section>
        <h1>berhasil logout</h1>
      </q-card-section>
    </q-card>
  </q-dialog>

  <!-- dialog mau login -->
   <!-- dialog mau login ? -->
    <q-dialog v-model="dialogmaulogin"
    maximized
    position="bottom"
     transition-show="slide-up"
      transition-hide="slide-down"

    >
      <q-card style="border-top: 5px solid lightblue;">
        <q-card-section>
        <Kamubelumlogin/>
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-page>
</template>


