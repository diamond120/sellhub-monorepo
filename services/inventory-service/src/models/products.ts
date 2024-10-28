import { pgTable, uuid, text, integer } from 'drizzle-orm/pg-core';

// Define the products table schema
export const products = pgTable('products', {
  id: uuid('product_id').primaryKey(),
  name: text('product_name'),
  count: integer('inventory_count'),
});
