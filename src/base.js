import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCkK9J9MXPdcTAfo0s87SllRADglZ16nP8",
  authDomain: "files-d9315.firebaseapp.com",
  databaseURL: "https://files-d9315.firebaseio.com",
  projectId: "files-d9315",
  storageBucket: "files-d9315.appspot.com",
  messagingSenderId: "298771617646",
  appId: "1:298771617646:web:60140a9a5af685df35937f",
  measurementId: "G-HQT69B1VN7",
});

const storage = firebase.storage();
export default app;
