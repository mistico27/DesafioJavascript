///Show Alert 
function showAlert(message,className){
    const div=document.createElement('div');
    div.className=`alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container =document.querySelector('.container');
    const form = document.querySelector('#formulario-form');
    
    form.parentNode.insertBefore(div,form);
  
    ///vanish
    setTimeout(()=>document.querySelector('.alert').remove(),2500)
  
  }

let statusSesion = localStorage.getItem("user");
console.log(statusSesion);
statusSesion ? window.open("Index.html","_self") : null


function login(){
    
    let email = document.getElementById("InputEmail").value;
    let pass = document.getElementById("InputPassword").value;
    console.log(email)
    console.log(pass)
    
    if (email == "daniel@123" && pass == 123 ) {
         window.location.replace("Index.html");
        localStorage.setItem(user,password)
    } else if(email === "" || pass === "" ){
        showAlert('campos nulos , favor de verificar','danger');
    }else { 
        showAlert('campos erroneos , favor de verificar','danger');


    }
}

