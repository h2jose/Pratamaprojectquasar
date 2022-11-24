<script setup>
	import {ref,onMounted,computed} from 'vue'
  import {app} from 'src/firebase/firebase.js'
 import toRupiah from '@develoka/angka-rupiah-js';
import KomKeranjang from 'src/components/KomKeranjang.vue'
// STORE KERANJANG
   import { useCounterStore } from 'stores/belanja';
   const store = useCounterStore();
// FIREBASE
import { collection,getFirestore, query, where, getDocs } from "firebase/firestore";
const db = getFirestore(app);
let terlaris = ref([])
let dialogincrement = ref(false)
let increment = ref(1)
const scrollInfo = ref({position:{top:0}})

// CART
let batasstok = ref()
let hargapcs = ref()
let dipilih = ref([])
let dialogcheckout = ref(false)
let hargabarang = ref()
let totalharga = computed(()=> hargabarang * increment.value )


function addtocart(p){
	dialogincrement.value = true
	hargabarang = parseInt(p.harga)
	dipilih.value = p
	batasstok.value = p.stok
}
function addtokeranjang(){
let data  = {
		nama_barang : dipilih.value.nama_barang,
		img : dipilih.value.image,
		totalpesan : increment.value,
		totalharga : hargabarang * increment.value,
		desc: dipilih.value.desc
	}
		let add  = store.masukkeranjang(data)
			dialogincrement.value = false
			dialogcheckout.value = true
}
function belisekarang(p){

}
function addincrement(){
	increment.value  +=1
	if(increment.value > batasstok.value){
		increment.value = batasstok.value
	}
}
function removeincrement(){
	increment.value  -=1
	if(increment.value <= 0){
		increment.value = 1
	}
}


// SCROLL EFFECT
function onScroll(info){
	scrollInfo.value = info
}

 onMounted(async()=>{
 	// GET DATA TERLARIS > 
const q = query(collection(db, "data_carousel"), where("dibeli", ">=", 50));
 	const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  terlaris.value.push({id:doc.id,data:doc.data()})
});
 })
</script>
<template>
	<q-page>
		 <q-page-sticky position="bottom-right" :offset="[18, 130]">
            <q-btn fab icon="shopping_cart_checkout" color="accent" 
            @click="dialogcheckout=true"
            />
          </q-page-sticky>
		<div style="height:10000px"> 
			    <q-scroll-observer @scroll="onScroll" />
			<!-- JIKA BENAR -->
			<div v-if="terlaris.length > 0">
						<q-toolbar>
						<div class="row">
							<q-btn icon="arrow_back" flat
							@click="$router.go(-1)"
							></q-btn>
							<div class="text-h6">Produk Terlaris</div>
						</div>
					</q-toolbar>
					<q-card class="q-ma-md">
						<div v-for="p in terlaris">
						<div class="column">
						<div class="row">
					</div>
					<div class="row justify-center">
						<img :src="p.data.image"
						style="max-width: 100%"
						 alt="">
					</div>
					<div class="row q-pa-md">
						<div class="text-subtitle1 text-bold">{{p.data.nama_barang}}</div>
					</div>
					<div class="row q-pa-md justify-around">
						<div style="width:60%">
							<div class="text-caption">{{p.data.desc}}</div>
						</div>
						<div style="width:20%">
							<!-- <div class="text-subtitle2">{{toRupiah(p.data.harga)}}</div> -->
						</div>
					</div>
					<div class="row q-pa-md justify-between">
						<q-rating v-model="p.data.ratting"
						icon="thumb_up"
						color="orange"
						size="20px"
						readonly
						></q-rating>
						<q-btn color="pink" flat
						@click="addtocart(p.data)"
						>Simpan ke keranjang</q-btn>
					</div>
					<div class="row q-pa-md justify-between">
						tersedia {{p.data.stok}} Pcs lagi
						<q-btn color="primary"
						@click="belisekarang(p)"
						>beli sekarang</q-btn>
					</div>

					</div>
				</div>
					</q-card>
			</div>
			<!-- JIKA SALAH -->
			<div v-else >
				<div class="column">
					<div class="row">
					<q-toolbar>
					<div class="row">
						<q-btn icon="arrow_back" flat
						@click="$router.go(-1)"
						></q-btn>
						<div class="text-h6">Produk Terlaris</div>
					</div>
				</q-toolbar>
				</div>
				<div class="row ">
					<q-skeleton width="100%" height="220px"></q-skeleton>
				</div>
				<div class="row q-pa-md">
					<q-skeleton width="70%" height="40px"></q-skeleton>
				</div>
				<div class="row q-pa-md justify-around">
					<q-skeleton width="70%" height="190px"></q-skeleton>
					<q-skeleton width="20%" height="30px"></q-skeleton>
				</div>
				<div class="row q-pa-md justify-center">
					<q-skeleton width="100%" height="40px"></q-skeleton>
				</div>

				</div>


			</div>
			<!-- MENU DI SSCROLL -->
	 		<div v-if="scrollInfo.position.top > 2  ">
	 				<q-toolbar 
	 				class="bg-primary text-white"
	 				style="position: fixed;
	 				z-index: 20;
	 				top:0px">
					<div class="row">
						<q-btn icon="arrow_back" flat
						@click="$router.go(-1)"
						></q-btn>
						<div class="text-h6">Produk Terlaris</div>
					</div>

				</q-toolbar>
	 		</div>	
	 		<div v-else>
	 			<!-- KOSONGAN DARI SXROLL -->
	 		</div>
		</div>

		<!-- DIALOG INCREMENT -->
		   <q-dialog full-width v-model="dialogincrement" >
      <q-card >
        <q-card-section>
        	<div class="column">
        		<div class="row justify-between">
        				<q-btn round  icon="add" color="green"
        				@click="addincrement"
        				></q-btn>
			        	<div class="text-h6">{{increment}}</div>
			        	<q-btn round  icon="remove" color="red"
        				@click="removeincrement"
			        	></q-btn>
			       </div>
			       <div class="row q-pa-md justify-center">
			       	<div class="text-subtitle2">Anda memesan {{increment}} Pcs</div>
			       </div>
			       <div class="row justify-center q-pa-md">
			       	<div class="text-body1">Total harga : <b>{{toRupiah(totalharga)}}</b></div>
			       </div>
			       <div class="row justify-center">
			       	<q-btn color="primary" icon="shopping_cart_checkout"
			       	@click="addtokeranjang"
			       	>
			       		tambah ke keranjang
			       	</q-btn>
			       </div>
			       <div class="row justify-center">
			       	<div class="text-subtitle1">
			       		atau
			       	</div>
			       </div>
			       <div class="row justify-center q-mt-lg">
			       	<q-btn color="red" icon="shopping_cart_checkout">
			       		Bayar Sekarang
			       	</q-btn>
			       </div>
        	</div>
        </q-card-section>
      </q-card>
    </q-dialog>


    <!-- DIALOG BUKA CHECKOUT -->
    <q-dialog v-model="dialogcheckout"
    position="bottom">
    	<q-card>
    		<q-card-section>
        <div class="column">
        	<div class="row">
        		<KomKeranjang/>
        	</div>
        </div>
    		</q-card-section>
    	</q-card>

    </q-dialog>
	</q-page>
</template>