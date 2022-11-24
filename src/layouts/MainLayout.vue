<script setup>
// COMPONENT

  import {ref,onMounted} from 'vue'
  import {app} from 'src/firebase/firebase.js'
  import { useCounterStore } from 'stores/belanja';
   const store = useCounterStore();
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
  </q-layout>
</template>