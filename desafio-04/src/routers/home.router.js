import { Router } from 'express';
import { __dirname } from '../utils.js';
import path from 'path';
import { ProductManager } from '../productManager.js';

const ruta1 = path.join(__dirname, '/products.json');
const productManager = new ProductManager(ruta1);

const router = Router();


router.get('/home', async (req, res) => {
  try {
    const limit = req.query.limit 
    ? parseInt(req.query.limit) 
    : undefined;
    
    const products = await productManager.getProducts(limit)

    const limitedProducts = limit 
    ? products.slice(0, limit) 
    : products;

    res.render('home', { product: limitedProducts });
  
  }
  catch (error) {
    res.status(400).json({ error: 'error' });
  }
})



export default router;