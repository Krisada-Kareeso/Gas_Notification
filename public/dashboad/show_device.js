import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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

const database = getDatabase(app);

function showValue(deviceIds) {
  // Iterate over each device ID
  deviceIds.forEach((deviceId) => {
    const usersRef = ref(database, deviceId);

    // Function to handle data changes
    function handleDataChange(snapshot) {
      const deviceData = snapshot.val();
      console.log(`Data for device ${deviceId}:`, deviceData);
      $(`#value_${deviceId}`).html(deviceData.ppm);
    }

    // Set up an event listener to monitor data changes for each device ID
    onValue(usersRef, handleDataChange);
  });
}
window.showValue = showValue;
