// ---------------------------------------- NEWS FUNCTION ----------------------------------------
// CREACIÓN DE CARDS (NEWS):
let containerNews = document.getElementById('container');
// FETCH FUNCTION PARA IMPRIMIR LAS NEWS:
fetch("http://localhost:3000/news")
.then(response => response.json()) 
.then((news) => {
    news.forEach(newsItem => {
    // CARD CONTAINER:
    console.log(news);
    let cardContainer = document.createElement('div');
    cardContainer.classList.add('card', 'mb-3');
    cardContainer.setAttribute('style', 'max-width: 540px');
    containerNews.appendChild(cardContainer);
    // ROW:
    let rowCard = document.createElement('div');
    rowCard.classList.add('row', 'g-0');
    cardContainer.appendChild(rowCard);
    // IMAGE-COLUMN:
    let imageColumn = document.createElement('div');
    imageColumn.classList.add('col-md-4');
    rowCard.appendChild(imageColumn);
    // IMAGE:
    let imageNew = document.createElement('img');
    imageNew.classList.add('img-fluid', 'rounded-start');
    imageNew.setAttribute('src', newsItem.image);
    imageColumn.appendChild(imageNew);
    // CONTENT COLUMN:
    let contentColumn = document.createElement('div');
    contentColumn.classList.add('col-md-8');
    rowCard.appendChild(contentColumn);
    // BODY CARD:
    let bodyCard = document.createElement('div');
    bodyCard.classList.add('card-body');
    contentColumn.appendChild(bodyCard);
    // CARD TITLE:
    let cardTitle = document.createElement('h2');
    cardTitle.classList.add('card-title');
    cardTitle.innerText = newsItem.title;
    bodyCard.appendChild(cardTitle);
    // CARD TEXT:
    let cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.innerText = newsItem.description;
    bodyCard.appendChild(cardText);
    // DATE CONTAINER:
    let dateContainer = document.createElement('p');
    dateContainer.classList.add('card-text');
    bodyCard.appendChild(dateContainer);
    // DATE:
    let dateNew = document.createElement('small');
    dateNew.classList.add('text-body-secondary');
    dateNew.innerText = newsItem.date;
    dateContainer.appendChild(dateNew);
    });
});