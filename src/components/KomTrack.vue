<script setup>
	import {ref,onMounted} from 'vue'
  import {app} from 'src/firebase/firebase.js'
  import { getFirestore,collection,query,where, doc, getDocs } from 'firebase/firestore'
  import { useCounterStore } from 'stores/belanja';
  import moment from 'moment'
   const store = useCounterStore();

       import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl';
  import 'mapbox-gl/dist/mapbox-gl.css';
    let token = "pk.eyJ1IjoiYm9id2F0Y2hlcngiLCJhIjoiY2xiMGwwZThrMWg3aTNwcW1mOGRucHh6bSJ9.kNHlmRqkRSxYNeipcKkJhw"

   let datatransaksi = ref([])
   let dialogdetails = ref(false)
   let resultdialog = ref([])
   let detailbelanja =  ref([])
 	let dialogbelanja = ref(false)
 	let detailitem = ref([])

// format IDR
 const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
})
// SHOW DETAIL track kurir
   function showdetail(p){
   	dialogdetails.value = true
   	resultdialog.value = p
   }
// show info belanja
function showinformasi(p){
	dialogbelanja.value = true
	detailbelanja.value = p
	detailitem.value = JSON.parse(p.pesanan)
}
   // GET DATA TRANSAKSI
	 onMounted(async()=>{
    	// GET DATA TERLARIS > 
   const db = getFirestore(app);
   let email = store.dataLogin.email 
const q = query(collection(db, "transaksi"), where("email", "==", email));
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
			<div v-if="datatransaksi != undefined">
				<!-- {{JSON.stringify(datatransaksi)}} -->
				<div v-for="p in datatransaksi" style="margin-bottom: 30px">
				<div class="row">
					<q-card class="q-pa-md" style="width: 100%;"
					  v-ripple
					  @click="showdetail(p)"
					>
						<div class="column">
							<div class="row">
								<div class="text-h6">{{p.data.email}}</div>
							</div>
							<div class="row bg-orange text-white">
								<div class="text-subtitle2">{{p.data.details.order_id}}</div>
							</div>
							<div class="row justify-between">
								<div class="text-caption">
									Nama penerima : {{p.data.nama}}
								</div>
								<div class="text-caption">
									 Total : <b>{{formatter.format(p.data.harga )}}</b>
								</div>
							</div>
							<div class="row ">
							<div class="text-caption">
								Jumlah pesanan : {{p.data.jumlahpesan}} item
							</div>
							</div>
							<div class="row q-pa-md">
								<div class="text-caption">
									Alamat : {{p.data.alamat}}
								</div>
							</div>
							<div class="row ">
								<div class="text-caption">
									Jenis Pembayaran :
									{{p.data.details.card_type}}

									 {{p.data.details.bank}}
								</div>
							</div>
							<div class="row justify-end">
								<div class="text-caption text-grey">
									{{moment().format('ll')}}
								</div>
							</div>

						</div>
					</q-card>
				</div>	
				<div class="row bg-primary justify-end text-white">
					<q-btn
					flat 
					@click="showinformasi(p.data)"
					>Details</q-btn>
				</div>	
			  </div>
			</div>

			<!-- JIKA KOSONG -->
			<div v-if="datatransaksi == null">
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
			<div v-if="store.dataLogin == null"
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

			<div v-if="datatransaksi.length <= 0 ">
				<div class="column">
					<div class="row justify-center">
						<q-spinner size="80px">
						</q-spinner>
					</div>
				</div>
			</div>
			<div v-else>
				
			</div>

		</div>
	</div>

	<!-- dialog details -->
	<q-dialog v-model="dialogdetails" maximized
	   transition-show="slide-up"
      transition-hide="slide-down"
	>
		<q-card>
			<q-card-section class="bg-primary text-white">
				<div class="row justify-between">
					<div class="text-h6">Detail Penjualan</div>
					<q-btn round icon="close" size="14px"
					@click="dialogdetails=false"
					></q-btn>
				</div>
			</q-card-section>
			<q-card-section style="margin:0px;padding:0px">
				<div style="position: absolute;top:20px;right: 0px;">
                  <q-btn color="orange">loo 
                  
                  </q-btn>
				</div>

			<!-- FRAME MAPS -->
			 <MapboxMap
			    style="height: 400px;width: 100%;"
			    :access-token="token"
			    map-style="mapbox://styles/mapbox/streets-v11">
			    <MapboxMarker :lng-lat="[resultdialog.data.positionlongitude, resultdialog.data.positionlatitude]" >
			    	 <template v-slot:popup>
			        <p>Kurir</p>
			      </template>
			    </MapboxMarker>
			  </MapboxMap>

			</q-card-section>
		</q-card>
	</q-dialog>
<!-- dialog belanja -->
<q-dialog v-model="dialogbelanja"
transition-show="slide-up"
transition-hide="slide-down"
maximized
>
	<q-card>
		<q-card-section>
				<q-toolbar>
					<div class="row">
						<q-btn icon="arrow_back" flat
                       @click="dialogbelanja=false"
						></q-btn>
					<div class="text-h6">Data Detail Belanja anda</div>
					</div>
				</q-toolbar>
		</q-card-section>
		<q-card-section>
           <!-- jika ada data -->
           <q-card class="q-pa-md">
           	<div class="column">
           	<div class="row">
           		<div class="text-caption">
           			Order Id : {{detailbelanja.details.order_id}}
           		</div>
           	</div>
           	<div class="row justify-between">
           		<div class="text-body1">
           			Total pesanan : {{detailbelanja.jumlahpesan}}
           		</div>
           		<div class="text-caption">
           			Hrg peritem : {{parseInt(detailbelanja.harga) / parseInt(detailbelanja.jumlahpesan)}}
           		</div>
           	</div>
           		<div class="row">
           		<div class="text-subtitle2">
           			No Hp Pembeli : {{detailbelanja.phone}}
           		</div>
           	</div>
           </div>
           </q-card>
		</q-card-section>
		<q-card-section>
				<q-scroll-area 
				  class="q-mt-md"
				  style="height: 280px; max-width:100%">
				<div class="row no-wrap">
					<div v-for="x in detailitem">
			     <q-card >
                     <div class="column">
                     	<div class="row">
                     		 <img :src="x.image" 
                           style="max-height: 130px"
                      alt="">
                     	</div>
                     </div>
			     </q-card>
					</div>
				</div>
			</q-scroll-area>
		</q-card-section>
		<q-card-section
		class="bg-orange text-white"
		style="position: absolute;bottom: 0;
		width:100%;
		left:0px;
		right:0px;
		"
		>
			<div class="text-h6">
				Total Harga : {{formatter.format(detailbelanja.harga)}}
			</div>
		</q-card-section>
	</q-card>
</q-dialog>
</template>