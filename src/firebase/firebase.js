// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBF9y2H43aKZFv7T6J3O_WQMHg5eYv_HTU",
  authDomain: "alpine-fin-228211.firebaseapp.com",
  databaseURL: "https://alpine-fin-228211.firebaseio.com",
  projectId: "alpine-fin-228211",
  storageBucket: "alpine-fin-228211.appspot.com",
  messagingSenderId: "51366506825",
  appId: "1:51366506825:web:af6df20c073747ae72aa98",
  measurementId: "G-ZS8GXK2Z0T"
};

// Initialize Firebasee
export const app = initializeApp(firebaseConfig);
