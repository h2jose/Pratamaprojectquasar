<script setup>
  import {ref,onMounted,computed} from 'vue'
  import KomKeranjang from 'src/components/KomKeranjang.vue'
  import Pencarian from 'src/components/Pencarian.vue'

  import { useCounterStore } from 'stores/belanja';
   const store = useCounterStore();
  const data = computed(() => store.getdataPromo);
 let dialogkeranjang = ref(false)
 let dialogpencarian = ref(false)
</script>
<style>
 scrollbar::-webkit-scrollbar {
   display: none;
   overflow:hidden
}
</style>
<template>
  <div>
      <div class="column bg-primary" style="height:100px">
       <div class="row">
          <q-toolbar class="justify-between">
        <q-card class="q-pa-sm" style="width:80%"
        @click="dialogpencarian=true"
        >
          <div class="text-caption text-grey">Mau Cari apa</div>
        </q-card>
        <q-btn icon="shopping_cart" round flat color="white"
        @click="dialogkeranjang=true"
        ></q-btn>
      </q-toolbar>
       </div>
      </div>
      <div class="column">
        <div class="row">
        <q-card style="margin-top: -30px;width: 100%;
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
        ">
          <div class="column">
            <div class="row q-pa-md">
            <div class="text-h6 text-bold">Promo Terbaru</div>
            </div>
              <div v-if="data.length > 0">
                 <q-scroll-area style="height: 130px; max-width: 100%;">
                <div class="row no-wrap">
                  <div v-for="(p,index) in data"  class="q-pa-sm">
                    <div>
                    <img :src="p.data.image" alt="" style="height:100px" />
                    </div>
                  </div>
                </div>
              </q-scroll-area>
              </div>
              <div v-else>
                 <q-scroll-area 
                 class="scrollbar"
                 style="overflow:hidden;height: 130px; max-width: 100%;">
                <div class="row no-wrap">
                <div v-for="index in 10" class="q-pa-sm">
                  <q-skeleton width="180px" height="100px" square></q-skeleton>
                </div>            
                </div>   
                  </q-scroll-area>
              </div>
          </div>
        </q-card>
        </div>
      </div>

      <!-- DIALOG KERANJANG -->
      
    <q-dialog v-model="dialogkeranjang" position="bottom">
      <q-card style="width: 350px">

        <q-card-section class="row items-center no-wrap">
          <KomKeranjang/>
        </q-card-section>
      </q-card>
    </q-dialog>


    <!-- DIALOG PENCARIAN -->
     <q-dialog
      v-model="dialogpencarian"
      persistent
      maximized
      transition-show="slide-left"
      transition-hide="slide-right"
    >
      <q-card>
          <div class="column bg-primary text-white">
            <div class="row" style="height:60px">
            <q-btn icon="arrow_back" flat
          @click="dialogpencarian=false"
          />
          <div class="text-h6  q-mt-md text-bold">Pencarian</div>
          </div>
          </div>
        <q-card-section>
          <Pencarian/>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>