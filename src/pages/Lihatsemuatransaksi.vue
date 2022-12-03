<script setup>
	// LIHAT SEMUA TRANSAKSI
	import {ref,onMounted} from 'vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";
	let datatransaksi = ref([])
	import moment from 'moment'
	moment.locale("id")
  import {app} from 'src/firebase/firebase.js'
 import { getFirestore,collection,query,where,doc, getDocs } from 'firebase/firestore'
const auth = getAuth(app);
// format IDR
 const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
})
async function getdatatransaksi(p){
	   	// GET DATA TERLARIS > 
   const db = getFirestore(app);
   console.log("ada" + p)
const q = query(collection(db, "transaksi"), where("email", "==", p));
 	const querySnapshot = await getDocs(q);
 	if(querySnapshot != null){
 		querySnapshot.forEach((doc) => {
	// console.log(doc.data())
  datatransaksi.value.push({id:doc.id,data:doc.data()})
  datatransaksi.value.reverse()
});
 	}
}
	 onMounted(async()=>{
onAuthStateChanged(auth, (user) => {
  if (user) {
  	getdatatransaksi(user.email)
  } else {
  }
});

})
</script>
<template>
	<q-page>
		<div>
			<q-toolbar>
				<q-btn flat icon="arrow_back" round
				@click="$router.go(-1)"
				></q-btn>
				<div class="text-h6">Lihat semua transaksi</div>
			</q-toolbar>
		</div>
		<div class="column">
			<div v-if="datatransaksi.length > 0">
				<div v-for="p in datatransaksi">
				<div class="row q-pa-md justify-center">
					<router-link
					:to="/dialogdetailtrack/ + p.id"
					style="text-decoration: none;color: inherit;"
					>
						<q-card class="q-pa-md" style="width: 100%;" v-ripple>
						<div class="column">
							<div class="row justify-between">
								<div class="text-subtitle2">
									{{p.data.email}}
								</div>
								<div class="text-caption text-grey">
									{{moment(p.data.datenow).fromNow()}}
								</div>
							</div>
							<div class="row">
								<div class="text-caption">
									tipe pembayaran : {{p.data.details.payment_type}}
								</div>
							</div>
								<div class="row justify-between">
								<div class="text-caption">
									Status : <q-chip 
									text-color="white"
									:color="p.data.details.transaction_status == 'capture' ? 'green' : 'red' ">
									{{p.data.details.transaction_status ? "Terbayar" : "blm terbayar"}}</q-chip>
								</div>
								<div class="text-caption">
									Jumlah pesan : {{p.data.jumlahpesan}}
								</div>
							</div>
							<div class="row justify-between">
								<div class="text-caption">
									Total harga : {{formatter.format(p.data.harga)}}
								</div>
								<div class="text-caption">
									<q-chip  text-color="white" :color="p.data.kurir.terkirim == true ? 'green':'orange'">
										{{p.data.kurir.terkirim == false ? 'blm sampai' : 'sudah sampai'}}
									</q-chip>
								</div>
							</div>
							<div class="row justify-end">
								<div class="text-caption text-grey">
									{{p.data.createdAt}}
								</div>
							</div>
						</div>
					</q-card>
					</router-link>
				</div>
			</div>
			</div>

			<!-- JIKA LOADING -->
			<div v-else>
				<div class="column">
					<div class="row justify-center" style="margin-top:50%">
						<q-spinner size="50px"></q-spinner>
					</div>
				</div>
			</div>
		</div>
	</q-page>
</template>