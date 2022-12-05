<script setup>
	import {ref,onMounted} from 'vue'
	import { useRoute } from 'vue-router';
import { collection, query,getFirestore, where, getDocs } from "firebase/firestore";
 import toRupiah from '@develoka/angka-rupiah-js';

	const route = useRoute();
	let options = ref(['housewife',
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


// SCROLL ANIMATION
const scrollInfo = ref({position:{top:0}})
function  onScroll (info) {
        scrollInfo.value = info
      }
</script>
<template>
<q-page>
<div>
	<div class="column">
			 <q-scroll-observer @scroll="onScroll" />
		<div class="row q-pa-md">
			<q-btn icon="arrow_back"  round flat
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
		<div >
			<div v-if="resultdata.length > 0">
				<div class="column">
					<div class="col-md-6 col-sm-5 col-xl-12 col-lg-4">
						<div  v-for="p in resultdata">
						<router-link :to="p.data.stok != '0' ? '/bayarsekarang/' +p.id : '' "
						style="text-decoration: none;color: inherit;"
						>
							<q-card  v-ripple="p.data.stok != '0' ? true : false" class="q-ma-md">
							<div class="row no-wrap">
								<div >
									<img :src="p.data.image"
							style="max-width: 160px;max-height: 130px;
							background-size: cover;
							"
							 alt="">
								</div>
								<!-- CONTENT -->
								<div class="q-ml-sm">
									<div class="row">
										<div class="text-subtitle2">
										{{p.data.nama_barang}}
									</div>
									</div>
									<div class="row">
										<div class="text-subtitle2 text-orange text-bold">
										{{toRupiah(p.data.harga)}}
									</div>
									</div>
									<div class="row">
										<div class="text-caption" style="width: 100%;height:10%">
										{{p.data.desc.substring(0,25) + '...'}}
									</div>
									</div>
									<div class="row justify-end q-mt-md q-mr-md">
										<div class="text-caption text-bold">
										{{p.data.dibeli}} x dibeli
									</div>
									</div>
									 <div class="row justify-between q-mt-sm">
									 	<div class="text-caption">
									 		{{p.data.ratting}} suka
									 	</div>
									 	<div v-if="p.data.stok == '0' && p.data.stok == 0">
									 	<q-chip 
									 	 color="red" text-color="white" icon="close">habis</q-chip>
									 	</div>
									 	<div v-if="p.data.stok !== '0' && p.data.stok !== 0">
									 		<div class="text-subtitle2 text-green text-bold">
									 			Tersedia {{p.data.stok}}
									 		</div>
									 	</div>
									 </div>
								</div>
							</div>
						</q-card>
						</router-link>
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
	<!-- SCROLL INFO -->
		<div v-if="scrollInfo.position.top > 130">
			<q-card
			class="bg-orange text-white"
			transition-show="slide-down"
			transition-hide="slide-up"
			 style="position: fixed;top: 0;width: 100%;">
			<q-card-section>
				<div class="row">
					<q-btn flat icon="arrow_back" 
					@click="$router.go(-1)"
					></q-btn>
					 <q-select 
					 clearable
					 color="primary"
			  style="width:80%"
			  v-model="type" :options="options" 
			  @update:model-value="gantitype()" 
			  />
				</div>
			</q-card-section>
		</q-card>
		</div>
</div>	  
</q-page>
</template>
