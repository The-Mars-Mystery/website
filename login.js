import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

document.getElementById("login-button").addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        // Authenticate the user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Check if the user is an admin
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.isAdmin) {
                console.log("Admin login detected. Redirecting...");
                window.location.href = "admin-dashboard.html";
            } else {
                console.log("Regular user login. Redirecting...");
                window.location.href = "user-dashboard.html";
            }
        } else {
            console.error("No user document found.");
            alert("Error: User data not found.");
        }
    } catch (error) {
        console.error("Error during login:", error.message);
        alert("Login failed: " + error.message);
    }
});
