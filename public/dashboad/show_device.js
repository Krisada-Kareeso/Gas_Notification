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

    function handleDataChange(snapshot) {
      if (snapshot.exists()) {
        const deviceData = snapshot.val();
        $(`#value_${deviceId}`).html(
          typeof deviceData.value !== "number" ? "NaN" : deviceData.value
        );
        $(`#update_${deviceId}`).html(`Last update <span class="text-gray-800">${convertTime(deviceData.last_update)}</span>`);
      } else {
        $(`#value_${deviceId}`).html("NaN");
        console.log(`No data found for device ${deviceId}`);
      }
    }
    onValue(usersRef, handleDataChange);
  });
}
window.showValue = showValue;
