import { persistentAtom } from '@nanostores/persistent';
import type { Cart } from '../types/Cart';

// Cart store with persistence to localStorage
export const cartStore = persistentAtom<Cart | null>('shopify-cart', null, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

// Cart items count for badge display
export const cartItemsCount = persistentAtom<number>('shopify-cart-count', 0, {
  encode: String,
  decode: Number,
});

// Is cart open state
export const isCartOpen = persistentAtom<boolean>('shopify-cart-open', false, {
  encode: String,
  decode: (value) => value === 'true',
});

export function openCart() {
  isCartOpen.set(true);
}

export function closeCart() {
  isCartOpen.set(false);
}

export function toggleCart() {
  isCartOpen.set(!isCartOpen.get());
}

export function setCart(cart: Cart | null) {
  cartStore.set(cart);
  if (cart) {
    cartItemsCount.set(cart.totalQuantity || 0);
  } else {
    cartItemsCount.set(0);
  }
}