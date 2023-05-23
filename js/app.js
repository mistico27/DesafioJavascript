///primero pondremos el endpoint
const BASE_URL ='https://javascriptdesafio-default-rtdb.firebaseio.com';
//crear el objeto de Post y el id
let postObject={};
let postCard=[];
let postCardId =null;

///Show Alert 
function showAlert(message,className){
  const div=document.createElement('div');
  div.className=`alert alert-${className}`;
  div.appendChild(document.createTextNode(message));
  const container =document.querySelector('.container');
  const form = document.querySelector('#Postcard-form');
  
  form.parentNode.insertBefore(div,form);

  ///vanish
  setTimeout(()=>document.querySelector('.alert').remove(),2500)

}
//special Characters
function containsSpecialChars(str) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
}
///numbers
function containsNumbers(str){
  const numbers = /[1234567890]/;
  return numbers.test(str);

}


///Save and Edit
const savePostCard= async (ThePostCard,postCardId)=>{
  if(ThePostCard.autor ===''|| ThePostCard.titulo===''||ThePostCard.picture===''||ThePostCard.tags===''||ThePostCard.postBody===''){
    showAlert('please fill  all the form','danger');  
    } else if(containsSpecialChars(ThePostCard.autor)){
      showAlert('please Autor´s Name must not have special characters','danger');
    }else if(containsNumbers(ThePostCard.autor)){
      showAlert('please Do not set numbers for Author´s Name','danger');
    }else{
  
    if(postCardId){
      let response = await fetch(`${BASE_URL}/${postCardId}/.json`,{
        method:'PUT',
        body:JSON.stringify(ThePostCard),
      });
      let data= await response.json();
      return data;
    }else{
      ///Edit function
      let response =await fetch(`${BASE_URL}/.json`,{
        method:'POST',
        body:JSON.stringify(ThePostCard),
      });
      let data= await response.json();
      return data;
    }
  }
 
};

///Mandar llamar el metodo
document.getElementById('save-card').addEventListener("click",async(event)=>{
  event.preventDefault();
  document.querySelectorAll('#Postcard-form input').forEach((item)=>{
    postObject[item.name]=item.value;
  });
  let response = await savePostCard(postObject,postCardId);
  if(response){
    window.location.replace(`./Index.html`);
    //print the ´postCards
  }
postCardId=null;
cleanForm();

});

const cleanForm =()=>{
  let inputs=document.querySelectorAll('#Postcard-form input');
  inputs.forEach(item =>item.value="")
}

let params = new URLSearchParams(document.location.search)
postCardId = params.get("postCardId");
 console.log(postCardId);
const getPostCardInfo = async(id) => {
  let response = await fetch(`${BASE_URL}/${id}.json`)
  let data = await response.json()
  let listInput =document.querySelectorAll("form input");
    listInput.forEach(item=>{
      item.value=data[item.name];
    });
  return data
}
getPostCardInfo(postCardId);




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

