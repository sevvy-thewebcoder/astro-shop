import client from './shopify-client';
import { 
  CUSTOMER_CREATE, 
  CUSTOMER_ACCESS_TOKEN_CREATE, 
  CUSTOMER_ACCESS_TOKEN_DELETE 
} from '../graphql/mutations/CustomerMutations';
import { GET_CUSTOMER } from '../graphql/queries/CustomerQueries';
import type { 
  CustomerCreateInput, 
  CustomerCreateResponse, 
  CustomerAccessTokenCreateResponse,
  CustomerAccessTokenDeleteResponse,
  CustomerResponse
} from '../types/Customer';
import { setCustomer, clearCustomer } from '../stores/authStore';

// Create a new customer account
export async function createCustomer(input: CustomerCreateInput) {
  const { data, errors } = await client.request(CUSTOMER_CREATE, {
    variables: { input }
  });

  if (errors) {
    console.error('Shopify API errors:', errors);
    throw new Error('Failed to create customer account');
  }

  const response = data as CustomerCreateResponse;
  
  if (response.customerCreate.customerUserErrors.length > 0) {
    throw new Error(response.customerCreate.customerUserErrors[0].message);
  }
  
  return response.customerCreate.customer;
}

// Login - create access token
export async function login(email: string, password: string) {
  const { data, errors } = await client.request(CUSTOMER_ACCESS_TOKEN_CREATE, {
    variables: { 
      input: { 
        email, 
        password 
      } 
    }
  });

  if (errors) {
    console.error('Shopify API errors:', errors);
    throw new Error('Failed to login');
  }

  const response = data as CustomerAccessTokenCreateResponse;
  
  if (response.customerAccessTokenCreate.customerUserErrors.length > 0) {
    throw new Error(response.customerAccessTokenCreate.customerUserErrors[0].message);
  }
  
  const token = response.customerAccessTokenCreate.customerAccessToken;
  
  if (!token) {
    throw new Error('Failed to retrieve access token');
  }
  
  // Get customer details with the token
  const customer = await getCustomer(token.accessToken);
  
  // Save customer info with token
  setCustomer({
    ...customer,
    accessToken: token.accessToken
  });
  
  return {
    customer,
    token
  };
}

// Logout - delete access token
export async function logout(accessToken: string) {
  const { data, errors } = await client.request(CUSTOMER_ACCESS_TOKEN_DELETE, {
    variables: { 
      customerAccessToken: accessToken 
    }
  });

  if (errors) {
    console.error('Shopify API errors:', errors);
    throw new Error('Failed to logout');
  }

  const response = data as CustomerAccessTokenDeleteResponse;
  
  // Clear customer from store regardless of API response
  clearCustomer();
  
  return response.customerAccessTokenDelete;
}

// Get customer information
export async function getCustomer(accessToken: string) {
  const { data, errors } = await client.request(GET_CUSTOMER, {
    variables: { 
      customerAccessToken: accessToken 
    }
  });

  if (errors) {
    console.error('Shopify API errors:', errors);
    throw new Error('Failed to fetch customer information');
  }

  const response = data as CustomerResponse;
  
  return response.customer;
}