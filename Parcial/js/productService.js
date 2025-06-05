function getProducts() {
  document.getElementById('cardHeader').innerHTML = '<h4 class="placeholder-wave">Listado de productos</h4>'
  document.getElementById('info').innerHTML = ''
  fetch("https://fakestoreapi.com/products", {
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

      .then((response => {
          if (response.status === 200) {
              listProducts = `
              <table class="table">
                  <thead>
                      <button type="button" class="btn btn-outline-success" onclick="addProduct()"><i class="fa-solid fa-tags"></i></button>
                      <tr>
                      <th scope="col">#</th>
                      <th scope="col">title</th>
                      <th scope="col">precio</th>
                      <th scope="col">descripcion</th>
                      <th scope="col">categoria</th>
                      <th scope="col">imagen</th>
                      </tr>
                  </thead>
                  <tbody>
          `
              response.body.forEach(product => {
                  listProducts = listProducts.concat(`
                  <tr>
                      <td>${product.id}</td>
                      <td>${product.title}</td>
                      <td>${product.price}</td>
                      <td>${product.description}</td>
                      <td>${product.category}</td>
                      <td><img src="${product.image}" class="img-thumbnail" alt="Imagen de pruductos"></td>
                      <td><button type="button" class="btn btn-outline-info" onclick="showInfoProducts('${product.id}')">View</button></td>

                  </tr>
                  `)
              })
              document.getElementById("info").innerHTML = listProducts

          }
      }))

}
function showInfoProducts(productId) {
  fetch("https://fakestoreapi.com/products/" + productId, {
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
              showModalProducts(response.body)
          }
          else {
              document.getElementById('info').innerHTML = '<h3>No se encontro el producto</h3>'
          }
      })
}

function showModalProducts(product){
  const modalProduct=`
  <div class="modal fade" id="modalProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Show Product</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="card">
            <img src="${product.image}" class="card-img-top" alt="imagen producto">
            <div class="card-body">
              <h5 class="card-title">Product Info</h5>
              <p class="card-text">Titulo :${product.title}</p>
              <p class="card-text">Description :${product.description}</p>
              <p class="card-text">categoria:${product.category}</p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secundary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  `
  document.getElementById('showModal').innerHTML=modalProduct
  const modal=new bootstrap.Modal(document.getElementById('modalProduct'))
  modal.show()
}

// producto

function addProduct() {
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
                  <form id="formaddProduct">
                    <div class="mb-3">
                      <label for="titlepr" class="form-label">Titulo</label>
                      <input type="text" class="form-control" id="titlepr" required placeholder="titulo input">
                    </div>
                    <div class="mb-3">
                      <label for="price" class="form-label">precio</label>
                      <input type="number" class="form-control" id="price" required placeholder="price input">
                    </div>
                    <div class="mb-3">
                      <label for="description" class="form-label">Descripcion</label>
                      <input type="text" class="form-control" id="description" required placeholder="description input">
                    </div>
                    <div class="mb-3">
                      <label for="image" class="form-label">Imagen</label>
                      <input type="url" class="form-control" id="image" required placeholder="image input">
                    </div>
                    <div class="mb-3">
                      <label for="category" class="form-label">Categoria</label>
                      <input type="text" class="form-control" id="category" required placeholder="category input">
                    </div>
                    <div class="mb-3 text-center">
                      <button type="submit" class="btn btn-success" onclick="saveProduct()"><i class="fa-solid fa-floppy-disk"></i></button>
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
  
  function saveProduct() {
    const form = document.getElementById('formaddProduct');
    if (form.checkValidity()) {
      const titlepr = document.getElementById('titlepr').value
      const description = document.getElementById('description').value
      const image = document.getElementById('image').value
      const price = document.getElementById('price').value
      const category = document.getElementById('category').value
      const userData = {
        titlepr: titlepr,
        price: price,
        description: description,
        image: image,
        category: category
      }
      fetch("https://fakestoreapi.com/products", {
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
            document.getElementById('info').innerHTML = '<h3>El producto se ha registrado!</h3>'
          } else {
            document.getElementById('info').innerHTML = '<h3>Error al registrar el producto</h3>'
          } 
          const modal = bootstrap.Modal.getInstance(document.getElementById('modalUser'))
          modal.hide()
        })
    }else{
      form.reportValidity()
    }
  }