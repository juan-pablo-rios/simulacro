// ------------------------------------------------- sessionStorage -------------------------------------------------
let variable = "Hola";
//Poner o fijar un valor en localStorage
localStorage.setItem("clave", variable);
//Obtener o traer lo que hay en localStorage
localStorage.getItem("clave");
//Remover o elminar un elemento de localStorage
localStorage.removeItem("clave");
//remover todos los elementos del localStorage
localStorage.clear();

// --------------------------------------------- CREATE ELEMENT ---------------------------------------------
// IMG EXAMPLE:
let imgNews = document.createElement('img');
imgNews.classList.add('rounded-circle');
imgNews.setAttribute('src', newsItem.image);
imgNews.setAttribute('alt', 'photo');
imgNews.setAttribute('height', '50');
imgNews.setAttribute('width', '50');
containerImage.appendChild(imgNews);


// ---------------------------------------- MIDDLEWARE ----------------------------------------
// INICIALIZACIÓN DE VARIABLE CON LA CONFIRMACIÓN DE INICIO DE SESIÓN:
let auth = sessionStorage.getItem('auth');
if(auth != 1){
    location.href = "./index.html";
}


// ------------------------------------------------------------- LOGIN FUNCTION --------------------------------------------------------------
function signIn(){
    // INICIALIZACIÓN DE VARIABLES:
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    // FUNCIÓN FETCH:
    fetch("http://localhost:3000/users")
    .then((response) => response.json())
    .then((element) => {
        let result = element.filter(function(element){
            return email == element.email && password == element.password;
        });
        // CONDICIONAL PARA COMPROBAR QUE SE ENCONTRÓ UN USUARIO VALIDO:
        if(result.length > 0){
            // SE ENVÍA LA INFORMACIÓN DEL USUARIO AL sessionStorage:
            sessionStorage.setItem('name', result[0].name);
            sessionStorage.setItem('email', result[0].email);
            sessionStorage.setItem('auth', 1);
            location.href = "./administrator.html";
            return;
        }else{
            alert('¡Los datos ingresados no son validos!');
        }
    });
}


// ------------------------------------------------------------------ LOG OUT ------------------------------------------------------------------
// FUNCIÓN PARA CERRAR SESIÓN:
function logOut(){
    // MODIFICACIÓN DE LA AUTORIZACIÓN EN EL sessionStorage:
    sessionStorage.setItem('auth', 0);
    let auth = sessionStorage.getItem('auth');
    if(auth != 1){
        location.href = '../index.html';
    }
}


// --------------------------------------------------------------- GET ------------------------------------------------------------
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
    });
})

// --------------------------------------------------------------- POST ---------------------------------------------------------------
// FUNCTION TO CREATE A NEW USER:
function createUser() {
    let newInputName = document.getElementById("newInputName").value;
    let newInputEmail = document.getElementById("newInputEmail").value;
    let newInputPassword = document.getElementById("newInputPassword").value;
    // SE CREA UN OBJETO CON LOS NUEVOS VALORES DE LOS ELEMENTOS:
    infoUpdated = {
        name: newInputName,
        email: newInputEmail,
        password: newInputPassword
    };
    // SE UTILIZA LA FUNCIÓN fetch() PARA COGER LA API Y ENVIARLE LOS DATOS ACTUALIZADOS DEL NUEVO USER:
    fetch("https://memin.io/public/api/v2/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(infoUpdated),
        })
        .then((response) => {
            console.log(response.ok);
            location.reload();
    });
};

// ---------------------------------------------------------- EDIT ------------------------------------------------------------
// AL MOMENTO DE CREAR EL BOTON QUE DESPLEGARÁ EL MODAL PARA EDITAR:
// EDIT:
let buttonEdit = document.createElement("a");
buttonEdit.setAttribute("href", "#");
buttonEdit.classList.add("btn", "btn-primary");
buttonEdit.innerText = "Edit";
// EVENTO 'click' EN EL BOTÓN 'Edit' PARA LLAMAR A LA FUNCIÓN Y EJECUTARLA:
buttonEdit.addEventListener("click", function () {
    getUserInfo(element.id, element.name, element.email, element.password);
});
// FUNCIÓN PARA LLEVAR LA INFO DEL USUARIO SELECCIONADO AL 'modal':
function getUserInfo(id, name, email, password) {
    // SE ENVÍA EL 'id' DEL USUARIO SELECCIONADO AL 'sessionStorage':
    sessionStorage.setItem("id", id);
    // SE INICIALIZAN LAS VARIABLES CON LOS 'id' DE LOS ELEMENTOS 'inputs' PARA PODER PASARLES LOS VALORES DE LOS USERS ABAJO:
    let inputName = document.getElementById("inputName");
    let inputEmail = document.getElementById("inputEmail");
    let inputPassword = document.getElementById("inputPassword");
    // SE AGREGAN LOS VALORES DE LOS USERS EN LOS INPUTS:
    inputName.value = name;
    inputEmail.value = email;
    inputPassword.value = password;
};

// FUNCIÓN PARA ACTUALIZAR LA INFO DEL USUARIO:
function editUser() {
    // SE INICIALIZA LA VARIABLE CON EL 'id' QUE FUE ENVIADO AL sessionStorage:
    let userId = sessionStorage.getItem("id");
    // SE INICIALIZAN LAS VARIABLES CON EL NUEVO VALOR DE LOS 'inputs':
    let inputName = document.getElementById("inputName").value;
    let inputEmail = document.getElementById("inputEmail").value;
    let inputPassword = document.getElementById("inputPassword").value;
    // SE CREA UN OBJETO CON LOS NUEVOS VALORES DE LOS ELEMENTOS:
    infoUpdated = {
        name: inputName,
        email: inputEmail,
        password: inputPassword,
    };
    // SE UTILIZA LA FUNCIÓN fetch() PARA COGER LA API Y ENVIARLE LOS DATOS ACTUALIZADOS DEL USER SELECCIONADO:
    fetch("https://memin.io/public/api/v2/users/" + userId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
    },
    body: JSON.stringify(infoUpdated),
    }).then((response) => {
        console.log(response.ok);
        location.reload();
    });
};

// ---------------------------------------------------------- DELETE ------------------------------------------------------------
// AL MOMENTO DE CREAR EL BOTON QUE ELIMINARÁ, PASAR LOS ARGUMENTOS A LA FUNCIÓN:
// DELETE:
let buttonDelete = document.createElement("a");
buttonDelete.setAttribute("href", "#");
buttonDelete.classList.add("btn", "btn-danger", "m-1");
buttonDelete.innerText = "Delete";
// EVENTO 'click' EN EL BOTÓN 'Delete' PARA LLAMAR A LA FUNCIÓN Y EJECUTARLA:
buttonDelete.addEventListener("click", function () {
  deleteUser(element.id); // LLAMADO DE LA FUNCIÓN PARA ELIMINAR EL USUARIO.
});
// FUNCIÓN PARA ELIMINAR:
function deleteUser(id) {
    // FUNCIÓN 'fetch()' PARA MANIPULAR EL OBJETO .json:
    fetch("https://memin.io/public/api/v2/users/" + id, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
    },
    })
    .then((result) => {
        return result.json();
    })
    .then((info) => {
        console.log("User deleted: " + info);
        location.reload();
    });
}


// ------------------------------------- SEARCH BOX  -------------------------------------
function search(){
    q = document.getElementById('search').value;
    fetch("https://memin.io/public/api/v2/users/search/" + q)
    .then(result => result.json())
    .then(data => {

        let tbody = document.getElementById('tbody');
        tbody.innerHTML = "";
        data.forEach(function(element){    
            let tr = document.createElement('tr');
            tbody.appendChild(tr);
    
            let td_id = document.createElement('td')
            td_id.innerText = element.id
            tr.appendChild(td_id);
    
            let td_name = document.createElement('td')
            td_name.innerText = element.name
            tr.appendChild(td_name);
    
            let td_email = document.createElement('td')
            td_email.innerText = element.email
            tr.appendChild(td_email);
    
            let td_button = document.createElement('td')
            tr.appendChild(td_button);
    
            let button_eliminar = document.createElement("button");
            button_eliminar.classList.add("btn","btn-danger","btn-sm")
            button_eliminar.innerText = "Eliminar";
            button_eliminar.setAttribute("onclick", "destroy("+element.id+")")
            td_button.appendChild(button_eliminar);
    
            let button_editar = document.createElement("button");
            button_editar.classList.add("btn","btn-warning","btn-sm")
            button_editar.innerText = "Editar";
            button_editar.setAttribute("onclick", "edit("+element.id+")")
            td_button.appendChild(button_editar);
        });
    });
}