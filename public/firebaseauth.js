// Import the Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDmXd64BxZSTz-7418fs7zXDxEYA8GbsA8",
    authDomain: "hackscrolls.firebaseapp.com",
    projectId: "hackscrolls",
    storageBucket: "hackscrolls.appspot.com", // Corrected storageBucket URL
    messagingSenderId: "473696818210",
    appId: "1:473696818210:web:86bc743a1027df0110e67b",
    measurementId: "G-5ZE4M9Y4R4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize authentication
const db = getFirestore(app); // Initialize Firestore

// Get elements
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const signupLink = document.getElementById("signup-link");
const loginLink = document.getElementById("login-link");

// Toggle between login and sign-up forms
signupLink.addEventListener("click", function (event) {
    event.preventDefault();
    loginForm.classList.add("hidden");
    signupForm.classList.remove("hidden");
});

loginLink.addEventListener("click", function (event) {
    event.preventDefault();
    signupForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
});

// Sign-up user
document.getElementById("signup-btn").addEventListener("click", async function () {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("signup-confirm-password").value;
    const name = document.getElementById("signup-name").value; // Get user's name

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store user info in Firestore
        await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: email,
            uid: user.uid
        });

        alert("Sign-up successful! You can now log in.");
        signupForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
    } catch (error) {
        alert(error.message);
    }
});

// Log in user
document.getElementById("login-btn").addEventListener("click", async function () {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
        window.location.href = "dashboard.html"; // Redirect to a dashboard or home page
    } catch (error) {
        alert(error.message);
    }
});
