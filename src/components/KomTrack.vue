<script setup>
	import {ref,onMounted} from 'vue'
  import {app} from 'src/firebase/firebase.js'
  import { getFirestore,collection,query,where, doc, getDocs } from 'firebase/firestore'
  import { useCounterStore } from 'stores/belanja';
   const store = useCounterStore();
   let datatransaksi = ref([])

   // GET DATA TRANSAKSI
	 onMounted(async()=>{
    	// GET DATA TERLARIS > 
   const db = getFirestore(app);
   let email = store.dataLogin.email 
const q = query(collection(db, "transaksi"), where("email", "==",email ));
 	const querySnapshot = await getDocs(q);
 	if(querySnapshot != null){
 		querySnapshot.forEach((doc) => {
	console.log(doc.data())
  datatransaksi.value.push({id:doc.id,data:doc.data()})
});
 	}
})
</script>
<template>
	<div>
		<div class="column q-pa-md">
			<div class="row">
				<div class="text-body1">Data pembelian</div>
			</div>
			<!-- JIKA ADA DATA -->
			<div v-if="datatransaksi.value != null">
				<div class="row">
				<q-card>
					{{JSOn.stringify(datatransaksi)}}
				</q-card>
			</div>
			</div>

			<!-- JIKA KOSONG -->
			<div v-if="store.dataLogin.email != null && datatransaksi.value == null">
					<div class="column justify-center">
						<div class="row justify-center">
							<img src="~assets/emptytrack.gif"
							style="max-height: 300px;"
							 alt="">
						</div>
						<div class="row justify-center">
							<div class="text-body1">
						    Kamu belum mempunyai transaksi
					      </div>
						</div>	
					</div>
			</div>

			<!-- JIKA BELUM LOGIN -->
			<div v-if="store.dataLogin.value == null"
			style="margin-top:70px"
			>
				<div class="column justify-center">
					<div class="row justify-center">
						<img src="~assets/anim_login.gif" 
						style="max-height: 200px;"
						alt="">
					</div>
					<div class="row justify-center">
						<div class="text-subtitle2">
							Login Untuk melihat transaksi
						</div>
					</div>
				</div>
			</div>
			<div v-else>
				null
			</div>

		</div>
	</div>
</template>