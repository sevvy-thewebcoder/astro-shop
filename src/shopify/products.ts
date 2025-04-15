import client from './shopify-client';
import { GET_PRODUCTS, GET_PRODUCT_BY_HANDLE } from '../graphql/queries/ProductsQueries';
import type { Product, ProductsResponse } from '../types/Products';

export async function getProducts(): Promise<Product[]> {
    const { data, errors } = await client.request<ProductsResponse>(GET_PRODUCTS, {
      variables: {
        first: 10,
      }
    })

    if (errors) {
      throw new Error(errors.message);
    }

    return data?.products.edges.map(edge => edge.node) || [];
}

export async function getProductByHandle(handle: string | undefined): Promise<Product> {
    const {data} = await client.request(GET_PRODUCT_BY_HANDLE, {
        variables: {
          handle
        },
    });
  return data.product;
}