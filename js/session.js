let ext=null;
if (localStorage.getItem('isLoggedIn') === 'true') {
    // window.open("Index.html","_self")
   

    // // console.log("Estoy logueado")
    ext='si';
} else { 
    window.location.replace("sesion/index2.html"); 
     ext='no';
}

switch (ext){
    case 'si': 
        window.open("Index.html")
        console.log("Estoy logueado")
    break;
    case 'no': 
    window.location.replace("sesion/index2.html");
    break;
    default:
    window.location.replace("login.html");

 }

let signOut = document.getElementById("singOut");
signOut.addEventListener("click",e =>{let clean = localStorage.clear();
    window.location.replace("/login.html"); }) 
