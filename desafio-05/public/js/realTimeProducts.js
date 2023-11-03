// Aca se ve lo del front-end (en el socket.js se ve lo del backend)
(function () {
    const socket = io()

    // productList
    const showProductList = document.getElementById('showProductList');

    socket.on('listProducts', (data) => {
        showProductList.innerHTML = "";
        const products = JSON.parse(data)
        products.forEach((product) => {
            const listItem = document.createElement("li");
            listItem.textContent = `Nombre: ${product.title} - Precio: $${parseInt(product.price).toFixed(2)} - ID: ${product.id}`;
            showProductList.appendChild(listItem);
        });
    });

    // info formulario
    const addProductsForm = document.getElementById('addProductsForm');
    
    socket.on("productAddedSuccessfully", () => {
        Swal.fire({
            icon: 'success',
            title: 'Producto Agregado',
            text: 'El producto se ha agregado correctamente.',
        });
        addProductsForm.reset();
    });
    
    addProductsForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const newProduct = {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            price: document.getElementById("price").value,
            status: document.getElementById("status").value,
            stock: document.getElementById("stock").value,
            category: document.getElementById("category").value,
            code: document.getElementById("code").value,
        };
        socket.emit('new-product', newProduct);
        newProduct.value= "";
        reset();
    });
    
    
    // Error del formulario
    socket.on("productError", (errorMessage) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
        });
      });
    

    //borrar productos

    socket.on("productDeletedSuccessfully", () => {
        Swal.fire({
            icon: 'success',
            title: 'Producto Eliminado',
            text: 'El producto se ha eliminado correctamente.',
        });
    });
    
    const formDelete = document.getElementById('formDelete');
    const idToDeleteInput = document.getElementById('idDelete');

    formDelete.addEventListener('submit', (e)=> {
    e.preventDefault();
    const idToDelete = idToDeleteInput.value;
    socket.emit('deleteProductById', idToDelete);
    idToDeleteInput.value = "";
    idToDeleteInput.focus();
   })



})();