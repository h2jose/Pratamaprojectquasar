<script setup>
// COMPONENT

  import {ref,onMounted} from 'vue'
  import {app} from 'src/firebase/firebase.js'
  import { useCounterStore } from 'stores/belanja';
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import Kamubelumlogin from 'src/components/Kamubelumlogin.vue'

 import { useQuasar } from 'quasar'
 const $q = useQuasar()

   const store = useCounterStore();
   let tab = ref("home")
   let dialogmaulogin =  ref(false)
    // CHECK USER LOGIN
const auth = getAuth(app);
function checkuser(){
  onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
     store.tambahdatalogin(user)
  } else {
    console.log("belum ada user")
    dialogmaulogin.value = true
  }
})
}

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
      checkuser()
    }
     
    if(store.dataLogin.length > 0){
  $q.notify({
          message: 'Anda Sudah Login',
          color: 'primary',
          multiLine: true,
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          actions: [
            { label: 'ok', color: 'yellow', handler: () => { /* ... */ } }
          ]
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
 })

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


  </q-layout>
</template>