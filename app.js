import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

const firebaseConfig = { /* PEGA AQUÍ TU CONFIGURACIÓN DE FIREBASE */ };

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
