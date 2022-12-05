<script setup>
  import KomTrack from 'src/components/KomTrack.vue'
  import {ref} from 'vue'
  //   import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl';
  // import 'mapbox-gl/dist/mapbox-gl.css';
  //   let token = "pk.eyJ1IjoiYm9id2F0Y2hlcngiLCJhIjoiY2t5dmo1MXh4MXlhcTJwbzc4ZTdxMGlmcSJ9.T_TMwHTxa9qNkHRwAPtIlA"

</script>
<template>
  <q-page >
 <div class="column">
   <div class="row">
     <q-toolbar class="bg-primary text-white shadow-4">
       <div class="row">
         <div class="text-h6">History transaksi</div>
       </div>
     </q-toolbar>
   </div>
 </div>
    <KomTrack/>

  </q-page>
</template>


  <!-- <iframe scrolling="no" marginheight="0" marginwidth="0" id="gmap_canvas" src="https://maps.google.com/maps?width=1920&amp;height=1080&amp;hl=en&amp;q=perumahan%20taman%20aster%20bekasi%20Bekasi+()&amp;t=h&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" width="1920" height="1080" frameborder="0"></iframe><a href='https://maps-generator.com/'>Maps Generator</a> -->