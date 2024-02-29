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
    let table_list = "";
    let history_list = [];
  // Iterate over each device ID
  deviceIds.forEach((deviceId) => {
    const usersRef = ref(database, deviceId.device_id);
    function handleDataChange(snapshot) {
      if (snapshot.exists()) {
        const deviceData = snapshot.val();

        const timeStamp = Object.values(deviceData.log.timestamp_alarm);
        const value = Object.values(deviceData.log.value_alarm);
        const combinedData = timeStamp.map((timestamp, index) => ({
          timestamp: timestamp,
          value: value[index],
        }));
        history_list.push({
          device: deviceId,
          value: combinedData,
        });
        $("#dataTable_history").html("");
        table_list += `<div class="d-block mb-5"><div class="font-weight-bolder text-lg">Device: ${deviceId.device_name}</div>
<div class="table-responsive">
  <table
    class="table table-bordered"
    id="history_table_${deviceId.device_id}"
    width="100%"
    cellspacing="0"
  >
    <thead>
      <tr>
        <th>Date</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>
</div>
<hr>
</div>
`;
        $("#dataTable_history").html(table_list);
        tableDraw(history_list);
      } else {
        console.error("not found device", deviceId.device_id);
      }
    }
    onValue(usersRef, handleDataChange);
  });
}
window.showHistory = showHistory;

function tableDraw(devices) {
  devices.forEach((data) => {
    // Initialize DataTable if not already initialized
    if (
      !$.fn.DataTable.isDataTable(`#history_table_${data.device.device_id}`)
    ) {
      $(`#history_table_${data.device.device_id}`).DataTable({
        searching: false,
      });
    } else {
      // Clear existing rows from the DataTable
      $(`#history_table_${data.device.device_id}`).DataTable().clear().draw();
    }

    // Add data to the table
    const table = $(`#history_table_${data.device.device_id}`).DataTable();
    const value_list = data.value;

    // Assuming value_list is an array of objects with timeStamp and value properties
    value_list.forEach(function (value, index) {
      table.row
        .add([convertTime(value.timestamp) || NaN, value.value || NaN])
        .draw(true);
    });
  });
}
