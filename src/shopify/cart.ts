import client from './shopify-client';
import { 
  CreateCartMutation, 
  AddCartLinesMutation, 
  RemoveCartLinesMutation 
} from '../graphql/mutations/CartMutations';
import { GetCartQuery } from '../graphql/queries/CartQuery';
import type { 
  Cart, 
  CreateCartResponse, 
  AddCartLinesResponse, 
  RemoveCartLinesResponse,
  GetCartResponse
} from '../types/Cart';

import { setCart } from '../stores/cartStore';

// Create a new cart
export async function createCart(productId: string, quantity: number = 1): Promise<Cart> {
  const { data, errors } = await client.request(CreateCartMutation, {
    variables: {
      productId,
      quantity
    }
  });

  if (errors) {
    console.error('Shopify API errors:', errors);
    throw new Error('Failed to create cart');
  }

  const cartResponse = data as CreateCartResponse;
  
  if (!cartResponse || !cartResponse.cartCreate || !cartResponse.cartCreate.cart) {
    throw new Error('Failed to retrieve cart data');
  }
  
  const cart = cartResponse.cartCreate.cart;
  
  // Update the store with the new cart
  setCart(cart);
  
  return cart;
}

// Add items to an existing cart
export async function addToCart(cartId: string, merchandiseId: string, quantity: number = 1): Promise<Cart> {
  const { data, errors } = await client.request(AddCartLinesMutation,{
    variables: { 
      cartId, 
      merchandiseId, 
      quantity 
    }
  });

  if (errors) {
    console.error('Shopify API errors:', errors);
    throw new Error('Failed to add items to cart');
  }

  const cartResponse = data as AddCartLinesResponse;
  
  if (!cartResponse || !cartResponse.cartLinesAdd || !cartResponse.cartLinesAdd.cart) {
    throw new Error('Failed to retrieve updated cart data');
  }
  
  const cart = cartResponse.cartLinesAdd.cart;
  
  // Update the store with the updated cart
  setCart(cart);
  
  return cart;
}

// Remove items from cart
export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const { data, errors } = await client.request(RemoveCartLinesMutation,{
    variables: { 
      cartId, 
      lineIds 
    }
  });

  if (errors) {
    console.error('Shopify API errors:', errors);
    throw new Error('Failed to remove items from cart');
  }

  const cartResponse = data as RemoveCartLinesResponse;
  
  if (!cartResponse || !cartResponse.cartLinesRemove || !cartResponse.cartLinesRemove.cart) {
    throw new Error('Failed to retrieve updated cart data');
  }
  
  const cart = cartResponse.cartLinesRemove.cart;
  
  // Update the store with the updated cart
  setCart(cart);
  
  return cart;
}

// Get cart by ID
export async function getCart(cartId: string): Promise<Cart | null> {
  if (!cartId) return null;
  
  try {
    const { data, errors } = await client.request( GetCartQuery,{
      variables: { id: cartId }
    });

    if (errors) {
      console.error('Shopify API errors:', errors);
      return null;
    }

    const cartResponse = data as GetCartResponse;
    
    if (!cartResponse || !cartResponse.cart) {
      return null;
    }
    
    const cart = cartResponse.cart;
    
    // Update the store with the fetched cart
    setCart(cart);
    
    return cart;
  } catch (error) {
    console.error('Error fetching cart:', error);
    return null;
  }
}