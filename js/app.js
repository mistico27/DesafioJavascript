function login(){
    
    let email = document.getElementById("InputEmail").value;
    let pass = document.getElementById("InputPassword").value;
    console.log(email)
    console.log(pass)
    
    if (email == "daniel@123" && pass == 123 ) {
        //alert("Iniciaste sesión");
        // const alerta = document.createElement("p");
        // const textAlert = document.createTextNode("Iniciaste sesión");
        // alerta.appendChild(textAlert);
        // // const a = alerta.classList.add("alert alert-primary");
        // // alerta.classList.add("alert alert-primary") 
        // document.getElementById("alertSesion").appendChild(alerta) 
        window.location.replace("./index.html");
        localStorage.setItem(user,password)
    } else { alert("Datos Incorrectos");}
}