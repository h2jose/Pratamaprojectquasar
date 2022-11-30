<script setup>
	import {ref,computed} from 'vue'
	  import { useCounterStore } from 'stores/belanja';
   const store = useCounterStore();
  const alldata = computed(() => store.getdataFirebase);
</script>
<template>
	<div>
<div class="row q-pa-md">
	<div class="text-h6 text-bold">
		Category
	</div>
</div>
<!-- RENDER CATEGORY -->
<div v-if="alldata.length > 0">
	<div class="row justify-evenly q-pa-md">
		<router-link to="/detailcategory/building"
	style="text-decoration: none;color:inherit;"
	>
			<q-card class="q-pa-md bg-primary text-white">
				<div class="column">
						<div class="text-subtitle2">
							Building
						</div>
				</div>
			</q-card>
		</router-link>
			<router-link to="/detailcategory/tools"
	style="text-decoration: none;color:inherit;"
	>
			<q-card class="q-pa-md bg-orange text-white">
				<div class="column">
						<div class="text-subtitle2">
							Tools
						</div>
				</div>
			</q-card>
		</router-link>
			<router-link to="/detailcategory/sanitary"
	style="text-decoration: none;color:inherit;"
	>
			<q-card class="q-pa-md bg-red text-white">
				<div class="column">
						<div class="text-subtitle2">
							Sanitary
						</div>
				</div>
			</q-card>
		</router-link>
	</div>
	<div class="row justify-evenly q-pa-md">
		<router-link to="/detailcategory/housewife"
	style="text-decoration: none;color:inherit;"
	>
			<q-card class="q-pa-md bg-blue text-white">
				<div class="column">
						<div class="text-subtitle2">
							HouseWife
						</div>
				</div>
			</q-card>
		</router-link>
			<router-link to="/detailcategory/plumbing"
	style="text-decoration: none;color:inherit;"
	>
			<q-card class="q-pa-md bg-green text-white">
				<div class="column">
						<div class="text-subtitle2">
							Plumbing
						</div>
				</div>
			</q-card>
		</router-link>
			<router-link to="/detailcategory/electrical"
	style="text-decoration: none;color:inherit;"
	>
			<q-card class="q-pa-md bg-black text-white">
				<div class="column">
						<div class="text-subtitle2">
							Electrical
						</div>
				</div>
			</q-card>
		</router-link>
	</div>
</div>

<!-- jika kosong -->
<div v-else>
	<div class="row q-ma-md justify-around">
	<q-card >
		<q-skeleton width="70px" height="50px"></q-skeleton>
	</q-card>
	<q-card >
		<q-skeleton width="70px" height="50px"></q-skeleton>
	</q-card>
	<q-card >
		<q-skeleton width="70px" height="50px"></q-skeleton>
	</q-card>
	<q-card >
		<q-skeleton width="70px" height="50px"></q-skeleton>
	</q-card>
	<q-card >
		<q-skeleton width="70px" height="50px"></q-skeleton>
	</q-card>
</div>
</div>
	</div>
</template>	
