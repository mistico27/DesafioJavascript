let ext=null;
if (localStorage.getItem('isLoggedIn') === 'true') {
    
    ext='si';
} else {
    window.location.replace("sesionnoiniciada.html");
     ext='no';
}
switch (ext){
    case 'si':
        window.open("Index.html")
        console.log("Estoy logueado")
    break;
    case 'no':
    window.location.replace("sesionnoiniciada.html");
    break;
    default:
    window.location.replace("login.html");
 }
let signOut = document.getElementById("singOut");
signOut.addEventListener("click",e =>{let clean = localStorage.clear();
    window.location.replace("login.html"); })