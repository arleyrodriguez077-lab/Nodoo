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

// 2. Inicialización
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// 3. Funciones de control
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
        cargarPosts(); // Llamamos a la función aquí al entrar
    })
    .catch(err => alert(err.message));
}

function publicar() {
    const texto = document.getElementById('postContent').value;
    if (!texto.trim()) return; // No publicar vacío
    db.collection("posts").add({
        contenido: texto,
        fecha: new Date(),
        usuario: auth.currentUser.email
    })
    .then(() => {
        document.getElementById('postContent').value = '';
        // No hace falta llamar a cargarPosts aquí, el onSnapshot lo hará solo
    })
    .catch(err => alert("Error al publicar: " + err.message));
}

function cargarPosts() {
    db.collection("posts").orderBy("fecha", "desc").onSnapshot(snapshot => {
        const feed = document.getElementById('postsList');
        feed.innerHTML = ''; 
        snapshot.forEach(doc => {
            const post = doc.data();
            feed.innerHTML += `
                <div class="post" style="border-bottom:1px solid #ccc; margin:10px 0; padding:5px;">
                    <p><strong>${post.usuario}</strong>: ${post.contenido}</p>
                </div>
            `;
        });
    });
      }
          
