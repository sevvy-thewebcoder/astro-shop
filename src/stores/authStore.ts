import { persistentAtom } from '@nanostores/persistent';

export interface Customer {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  accessToken: string;
}

// Authentication store with persistence to localStorage
export const customerStore = persistentAtom<Customer | null>('shopify-customer', null, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

// Authentication state
export const isAuthenticated = persistentAtom<boolean>('shopify-auth-state', false, {
  encode: String,
  decode: (value) => value === 'true',
});

export function setCustomer(customer: Customer | null) {
  customerStore.set(customer);
  isAuthenticated.set(!!customer);
}

export function clearCustomer() {
  customerStore.set(null);
  isAuthenticated.set(false);
}

// Session token access
export function getAccessToken(): string | null {
  const customer = customerStore.get();
  return customer?.accessToken || null;
}