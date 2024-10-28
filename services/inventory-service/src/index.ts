import express from 'express';
import dotenv from 'dotenv';
import productController from './controllers/products';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use('/products', productController);

app.listen(port, () => {
  console.log(`Inventory service running on port ${port}`);
});