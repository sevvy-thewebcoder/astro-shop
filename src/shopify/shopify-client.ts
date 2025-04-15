import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const client = createStorefrontApiClient({
  storeDomain: import.meta.env.SHOPIFY_STORE_URL,
  apiVersion: import.meta.env.SHOPIFY_STOREFRONT_API_VERSION,
  publicAccessToken: import.meta.env.SHOPIFY_STOREFRONT_API_TOKEN,
});

export default client;