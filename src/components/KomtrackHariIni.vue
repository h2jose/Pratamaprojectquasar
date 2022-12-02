<script setup>
	import {ref,onMounted} from 'vue'
  import { getFirestore,collection,query,where,doc, orderBy,getDocs } from 'firebase/firestore'
  import {app} from 'src/firebase/firebase.js'
  import { useCounterStore } from 'stores/belanja';
   const store = useCounterStore();
   const db = getFirestore(app);
   import moment from 'moment'
   let harini = ref(moment().format('LL'))
   let harinidata =  ref([])

   let email = store.dataLogin.email 

onMounted(async()=>{

const citiesRef = collection(db, "transaksi");
const q = query(citiesRef,where("email", "==", email), where("createdAt", "==", harini.value));
 	const querySnapshot = await getDocs(q);

if(querySnapshot != null){
		querySnapshot.forEach((doc) => {
		harinidata.value.push({id:doc.id,data:doc.data()})
});
}
})
// format IDR
 const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
})
</script>
<template>
	<div>
		<div class="column ">
			<div class="row">
				<div class="text-body1 text-bold">
					Terbaru hari ini
				</div>
			</div>
				<!-- JIKA ADA DATA -->
				<div v-if="harinidata.length > 0">
					<div v-for="p in harinidata">
		      	<div class="row justify-center" style="width: 100%;">
					<router-link
					style="text-decoration: none;
					color: inherit;"
					:to="/dialogdetailtrack/ + p.id"
					>
						<q-card class="q-pa-md q-mb-md" style="width: 100%;" v-ripple>
						<div class="column">
							<div class="row justify-between" >
								<div class="text-body1">
									{{p.data.email}} 
								</div>
							</div>
							<div class="row justify-between" >
								<div class="text-caption">
									nama penerima :{{p.data.nama}}
								</div>
							</div>
							<div class="row justify-between" >
								<div class="text-caption">
									jumlah pesan :{{p.data.jumlahpesan}}
								</div>
							</div>
							<div class="row " >
								<div class="text-caption">
								Total : <b>{{formatter.format(p.data.harga )}}</b>

								</div>
							</div>
							<div class="row " >
								<div class="text-caption">
								jenis pembayaran : {{p.data.details.bank}} {{p.data.details.payment_type}}

								</div>
							</div>
							<div class="row justify-center" >
								<div class="text-caption bg-blue text-white text-bold q-pa-sm">
								{{p.data.kurir.status == true ? "Kurir sedang dalam perjalanan":"tidak ada kurir yang mengirim"}}
								</div>
							</div>
							
							<div class="row">
								<div class="text-caption">
									status : {{p.data.kurir.terkirim == false  ? "barang belum terkirim":"barang sudah sampai"}}
								</div>
							</div>
							<div class="row justify-end" >
								<div class="text-caption text-grey">
								  {{p.data.createdAt}}
								</div>
							</div>
							<div class="row justify-end" >
								<div class="text-caption text-grey">
								 {{p.data.timeAt}}
								</div>
							</div>
						</div>
					</q-card>
					</router-link>
				</div>
			</div>
				</div>
			<!-- JIKA DATAKOSONG -->
			<div v-else>
				<div class="column justify-center">
					<div class="row justify-center">
						<div class="text-caption">
							Belum ada data di sini
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>