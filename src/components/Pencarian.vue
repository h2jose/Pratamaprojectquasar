<script setup>
	import {ref,onMounted} from 'vue'
  import {app} from 'src/firebase/firebase.js'
import { getFirestore,collection,query,where,doc, getDocs } from 'firebase/firestore'
   const db = getFirestore(app);
   let allsearch = ref([])
   let hargacari = ref("3000")
   let nilaiharga = ref(parseInt(hargacari))
   let carisesuatu = ref("")
   let hasilpencarian = ref([])
   let pencarianid = ref()
   let dialogditemukan = ref(false)
   // format idr
    const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
})
// proses cari
function prosescari(){
	pencarianbarang()
}

async function pencarianbarang(){
	const q = query(collection(db, "data_carousel"), where("nama_barang", "==",carisesuatu.value ));
 	const hasilsnap = await getDocs(q);
 	if(hasilsnap != null){
 		dialogditemukan.value = true
 		hasilsnap.forEach((doc) => {
	console.log(doc.data())
	if(doc.data().nama_barang == carisesuatu.value){
		hasilpencarian.value = doc.data()
		pencarianid.value = doc.id
	}
	if(doc.data().nama_barang != carisesuatu.value){
		alert("barang tidak di temukan222")
	}

});
 	}
}

 // cari barang PALING BANYAK DI BELI
async function searchbarang(){

const q = query(collection(db, "data_carousel"), where("dibeli", ">", 10));
 	const querySnapshot = await getDocs(q);
 	if(querySnapshot != null){
 		querySnapshot.forEach((doc) => {
	console.log(doc.data())
  allsearch.value.push({id:doc.id,data:doc.data()})
});
 	}
}
onMounted(()=>{
	searchbarang()
})
</script>
<template>
<div>
		<div class="column">
			<div class="row" >
			<form @submit.prevent="prosescari"
			style="width: 100%"
			>
				<q-input style="width: 100%;" bordered v-model="carisesuatu" label="Temukan sesuatu disini" autofocus/>
			</form>

			</div>
		</div>

	<!-- JIKA ADA BARANG -->
		<div v-if="allsearch.length > 0">
	
		<div class="column" style="margin-top: 30px;">
			<div class="row">
				<div class="text-body1">Paling Banyak di cari</div>
			</div>
				  <q-scroll-area 
				  class="q-mt-md"
				  style="height: 380px; max-width:100%">
				<div class="row justify-center no-wrap">
				<div v-for="p in allsearch">
					<router-link 
					:to="/bayarsekarang/ + p.id"
					style="text-decoration: none;color: inherit;"
					>
						<q-card class="q-ml-md" v-ripple>
							<div class="column justify-center">
								<div class="row justify-center">
									<img :src="p.data.image" 
                                  style="max-height: 140px"
									alt="">
								</div>
								<div class="row q-pa-xs justify-between">
									<div class="text-body1">{{p.data.nama_barang}}</div>
																
								</div>
								<div class="row justify-between q-pa-xs">
									<div class="text-caption">
										Tersedia {{p.data.stok}}
									</div>
									<div class="text-caption">
							{{formatter.format(p.data.harga)}}
									</div>
								</div>
								<div class="row justify-between q-pa-xs">
									<div class="text-caption">
										{{p.data.desc.substring(0,50) + '...'}}
									</div>
								</div>
								<div class="row justify-end q-pa-xs">
										<div class="text-caption">
									{{p.data.dibeli}} x dibeli</div>
								</div>
							</div>
					</q-card>
					</router-link>
				</div>
			</div>
		</q-scroll-area>
		</div>
	</div>

	<!-- JIKA BARANG KOSONG -->
	<div v-else>
		<div class="column">
		<div class="row justify-center q-mt-md">
			<q-spinner size="50px">
			</q-spinner>

		</div>
	</div>
	</div>
<!-- JIKA PENCARIAN DITEMUKAN -->
<q-dialog v-model="dialogditemukan" position="bottom">
	<q-card>
		<q-card-section v-if="hasilpencarian.nama_barang == carisesuatu">
					<div class="column">
						<div class="row justify-center">
							<img :src="hasilpencarian.image"
                           style="max-height: 170px"
							 alt="">
						</div>
						<div class="row justify-center">
							<div class="text-h6">
								{{hasilpencarian.nama_barang}}
							</div>
						</div>
						<div class="row justify-center">
							<div class="text-caption">
								{{hasilpencarian.desc}}
							</div>
						</div>
						<div class="row justify-center q-pa-md">
							<div class="text-body1 text-bold">
							{{formatter.format(hasilpencarian.harga)}}
								
							</div>
						</div>
						<div class="row justify-between">
							<div class="text-subtitle1 text-bold">
							stok  : {{hasilpencarian.stok == 0 ?
								"habis":hasilpencarian.stok}}
							</div>
							<div class="text-caption">
							 {{hasilpencarian.dibeli}} x dibeli
							</div>
						</div>
						<div class="row justify-center q-pa-md">
							<q-btn
							v-if="hasilpencarian.stok !== 0 && hasilpencarian.stok !=='0'"
							color="primary"
							:to="/bayarsekarang/ + pencarianid"
							>Beli Sekarang</q-btn>
						</div>
					</div>
		</q-card-section>
		<q-card-section v-if="hasilpencarian.nama_barang !== carisesuatu">
			<div class="column">
				<div class="row justify-center">
					<div class="text-body1">Barang tidak Ditemukan</div>
				</div>
			</div>
		</q-card-section>
	</q-card>
</q-dialog>

</div>
</template>