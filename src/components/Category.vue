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
	<div class="row q-ma-md justify-center" >
	<router-link to="/detailcategory/building"
	style="text-decoration: none;color:inherit;"
	>
		<q-card class="bg-orange text-white text-bold">
		<div class="column q-pa-md justify-center" >
			Building
		</div>
	</q-card>
	</router-link>
	<router-link to="/detailcategory/tools"
	style="text-decoration: none;color:inherit;"
	>
	<q-card class="bg-green text-white text-bold">

		<div class="column q-pa-md justify-center" >
			Tools
		</div>
	</q-card>
	</router-link>
	<router-link to="/detailcategory/sanitary"
	style="text-decoration: none;color:inherit;"
	>
			<q-card class="bg-purple text-white text-bold">

		<div class="column q-pa-md justify-center" >
			Sanitary
		</div>
	</q-card>
	</router-link>
	<router-link to="/detailcategory/housewife"
	style="text-decoration: none;color:inherit;"
	>
				<q-card class="bg-red text-white text-bold">

		<div class="column q-pa-md justify-center" >
			HouseWife
		</div>
	</q-card>
	</router-link>
	<router-link to="/detailcategory/plumbing"
	style="text-decoration: none;color:inherit;"
	>
			<q-card class="bg-cyan text-white text-bold">

		<div class="column q-pa-md justify-center" >
			Plumbing
		</div>
	</q-card>
	</router-link>
	<router-link to="/detailcategory/electrical"
	style="text-decoration: none;color:inherit;"
	>
				<q-card class="bg-black text-white text-bold">

		<div class="column q-pa-md justify-center" >
			Electrical
		</div>
	</q-card>
	</router-link>
</div>
</div>
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
