const BASE_URL ='https://javascriptdesafio-default-rtdb.firebaseio.com';
///create card
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
let cardTitleText = document.createTextNode(` ${autor}`);
cardAutor.append(cardTitleText);

let cardDate =document.createElement("h7");
cardDate.classList.add("card-text0");
let cardDateText = document.createTextNode(fullDate);
cardDate.append(cardDateText);

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
  window.location.replace('./detailedView.html');
  
  });


/////////card Creation///////////
buttonWrapper.append(deleteButton,modifiedButton,detailButton);
cardBody.append(cardAutor,cardDate,cardPostTitle,cardPostTags,cardPostBody,buttonWrapper);
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
 
  let sortCards =await getAllpostCards();
  const newSortArray =Object.values(sortCards);
  
  var Newapostcard =  newSortArray.filter(function(newSortArray) {
    return newSortArray.tags == "#comoEstas";
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


const RelevantButton =document.getElementById("find-relevant");
RelevantButton.addEventListener('click',(e)=>{
  e.preventDefault();
  printRelevantPostCards("PostCard-list")
})