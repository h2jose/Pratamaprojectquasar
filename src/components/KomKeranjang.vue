<script setup>
	import {ref} from 'vue'
 import toRupiah from '@develoka/angka-rupiah-js';
	  import { useCounterStore } from 'stores/belanja';
   const store = useCounterStore();
  const datakeranjang = ref(store.keranjang.reverse());
</script>
<template>
	<div>
<div class="column">
	<div class="row">
		<div class="text-h6">Keranjang Saya</div>
	</div>
		<div v-for="p in datakeranjang">
	<div class="row">
          <q-card class="q-ma-md">
          	<q-card-section>
          		<div class="column">
          			<div class="row justify-between">
          				<div>
          				<div class="text-body1 text-bold">{{p.nama_barang}}</div>
          				<div class="text-caption"
          				style="width:50%"
          				>{{p.desc.substring(0,30)+ "..."}}</div>
          					
          				</div>
          				<img :src="p.img" 
                        style="width:30%"
          				alt="">
          			</div>
          			<div class="row">
          				<div class="text-caption ">
          				total beli : {{p.totalpesan}} Pcs
          				</div>
          			</div>
          			<div class="row">
          				<div class="text-caption text-bold">
          				Total harga : {{toRupiah(p.totalharga)}}</div>
          			</div>
          			<div class="row">
          				<q-btn :to="/bayarsekarang/ + p.id  "
          				 color="red">Bayar sekarang</q-btn>
          			</div>
          		</div>
          	</q-card-section>
          </q-card>
		</div>
	</div>
</div>
	</div>
</template>