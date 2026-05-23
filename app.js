/ 1. Aquí pegas tu configuración
const firebaseConfig = {
  apiKey: "AIzaSyDYr2Zgk4njVPcR--P3vUUpgsr5e-uk6e0",
  authDomain: "nodoo-29224.firebaseapp.com",
  projectId: "nodoo-29224",
  storageBucket: "nodoo-29224.firebasestorage.app",
  messagingSenderId: "454908786832",
  appId: "1:454908786832:web:2a1a514ab46293c90e4015",
  measurementId: "G-2GKXQ097EZ"
};

// 2. Aquí lo activas (esto es fundamental)
firebase.initializeApp(firebaseConfig);

// 3. Después de esto, ya puedes poner tus funciones de login, register, etc
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
function cargarPosts() {
    firebase.firestore().collection("posts").orderBy("fecha", "desc").onSnapshot(snapshot => {
        const feed = document.getElementById('postsList');
        feed.innerHTML = ''; // Limpiar lista antes de actualizar
        snapshot.forEach(doc => {
            const post = doc.data();
            feed.innerHTML += `
                <div class="post">
                    <p><strong>${post.usuario}</strong>: ${post.contenido}</p>
                </div>
            `;
        });
    });
}
// Llama a esta función justo después de que el usuario haga login exitoso
