interface ImportMetaEnv {
    readonly SHOPIFY_STORE_URL: string;
    readonly SHOPIFY_STOREFRONT_API_TOKEN: string;
    readonly SHOPIFY_STOREFRONT_API_VERSION: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }