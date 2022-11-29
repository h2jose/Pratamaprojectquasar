<script setup>
	import {ref,onMounted} from 'vue'
	import { useRoute } from 'vue-router';
import { collection, query,getFirestore, where, getDocs } from "firebase/firestore";
 import toRupiah from '@develoka/angka-rupiah-js';

	const route = useRoute();
	let options = ref(['houseWife',
			'tools','sanitary','building','plumbing','electrical'])
	let type = ref(route.params.id)
	let resultdata = ref([])
	
	// WHERE CATEGORY
   const db = getFirestore(app);
import {app} from 'src/firebase/firebase.js'

async function caribarang(){
const q = query(collection(db, "data_carousel"), where("category", "==", type.value));
	const querySnapshot = await getDocs(q);

querySnapshot.forEach((doc) => {
	resultdata.value.push({id:doc.id,data:doc.data()})
});

}
function gantitype(e){
	resultdata.value = []
	caribarang()
}
onMounted(async()=>{
caribarang()
})

</script>
<template>
<q-page>
<div>
	<div class="column">
		<div class="row q-pa-md">
			<q-btn icon="arrow_back" flat
			@click="$router.go(-1)"></q-btn>
			<div class="text-h6">Category  </div>
		</div>
		<div class="row q-pa-md justify-center">
			  <q-select 
			  style="width:80%"
			  v-model="type" :options="options" 
			  @update:model-value="gantitype()" 
			  label="Pilih Category" />
		</div>
		<!-- JIKA ADA -->
		<div>
			<div v-if="resultdata.length > 0">
				<div v-for="p in resultdata">
					<div class="row justify-center">
						<div class="col-md-4 col-xl-12 col-sm-6">
				<q-card class="q-ma-md"
				v-ripple
				>

					<div class="row q-pa-md justify-center">
						<img :src="p.data.image"
						style="max-width:100%"
						 alt="">
				</div>
				<div class="row justify-between q-pa-md">
				<div class="text-body1 text-bold">{{p.data.nama_barang}}</div>
				<div class="text-caption text-bold text-primary">{{toRupiah(p.data.harga)}}</div>
				
				</div>
				<div class="row q-pa-sm">
					<div style="width:60%">
					<div class="text-caption">{{p.data.desc.substring(0,50) + '...'}}</div>
					</div>
				</div>
				<div class="row justify-between q-pa-md">
					<div class="text-body1">
						tersedia {{p.data.stok}} pcs
					</div>
					<q-btn color="primary"
					v-if="p.data.stok !== '0' && p.data.stok !== 0"
				:to="'/bayarsekarang/' +p.id "
				>Details</q-btn>
				<div v-if="p.data.stok == '0' && p.data.stok == 0">
					<div class="text-subtitle2 text-red">
						Barang habis
					</div>
				</div>
				</div>
				</q-card>
						</div>
					</div>
				</div>
			</div>
		<!-- JIKA TIDAK ADA -->
			<div v-else>
				<q-card class="q-ma-md q-pa-sm">
				    <q-linear-progress dark indeterminate color="primary" class="q-mt-sm" />
					<div class="row justify-center">
				<q-skeleton width="80%" height="150px"></q-skeleton>
				</div>
				<div class="row justify-around q-pa-md">
				<q-skeleton width="40%" height="40px"></q-skeleton>
				<q-skeleton width="30%" height="30px"></q-skeleton>
				</div>
				</q-card>
				
			</div>
		</div>
		
	</div>
</div>	  
</q-page>
</template>