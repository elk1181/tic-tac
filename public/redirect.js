firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
     
      window.location.replace("gamepage.html");
    
      
    } else {
       
    }
  });