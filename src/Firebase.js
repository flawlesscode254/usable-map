import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({
    apiKey: "AIzaSyBhVewBpRQDYQaZFqawGjX1Hg3J8tvFU1M",
    authDomain: "town-parking.firebaseapp.com",
    projectId: "town-parking",
    storageBucket: "town-parking.appspot.com",
    messagingSenderId: "547387786343",
    appId: "1:547387786343:web:6143a6bec9ba19de5940c2",
    measurementId: "G-XTNWGZWSJ2"
})

const db = firebaseApp.firestore();

export { db }