// Configuración (REEMPLAZA CON TUS DATOS)
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_PROYECTO.firebaseapp.com",
    projectId: "TU_PROYECTO",
    storageBucket: "TU_PROYECTO.appspot.com",
    messagingSenderId: "ID",
    appId: "ID"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// Funciones de control
function register() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    auth.createUserWithEmailAndPassword(email, pass)
    .then(() => alert("Cuenta creada con éxito"))
    .catch(err => alert(err.message));
}

function login() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    auth.signInWithEmailAndPassword(email, pass)
    .then(() => {
        document.getElementById('auth-box').style.display = 'none';
        document.getElementById('feed').style.display = 'block';
    })
    .catch(err => alert(err.message));
}

function publicar() {
    const texto = document.getElementById('postContent').value;
    db.collection("posts").add({
        contenido: texto,
        fecha: new Date(),
        usuario: auth.currentUser.email
    })
    .then(() => {
        document.getElementById('postContent').value = '';
        alert("Publicado");
    });
}
