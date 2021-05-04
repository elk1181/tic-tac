

function signin(){
   let email =  document.getElementById("email");
   let pass = document.getElementById("pass");
firebase.auth().signInWithEmailAndPassword(email.value, pass.value)
  .then((userCredential) => {

    var user = userCredential.user;
   
    window.location.replace("gamepage.html");
   

  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    document.getElementById("errorMess").innerText = errorMessage;
  });
  
}