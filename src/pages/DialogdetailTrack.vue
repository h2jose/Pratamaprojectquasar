
<template>
	<q-page>
		<div class="column">
			<q-toolbar>
				<q-btn flat icon="arrow_back" round
         @click="$router.go(-1)"
				></q-btn>
				<div class="text-h6">Detail transaksi</div>
			</q-toolbar>
				<div v-if="datakurir != undefined">
						<div class="column q-pa-md">
							<div class="row justify-between ">
								<div class="text-subtitle2">
									nama : {{datakurir.nama}}
								</div>
							</div>
							<div class="row">
								<div class="text-caption">
									alamat : {{datakurir.alamat}}
								</div>
							</div>
								<div class="row">
								<div class="text-caption">
									No Hp : {{datakurir.phone}}
								</div>
							</div>
						</div>
				</div>
				<!-- JIKA DATA PESANAN TIDAK KOSONG -->
				<div v-if="datakurir.pesanan != undefined">
					<div class="column">
						<div class="row q-pa-md">
							<div class="text-subtitle2">Pesanan anda</div>
						</div>
						<div class="row justify-center">
							<q-card class="shadow-4">
								<div class="row">
									<img :src="datakurir.pesanan.image" 
                  style="width:200px;height:160px"
									alt="">
								</div>
								<div class="row justify-center">
									<div class="text-subtitle2">{{datakurir.pesanan.nama_barang}}</div>
								</div>
								<div class="row justify-center">
										<div class="text-caption">
										harga : {{formatter.format(datakurir.pesanan.harga)}}
									</div>
								</div>
							</q-card>
						</div>
						<div class="row q-pa-md">
								<div class="row ">
									<div class="text-subtitle2">Deskripsi</div>
								</div>
								<div class="row ">
									<div class="text-caption">
										{{datakurir.pesanan.desc}}
									</div>
								</div>
						</div>
							<div class="row  q-mt-md q-pa-sm">
								<div class="text-subtitle2">
									jumlah pesan : {{datakurir.jumlahpesan}}
								</div>
							</div>
							<div class="row   q-mt-sm q-pa-sm">
									<div class="text-subtitle2">
										Total bayar : {{formatter.format(datakurir.harga)}}
									</div>
								</div>
					</div>
				</div>
				<!-- JIKA LOADING -->
				<div v-else>
						<div class="column">
							<div class="row justify-center" style="margin-top: 50%;">
								<q-spinner size="50px"></q-spinner>
							</div>
						</div>
				</div>
			
			      <!-- MAPS KURIR -->
				<div v-if="datakurir.kurir != undefined">
					<div class="row justify-around">
						<div class="text-caption">
					lat : {{datakurir.kurir.latitude}}
						</div>
						<div class="text-caption">
					long : {{datakurir.kurir.longitude}}
						</div>
					</div>
					<div class="row justify-center">
						<div class="text-subtitle2"
						:style="{color:datakurir.kurir.status == true ? 'green':'red'}"
						>
							{{datakurir.kurir.status == true ? "Kurir sedang mengirim ..." : "Belum ada kurir yang mengirim"}}
						</div>
					</div>
				</div>

	 		 <div id="mapContainer" style="height:400px"></div>
       
				



		</div>
	</q-page>
</template>
<script setup>
	

	import {ref, onMounted} from 'vue'
  import { getFirestore,onSnapshot,collection,query,where,doc, orderBy,getDoc } from 'firebase/firestore'
  import Markericon from 'src/assets/lokasimarker.png'
  var mymap ;
	 import "leaflet/dist/leaflet.css";
import L from "leaflet";
  import {app} from 'src/firebase/firebase.js'
   const db = getFirestore(app);
   import {useRoute} from 'vue-router'
   const route = useRoute()
   const myid  = ref(route.params.id)
   let datakurir = ref({})
  	let marker;
     
    // DEFINE ICON MARKER
 var greenIcon = L.icon({
    iconUrl: Markericon,
    shadowUrl: Markericon,

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [5, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

   // let YOUR_LAT  = ref(datakurir.kurir.latitude)
   // let YOUR_LONG  = ref(datakurir.kurir.longitude)
// // MAPBOX
//        import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl';
//   import 'mapbox-gl/dist/mapbox-gl.css';
//     let token = "pk.eyJ1IjoiYm9id2F0Y2hlcngiLCJhIjoiY2xiMGwwZThrMWg3aTNwcW1mOGRucHh6bSJ9.kNHlmRqkRSxYNeipcKkJhw"


// function mapstrack(lat,long){
// 	mymap = L.map("mapContainer").setView([lat, long], 5);
//     L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
//       attribution:
//         '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(mymap);
//  L.marker([lat, long]).bindPopup("Kurir ada di sini").openPopup().addTo(mymap);
// }

onMounted(async()=>{
	
 		// REALTIME MAPBOX DARI FIRESTORE
    const unsub = onSnapshot(doc(db, "transaksi", myid.value), (doc) => {
    console.log("Current data: ", doc.data());
    datakurir.value = doc.data()
    // console.log(datakurir.value.kurir.latitude)
    	let latitude = datakurir.value.kurir.latitude
    	let longitude = datakurir.value.kurir.longitude
    	if(datakurir.value.kurir != undefined){
var container = L.DomUtil.get('mapContainer');
   		mymap = L.map("mapContainer").setView([latitude, longitude], 5);
   var osm =  L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    });
 if(container != null){ 
 	container._leaflet_id = null; console.log("jalananan")
   if (marker != undefined) {
              mymap.removeLayer(marker);
        };
    		// mymap.removeL2ayer(marker)
 // marker = L.marker([latitude, longitude]).bindPopup("Kurir ada di sini").openPopup().addTo(mymap);
 marker = L.marker(new L.LatLng(latitude, longitude), {icon: greenIcon}).bindPopup("Kurir ada di sini").openPopup().addTo(mymap);
 osm.addTo(mymap)
    // var newLatLng = new L.LatLng(latitude, longitude);
    // marker.setLatLng(newLatLng); 
      	// document.getElementById("mainmap").outerHTML = "";
 // marker.addTo(mymap);
 // mymap.addLayer(osm);
}
    		console.log("Dda" + latitude + longitude)
    	}

});
})


// format IDR
 const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
})
</script>

<style>
	#map { height: 180px; }
</style>
