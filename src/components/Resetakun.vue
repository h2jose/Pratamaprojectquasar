<script setup>
	import {ref} from 'vue'
	import { getAuth, sendPasswordResetEmail } from "firebase/auth";
  import {app} from 'src/firebase/firebase.js'
	const auth = getAuth(app);
  import { useCounterStore } from 'stores/belanja';
   const store = useCounterStore();
let ifSuccess = ref(false)

function resetakun(){
	let email = store.dataLogin.email
	sendPasswordResetEmail(auth, email)
  .then(() => {
  	ifSuccess.value = true
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
  });
}
</script>
<template>
	<div>
		<div class="column justify-center">
			<div class="row justify-center">
				<img src="~assets/reset.gif"
                style="max-width: 330px;"
				 alt="">
			</div>
			<div class="row justify-center">
				<div v-if="ifSuccess == false">
					<q-btn 
				@click="resetakun"
				color="primary">Kirim email Reset akun anda</q-btn>
				</div>
				<div class="q-pa-md" v-else>
					<div class="text-body1 text-center">Berhasil Terkirim , silahkan cek email atau spam anda</div>
				</div>
			</div>
		</div>
	</div>
</template>