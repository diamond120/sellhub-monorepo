import { Router } from 'express';
import { getInventory, updateInventory } from '../services/products';
import { handleError } from '../utils/errorHandlers';

const router = Router();

// Fetch inventory for a specific product
router.get('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    res.json(await getInventory(productId));
  } catch (error) {
    handleError(res, error);
  }
});

// Update inventory for a product
router.post('/', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    res.json(await updateInventory(productId, quantity));
  } catch (error) {
    handleError(res, error);
  }
});

export default router;
