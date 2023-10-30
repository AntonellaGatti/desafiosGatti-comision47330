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


    //borrar productos




})();