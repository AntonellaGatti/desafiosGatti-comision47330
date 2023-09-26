class ProductManager {

    constructor () {
        this.products= []
      
    }

    addProducts(title, description, price,thumbnail, code, stock) {
        // validacion de que el campo code no se repita
        let existingCode = this.products.find (product => product.code === code);

        if(existingCode) {
            console.log('El codigo de producto ingresado ya existe');
            return;
        }

        // validacion de que todos los campos son obligatorios
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Todos los campos son obligatorios.");
            return;
          }

        this.products.push({
            id: this.products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code, 
            stock,
        })
        console.log("The product has been added")
    }



    getProducts () {
        return console.log(this.products);
    }



    getProductsById (id) {
        let existingId = this.products.find (product => product.id === id)
        
        if (!existingId) {
            console.error('Not Found');
            return null;
        }
        return console.log(existingId)   
    }
}

const productManager = new ProductManager();

/////// TESTING //////

// Se llama al método “addProduct”
productManager.addProducts("Buzo","Buzo oversize",300, "ruta1.jpg","C1",3)
productManager.addProducts("Remera","Remera oversize",150, "ruta2.jpg","C2",8)
productManager.addProducts("Campera","Campera oversize",750, "ruta3.jpg","C3",8)


// Se llama al método “getProducts” para corroborar que esté agregado correctamente
productManager.getProducts()


// Se llama al método “addProduct” con los mismos campos de arriba, para corroborar que de un error porque el código estará repetido.
productManager.addProducts("Buzo","Buzo oversize",300, "ruta1.jpg","C1",3)


// Se llama al método “addProduct” sin un campo, para corroborar que de un error porque todos los campos son obligatorios
productManager.addProducts("Buzo",300, "ruta1.jpg","C1",3)


// Se llama al método “getProductsById” con un Id inexistente para que devuelva error
productManager.getProductsById(5)


// Se llama al método “getProductsById” con un Id existente para que devuelva el producto
productManager.getProductsById(2)