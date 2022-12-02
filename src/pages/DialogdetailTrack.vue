<script setup>
	import { MglMap, MglNavigationControl } from 'vue-maplibre-gl'

	import {ref, onMounted} from 'vue'
  import { getFirestore,onSnapshot,collection,query,where,doc, orderBy,getDoc } from 'firebase/firestore'

  import {app} from 'src/firebase/firebase.js'
   const db = getFirestore(app);
   import {useRoute} from 'vue-router'
   const route = useRoute()
   const myid  = ref(route.params.id)
   let datakurir = ref({})
// // MAPBOX
//        import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl';
//   import 'mapbox-gl/dist/mapbox-gl.css';
//     let token = "pk.eyJ1IjoiYm9id2F0Y2hlcngiLCJhIjoiY2xiMGwwZThrMWg3aTNwcW1mOGRucHh6bSJ9.kNHlmRqkRSxYNeipcKkJhw"



onMounted(async()=>{
	// REALTIME MAPBOX DARI FIRESTORE
    const unsub = onSnapshot(doc(db, "transaksi", myid.value), (doc) => {
    console.log("Current data: ", doc.data());
    datakurir.value = doc.data()
});
})


// format IDR
 const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
})
</script>

<template>
	<q-page>
		<div class="column">
			<q-toolbar>
				<q-btn flat icon="arrow_back" round
         @click="$router.go(-1)"
				></q-btn>
				<div class="text-h6">Detail transaksi</div>
			</q-toolbar>
				<div v-if="datakurir != undefined">
						<div class="column q-pa-md">
							<div class="row justify-between ">
								<div class="text-subtitle2">
									nama : {{datakurir.nama}}
								</div>
							</div>
							<div class="row">
								<div class="text-caption">
									alamat : {{datakurir.alamat}}
								</div>
							</div>
								<div class="row">
								<div class="text-caption">
									No Hp : {{datakurir.phone}}
								</div>
							</div>
						</div>
				</div>
				<!-- JIKA DATA PESANAN TIDAK KOSONG -->
				<div v-if="datakurir.pesanan != undefined">
					<div class="column">
						<div class="row q-pa-md">
							<div class="text-subtitle2">Pesanan anda</div>
						</div>
						<div class="row justify-center">
							<q-card class="shadow-4">
								<div class="row">
									<img :src="datakurir.pesanan.image" 
                  style="width:200px;height:160px"
									alt="">
								</div>
								<div class="row justify-center">
									<div class="text-subtitle2">{{datakurir.pesanan.nama_barang}}</div>
								</div>
							</q-card>
						</div>
						<div class="row q-pa-md">
								<div class="row ">
									<div class="text-subtitle2">Deskripsi</div>
								</div>
								<div class="row ">
									<div class="text-caption">
										{{datakurir.pesanan.desc}}
									</div>
								</div>
						</div>
							<div class="row  justify-between q-mt-md q-pa-sm">
									<div class="text-subtitle2">
										Total bayar : {{formatter.format(datakurir.harga)}}
									</div>
									<div class="text-caption">
										perItem : {{formatter.format(datakurir.pesanan.harga)}}
									</div>
								</div>
					</div>
				</div>

				

				<!-- JIKA LOADING -->
				<div v-else>
						<div class="column">
							<div class="row justify-center" style="margin-top: 50%;">
								<q-spinner size="50px"></q-spinner>
							</div>
						</div>
				</div>


		</div>
	</q-page>
</template>
