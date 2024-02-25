import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDkEHEjNfZoEEKQVuI8LYgvAuECusIEd8s",
  authDomain: "gas-detection-306f1.firebaseapp.com",
  databaseURL:
    "https://gas-detection-306f1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gas-detection-306f1",
  storageBucket: "gas-detection-306f1.appspot.com",
  messagingSenderId: "112877471200",
  appId: "1:112877471200:web:608d0f2f86e9e2ed0d9785",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getDeviceList() {
  try {
    const querySnapshot = await getDocs(collection(db, "device"));
    const device_list = await Promise.all(
      querySnapshot.docs.map((doc) => doc.data())
    );
    return device_list;
  } catch (error) {
    console.error("Error fetching device list:", error);
    throw error; // Re-throw to allow handling elsewhere
  }
}
window.getDeviceList = getDeviceList;
