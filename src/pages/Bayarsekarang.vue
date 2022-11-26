<script setup>
	import {ref,onMounted,computed} from 'vue'
	import Kamubelumlogin from 'src/components/Kamubelumlogin.vue'
  import { useCounterStore } from 'stores/belanja';
  import {app} from 'src/firebase/firebase.js'
  import { getFirestore, doc, getDoc } from 'firebase/firestore'
  import {useRoute} from 'vue-router'
 import toRupiah from '@develoka/angka-rupiah-js';

const router = useRoute()
  let db = getFirestore(app);
   const store = useCounterStore();
   let dialoglogin = ref(false)
   let databelanja = ref([])
   let jumlahpesan = ref(1)

let isValid = computed(() => jumlahpesan.value > 0)
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
		<!-- JIKA SUDAH LOGIN -->
		<!-- JIKA ADA DATA -->
		<div v-if="store.dataLogin != null && databelanja.stok != '0' ">
			<div class="column q-pa-md">
				<q-card class="q-pa-md">
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
							   <q-input
							   type="number"
							    :error="!isValid"
							     bottom-slots
							    filled v-model="jumlahpesan" label="Jumlah pesan" >
							     <template v-slot:error>
								        Minimal membeli 1 Pcs
								      </template>
							</q-input>
						</div>
						<div class="row justify-center q-pa-md">
							<q-btn color="primary"
							>Bayar Rp {{parseInt(jumlahpesan)* parseInt(databelanja.harga)}}</q-btn>
						</div>
					</div>
				</q-card>
			</div>
		</div>

		<!-- JIKA BELUM ADA DATA -->
		<div v-if="databelanja == null">
				<div class="column">
					<div class="row justify-center">
						 <q-spinner
						        color="primary"
						        size="40px"
						      />
					</div>
				</div>
		</div>

		<!-- BELUM LOGIN -->
		<div v-if="store.dataLogin == null ">
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

		<!-- DIALOG BELUM LOGIN -->
		<q-dialog v-model="dialoglogin" position="bottom">
			<q-card>
				<q-card-section>
					<Kamubelumlogin/>
				</q-card-section>
			</q-card>
		</q-dialog>
	</q-page>
</template>