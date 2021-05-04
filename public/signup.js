function signup(){
    let email =  document.getElementById("email");
    let pass = document.getElementById("pass");
    let zip = document.getElementById("zip");
 firebase.auth().createUserWithEmailAndPassword(email.value, pass.value).then((userCredential) => {
  
     
     db.collection("users").add({
         email:email.value,
         score:0,
         zip: zip.value
     })
        
       
     var user = userCredential.user;
    
     setTimeout(function(){location.href="gamepage.html"} , 5000); 
     
    
   })
   .catch((error) => {
     var errorCode = error.code;
     var errorMessage = error.message;
     document.getElementById("errorMess").innerText = errorMessage;
   });
   
 }