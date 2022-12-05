<script setup>
	import {ref,computed} from 'vue'
	import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
  import {app} from 'src/firebase/firebase.js'
let username = ref("")
let password = ref("")
const inputRef = ref(null)
let model =  ref('')
let isPwd = ref(true)
let  isValid =  computed(() => password.value.length >= 8)

let isSuccessregister = ref(false)
// FUNGSI CREATE USER
const auth = getAuth(app);
async function createduser(){
	let email = username.value
	let pwd = password.value
	await createUserWithEmailAndPassword(auth, email, pwd)
  .then((userCredential) => {
    const user = userCredential.user;
    if(user.email == username.value){
    	isSuccessregister.value = true
    	username.value = ""
    	password.value = ""
    }
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}
</script>
<template>
	<div>
		 <div class="column text-white">
        <div class="row justify-center ">
          <div class="text-body1">Daftarkan Akun anda</div>
        </div>
        <div class="row justify-center q-pa-md">
        <q-input rounded outlined v-model="username" 
        style="width: 100%;"
     bg-color="white"
        label="Email" />
   </div>
   <div class="row justify-center q-pa-md">
     <q-input v-model="password" 

        style="width: 100%;"
      label="password"
      :error="!isValid"
        bottom-slots
           bg-color="white"
     rounded outlined :type="isPwd ? 'password' : 'text'" >
       <template v-slot:error>
       	<div class="text-white">
        Password minimal 8 karakter
       	</div>
      </template>
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
   </div>
   <div class="row justify-center q-pa-md">
     <q-btn color="primary" style="width: 100%;"
     @click="createduser"
     >Mendaftar</q-btn>
   </div>

    </div>

    <!-- SUCCES SREGISTEr -->
    <q-dialog v-model="isSuccessregister" 
 transition-show="slide-up"
      transition-hide="slide-down"
    >
    	<q-card>
    		<q-card-section>
    			<div class="column">
    				<div class="row justify-center">
    					<img src="~assets/successlogin.gif"
    					style="max-height: 140px;"
    					 alt="">
    				</div>
    					<div class="row justify-center">
    				<div class="text-green text-h6">Akun Anda berhasil terbuat</div>
    				</div>
    				<div class="row justify-center">
    				<div class="text-black text-subtitle2">Silahkan Login </div>
    				</div>
    			</div>
    		</q-card-section>
    	</q-card>
    </q-dialog>
	</div>
</template>