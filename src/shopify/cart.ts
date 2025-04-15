import client from './shopify-client';
import { CREATE_CART } from '../graphql/mutations/CartMutations';
import type { CreateCartResponse } from '../types/Cart';

export async function createCart(productId: string | undefined, quantity: number = 1): Promise<CreateCartResponse['cartCreate']['cart']> {
    const input = {
      lines: [{ quantity, merchandiseId: productId }],
    };
  
    const { data, errors } = await client.request<CreateCartResponse>(CREATE_CART, {
      variables: { input },
    });
  
    if (errors) {
      console.error('Shopify API errors:', errors);
      throw new Error('Failed to create cart');
    }
  
    if (!data || !data.cartCreate || !data.cartCreate.cart) {
      throw new Error('Failed to retrieve cart data');
    }
    return data.cartCreate.cart;
}