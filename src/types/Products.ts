export interface Product {
    id: string;
    title: string;
    handle: string;
    description: string;
    featuredImage: {
      url: string;
      width: number;
      height: number;
      altText: string;
    };
    variants: {
      nodes: {
        id: string;
        title: string;
        availableForSale: boolean;
        quantityAvailable: number;
        price: {
          amount: string;
          currencyCode: string;
        };
      }[];
    };
  }
  
  export interface ProductEdge {
    node: Product;
  }
  
  export interface ProductsResponse {
    products: {
      edges: ProductEdge[];
    }
  }