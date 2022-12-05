
<template>
	<div>
			<!-- JIKA ADA DATA -->
			<div v-if="datatransaksi != undefined">
			<div class="column q-pa-md">
			<div class="row" style="width: 100%;">
				<KomtrackHariIni/>
			</div>

			<div class="row  justify-between q-mt-md jus">
				<div class="text-body1 text-bold">
				Barang yg sudah sampai
			</div>
			<q-btn flat  color="blue" to="/lihatsemuatransaksi">Lihat semua</q-btn>
			</div>

				<!-- {{JSON.stringify(datatransaksi)}} -->
				<!-- CEK BARANG SUDAH SAMPAI ? -->
					<div v-for="p in datatransaksi" style="margin-bottom: 30px">
				<div v-if="p.data.kurir.terkirim == true">
				<div class="row q-mt-md">
					<q-card class="q-pa-md" style="width: 100%;"
					  v-ripple
					@click="showinformasi(p.data)"
					  
					>
						<div class="column">
							<div class="row">
								<div class="text-caption text-bold">{{p.data.email}}</div>
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
									{{p.data.details.payment_type}}

									 {{p.data.details.bank}}
								</div>
							</div>
							<div class="row justify-between">
                <div v-if="p.data.kurir.terkirim == true">
								<q-chip color="green" text-color="white" icon="schedule">Sudah sampai</q-chip>
                	
                </div>
								<div class="text-caption text-grey">
									{{p.data.createdAt}}
								</div>
							</div>
							<div class="row justify-end">
								<div class="text-caption text-grey">
									{{p.data.timeAt}}
								</div>
							</div>

						</div>
					</q-card>
				</div>	
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
			<div 
			v-if="belumlogin == true"
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

			<!-- BELUM ADA PESANAN -->
			<div v-if="belumadapesanan == true">
				<div class="column">
					<div class="row justify-center">
	<img src="~assets/emptytrack.gif"
               style="width: 180px;height: 140px;"
							 alt="">
					</div>
					<div class="row justify-center">
						<div class="text-subtitle2">
							Kamu Belum memiliki transaksi
						</div>
						
					</div>
				</div>
			</div>
			<!-- laoding -->
			<div v-if="datatransaksi.length <= 0  && belumadapesanan == false">
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
           			Hrg peritem : <b>{{formatter.format(parseInt(detailbelanja.harga) / parseInt(detailbelanja.jumlahpesan))}}</b>
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
				<div class="row  justify-center">
					<q-card>
						<div class="column">
							<div class="row">
								<img :src="detailitem.image" 
								style="width: 250px;height:150px"
								alt="">
							</div>
							<div class="row justify-center">
								<div class="text-subtitle2">
									{{detailitem.nama_barang}}
								</div>
							</div>
							
						</div>
					</q-card>
				</div>
		</q-card-section>
		<q-card-section>
			<div class="column">
				<div class="row">
					<div class="text-subtitle1 text-bold">
						Deskripsi
					</div>
				</div>
				<div class="row">
					<div class="text-caption">
						{{detailitem.desc}}
					</div>
				</div>
				<div class="row q-mt-md">
					<div class="text-subtitle2">
						 Harga per Item : {{formatter.format(detailitem.harga)}}
					</div>
				</div>
			</div>
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
<script setup>
	import {ref,onMounted} from 'vue'
  import {app} from 'src/firebase/firebase.js'
  import { getFirestore,collection,query,where,doc, getDocs } from 'firebase/firestore'
  import { getAuth, onAuthStateChanged } from "firebase/auth";


const auth = getAuth(app);

  import KomtrackHariIni from 'src/components/KomtrackHariIni.vue'
  import moment from 'moment'

       import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl';
  import 'mapbox-gl/dist/mapbox-gl.css';
    let token = "pk.eyJ1IjoiYm9id2F0Y2hlcngiLCJhIjoiY2xiMGwwZThrMWg3aTNwcW1mOGRucHh6bSJ9.kNHlmRqkRSxYNeipcKkJhw"

   let datatransaksi = ref([])
   let detailbelanja =  ref([])
 	let dialogbelanja = ref(false)
 	let detailitem = ref([])
 	let belumlogin = ref(false)
 	let belumadapesanan = ref(false)

 	let latitude = ref(-6.12312)
 	let longitude = ref(107.231231)
// format IDR
 const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
})

// show info belanja
function showinformasi(p){
	dialogbelanja.value = true
	detailbelanja.value = p
	detailitem.value = p.pesanan
}

   // GET DATA TRANSAKSI
async function getdatatransaksi(p){
	   	// GET DATA TERLARIS > 
   const db = getFirestore(app);
const q = query(collection(db, "transaksi"), where("email", "==", p));
 	const querySnapshot = await getDocs(q);
 	if(querySnapshot.empty){
 	belumadapesanan.value = true
 		
 	}
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
  	belumlogin.value = true
  }
});

})
</script>