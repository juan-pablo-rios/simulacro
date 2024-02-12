// ---------------------------------------- MIDDLEWARE ----------------------------------------
// INICIALIZACIÓN DE VARIABLE CON LA CONFIRMACIÓN DE INICIO DE SESIÓN:
let auth = sessionStorage.getItem('auth');
if(auth != 1){
    location.href = "./index.html";
}

// ------------------------------------------ FUNCTION TO SHOW THE NEWS ------------------------------------------
// FETCH FUNCTION PARA IMPRIMIR LAS NEWS:
fetch("http://localhost:3000/news")
.then(response => response.json())
.then((news) => {
    // INICIALIZACIÓN DE VARIABLE CON EL CONTAINER DONDE SE IMPRIMIRÁ LA INFO:
    let containerTable = document.getElementById("container_news");
    news.forEach(newsItem => {
        // ROW:
        let rowNews = document.createElement('tr');
        containerTable.appendChild(rowNews);
        // CONTAINER IMAGE:
        let containerImage = document.createElement('td');
        rowNews.appendChild(containerImage);
        // IMG:
        let imgNews = document.createElement('img');
        imgNews.classList.add('rounded-circle');
        imgNews.setAttribute('src', newsItem.image);
        imgNews.setAttribute('alt', 'photo');
        imgNews.setAttribute('height', '50');
        imgNews.setAttribute('width', '50');
        containerImage.appendChild(imgNews);
        // NEWS TITLE:
        let newsTitle = document.createElement('td');
        newsTitle.innerText = newsItem.title;
        rowNews.appendChild(newsTitle);
        // NEWS DESCRIPTION:
        let newsDescription = document.createElement('td');
        newsDescription.innerText = newsItem.description;
        rowNews.appendChild(newsDescription);
        // NEWS DATE:
        let newsDate = document.createElement('td');
        newsDate.innerText = newsItem.date;
        rowNews.appendChild(newsDate);
        // NEWS AUTHOR:
        let newsAuthor = document.createElement('td');
        newsAuthor.innerText = newsItem.userId;
        rowNews.appendChild(newsAuthor);
        // NEWS CATEGORY:
        let newsCategory = document.createElement('td');
        newsCategory.innerText = newsItem.categoryId;
        rowNews.appendChild(newsCategory);
        // CONTAINER BUTTONS:
        let containerButtonsNews = document.createElement('td');
        rowNews.appendChild(containerButtonsNews);
        // BUTTONS-ACTIONS-EDIT:
        let buttonEditNews = document.createElement('button');
        buttonEditNews.classList.add('btn', 'btn-primary');
        buttonEditNews.setAttribute('data-bs-toggle', 'modal');
        buttonEditNews.setAttribute('data-bs-target', '#modal-notice');
        buttonEditNews.setAttribute('id', 'buttonEditNews');
        buttonEditNews.innerText = "Edit";
        containerButtonsNews.appendChild(buttonEditNews);
        // BUTTONS-ACTIONS-DELETE:
        let buttonDeleteNews = document.createElement('button');
        buttonDeleteNews.classList.add('btn','btn-danger');
        buttonDeleteNews.setAttribute('id', 'buttonDeleteNews');
        buttonDeleteNews.innerText = "Delete";
        containerButtonsNews.appendChild(buttonDeleteNews);
    });
})