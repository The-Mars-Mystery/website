// Firebase Initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB3tX7_f9HaGYnRY5oVSMyelZdeFVTZahA",
  authDomain: "techforgeguild.firebaseapp.com",
  databaseURL: "https://techforgeguild-default-rtdb.firebaseio.com/",
  projectId: "techforgeguild",
  storageBucket: "techforgeguild.appspot.com",
  messagingSenderId: "361603237143",
  appId: "1:361603237143:web:ea57807170fd4ff0006352",
  measurementId: "G-PYWLKG8W2P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Maintenance Mode Check
document.addEventListener("DOMContentLoaded", () => {
  const maintenanceRef = ref(database, "/maintenanceMode/enabled");

  onValue(maintenanceRef, (snapshot) => {
    const isMaintenanceEnabled = snapshot.val();

    if (isMaintenanceEnabled) {
      // Redirect all users except admins to the maintenance page
      const currentPath = window.location.pathname;

      if (!currentPath.includes("/admin-login") && !currentPath.includes("/admin-dashboard")) {
        window.location.href = "/maintenance.html";
      }
    }
  });
});
