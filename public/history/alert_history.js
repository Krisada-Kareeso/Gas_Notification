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

function showHistory(deviceIds) {
  let history_list = [];

  // Define a function to handle data changes for a single device
  function handleDataChange(deviceId, snapshot) {
    if (snapshot.exists()) {
      const deviceData = snapshot.val();
      const timeStamp = Object.values(deviceData.log.timestamp_alarm);
      const value = Object.values(deviceData.log.value_alarm);
      const combinedData = timeStamp.map((timestamp, index) => ({
        timestamp: timestamp,
        value: value[index],
        device_id: deviceId.device_id,
      }));
      // Update history_list by removing old data related to this device
      history_list = history_list.filter(
        (data) => data.device_id !== deviceId.device_id
      );
      // Add new data related to this device
      history_list.push(...combinedData);
    } else {
      console.error("not found device", deviceId.device_id);
      // If device is not found, remove its data from history_list
      history_list = history_list.filter(
        (data) => data.device_id !== deviceId.device_id
      );
    }
    setTimeout(() => {
      tableDraw(history_list);
    }, 3000);
  }

  deviceIds.forEach((deviceId) => {
    const usersRef = ref(database, deviceId.device_id);
    onValue(usersRef, (snapshot) => handleDataChange(deviceId, snapshot));
  });
}

window.showHistory = showHistory;

function tableDraw(history_list) {
  history_list.sort((a, b) => {
    // Sort by add_time in ascending order
    return b.timestamp - a.timestamp;
  });

  console.log("Sorted history_list:", history_list);

  if (!$.fn.DataTable.isDataTable("#history_list_table")) {
    $("#history_list_table").DataTable();
  } else {
    $("#history_list_table").DataTable().clear().draw();
  }

  const table = $("#history_list_table").DataTable();
  history_list.forEach(function (device, index) {
    table.row
      .add([
        index + 1,
        device.device_id,
        device.value,
        convertTime(device.timestamp),
      ])
      .draw(true);
  });
}
