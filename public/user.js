import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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

const auth = getAuth();

function signIn(email, password) {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userData = userCredential.user;
        resolve(userData);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Sign-in error:", errorMessage);
        reject(errorMessage);
      });
  });
}
window.signIn = signIn;

// Detect authentication state changes
function userCheck() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      $("#user_name").html(user.displayName);
    } else {
      console.log("User is signed out");
      window.location.href = "login.html";
    }
  });
}
window.userCheck = userCheck;

function logout() {
  signOut(auth)
    .then(() => {
      console.log("signed out");
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error("Unable to sign out", error);
    });
}
window.logout = logout;

function register(email, password, name) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;

      updateProfile(user, {
        displayName: name,
      })
        .then(async () => {
          await Swal.fire("Register Success", "", "success");
          window.location.href = "login.html";
        })
        .catch((error) => {
          console.error("Error updating profile:", error.message);
        });
    })
    .catch((error) => {
      console.error("Unable to create user", error);
    });
}
window.register = register;
