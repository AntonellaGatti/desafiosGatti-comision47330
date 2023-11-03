import express from 'express';
import path from 'path';
import handlebars from 'express-handlebars';

import homeRouter from './routers/home.router.js';
import productRouter from './routers/products.router.js'; 
import cartsRouter from './routers/carts.router.js'; 
import realTimeProductsRouter from './routers/realTimeProducts.router.js';

import { __dirname } from './utils.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// config Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// Router
app.use('/', homeRouter);
app.use('/api', productRouter);
app.use('/api', cartsRouter);
app.use('/realtimeproducts', realTimeProductsRouter);



app.use((error, req, res, next) => {
  const message = `Ha ocurrido un error desconocido: ${error.message}`;
  console.log(message);
  res.status(500).json({ status: 'error', message });
});

export default app;