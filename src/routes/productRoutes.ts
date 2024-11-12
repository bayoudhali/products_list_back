
import { Router } from 'express';
import validateRequest from '../middleware/validateRequest';
import {
  createProductSchema,
  updateProductSchema,
} from '../validators/productValidator';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';

const router = Router();

router.post('/products', validateRequest(createProductSchema), createProduct);
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id', validateRequest(updateProductSchema), updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;
