<script setup>
	import {ref,onMounted} from 'vue'
  import { getFirestore,collection,query,where,doc, orderBy,getDoc } from 'firebase/firestore'
  import {app} from 'src/firebase/firebase.js'
   const db = getFirestore(app);
   import {useRoute} from 'vue-router'
   const route = useRoute()
   const myid  = ref(route.params.id)
   let detailtransaksi = ref([])
// MAPBOX
       import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl';
  import 'mapbox-gl/dist/mapbox-gl.css';
    let token = "pk.eyJ1IjoiYm9id2F0Y2hlcngiLCJhIjoiY2xiMGwwZThrMWg3aTNwcW1mOGRucHh6bSJ9.kNHlmRqkRSxYNeipcKkJhw"

onMounted(async()=>{
const docRef = doc(db, "transaksi", myid.value );
const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
  // console.log("Document data:", docSnap.data());
	detailtransaksi.value.push({id:docSnap.id,data:docSnap.data()})
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}
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
		<div class="row bg-primary text-white shadow-4">
			<q-btn icon="arrow_back" round flat
			@click="$router.go(-1)"
			></q-btn>
			<div class="text-h6 q-mt-xs">Detail Belanja </div>
		</div>
	</div>
	<!-- JIKA ADA DATA -->
	<div v-if="detailtransaksi.length !== 0">
			<div class="column ">
		
		<div class="row q-pa-md q-mt-lg">
			<div v-for="p in detailtransaksi">
				<q-card class="q-pa-md" style="width: 100%;">
					<q-card-section>
						<div class="row  justify-between">
							<div class="text-subtitle1">
								Nama Penerima : {{p.data.nama}}
							</div>
							</div>
							<div class="row">
								<div class="text-body1">
								Harga Total : {{p.data.harga}}
							</div>
							</div>
							<div class="row">
								<div class="text-caption">
									Jumlah pesanan : {{p.data.jumlahpesan}}
								</div>
							</div>
					</q-card-section>
			   </q-card>
			   <div class="row q-mt-md">
			   	<div class="text-body1 text-bold">
			   	Detail Barang
			   	</div>
			   </div>
			   <div class="row justify-center">
			   	<q-card style="width: 100%;">
			   		<div class="column">
			   				<div class="row justify-center q-pa-md">
					      	<img :src="p.data.pesanan.image" 
		                	style="width: 180px;height: 140px;"
					     	alt="">
					       </div>
					       <div class="row q-pa-xs">
					       	<div class="text-subtitle2">{{p.data.pesanan.nama_barang}}</div>
					       </div>
					       <div class="row justify-between q-pa-xs">
					       	<div class="text-caption">
					       		{{p.data.pesanan.ratting }} suka
					       	</div>
					       	<div class="text-caption">
					       		{{formatter.format(p.data.pesanan.harga )}}
					       	</div>
					       </div>
			   		</div>
			   	</q-card>
			   </div>
			   <div class="row q-mt-md">
			   	<div class="text-body1 text-bold">
			   		Deskripsi
			   	</div>
			   </div>
			   <div class="row q-pa-md">
			   	<q-card>
			   		<div class="row q-pa-sm">
			   			<div class="text-subtitle1">
			   				{{p.data.pesanan.desc}}
			   			</div>
			   		</div>
			   	</q-card>
			   </div>
			   <div class="row">
			   	<div class="text-body1 text-bold">
			   		Lihat Posisi Kurir terkini
			   	</div>
			   </div>
			   <div class="row justify-center">
			   	{{p.data.kurir.status == true ? "Kurir anda sedang dalam perjalanan" :
			   	"belum ada kurir yang mengirim"
			   }}
			   </div>
			   <!-- MAPBOX FRAME -->
			   	 <div class="row">
			   	 	<MapboxMap
			    style="height: 400px;width: 100%;"
			    :access-token="token"
			    map-style="mapbox://styles/mapbox/streets-v11">
			    <MapboxMarker :lng-lat="[p.data.kurir.latitude,p.data.kurir.longitude]" >
			    	 <template v-slot:popup>
			        <p>Kurir</p>
			      </template>
			    </MapboxMarker>
			  </MapboxMap>
			   	 </div>
			</div>
		</div>
	</div>
	</div>

	<!-- JIKA DATA LOADING -->
	<div v-if="detailtransaksi.length <= 0">
		<div class="column">
			<div class="row justify-center">
				<q-spinner size="40px" style="margin-top: 40px;">
			
	          	</q-spinner>
			</div>
		</div>
	</div>
</q-page>
</template>