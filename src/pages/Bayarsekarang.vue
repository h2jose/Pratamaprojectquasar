<script setup>
	import {ref,onMounted,computed} from 'vue'
	import Kamubelumlogin from 'src/components/Kamubelumlogin.vue'
  import { useCounterStore } from 'stores/belanja';
  import {app} from 'src/firebase/firebase.js'
  import { getFirestore, collection,doc, getDoc,addDoc } from 'firebase/firestore'
  import {useRoute} from 'vue-router'
  import { Dialog } from 'quasar'
  import { useQuasar } from 'quasar'
    const $q = useQuasar()
// GELOCATION TRACK PEMBELI
  import { Geolocation } from '@capacitor/geolocation';



	const router = useRoute()
  let db = getFirestore(app);
   const store = useCounterStore();
   // DIALOG 
   let dialoglogin = ref(false)
   let dialogcektoken = ref(false)
   let dialogalamat = ref(false)
   let dialogceklokasi = ref(false)
   let dialogberhasilbayar = ref(false)
   // DATA PEMBELI
   let databelanja = ref([])
   let jumlahpesan = ref(1)
   let batasstok = ref()
   let positionlatitude = ref()
   let positionlongitude = ref()
   // DATA PENGGUNA
   let emailanda = ref("") 
   let namalengkap = ref("")
	let nomorhp = ref("") 
   let alamat = ref("")
 const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
})
   let param = router.params.id



 // GET DATA BY ID FROM PRODUK TERLARIS DETAIL
  onMounted(async()=>{
const docRef = doc(db, "data_carousel", param);
try {
    const docSnap = await getDoc(docRef);
    databelanja.value = docSnap.data()
} catch(error) {
    console.log(error)
}
  })

 // INCREMENT BTN
 function addincrement(){
 	jumlahpesan.value++
 	if(jumlahpesan.value > databelanja.value.stok){
 		 $q.dialog({
        title: 'kesalahan',
        message: 'Stok tersedia hanya ' + databelanja.value.stok  + ' Pcs'
      })
 		jumlahpesan.value = databelanja.value.stok
 	}
 }
 function removeincrement(){
 	jumlahpesan.value--
 	if(jumlahpesan.value <= 0 ){
 		jumlahpesan.value = 1
 	}
 }
// alamat ambil 
 async function ambilalamat(){
 	dialogalamat.value = true
 	dialogceklokasi.value = true
 	 const coordinates = await Geolocation.getCurrentPosition() || navigator.geolocation.getCurrentPosition( 
successHandler, errorHandler, 
{enableHighAccuracy: true, maximumAge: 10000});
 	 console.log("tolol")
 	  console.log('Current position:', coordinates.coords.latitude);
 	  console.log('Current position:', coordinates.coords.longitude);
 	  positionlatitude.value = coordinates.coords.latitude
 	  positionlongitude.value = coordinates.coords.longitude
 	  if(coordinates.coords.latitude != null 
 	  	&& coordinates.coords.longitude != null){
 	dialogceklokasi.value = false

 	  }
 }

 // BAYAR SEKARANG
 function bayarsekarang(){
 	let data = {
 		harga:parseInt(databelanja.value.harga) * parseInt(jumlahpesan.value),
 		id:store.dataLogin.uid,
 		nama:namalengkap.value,
 		email:emailanda.value,
 		phone:nomorhp.value,
 		alamat:alamat.value
 	}
	fetch("https://pratambackend-bobwatcherx.koyeb.app/add",{
 		method:"POST",
 		mode:"cors",
 		headers:{
 			  'Content-Type': 'application/json'
 			},
 		body:JSON.stringify(data)
 	}).then((response)=>response.json())
 	.then((data)=>{
 		console.log(data)
 		if(data.transactionToken != null){
 			console.log(typeof data.transactionToken)
 window.snap.pay(data.transactionToken.token,{
 					onSuccess: function(result){
	            alert("payment success!"); console.log(result);
	            // TAMBAH DATA KE FIREBASE KALO BERHASIL
	            	const dbreftransaksi = collection(db, "transaksi");
								 	let data = {
									 		harga:parseInt(databelanja.value.harga) * parseInt(jumlahpesan.value),
									 		id:store.dataLogin.uid,
									 		nama:namalengkap.value,
									 		email:emailanda.value,
									 		phone:nomorhp.value,
									 		alamat:alamat.value,
									 		jumlahpesan:jumlahpesan.value,
									 		pesanan:JSON.stringify(databelanja),
									 		createdAt:Date.now(),
									 		details:result,
									 		positionlatitude:positionlatitude.value,
									 		positionlongitude:positionlongitude.value
									 	}
									 	addDoc(dbreftransaksi, data)
											.then(docRef => {
											    dialogalamat.value = false
											    dialogberhasilbayar.value = true
											})
											.catch(error => {
												alert("pembayaran anda error")
											    console.log(error);
											})
	          },
	          onPending: function(result){
	            /* You may add your own implementation here */
	            alert("wating your payment!"); console.log(result);
	          },
	          onError: function(result){
	            /* You may add your own implementation here */
	            alert("pembayaran gagal"); console.log(result);
	          },
	          onClose: function(){
	            /* You may add your own implementation here */
	            alert('anda membatalkan pembayaran');
	          }
 });
 		}
 	})
 }

</script>
<template>
	<q-page>
		<div class="column bg-pink text-white q-pa-md shadow-10">
			<div class="row">
				<q-btn flat icon="arrow_back"
				@click="$router.go(-1)"
				round
				></q-btn>
				<div class="text-h6" style="margin-top: 10px;">Bayar sekarang</div>
			</div>
		</div>
			<!-- BELUM LOGIN -->
		<div v-if="store.dataLogin === null">
			<div class="column q-pa-md">
				<div class="row justify-center">
			      <img src="~assets/belumlogin.gif"
                      style="max-height: 190px;"
			       alt="">
				</div>
				<div class="row justify-center">
				<div class="text-body1">Login Untuk melakukan pembayaran</div>
				</div>
				<div class="row justify-center q-pa-md">
					<q-btn color="primary" @click="dialoglogin=true">Hubungkan akun saya</q-btn>
				</div>
			</div>
		</div>
			<!-- JIKA SUDAH LOGIN -->
		<!-- JIKA ADA DATA -->

		<div v-if="databelanja != undefined && store.dataLogin != null 
		">
			<div class="column q-pa-md">
				<q-card class="q-pa-md" 
				>
					<div class="column">
						<div class="row justify-center">
							<img :src="databelanja.image" 
						style="max-height: 180px;"
						alt="">
						</div>
						<div class="row justify-center q-pa-md">
							<div class="text-body1">{{databelanja.nama_barang}}</div>
						</div>
						<div class="row justify-center q-pa-md">
							<div class="text-caption">{{databelanja.desc}}</div>
						</div>
						<div class="row justify-between q-pa-md">
							<div class="text-caption">Stok : {{databelanja.stok}} Pcs</div>
							<div class="text-subtitle1 text-orange text-bold"> 
							{{formatter.format(databelanja.harga )}} </div>
						</div>
							<!-- btn increment -->
						<div class="row justify-around">
								<q-btn round color="green" icon="add"
								@click="addincrement"
								></q-btn>
								<div class="text-h6">{{jumlahpesan}}</div>
								<q-btn round color="red" icon="remove"
								@click="removeincrement"
								></q-btn>
						</div>
						<div class="row justify-center q-pa-md">
							<q-btn color="primary"
							@click="ambilalamat()"
							>Bayar</q-btn>
						</div>
						<div class="row">
							<div class="text-subtitle2">total harga : 
             <div class="text-bold text-h6">{{formatter.format(databelanja.harga * jumlahpesan)}}</div>
							</div>
						</div>
					</div>
				</q-card>
			</div>
		</div>
		<!-- JIKA BELUM ADA DATA -->
		<div v-if="databelanja == undefined">
				<div class="column justify-center" style="margin-top: 20px;">
					<div class="row justify-center">
						<q-skeleton width="100%" height="200px"></q-skeleton>
					</div>
					<div class="row q-pa-md justify-between">
						<q-skeleton width="50%" height="140px"></q-skeleton>
						<q-skeleton width="30%" height="50px"></q-skeleton>
					</div>
					<div class="row q-pa-md justify-end">
						<q-skeleton width="30%" height="50px"></q-skeleton>
					</div>
				</div>
		</div>
		

		


		
		<!-- DIALOG BELUM LOGIN -->
		<q-dialog v-model="dialoglogin" position="bottom">
			<q-card>
				<q-card-section>
					<Kamubelumlogin/>
				</q-card-section>
			</q-card>
		</q-dialog>

		<!-- dialog ambil alamat -->
		<q-dialog v-model="dialogalamat"  
		maximize
		position="bottom">
			<q-card style="border-top-left-radius: 30px;
			border-top-right-radius: 30px;
			">
				<form @submit.prevent="bayarsekarang">
						<q-card-section class="bg-primary text-white">
					<div class="text-h6">Lengkapi Data Anda</div>
				</q-card-section>
				<q-card-section style="margin-top: 10px;">
					<div class="column">
						<div class="row q-pa-md">
					<q-input rounded outlined 
					required
					type="email"
						v-model="emailanda" label="email"
            style="width:100%"
					 />
						</div>
						<div class="row q-pa-md">
					<q-input rounded outlined
					required 
						v-model="namalengkap" label="nama lengkap"
            style="width:100%"
					 />
					</div>

						<div class="row q-pa-md">
					<q-input rounded outlined
					required
            style="width:100%"
					 v-model="nomorhp" 
					 type="number"
					 label="No Handphone" />
						</div>
						<div class="row q-pa-md">
					<q-input rounded outlined
            style="width:100%"
            type="textarea"
            required
					 v-model="alamat" label="Alamat" />
						</div>
						</div>
				</q-card-section>
				<q-card-section>
					<div class="column">
					<div class="row justify-between">
							<div class="text-body1">Total harga</div>
						<div class="text-h6">{{formatter.format(databelanja.harga * jumlahpesan)}}</div>
					</div>
					<div class="row">
						<div class="text-caption">Jumlah pesan : {{jumlahpesan}} Pcs</div>
					</div>
					</div>
				</q-card-section>
				<q-card-section class="bg-grey">
					<div class="row q-pa-md justify-center">
							<q-btn color="primary"
							type="submit"
							>Bayar Sekarang</q-btn>
						</div>
				</q-card-section>
				</form>
			</q-card>
		</q-dialog>

		<!-- dialog cek lokasi -->
		<q-dialog v-model="dialogceklokasi" persistent>
			<q-card>
				<q-card-section>
					<div class="column">
						<div class="row">
								Sedang Mencari lokasi anda ....
						</div>
					</div>
				</q-card-section>
			</q-card>
		</q-dialog>


		<!-- dialog berhasil bayar -->

	<q-dialog v-model="dialogberhasilbayar" >
			<q-card class="bg-green text-white">
				<q-card-section>
					<div class="column">
						<div class="row justify-center">
							<div class="text-bold text-h6">Transaksi anda berhasil</div>
						</div>
						<div class="row justify-center">
							<q-btn to="/track" color="primary">Lihat Pesanan saya</q-btn>
						</div>
					</div>
				</q-card-section>
			</q-card>
		</q-dialog>

	</q-page>
</template>