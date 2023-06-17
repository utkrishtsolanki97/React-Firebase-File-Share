import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBt47P7kHhhnPR2nziprBVBaKdS8I-vgMQ",
  authDomain: "share-utkrisht.firebaseapp.com",
  projectId: "share-utkrisht",
  storageBucket: "share-utkrisht.appspot.com",
  messagingSenderId: "912652587065",
  appId: "1:912652587065:web:6d13893ddd4886b473fde8",
  measurementId: "G-0TKD6KVC94",
  storageBucket: "gs://share-utkrisht.appspot.com",
};

export default firebase.initializeApp(firebaseConfig);
