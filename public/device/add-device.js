import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  query,
  where,
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

async function addDevice(data) {
  try {
    const docRef = await addDoc(collection(db, "device"), data);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
window.addDevice = addDevice;

async function deleteDevice(deviceId) {
  Swal.fire({
    title: "Your device will be delete",
    text: `Device ID ${deviceId}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "OK",
  }).then(async (result) => {
    if (result.isConfirmed) {
      Swal.fire({
        didOpen: () => {
          Swal.showLoading();
        },
      });
      try {
        const querySnapshot = await getDocs(
          query(collection(db, "device"), where("device_id", "==", deviceId))
        );
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
          console.log("Document successfully deleted!");
          await Swal.fire("Delete success", "", "success");
          window.location.reload();
        });
      } catch (e) {
        Swal.fire("Delete failed", "", "error");
        console.error("Error deleting document: ", e);
      }
    }
  });
}
window.deleteDevice = deleteDevice;
