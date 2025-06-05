function getCarts() {
    document.getElementById('cardHeader').innerHTML = '<h4 class="placeholder-wave">Carrito de compras</h4>'
    fetch("https://fakestoreapi.com/carts", {
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
                let listcarts = `
              <table class="table">
                  <thead>
                      <button type="button" class="btn btn-outline-success" onclick="addCarrito()"><i class="fa-solid fa-cart-shopping"></i></button>
                      <tr>
                      <th scope="col">#</th>
                      <th scope="col">cart ID</th>
                      <th scope="col">Product ID</th>
                      <th scope="col">Quantity</th>
                      </tr>
                  </thead>
                  <tbody>
      
          `
                response.body.forEach(cart => {
                    let prod1 = ""
                    let prod2 = ""
                    let prod3 = ""
                    if (cart.products[0].productId !== null) {
                        prod1 = cart.products[0].productId
                    }
                    if (cart.products.length > 1) {
                        prod2 = ", " + cart.products[1].productId
                    }
                    if (cart.products.length > 2) {
                        prod3 = ", " + cart.products[2].productId
                    }
                    let can1 = ""
                    let can2 = ""
                    let can3 = ""
                    if (cart.products[0].productId !== null) {
                        can1 = cart.products[0].quantity
                    }
                    if (cart.products.length > 1) {
                        can2 = ", " + cart.products[1].quantity
                    }
                    if (cart.products.length > 2) {
                        can3 = ", " + cart.products[2].quantity
                    }
                    listcarts = listcarts.concat(`
                      <tr>
                          <td>${cart.id}</td>
                          <td>${cart.userId}</td>
                          <td>${prod1}${prod2}${prod3}</td>
                          <td>${can1}${can2}${can3}</td>
                          <td><button type="button" class="btn btn-outline-info" onclick="showInfocart('${cart.id}')">View</button></td>
                      </tr>
                      `)

                });
                document.getElementById('info').innerHTML = listcarts
            }
            else {
                document.getElementById('info').innerHTML = '<h3>No se encontraron productos en el carrito</h3>'
            }
        })


}

function showInfocart(cartId) {
    fetch("https://fakestoreapi.com/carts/" + cartId, {
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
                showModalcart(response.body)
            }
            else {
                document.getElementById('info').innerHTML = '<h3>No se encontro el producto</h3>'
            }
        })
}

function showModalcart(cart) {
    let prod1 = ""
    let prod2 = ""
    let prod3 = ""
    if (cart.products[0].productId !== null) {
        prod1 = cart.products[0].productId
    }
    if (cart.products.length > 1) {
        prod2 = ", " + cart.products[1].productId
    }
    if (cart.products.length > 2) {
        prod3 = ", " + cart.products[2].productId
    }
    let can1 = ""
    let can2 = ""
    let can3 = ""
    if (cart.products[0].productId !== null) {
        can1 = cart.products[0].quantity
    }
    if (cart.products.length > 1) {
        can2 = ", " + cart.products[1].quantity
    }
    if (cart.products.length > 2) {
        can3 = ", " + cart.products[2].quantity
    }
    const modalcart = `
  <div class="modal fade" id="modalcart" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Show cart</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">cart Info</h5>
              <p class="card-text">Id de usuario:${cart.userId}</p>
              <p class="card-text">Producto :${prod1}${prod2}${prod3}</p>
              <p class="card-text">Quantity :${can1}${can2}${can3}</p>
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
    document.getElementById('showModal').innerHTML = modalcart
    const modal = new bootstrap.Modal(document.getElementById('modalcart'))
    modal.show()
}   


// carrito

function addCarrito() {
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
                      <label for="userId" class="form-label">Id de usuario</label>
                      <input type="number" class="form-control" id="userId" required placeholder="userId input">
                    </div>
                    <div class="mb-3">
                      <label for="productID" class="form-label">Producto ID</label>
                      <input type="number" class="form-control" id="productID" required placeholder="productID input">
                    </div>
                    <div class="mb-3">
                      <label for="quantity" class="form-label">Cantidad</label>
                      <input type="number" class="form-control" id="quantity" required placeholder="quantity input">
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
      const userId = document.getElementById('userId').value
      const quantity = document.getElementById('quantity').value
      const productID = document.getElementById('productID').value
      const productos = [productID, quantity]
      const userData = {
        userId: userId,
        products: productos
      }
      fetch("https://fakestoreapi.com/carts", {
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
            document.getElementById('info').innerHTML = '<h3>El carrito se ha registrado!</h3>'
          } else {
            document.getElementById('info').innerHTML = '<h3>Error al registrar el carrito</h3>'
          } 
          const modal = bootstrap.Modal.getInstance(document.getElementById('modalUser'))
          modal.hide()
        })
    }else{
      form.reportValidity()
    }
  }