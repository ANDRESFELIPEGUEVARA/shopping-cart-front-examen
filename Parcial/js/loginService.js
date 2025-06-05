document.getElementById('formLogin').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    buscar(username, password)

})

function buscar(username, password) {
    let message = ''
    let alertType = ''
    localStorage.removeItem('token')
    fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ username, password })

    })

    .then((response) => {
        if (response.status === 200) {
            alertType = 'success'
            message = 'Inicio de sesion exitoso'
            console.log("Ingreso correcto " + response)
            alertBuilder(alertType, message)
            setTimeout(()=> {
                location.href='admin/dashboard.html'

            },1000)
            
        } else {
            alertType = 'danger'
            message = 'nombre de usuario o contraseña no encontrados'
            alertBuilder(alertType, message)
        }

    })
    .catch((error) => {
        alertType = 'danger'
        message = 'Error inesperado'
        console.error(error)
        alertBuilder(alertType, message)
    })
}

function alertBuilder(alertType, message) {
    const alert = `
    <div class="alert alert-${alertType} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`
    document.getElementById('alert').innerHTML = alert;
}