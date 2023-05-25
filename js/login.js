const BASE_URL ='https://retojs-g25-default-rtdb.firebaseio.com/users/';
let statusSesion = localStorage.getItem("user");
console.log(statusSesion);
statusSesion ? window.open("Index.html","_self") : null

const getAllUsers =async ()=>{
    let response= await fetch(`${BASE_URL}/.json`);
    let data = await response.json();
    return data;
  };

  
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
    
let pass = document.getElementById("InputPassword").value;
const continueBotton =document.getElementById("continueButton");
continueBotton.addEventListener("click", async (e) => {
  let email = document.getElementById("InputEmail").value;
  let pass = document.getElementById("InputPassword").value;
  e.preventDefault();
  let UserInfo = await getAllUsers();
  const newSortArray = Object.values(UserInfo);

  let passArray = [];
  let emailArray = [];
  let passstatus = false;
  let emailStatus = false;
  for (let i = 0; i < newSortArray.length; i++) {
    passArray.push(newSortArray[i].pass);
    emailArray.push(newSortArray[i].email);
  }
  for (let z = 0; z < passArray.length; z++) {
    if (pass == passArray[z]) {
      passstatus = true;
    } else {
      passstatus;
    }
  }

  for (let z = 0; z < emailArray.length; z++) {
    if (email == emailArray[z]) {
      emailStatus = true;
    } else {
      emailStatus;
    }
  }

  if (emailStatus && passstatus) {
    let statusSesion = localStorage.setItem(email, pass);
    window.location.replace("Index.html");
    
  } else if (email === "" || pass === "") {
    showAlert("campos nulos , favor de verificar", "danger");
  } else {
    showAlert("campos erroneos , favor de verificar", "danger");
  }
});