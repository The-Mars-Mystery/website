// Import Firebase Authentication
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB3tX7_f9HaGYnRY5oVSMyelZdeFVTZahA",
    authDomain: "techforgeguild.firebaseapp.com",
    projectId: "techforgeguild",
    storageBucket: "techforgeguild.firebasestorage.app",
    messagingSenderId: "361603237143",
    appId: "1:361603237143:web:ea57807170fd4ff0006352",
    measurementId: "G-PYWLKG8W2P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get the login form elements
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login-button");

// Add event listener for login button
loginButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default form submission

    const email = emailInput.value;
    const password = passwordInput.value;

    // Sign in the user with email and password
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Get the ID token and check for admin claims
            user.getIdTokenResult().then((idTokenResult) => {
                // Check if the user has admin privileges
                if (idTokenResult.claims.admin) {
                    // Admin, allow access to admin page
                    window.location.href = '/admin-dashboard'; // Redirect to admin dashboard or wherever needed
                } else {
                    // Regular user, redirect to the user area or maintenance page
                    window.location.href = '/maintenance'; // Redirect non-admins to maintenance mode
                }
            });
        })
        .catch((error) => {
            // Handle authentication errors
            console.error('Error logging in:', error);
            alert('Login failed. Please check your credentials.');
        });
});

// Check if the user is already logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        user.getIdTokenResult().then((idTokenResult) => {
            // Check if the user has admin privileges
            if (idTokenResult.claims.admin) {
                // Redirect to admin dashboard
                window.location.href = '/admin-dashboard';
            } else {
                // Regular user, redirect to maintenance page or home
                window.location.href = '/maintenance'; // Redirect non-admins to maintenance
            }
        });
    } else {
        // No user logged in, stay on the login page
    }
});
