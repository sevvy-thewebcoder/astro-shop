import { PRODUCT_FRAGMENT } from '../fragments/ProductFragment';

export const GET_PRODUCTS = `#graphql
  query ($first: Int!) {
      products(first: $first) {
        edges {
          node {
            ...productFragment
          }
        }
      }
  }
  ${PRODUCT_FRAGMENT}
`;

export const GET_PRODUCT_BY_HANDLE = `#graphql
  query ($handle: String!) {
    product(handle: $handle) {
      ...productFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const GET_PRODUCT_RECOMMENDATIONS = `#graphql
  query ($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...productFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`;