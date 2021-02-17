import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDvpFF6KKYsdI4JfkWEpRRR0F5-BSe2Tt0",
    authDomain: "whatsappclonefrontend.firebaseapp.com",
    projectId: "whatsappclonefrontend",
    storageBucket: "whatsappclonefrontend.appspot.com",
    messagingSenderId: "203113435978",
    appId: "1:203113435978:web:3626e2d5765f7fa8eda7b3",
    measurementId: "G-WDYPYGXZ6W"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;