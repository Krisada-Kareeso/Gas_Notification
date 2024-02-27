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
  let data_list = [];
  // Iterate over each device ID
  deviceIds.forEach((deviceId) => {
    const usersRef = ref(database, deviceId);

    function handleDataChange(snapshot) {
      if (snapshot.exists()) {
        const deviceData = snapshot.val();
        const timestampKeys = Object.keys(deviceData.log.data.timestamp);
        const ppmKeys = Object.keys(deviceData.log.data.value);

        let maxTimestamp = -Infinity; // Initialize maxTimestamp to negative infinity
        let maxValue = null; // Initialize maxValue to null

        timestampKeys.forEach((timestampKey, index) => {
          const ppmKey = ppmKeys[index];
          const timestampValue = deviceData.log.data.timestamp[timestampKey];
          const ppmValue = deviceData.log.data.value[ppmKey];
          data_list.push([timestampValue, ppmValue]);

          // Update maxTimestamp and maxValue if the current timestamp is greater
          if (timestampValue > maxTimestamp) {
            maxTimestamp = timestampValue;
            maxValue = ppmValue;
          }
        });
        $(`#value_${deviceId}`).html(maxValue);

        console.log("Maximum Timestamp:", maxTimestamp);
        console.log("Corresponding Value:", maxValue);
        $(`#value_${deviceId}`).html(deviceData.ppm);
      } else {
        $(`#value_${deviceId}`).html("NaN");
        console.log(`No data found for device ${deviceId}`);
        // Handle the case where data for the device ID is not found
      }
    }

    // Set up an event listener to monitor data changes for each device ID
    onValue(usersRef, handleDataChange);
  });
}
window.showValue = showValue;
