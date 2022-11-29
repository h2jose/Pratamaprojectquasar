<script setup>

// COMPONENT

  import {ref,onMounted} from 'vue'
  import {app} from 'src/firebase/firebase.js'
  import { useCounterStore } from 'stores/belanja';
  import Kamubelumlogin from 'src/components/Kamubelumlogin.vue'
  let dialogmaulogin = ref(false)
  let dialogaktif = ref(false)
   const store = useCounterStore();

// CHECK USER APAKAH LOGIN
  import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();

function checkuser(){
  onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    dialogaktif.value = true
   dialogmaulogin.value = false
    store.tambahdatalogin(user)
  } else {
   dialogmaulogin.value = true
    store.userLogouthapus()

  }
});
}


   let tab = ref("home")

// FIRESTORE get DATA 
      import { getFirestore,collection, doc, getDocs } from 'firebase/firestore'
   const db = getFirestore(app);
 onMounted(async()=>{
    const colRef = collection(db, "data_carousel");
    const docsSnap = await getDocs(colRef);
    if(docsSnap !== undefined){
      docsSnap.forEach((doc)=>{
        store.getalldataFirebase(doc)
      })
    }
     
  
    // GET PROMO
    const promoref = collection(db, "promo");
    const promo = await getDocs(promoref);
    if(promo !== undefined){
      promo.forEach((doc)=>{
        store.getallPromoData(doc)
      })
    }

    // CEK USER 
    checkuser()
 })
// REFRESH DATA firebase
//  async function refreshdatafirebase(done){
// store.hapusdatafirebase()
//   setTimeout(async()=>{
//   const colRef = collection(db, "data_carousel");
//   const docsSnap = await getDocs(colRef);
//     if(docsSnap !== undefined){
//       docsSnap.forEach((doc)=>{
//         store.getalldataFirebase(doc)
//       })
//     }
//     done()
//   },2000)
// }
</script>
<template>
  <q-layout>
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
    <q-footer style="position: fixed;">
      <q-card>
      <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="green"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-route-tab name="home" to="/" icon="home" label="home" />
          <q-route-tab name="track" label="track" icon="local_shipping" to="/track" />
          <q-route-tab name="setting" label="saya" icon="face" to="/setting"/>
        </q-tabs>
      
      </q-card>
    </q-footer>

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

    <!-- dialog ada user aktif -->
        <q-dialog v-model="dialogaktif"
    maximized
    position="bottom"
     transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card >
        <q-card-section>
          <div class="row justify-center">
            <img src="~assets/successactive.gif"
            style="max-width:200px"
             alt="">
          </div>
          <div class="row justify-center">
        <div class="text-h6 ">Anda Berhasil Login</div>
          </div>
          <div class="row justify-center">
        <div class="text-subtitle2 ">{{store.dataLogin.email}}</div>
          </div>
          
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>