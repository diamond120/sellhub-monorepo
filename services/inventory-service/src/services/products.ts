import { CustomError } from 'utils/errorHandlers';
import { db } from '../db';
import { products } from '../models/products';
import { eq } from 'drizzle-orm';

// Fetch inventory for a specific product
export async function getInventory(productId: string) {
  const product = await db.select().from(products).where(eq(products.id, productId));

  if (product.length === 0 || product[0] == null) {
    throw new CustomError('Product not found', 404);
  }

  return {
    product_name: product[0].name,
    inventory_count: product[0].count
  };
}

// Update inventory when an order is placed
export async function updateInventory(productId: string, quantity: number) {
  const product = await db.select().from(products).where(eq(products.id, productId));

  if (product.length === 0 || product[0] == null) {
    throw new CustomError('Product not found', 404);
  }

  const currentInventory = product[0].count;
  if (currentInventory === null || currentInventory < quantity) {
    throw new CustomError('Insufficient inventory', 400);
  }

  await db.update(products)
    .set({ count: currentInventory - quantity })
    .where(eq(products.id, productId));

  return { message: 'Inventory updated', new_inventory_count: currentInventory - quantity };
}