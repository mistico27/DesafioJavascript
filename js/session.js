let statusSesion = localStorage.getItem(email,pass);
console.log(statusSesion);
statusSesion ? window.open("Index.html","_self") : window.open("index2.html","_self")
