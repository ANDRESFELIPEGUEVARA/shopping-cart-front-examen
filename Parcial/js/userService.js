function getUsers() {
    document.getElementById('cardHeader').innerHTML = '<h4 class="placeholder-wave">Listado de usuarios</h4>'
    fetch("https://fakestoreapi.com/users", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        },

    })
        .then((result) => {
            return result.json().then(
                data => {
                    return {
                        status: result.status,
                        body: data
                    }
                }
            )
        })
        .then((response) => {
            if (response.status === 200) {
                let listUsers = `
                <table class="table">
                    <thead>
                        <button type="button" class="btn btn-outline-success" onclick="addUser()"><i class="fa-solid fa-user-plus"></i></button>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">User name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Password</th>
                        </tr>
                    </thead>
                    <tbody>
        
            `
                response.body.forEach(user => {
                    listUsers=listUsers.concat(`
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.username}</td>
                            <td>${user.email}</td>
                            <td>${user.password}</td>
                            <td><button type="button" class="btn btn-outline-info" onclick="showInfoUser('${user.id}')">View</button></td>
                        </tr>
                        `)
                    
                });
                document.getElementById('info').innerHTML=listUsers    
            }
            else {
                document.getElementById('info').innerHTML = '<h3>No se encontraron usuarios</h3>'
            }
        })


}

function showInfoUser(userId){
    fetch("https://fakestoreapi.com/users/"+userId, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        },
    })
        .then((result) => {
            return result.json().then(
                data => {
                    return {
                        status: result.status,
                        body: data
                    }
                }
            )
        })

    .then((response)=>{
        if(response.status=== 200){
            showModalUser(response.body)
        }
        else{
            document.getElementById('info').innerHTML='<h3>No se encontro el usuario</h3>'
        }
    })
}

function showModalUser(user){
    const modalUser=`
    <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-instead="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Show User</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">User Info</h5>
                <p class="card-text">Nombre de usuario :${user.username}</p>
                <p class="card-text">Correo :${user.email}</p>
                <p class="card-text">Contraseña :${user.password}</p>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    `
    document.getElementById('showModal').innerHTML=modalUser
    const modal=new bootstrap.Modal(document.getElementById('modalUser'))
    modal.show()
}   

// usuario

function addUser() {
    const modalUser = `
      <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-instead="true">
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel"><i class="fa-solid fa-user-plus"></i>Add User</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="card">
                <div class="card-body">
                  <form id="formAddUser">
                    <div class="mb-3">
                      <label for="username" class="form-label">Nombre de usuario</label>
                      <input type="text" class="form-control" id="username" required placeholder="username input">
                    </div>
                    <div class="mb-3">
                      <label for="email" class="form-label">Email</label>
                      <input type="email" class="form-control" id="email" required placeholder="email input">
                    </div>
                    <div class="mb-3">
                      <label for="password" class="form-label">Contraseña</label>
                      <input type="password" class="form-control" id="password" required placeholder="password input">
                    </div>
                    <div class="mb-3 text-center">
                      <button type="submit" class="btn btn-success" onclick="saveUser()"><i class="fa-solid fa-floppy-disk"></i></button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      `
    document.getElementById('showModal').innerHTML = modalUser
    const modal = new bootstrap.Modal(document.getElementById('modalUser'))
    modal.show()
  }
  
  function saveUser() {
    const form = document.getElementById('formAddUser');
    if (form.checkValidity()) {
      const username = document.getElementById('username').value
      const password = document.getElementById('password').value
      const email = document.getElementById('email').value
      const userData = {
        username: username,
        email: email,
        password: password
      }
      fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(userData)
      })
        .then((result) => {
          return result.json().then(
            data => {
              return {
                status: result.status,
                body: data
              }
            }
          )
        })
        .then((response) => {
          if (response.status === 200) {
            document.getElementById('info').innerHTML = '<h3>El usuario se ha registrado!</h3>'
            console.log("marimba gringa")
          } else {
            document.getElementById('info').innerHTML = '<h3>Error al registrar el usuario</h3>'
          } 
          const modal = bootstrap.Modal.getInstance(document.getElementById('modalUser'))
          modal.hide()
        })
    }else{
      form.reportValidity()
    }
  }
  