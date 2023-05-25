// let email="";
// let pass=""

let statusSesion = localStorage.getItem(email,pass);
// console.log(statusSesion);
// statusSesion ? window.open("Index.html","_self") : window.open("sesion/index2.html","_self")
if (statusSesion === null) {window.open("sesion/index2.html","_self"); }
else {window.open("Index.html","_self")} 
