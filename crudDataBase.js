// INICIALIZACIÓN DE VARIABLE CON EL ROOT DEL HTML:
let root = document.getElementById("root");
// CREACIÓN DE LA TABLA:
// COLUMNA DE LOS USUARIOS:
let col = document.createElement("div");
col.classList.add("col-md-12");
root.appendChild(col);
// TABLE CONTAINER:
let tableContainer = document.createElement("div");
tableContainer.classList.add("table-responsive");
col.appendChild(tableContainer);
// TABLE:
let table = document.createElement("table");
table.classList.add("table", "table-hover");
tableContainer.appendChild(table);
// THEAD:
let thead = document.createElement("thead");
table.appendChild(thead);
// TR (THEAD):
let trHead = document.createElement("tr");
thead.appendChild(trHead);
// thId (TR):
let thId = document.createElement("th");
thId.innerText = "ID";
trHead.appendChild(thId);
// thName (TR):
let thName = document.createElement("th");
thName.innerText = "Name";
trHead.appendChild(thName);
// thEmail (TR):
let thEmail = document.createElement("th");
thEmail.innerText = "Email";
trHead.appendChild(thEmail);
// thPassword (TR):
let thPassword = document.createElement("th");
thPassword.innerText = "Password";
trHead.appendChild(thPassword);
// thActions (TR):
let thActions = document.createElement("th");
thActions.innerText = "ACTIONS";
trHead.appendChild(thActions);
// TBODY:
let tbody = document.createElement("tbody");
table.appendChild(tbody);

// FUNCIÓN fetch() PARA LLAMAR A LA API:
let userList = fetch("https://memin.io/public/api/v2/users")
  .then((parseJSON) => {
    return parseJSON.json();
  })
  .then((info) => {
    info.data.forEach((element) => {
      // TR BODY:
      let trBody = document.createElement("tr");
      tbody.appendChild(trBody);
      // TD ID:
      let tdId = document.createElement("td");
      tdId.innerText = element.id;
      trBody.appendChild(tdId);
      // TD NAME:
      let tdName = document.createElement("td");
      tdName.innerText = element.name;
      trBody.appendChild(tdName);
      // TD EMAIL:
      let tdEmail = document.createElement("td");
      tdEmail.innerText = element.email;
      trBody.appendChild(tdEmail);
      // TD PASSWORD:
      let tdPassword = document.createElement("td");
      tdPassword.innerText = element.password;
      trBody.appendChild(tdPassword);
      // TD ACTIONS-BUTTONS:
      // DETAILS:
      let tdActions = document.createElement("td");
      let buttonDetails = document.createElement("a");
      buttonDetails.setAttribute("href", "#");
      buttonDetails.classList.add("btn", "btn-info", "m-1");
      buttonDetails.setAttribute('id', 'showDetailsButton');
      buttonDetails.innerText = "View Details";
      // EVENTO 'click' EN EL BOTÓN ' View Details' PARA LLAMAR A LA FUNCIÓN Y EJECUTARLA:
      buttonDetails.addEventListener("click", function () {
        showDetails(element.id, element.name, element.email, element.password);
      });
      tdActions.appendChild(buttonDetails);
      // EDIT:
      let buttonEdit = document.createElement("a");
      buttonEdit.setAttribute("href", "#");
      buttonEdit.classList.add("btn", "btn-primary");
      buttonEdit.innerText = "Edit";
      // EVENTO 'click' EN EL BOTÓN 'Edit' PARA LLAMAR A LA FUNCIÓN Y EJECUTARLA:
      buttonEdit.addEventListener("click", function () {
        getUserInfo(element.id, element.name, element.email, element.password);
        showModalUpdate();
      });
      tdActions.appendChild(buttonEdit);
      // DELETE:
      let buttonDelete = document.createElement("a");
      buttonDelete.setAttribute("href", "#");
      buttonDelete.classList.add("btn", "btn-danger", "m-1");
      buttonDelete.innerText = "Delete";
      // EVENTO 'click' EN EL BOTÓN 'Delete' PARA LLAMAR A LA FUNCIÓN Y EJECUTARLA:
      buttonDelete.addEventListener("click", function () {
        deleteUser(element.id); // LLAMADO DE LA FUNCIÓN PARA ELIMINAR EL USUARIO.
      });
      tdActions.appendChild(buttonDelete);

      trBody.appendChild(tdActions);
    });
  });
// ========================================================== FUNCTIONS ==========================================================
// ------------------------------------------------------------ CREATE ---------------------------------------------------------

// FUNCTION TO OPEN THE MODAL TO CREATE A NEW USER:
// Get the modal
let modalCreate = document.getElementById("modal_create");

function showModalCreate(){
  // When the user clicks the button, open the modal 
  modalCreate.style.display = "block";
};
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
  }).then((response) => {
    console.log(response.ok);
    location.reload();
  });
};

// Get the <span> element that closes the modal
let closeButton = document.getElementById("close_button_create_actions");
// When the user clicks on <span> (x), close the modal
closeButton.addEventListener("click", function () {
  modalCreate.style.display = "none";
});
// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click',function(event){
  if (event.target == modalCreate) {
    modalCreate.style.display = "none";
  }
});
// ------------------------------------------------------------ DETAILS ---------------------------------------------------------


// FUNTIONS TO SHOW THE USER'S DETAILS:
// Get the modal
let modalDetails = document.getElementById("modal_details");

function showDetails(id, name, email, password){
    // Get the button that opens the modal
    let detailsButton = document.getElementById("showDetailsButton");
    // When the user clicks the button, open the modal 
    modalDetails.style.display = "block";
    // SE INICIALIZAN LAS VARIABLES CON LOS 'id' DE LOS ELEMENTOS EN LOS CUALES SE AÑADIRÁ LA INFO DEL USER:
    let userName = document.getElementById('userName');
    let userId = document.getElementById('userId');
    let userEmail = document.getElementById('userEmail');
    let userPassword = document.getElementById('userPassword');
    // SE AÑADIRÁ LA INFO DEL USER EN LOS RESPECTIVOS ELEMENTOS DEL HTML:
    userName.innerText = name;
    userId.innerText = id;
    userEmail.innerText = email;
    userPassword.innerText = password;
};

// Get the <span> element that closes the modal
let closeButtonDetails = document.getElementById("close_button_details_actions");
// When the user clicks on <span> (x), close the modal
  closeButtonDetails.onclick = function() {
  modalDetails.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
if (event.target == modalDetails) {
        modalDetails.style.display = "none";
    }
};

// ---------------------------------------------------------- EDIT ------------------------------------------------------------
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
// FUNCTION TO OPEN THE MODAL TO CREATE A NEW USER:
// Get the modal
let modalEdit = document.getElementById("modal_edit");

function showModalUpdate(){
  // When the user clicks the button, open the modal 
  modalEdit.style.display = "block";
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

// Get the <span> element that closes the modal
let closeButtonEdit = document.getElementById("close_button_edit_actions");
// When the user clicks on <span> (x), close the modal
closeButtonEdit.addEventListener("click", function () {
  modalEdit.style.display = "none";
});
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalEdit) {
          modalEdit.style.display = "none";
      }
  };

// ---------------------------------------------------------- DELETE ------------------------------------------------------------
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



// TENGO TROCADO LOS 'id' DE LOS INPUTS DE LOS MODALES. DEBO CREAR LA FUNCIÓN PARA CREAR