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
    storageBucket: "hackscrolls.appspot.com",
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
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");

// Toggle between login and sign-up forms
document.addEventListener("DOMContentLoaded", () => {
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
});

// Function to trigger sign-up
const handleSignup = async () => {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("signup-confirm-password").value;
    const name = document.getElementById("signup-name").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: email,
            uid: user.uid
        });

        signupForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
    } catch (error) {
        alert(error.message);
    }
};

// Function to trigger login
const handleLogin = async () => {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        window.location.href = "dashboard.html";
    } catch (error) {
        alert(error.message);
    }
};

// Event listeners for button clicks
document.addEventListener("DOMContentLoaded", () => {
    signupBtn.addEventListener("click", handleSignup);
    loginBtn.addEventListener("click", handleLogin);

    // Listen for Enter key press in login form
    loginForm.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent form submission refresh
            handleLogin();
        }
    });

    // Listen for Enter key press in signup form
    signupForm.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent form submission refresh
            handleSignup();
        }
    });
});
