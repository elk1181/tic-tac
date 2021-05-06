

let currentUser = firebase.auth().currentUser;
let imageKitty = "";
let imageDoggy = "";
let kittyObj = [];
let item = 0;
let api_cat;
let api_pet;
let secret_pet;
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      
    $.get( "/login", function( data ) {
     api_cat = data.API_CAT;
     api_pet = data.API_PET;
     secret_pet = data.PET_SECRET;
     
      
  });
     
      db.collection("users").get().then((querySnapshot) => {
       let sorted =  querySnapshot.docs.sort(function(a, b){return b.data().score-a.data().score});

        
       sorted.forEach(doc=>{
      
        
  
      
           if(doc.data().email==user.email){
            document.getElementById("scoreboard_container").innerHTML= doc.data().email + " " + doc.data().score + "<br>";
     

            $.get("https://catfact.ninja/fact?max_length=140", function(data, status){
          
            document.getElementById("fact").innerHTML= data.fact;
              });
   
              
       
               var url = 'https://api.petfinder.com/v2/types';
		
	

        var pf = new petfinder.Client({apiKey: api_pet, secret: secret_pet });

        pf.animal.search()
            .then(function (response) {
               
               
            })
            .catch(function (error) {
        
            });

          
            pf.animal.search({
                type: "Cat",
               location: doc.data().zip, 
               distance: 10, 
               limit:100,
               
                
              }).then(resp => {
                
            kittyObj = resp.data.animals
              });
	 
         }
      
        })

       
    });

   

  
      
    } else {
        window.location.replace("index.html");
    }
  });

  
function getImages(){
  $.ajax({
    url: "https://api.thecatapi.com/v1/images/search",
    type: "GET",
    beforeSend: function(xhr){xhr.setRequestHeader('key', api_cat,
    )},
    success: function(data) {imageKitty = data[0].url;  
       
    }

 });
 $.get("https://dog.ceo/api/breeds/image/random", function(data, status){
    imageDoggy=data.message;
  });

 setTimeout(function(){makeBoard(); document.getElementById("players").innerHTML = "You: " + `<img style='max-width:150px; max-height:150px; 
' src="${imageKitty}"/>` + "<br> Computer: " + `<img style=' max-width:150px; max-height:150px;
 ' src="${imageDoggy}"/>`;
} , 500); 

}

 
    $(document).on("click", `#grid-0` , function(){ 
       
        
        move(0,0);
    });


        $(document).on("click", `#grid-1` ,function(){ 
        
            
            move(0,1);
        });

            $(document).on("click", `#grid-2` ,function(event){ 
              
                
                move(0,2)});

                $(document).on("click", `#grid-3` ,function(event){ 
                   
                    
                    move(1,0)});

                    $(document).on("click", `#grid-4` ,function(event){ 
                      
                        
                        move(1,1)});

                        $(document).on("click", `#grid-5` ,function(event){ 
                           
                            
                            move(1,2)});


                            $(document).on("click", `#grid-6` ,function(event){ 
                             
                                
                                move(2,0)});



   $(document).on("click", `#grid-7` ,function(event){ 
                                    
                                    
                                    move(2,1)});


 $(document).on("click", `#grid-8` ,function(event){ 
                                        
                                        
                                        move(2,2)});



  
                                        
 


 function logout(){
    firebase.auth().signOut().then(() => {
        window.location.replace("index.html");
      }).catch((error) => {
        // An error happened.
      });
 }

let player = "O";
let computer = "X";
let wonUser = false;
let wonComput = false;

let board = Array(3);
for(let i=0; i<3; i++){
   let boardTemp = Array(3);
   for(let c =0; c<3; c++){
       boardTemp[c] = 0;
   }
  board[i] = boardTemp;

}


function makeBoard(){
 

document.getElementById("root").innerHTML= "";
let sum =0; 
for(let i =0; i<board.length; i++){
    for(let j=0; j<board[i].length; j++){
        
document.getElementById("root").innerHTML += `<div class="tile" id='grid-${sum}'> ${board[i][j]} </div> `
if(board[i][j]==player){
document.getElementById(`grid-${sum}`).innerHTML = `<img  object-fit: contain; style='max-width:100%;
max-height:100%;' src="${imageKitty}"/>`
    }
    if(board[i][j]==computer){
document.getElementById(`grid-${sum}`).innerHTML = `<img style=' object-fit: contain; max-width:100%;
max-height:100%;' src="${imageDoggy}"/>`
    }
    if(board[i][j]==0){
        document.getElementById(`grid-${sum}`).innerHTML = " ";  
    }
    sum++;
    
}

}


}
function checkIfWin(){
if(board[0][0]=='O' && board[0][1]=='O' && board[0][2]=='O'){
    wonUser = true;
}
else if(board[1][0]=='O' && board[1][1]=='O' && board[1][2]=='O'){
    wonUser = true;
}
else if(board[2][0]=='O' && board[2][1]=='O' && board[2][2]=='O'){
    wonUser = true;
    }

    else if(board[0][0]=='O' && board[1][0]=='O' && board[2][0]=='O'){
        wonUser = true;
        }
        else if(board[0][1]=='O' && board[1][1]=='O' && board[2][1]=='O'){
            wonUser = true;
        }
        else if(board[0][2]=='O' && board[1][2]=='O' && board[2][2]=='O'){
            wonUser = true;
            }

            else if(board[0][0]=='O' && board[1][1]=='O' && board[2][2]=='O'){
                wonUser = true;
                }
                else if(board[2][0]=='O' && board[1][1]=='O' && board[0][2]=='O'){
                    wonUser = true;
                    }




                  else  if(board[0][0]=='X' && board[0][1]=='X' && board[0][2]=='X'){
                        wonComput = true;
                        }
                        else if(board[1][0]=='X' && board[1][1]=='X' && board[1][2]=='X'){
                            wonComput = true;
                        }
                        else if(board[2][0]=='X' && board[2][1]=='X' && board[2][2]=='X'){
                            wonComput = true;
                            }
                        
                            else if(board[0][0]=='X' && board[1][0]=='X' && board[2][0]=='X'){
                                wonComput = true;
                                }
                                else if(board[0][1]=='X' && board[1][1]=='X' && board[2][1]=='X'){
                                    wonComput = true;
                                }
                                else if(board[0][2]=='X' && board[1][2]=='X' && board[2][2]=='X'){
                                    wonComput = true;
                                    }
                        
                                    else if(board[0][0]=='X' && board[1][1]=='X' && board[2][2]=='X'){
                                        wonComput = true;
                                        }
                                        else if(board[2][0]=='X' && board[1][1]=='X' && board[0][2]=='X'){
                                            wonComput= true;
                                            }










                }


function move(i, j){
   if(board[i][j]==0 && !wonUser && !wonComput ){
  board[i][j]='O';
  
    makeBoard();
    computerMove();
   
    
    checkIfWin();
    let obj = getAvailableMoves();

    if(wonUser){
        document.getElementById("message-body").innerText = "User Won!"
        document.getElementById("mess").style.display = "block";
        var user = firebase.auth().currentUser;
        if (user) {
            document.getElementById("scoreboard_container").innerHTML=""

            let arrayCatch = [];
        db.collection("users").get().then((querySnapshot) => {
            querySnapshot.docs.forEach(doc=>{
                if(doc.data().email!=user.email){
                arrayCatch.push({email:doc.data().email, score:doc.data().score, id:doc.id});
                }
                else{
                    arrayCatch.push({email:user.email, score:doc.data().score+1, id:doc.id});
                }

            });

         
            let sortedK =  arrayCatch.sort(function(a, b){return b.score-a.score});

        
          
         sortedK.forEach(doc=>{
                              
             
     if(doc.email==user.email){
         
      score = doc.score;
      document.getElementById("scoreboard_container").innerHTML= doc.email + " " + score + "<br>";
         db.collection("users").doc(doc.id).update({
          score: score
         })
         .then(function() {
             if(score%5==0){
       
           document.getElementsByClassName("modal")[0].classList.add("is-active");
           2341

           item = kittyObj[Math.floor(Math.random() * kittyObj.length)];
           document.getElementById("title").innerHTML = `Congrats! You got ${score} points. As a prize, here is a cat looking for a forever home`
           document.getElementById("content").innerHTML= `Name: ${item.name} <br> <br> Age: ${item.age} <br> <br> Location: ${item.contact.address.city}, ${item.contact.address.state} <br> <br> Gender: ${item.gender} <br> <br> <img src="${item.primary_photo_cropped.small}"/> <br> <br> <button id="email"> Email me the info </button>`
             }
          
        }).catch(function(error) {
             console.log(error);
        })
      
        $.get("https://catfact.ninja/fact?max_length=140", function(data, status){
           
        document.getElementById("fact").innerHTML= data.fact;
          });
         
   }
   else{
   
   }
   
   
         
              
           })
        });

     
       reset();
       }
        else {
       
         }
   
    }
   else if(wonComput){
    document.getElementById("mess").style.display = "block";
       document.getElementById("message-body").innerText = "Computer Won!"
       reset();
   }
   else if(obj.x.length==0){
    document.getElementById("mess").style.display = "block";
    document.getElementById("message-body").innerText = "Draw!"
reset();
   }
   }
    
}

$(document).on('click','#close',function(){
  

    document.getElementsByClassName("modal")[0].classList.remove("is-active");
});

   
$(document).on('click','#email',function(){
    var user = firebase.auth().currentUser;
   let emailM= `<html> Name: ${item.name} <br> <br> Age: ${item.age} <br> <br> Location: ${item.contact.address.city}, ${item.contact.address.state} <br> <br> Gender: ${item.gender} <br> <br> <img src="${item.primary_photo_cropped.small}"/>  <br> <a href="${item.url}"> Click here to go to Petfinder page </a> </html>`
    if (user) {
    let params = {
        to_email: user.email,

        message: emailM

    }

    Email.send({
        SecureToken : "3e71028c-4805-4676-a93b-04eab5433233",
        To : user.email,
        From : "tictac4cats@gmail.com",
        Subject : "Cat for you!",
        Body : params.message
    }).then(
    document.getElementById("content").innerText = "message sent!"
    );
  
    document.getElementsByClassName("modal")[0].classList.remove("is-active");
}
else{

}
});


function reset(){
    for(let i=0; i<3; i++){
        let boardTemp = Array(3);
        for(let c =0; c<3; c++){
            boardTemp[c] = 0;
        }
       board[i] = boardTemp;
     
    
     }
     wonUser = false;
     wonComput =false;
     getImages();
}


function computerMove(){

let obj = getAvailableMoves();
if(obj.x.length!=0){
let index  = Math.floor(Math.random()*obj.x.length);

board[obj.x[index]][obj.y[index]] = 'X';
makeBoard();
}

}

function getAvailableMoves(){
    let obj = {};
let x = [];
let y = [];
    for(let i =0; i<board.length; i++){
        for(let j=0; j<board[i].length; j++){
if(board[i][j]==0){
    x.push(i);
    y.push(j);
}
        }

}
obj = {x: x, y:y};
return obj;
}


getImages();
let score = 0;

function del(){

document.getElementById("mess").style.display = "none";

}