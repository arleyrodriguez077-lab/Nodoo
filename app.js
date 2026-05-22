import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

const firebaseConfig = { /* <script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBj1byGK044xGVB_UlfG6CsvuWud6v-Sc8",
    authDomain: "nofo-b02b6.firebaseapp.com",
    projectId: "nofo-b02b6",
    storageBucket: "nofo-b02b6.firebasestorage.app",
    messagingSenderId: "461621302989",
    appId: "1:461621302989:web:fbe9298103f55d52937b84",
    measurementId: "G-C2MED93HEV"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script> PEGA AQUÍ TU CONFIGURACIÓN DE FIREBASE */ };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Escuchadores de eventos en lugar de onclick en HTML
document.getElementById('registerBtn').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    createUserWithEmailAndPassword(auth, email, pass)
        .then(() => alert("Cuenta creada"))
        .catch(err => alert(err.message));
});

document.getElementById('postBtn').addEventListener('click', async () => {
    const texto = document.getElementById('postContent').value;
    try {
        await addDoc(collection(db, "posts"), {
            contenido: texto,
            fecha: new Date(),
            usuario: auth.currentUser.email
        });
        alert("Publicado");
    } catch (e) { alert("Error: " + e.message); }
});
