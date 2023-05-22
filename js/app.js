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
knightId=null;
cleanForm();

});

const cleanForm =()=>{
  let inputs=document.querySelectorAll('#Postcard-form input');
  inputs.forEach(item =>item.value="")
}

///create card
/*
const createKnightCard=(KnightData,knightkey)=>{
  let {nombre,orden,picture,signo,tecnica}=KnightData;
  let cardcol=document.createElement("div");
  cardcol.classList.add("col");

  let cardWrapper = document.createElement("div");
  cardWrapper.classList.add("knight-card","card","mb-3");
  
  let cardRow = document.createElement("div");
  cardRow.classList.add("row","g-0");

  let imageCol = document.createElement("div");
  imageCol.classList.add("card-img-top");

  let cardPicture =document.createElement("img");
  cardPicture.classList.add("card-picture");
  cardPicture.setAttribute("src",picture);

  let contentCol = document.createElement("div");
  contentCol.classList.add("col-md-4");

  let cardBody = document.createElement("div");
  cardBody.classList.add(
    "card-body",
    "h-100",
    "d-flex",
    "flex-column",
    "justify-content-between"
  );

  
let cardTitle = document.createElement("h5");
cardTitle.classList.add("card-title");
let cardTitleText = document.createTextNode(` ${orden}`);
cardTitle.append(cardTitleText);


let cardKnightName =document.createElement("p");
cardKnightName.classList.add("card-text");
let knightName = document.createTextNode(` ${nombre}`);
cardKnightName.append(knightName);


let cardKnightsignno =document.createElement("p");
cardKnightsignno.classList.add("card-textI");
let knightSigno = document.createTextNode(` ${signo}`);
cardKnightsignno.append(knightSigno);


let cardKnightTecnica =document.createElement("p");
cardKnightTecnica.classList.add("card-textIII");
let knightThecnic = document.createTextNode(`${tecnica} `);
cardKnightTecnica.append(knightThecnic);

let buttonWrapper =document.createElement("div");
buttonWrapper.classList.add(
  "d-flex",
  "justify-content-between",
  "flex-column",
  "flex-md-row",
  "gap-3"
);

let deleteButton =document.createElement("button");
deleteButton.classList.add("btn","btn-danger");
let deleteText =document.createTextNode("borrar");
deleteButton.append(deleteText);
deleteButton.addEventListener("click",()=>{
    deleteKnight(knightkey);
});

let modifiedButton =document.createElement("button");
modifiedButton.classList.add("btn","btn-primary");
let modifiedText =document.createTextNode("Modificar");
modifiedButton.append(modifiedText);
modifiedButton.addEventListener("click",()=>{
modifiedKnight(knightkey);

});

///aqui va el detalle
let detailButton = document.createElement("button");
detailButton.classList.add("btn","btn-warning");
let ViewDetailText =document.createTextNode("Detalle");
detailButton.append(ViewDetailText);

detailButton.addEventListener("click",()=>{
  window.location.replace('./detailedView.html');
  
  });


////////////////////
buttonWrapper.append(deleteButton,modifiedButton,detailButton);
cardBody.append(cardTitle,cardKnightName,cardKnightTecnica,buttonWrapper);
contentCol.append(cardBody);
imageCol.append(cardPicture);
cardRow.append(imageCol,contentCol);
cardWrapper.append(cardRow);
cardcol.append(cardWrapper);
return cardcol;

};


const getAllKnights =async ()=>{
  let response= await fetch(`${BASE_URL}/.json`);
  let data = await response.json();
  return data;
};



const printAllKnights =async (listId)=>{
   knoghts =await getAllKnights();
  let listWrapper =document.getElementById(listId);
  while(listWrapper.firstChild){
    listWrapper.removeChild(listWrapper.firstChild);
  }
  for (key in knoghts ){
    let knoghtData = knoghts[key];
    let card=createKnightCard(knoghtData,key);
    listWrapper.appendChild(card);
  }

};





printAllKnights("caballeros-list");


const deleteKnight =async (knightkey) =>{
  let response =await fetch(`${BASE_URL}/${knightkey}/.json`,{
    method:"DELETE",
  });
  let data =await response.json();
  printAllKnights("caballeros-list");

};


const modifiedKnight =async(knightkey)=>{
  knightId=knightkey;
  let newResponse = await fetch(`${BASE_URL}/${knightId}/.json`);
  let newData = await newResponse.json();
  let listInput =document.querySelectorAll("form input");
  listInput.forEach(item=>{
    item.value=newData[item.name];
  });

};
///search knight
const KnightSearchInput =document.querySelector("[data-search]");



KnightSearchInput.addEventListener("input",(e)=>{
  const value = e.target.value.toLowerCase();
  const storeItems =document.getElementById('caballeros-list');
  const product =document.querySelectorAll(".knight-card");
  const productName =storeItems.getElementsByTagName("h5");

  for(var i=0;i<productName.length;i++){
    let match=product[i].getElementsByTagName('h5')[0];
    if(match){
     let texvalue= match.textContent || match.innerHTML
     
        if(texvalue.toLowerCase().indexOf(value)>-1){
            product[i].style.display="";

        }else{
          product[i].style.display="none";

        }
    }
  }


});

const printSortAllKnights =async (listId)=>{
 
  knoghts =await getAllKnights();
  const newSortArray =Object.values(knoghts).reverse();

  var JsonObject = JSON.parse(JSON.stringify(newSortArray));
  console.log(JsonObject);
 let listWrapper =document.getElementById(listId);
 while(listWrapper.firstChild){
   listWrapper.removeChild(listWrapper.firstChild);
 }
 for (key in JsonObject ){
   let knoghtData = JsonObject[key];
   let card=createKnightCard(knoghtData,key);
   listWrapper.appendChild(card);
 }

};

const reverseButton =document.getElementById("find-latest");
reverseButton.addEventListener('click',(e)=>{
  e.preventDefault();
  printSortAllKnights("caballeros-list");
});
*/