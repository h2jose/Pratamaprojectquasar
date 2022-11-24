<script setup>
  import {ref} from 'vue'
    import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl';
  import 'mapbox-gl/dist/mapbox-gl.css';
    let token = "pk.eyJ1IjoiYm9id2F0Y2hlcngiLCJhIjoiY2t5dmo1MXh4MXlhcTJwbzc4ZTdxMGlmcSJ9.T_TMwHTxa9qNkHRwAPtIlA"

</script>
<template>
  <q-page >
    <div style="position: relative;background-attachment: fixed;">
      <MapboxMap :access-token="token"
       :style="{height:$q.screen.height + 'px'}"
      map-style="mapbox://styles/mapbox/streets-v11">
    <MapboxMarker :lng-lat="[0, 0]" popup>
      <q-icon name="local_shipping" size="50px" color="primary"/>
        <template v-slot:popup>
        <p>Hello world!</p>
      </template>
    </MapboxMarker>
</MapboxMap>
    </div>
    <!-- NAVIGATION -->
    <div style="position: absolute;left:0px;right:0px;top:70%;
    background-color: white;border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    ">
    <div class="column">
      <div class="row q-pa-md">
      <div class="text-body1 text-bold">Lacak Lokasi Kurir</div>
      </div>
        <q-scroll-area style="height: 230px; width: 100%;">
      <div class="row no-wrap">
        <!-- ORDER ID -->
        <q-card>
          <div class="column q-pa-md">
            <div class="text-body1">3121</div>
          </div>
        </q-card>
      </div>
    </q-scroll-area>
    </div>
    </div>
  </q-page>
</template>

