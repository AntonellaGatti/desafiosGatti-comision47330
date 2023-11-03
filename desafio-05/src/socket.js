import { Server } from 'socket.io';
import { ProductManager } from './productManager.js';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ruta1 = path.join(__dirname, 'products.json');


let io;


const productManager = new ProductManager(ruta1);
const products = await productManager.getProducts();

export const init = (httpServer) => {
    io = new Server(httpServer);
    io.on("connection", async (socketClient) => {
      console.log("Cliente conectado 💪 ", socketClient.id);
  
      // muestro lista de productos
      socketClient.emit("listProducts", JSON.stringify(products));

      // agrego nuevos productos
      socketClient.on("new-product", async (newProduct) => {
        try {
          await productManager.addProducts(newProduct);
          io.emit("listProducts", await productManager.getProducts());
          socketClient.emit("productAddedSuccessfully");
        } catch (error) {
          socketClient.emit("productError", error.message);
        }
      });
      
      // borrro productos
      socketClient.on("deleteProductById", async (idToDelete) => {
        try {
            await productManager.deleteProductsById(idToDelete);
            io.emit("listProducts", products);
            socketClient.emit("productDeletedSuccessfully");
        }catch (error) {
            socketClient.emit("productError", error.message);
          }
      });


      
      socketClient.on("disconnect", () => {
        console.log(`Se ha desconectado el cliente : ${socketClient.id} 😔`);
      });
    });
  
    console.log("server socket running");
  };
