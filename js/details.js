const BASE_URL ='https://javascriptdesafio-default-rtdb.firebaseio.com';

let params = new URLSearchParams(document.location.search)
let cardId = params.get("Id");
console.log(cardId);
const getCardInfo = async(id) => {
    let response = await fetch(`${BASE_URL}/${id}.json`)
    let data = await response.json()
    return data
}


/*
const printCard = async() => {
    let CardInfo = await getPetInfo(postCardId)
    let html = `<div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4">
        <img src=${CardInfo.picture} class="img-fluid rounded-start" style="height:100%" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">Autor:${CardInfo.autor} Titulo: ${CardInfo.titulo}</h5>
          <p class="card-text">Origin: ${CardInfo.postBody}</p>
          <button class="btn btn-primary" id="backButton">Regresar</button>
        </div>
      </div>
    </div>
    </div>`
    
    let divFather = document.getElementById('cardWrapper')
    divFather.innerHTML = html

    let backButton = document.getElementById("backButton")
    backButton.addEventListener('click', (event) => {
    window.location.replace("Index.html");
})
}


printCard()

*/