<script setup>
	import {ref,computed} from 'vue'
	  import { useCounterStore } from 'stores/belanja';
   const store = useCounterStore();
 const getalldata = computed(() => store.getdataFirebase);
 import toRupiah from '@develoka/angka-rupiah-js';
</script>
<template>
	<div>
		<!-- JIKA ADA -->
		<div v-if="getalldata.length > 0">
			<div class="column">
			<div class="row q-pa-md justify-between">
			    <div class="text-h6">Produk Terlaris</div>
			       <q-btn flat class="text-orange text-caption text-bold"
			    to="/detailterlaris">Lihat semua</q-btn>
		     </div>
		      <q-scroll-area style="overflow-x:hidden;height: 400px; max-width: 100%;">
		    	 <div class="row q-pa-md no-wrap " >
		    <div v-for="p in getalldata">
		     	<router-link
		     	:to="/bayarsekarang/ + p.id"
		     	style="text-decoration: none;color: inherit;"
		     	>
		     		<q-card style="border-radius: 30px;
		     	max-width: 150px;
		     	" class="q-ml-md">
		     		<div class="column">
		     			<div class="row">
		     				<img :src="p.data.image" 
		     			style="max-height:100px;
		     			border-top-left-radius: 30px;
		     			border-top-right-radius: 30px;
		     			background-size: cover;"
		     			alt="">
		     			</div>	
		     			<div class="row q-pa-xs">
		     				<div class="text-subtitle2">
		     			{{p.data.nama_barang}}
		     			</div>
		     			</div>
		     			<div class="row justify-between">
		     				<div class="text-caption q-ml-sm">
		     					Stok {{p.data.stok == '0' ? "habis":p.data.stok}} 
		     				</div>
		     			<div class="text-caption text-orange text-bold">
		     				{{toRupiah(p.data.harga,{replaceZeroDecimals:true})}}
		     			</div>
		     			</div>
		     			<div class="row q-pa-md">
		     				<div class="text-caption">
		     			{{p.data.desc.substring(0,30)+ "..."}}
		     			</div>
		     			</div>
		     			<div class="row  justify-end q-pa-md">
		     				<div class="text-caption">
		     					{{p.data.dibeli}} x dibeli
		     				</div>
		     			</div>
		     		</div>
		     		
		     	</q-card>
		     	</router-link>
		     </div>
		    </div>
		    	</q-scroll-area>
		</div>
		</div>
		<!-- JIKA SALAH -->
		<div v-else>
			<div class="column">
			<div class="row q-pa-md justify-between">
			    <div class="text-h6">Produk Terlaris</div>
			    <q-btn flat class="text-orange text-caption text-bold"
			    to="/detailterlaris">Lihat semua</q-btn>
		     </div>
		    	 <div class="row no-wrap justify-between">
		     	<q-skeleton width="120px" height="70px"></q-skeleton>
		     	<q-skeleton width="120px" height="70px"></q-skeleton>
		     	<q-skeleton width="120px" height="70px"></q-skeleton>
		     </div>
		</div>
		</div>
	</div>
</template>