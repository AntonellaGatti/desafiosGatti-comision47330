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
  
      socketClient.emit("listProducts", JSON.stringify(products));
    //   socketClient.on("addProduct", async (newProduct) => {
    //     await productManager.addProduct(newProduct);
    //     // console.log(products);
    //     io.emit("listProducts", products);
    //   });
    //   socketClient.on("deleteProductById", async (idToDelete) => {
    //     await productManager.deleteProduct(idToDelete);
    //     io.emit("listProducts", products);
    //   });
      socketClient.on("disconnect", () => {
        console.log(`Se ha desconectado el cliente : ${socketClient.id} 😔`);
      });
    });
  
    console.log("server socket running");
  };
  