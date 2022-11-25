<script setup>
const provider = new GoogleAuthProvider();
import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
 import {app} from 'src/firebase/firebase.js'
import { useCounterStore } from 'stores/belanja';
const auth = getAuth(app);


auth.languageCode = 'it';
// provider.setCustomParameters({
//   'login_hint': 'user@example.com'
// });
const store = useCounterStore();

function loginnow(){
	signInWithRedirect(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // console.log(user)
    if(user){
    	store.tambahdatalogin(user)
    }
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}
</script>
<template>
	<div>
  <div class="column">
  	<div class="row justify-center">
  		<img src="~/assets/anim_login.gif" 
        style="max-height: 180px;"
  		alt="">
  	</div>
  	<div class="row justify-center">
  	  <div class="text-h6">Kamu Belum Login</div>
  	</div>
  	<div class="row justify-center">
  		<q-btn color="primary"
  		@click="loginnow"
  		>Login Sekarang</q-btn>
  	</div>
  </div>
	</div>
</template>