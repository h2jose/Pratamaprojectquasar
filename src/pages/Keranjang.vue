<script setup>
	import {ref} from 'vue'
	import KomKeranjang from 'src/components/KomKeranjang.vue'
	  import { useCounterStore } from 'stores/belanja';
   const store = useCounterStore();

</script>
<template>
	<q-page>
		<KomKeranjang/>
	</q-page>
</template>