import {getApp, getApps, initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
import {getAuth} from "firebase/auth";

export const firebaseConfig = {
    apiKey: "AIzaSyA-d7uIadLfBrtssbljrTMlkNnStOQwvZc",
    authDomain: "deliveryapp-ce37f.firebaseapp.com",
    databaseURL: "https://deliveryapp-ce37f-default-rtdb.firebaseio.com",
    projectId: "deliveryapp-ce37f",
    storageBucket: "deliveryapp-ce37f.appspot.com",
    messagingSenderId: "502570388783",
    appId: "1:502570388783:web:31b3d778f141f8706ce5da"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)

const firestore = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth(app)

export {app, firestore, storage, auth}