const BASE_URL ='https://javascriptdesafio-default-rtdb.firebaseio.com';
///create card
let postCard=[];
let postCardId =null;
const createPostCard=(postCardData,postCardkey)=>{
  let {autor,titulo,picture,tags,postBody}=postCardData;
  let cardcol=document.createElement("div");
  cardcol.classList.add("col");

  let cardWrapper = document.createElement("div");
  cardWrapper.classList.add("postCard-card","card","mb-3");
  
  let cardRow = document.createElement("div");
  cardRow.classList.add("row","g-0");

  let imageCol = document.createElement("div");
  imageCol.classList.add("card-img-top");

  let cardPicture =document.createElement("img");
  cardPicture.classList.add("post-card__author-picture");
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

///date creation
let today = new Date(); 
// `getDate()` devuelve el día del mes (del 1 al 31)
let day = today.getDate();
// `getMonth()` devuelve el mes (de 0 a 11)
let month = today.getMonth() + 1;
// `getFullYear()` devuelve el año completo
let year = today.getFullYear();
///get full Date
let fullDate = `${month}/${day}/${year}`


  
let cardAutor = document.createElement("h5");
cardAutor.classList.add("card-title");
let cardTitleText = document.createTextNode(` ${autor} ${fullDate} `);
cardAutor.append(cardTitleText);


let cardPostTitle =document.createElement("h3");
cardPostTitle.classList.add("card-text");
let postName = document.createTextNode(` ${titulo}`);
cardPostTitle.append(postName);


let cardPostTags =document.createElement("p");
cardPostTags.classList.add("card-textII");
let cardTag= document.createTextNode(` ${tags}`);
cardPostTags.append(cardTag);


let cardPostBody =document.createElement("p");
cardPostBody.classList.add("card-textIII");
let PostCardBody = document.createTextNode(`${postBody} `);
cardPostBody.append(PostCardBody);

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
    deletePostCard(postCardkey);
});
//fiuncion para editar
let modifiedButton =document.createElement("button");
modifiedButton.classList.add("btn","btn-primary");
let modifiedText =document.createTextNode("Modificar");
modifiedButton.append(modifiedText);
modifiedButton.addEventListener("click",()=>{
window.location.replace(`./form.html?postCardId=${postCardkey}`);

});

///aqui va el detalle
let detailButton = document.createElement("button");
detailButton.classList.add("btn","btn-warning");
let ViewDetailText =document.createTextNode("Detalle");
detailButton.append(ViewDetailText);

detailButton.addEventListener("click",()=>{
  window.location.replace(`./detailedView.html?postCardId=${postCardkey}`);
  
  });


/////////card Creation///////////
buttonWrapper.append(deleteButton,modifiedButton,detailButton);
cardBody.append(cardAutor,cardPostTitle,cardPostTags,cardPostBody,buttonWrapper);
contentCol.append(cardBody);
imageCol.append(cardPicture);
cardRow.append(imageCol,contentCol);
cardWrapper.append(cardRow);
cardcol.append(cardWrapper);
return cardcol;

};


const getAllpostCards =async ()=>{
    let response= await fetch(`${BASE_URL}/.json`);
    let data = await response.json();
    return data;
  };
  
  
  
  const printAllPostCards =async (listId)=>{
     postCardsComplete =await getAllpostCards();
    let listWrapper =document.getElementById(listId);
    while(listWrapper.firstChild){
      listWrapper.removeChild(listWrapper.firstChild);
    }
    for (key in postCardsComplete ){
      let PostcardData = postCardsComplete[key];
      let card=createPostCard(PostcardData,key);
      listWrapper.appendChild(card);
    }
  
  };
  
  printAllPostCards("PostCard-list");



///delete Post
const deletePostCard =async (postCardkey) =>{
    let response =await fetch(`${BASE_URL}/${postCardkey}/.json`,{
      method:"DELETE",
    });
    let data =await response.json();
    printAllPostCards("PostCard-list");
  
  };
  
///modified Post
const modifiedPostCard =async(postCardkey)=>{
    postCardId=postCardkey;
    let newResponse = await fetch(`${BASE_URL}/${postCardId}/.json`);
    let newData = await newResponse.json();
    let listInput =document.querySelectorAll("form input");
    listInput.forEach(item=>{
      item.value=newData[item.name];
    });

  };

  
  ///search PostCard
const PostSearchInput =document.querySelector("[data-search]");
PostSearchInput.addEventListener("input",(e)=>{
  const value = e.target.value.toLowerCase();
  const storeItems =document.getElementById('PostCard-list');
  const product =document.querySelectorAll(".postCard-card");
  const productName =storeItems.getElementsByTagName("h3");

  for(var i=0;i<productName.length;i++){
    let match=product[i].getElementsByTagName('h3')[0];
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

///print All sortCards
const printSortAllPostCards =async (listId)=>{
 
  let sortCards =await getAllpostCards();
  const newSortArray =Object.values(sortCards).reverse();

  var JsonObject = JSON.parse(JSON.stringify(newSortArray));
 let listWrapper =document.getElementById(listId);
 while(listWrapper.firstChild){
   listWrapper.removeChild(listWrapper.firstChild);
 }
 for (key in JsonObject ){
   let newSortCardData = JsonObject[key];
   let card=createPostCard(newSortCardData,key);
   listWrapper.appendChild(card);
 }

};

const reverseButton =document.getElementById("find-latest");
reverseButton.addEventListener('click',(e)=>{
  e.preventDefault();
  printSortAllPostCards("PostCard-list");
});

////sort for relevant data
function filterItems(arr, query) {
  return arr.filter((el) => el.toLowerCase().includes(query.toLowerCase()));
}

const printRelevantPostCards =async (listId)=>{
 //objeto
  let sortCards =await getAllpostCards();
  //arreglo
  const newSortArray =Object.values(sortCards);
  var Newapostcard =  newSortArray.filter(function(newSortArray) {
    return newSortArray.tags == "#css" || newSortArray.tags == "#Javascript" || newSortArray.tags=="#Chrome";
  });
  //objeto
  var JsonObject = JSON.parse(JSON.stringify(Newapostcard));
 let listWrapper =document.getElementById(listId);
 while(listWrapper.firstChild){
   listWrapper.removeChild(listWrapper.firstChild);
 }
 for (key in JsonObject ){
   let newSortCardData = JsonObject[key];
   let card=createPostCard(newSortCardData,key);
   listWrapper.appendChild(card);
 }
};


const RelevantButton =document.getElementById("find-relevant");
RelevantButton.addEventListener('click',(e)=>{
  e.preventDefault();
  printRelevantPostCards("PostCard-list")
});

///sort for top Data
const printTopPostCards =async (listId)=>{
 //objeto
  let sortTopCards =await getAllpostCards();
  ///convertir a un arreglo
  const newSortArray =Object.values(sortTopCards);
  
  var Newapostcard =  newSortArray.filter(function(newSortArray) {
    return newSortArray.autor == "Marie Curie"|| newSortArray.autor == "Nikola Tesla";
  });

  var JsonObject = JSON.parse(JSON.stringify(Newapostcard));
 let listWrapper =document.getElementById(listId);
 while(listWrapper.firstChild){
   listWrapper.removeChild(listWrapper.firstChild);
 }
 for (key in JsonObject ){
   let newSortCardData = JsonObject[key];
   let card=createPostCard(newSortCardData,key);
   listWrapper.appendChild(card);
 }
};


const TopCardButton =document.getElementById("find-top");
TopCardButton.addEventListener('click',(e)=>{
  e.preventDefault();
  printTopPostCards("PostCard-list")
});


///getformCard
const getFormButton =document.getElementById("formCard");
getFormButton.addEventListener('click',(e)=>{
  e.preventDefault();
  window.location.replace('./form.html');
});

const getFormButtonII =document.getElementById("formCard2");
getFormButtonII.addEventListener('click',(e)=>{
  e.preventDefault();
  window.location.replace('./form.html');
});


////aside Derecho
const createPostRight=(postCardData)=>{
  let {autor,titulo,picture,postBody}=postCardData;
  let cardcol=document.createElement("div");
  cardcol.classList.add("col");

  let cardWrapper = document.createElement("div");
  cardWrapper.classList.add("postCardListing-card","card","mb-3");
  
  let imageCol = document.createElement("div");
  imageCol.classList.add("card-img-top");

  let cardPicture =document.createElement("img");
  cardPicture.classList.add("post-card__author-picture");
  cardPicture.setAttribute("src",picture);

  let cardRow = document.createElement("div");
  cardRow.classList.add("row","g-0");

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

let cardAutor = document.createElement("h5");
cardAutor.classList.add("card-title");
let cardTitleText = document.createTextNode(` ${autor}`);
cardAutor.append(cardTitleText);

let cardPostTitle =document.createElement("h3");
cardPostTitle.classList.add("card-text");
let postName = document.createTextNode(` ${titulo}`);
cardPostTitle.append(postName);

let cardPostBody =document.createElement("p");
cardPostBody.classList.add("card-textIII");
let PostCardBody = document.createTextNode(`${postBody} `);
cardPostBody.append(PostCardBody);

/////////card Creation///////////
cardBody.append(cardAutor,cardPostTitle,cardPicture,cardPostBody);
contentCol.append(cardBody);
imageCol.append(cardPicture);
cardRow.append(imageCol,contentCol);
cardWrapper.append(cardRow);
cardcol.append(cardWrapper);
return cardcol;

};


///llamar a la funcion
const getPostCardRight= async(listId) => {
  let sortCards =await getAllpostCards();
  const newSortArray =Object.values(sortCards);
  
  var Newapostcard =  newSortArray.filter(function(newSortArray) {
    return newSortArray.tags == "#Javascript";
  });
  var JsonObject = JSON.parse(JSON.stringify(Newapostcard[Newapostcard.length-1]));
  console.log(JsonObject);
 let listWrapper =document.getElementById(listId);
 while(listWrapper.firstChild){
   listWrapper.removeChild(listWrapper.firstChild);
 }
 
   let newSortCardData = JsonObject;
   let card=createPostRight(newSortCardData);
   listWrapper.appendChild(card);
 
 
}
getPostCardRight("PostCard-right");
////listings
const createPostListing=(postCardData)=>{
  let {autor,titulo,postBody}=postCardData;
  let cardcol=document.createElement("div");

  let cardWrapper = document.createElement("div");
  cardWrapper.classList.add("postCardListing-card","card","mb-4");
  
  let cardRow = document.createElement("div");
  cardRow.classList.add("row","g-0");

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

let cardAutor = document.createElement("h5");
cardAutor.classList.add("card-title");
let cardTitleText = document.createTextNode(` ${autor}`);
cardAutor.append(cardTitleText);

let cardPostTitle =document.createElement("h3");
cardPostTitle.classList.add("card-text");
let postName = document.createTextNode(` ${titulo}`);
cardPostTitle.append(postName);

let cardPostBody =document.createElement("p");
cardPostBody.classList.add("card-textIII");
let PostCardBody = document.createTextNode(`${postBody} `);
cardPostBody.append(PostCardBody);

/////////card Creation///////////
cardBody.append(cardAutor,cardPostTitle,cardPostBody);
contentCol.append(cardBody);
cardRow.append(contentCol);
cardWrapper.append(cardRow);
cardcol.append(cardWrapper);
return cardcol;

};
///llamar a la funcion
  const getPostCardListings = async(listId) => {
    let response = await getAllpostCards();
    const newSortArray =Object.values(response);
    var NewlistingCard =  newSortArray.filter(function(newSortArray) {
      return newSortArray.tags == "#Javascript";
    });
    var JsonObject = JSON.parse(JSON.stringify(NewlistingCard));
    let listWrapper =document.getElementById(listId);
    while(listWrapper.firstChild){
      listWrapper.removeChild(listWrapper.firstChild);
    }
    for (key in JsonObject ){
      let newSortCardData = JsonObject[key];
      let card=createPostListing(newSortCardData);
      listWrapper.appendChild(card);
    }
   
  }
  getPostCardListings("PostCard-listing");

///listings autor
const getPostCardListingsAutor = async(listId) => {
  let response = await getAllpostCards();
  const newSortArray =Object.values(response);
  var NewlistingCard =  newSortArray.filter(function(newSortArray) {
    return newSortArray.autor == "Marie Curie";
  });
  var JsonObject = JSON.parse(JSON.stringify(NewlistingCard));
  let listWrapper =document.getElementById(listId);
  while(listWrapper.firstChild){
    listWrapper.removeChild(listWrapper.firstChild);
  }
  for (key in JsonObject ){
    let newSortCardData = JsonObject[key];
    let card=createPostListing(newSortCardData);
    listWrapper.appendChild(card);
  }
 
}

getPostCardListingsAutor("PostCard-listingII");


