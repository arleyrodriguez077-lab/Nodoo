const firebaseConfig = { /* Tus credenciales aquí */ };
firebase.initializeApp(firebaseConfig);

function register() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then(() => alert("Cuenta creada"))
    .catch(err => alert(err.message));
}

function publicar() {
    const texto = document.getElementById('postContent').value;
    // Guardar en Firestore
    firebase.firestore().collection("posts").add({
        contenido: texto,
        fecha: new Date(),
        usuario: firebase.auth().currentUser.email
    });
  }
  
