// ---------------------------------------- LOGIN FUNCTION ----------------------------------------
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
