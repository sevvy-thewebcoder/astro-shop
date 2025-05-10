export interface CustomerAccessToken {
  accessToken: string;
  expiresAt: string;
}

export interface Customer {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
}

export interface CustomerCreateInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  acceptsMarketing?: boolean;
}

export interface CustomerCreateResponse {
  customerCreate: {
    customer: Customer | null;
    customerUserErrors: {
      code: string;
      field: string[];
      message: string;
    }[];
  };
}

export interface CustomerAccessTokenCreateResponse {
  customerAccessTokenCreate: {
    customerAccessToken: CustomerAccessToken | null;
    customerUserErrors: {
      code: string;
      field: string[];
      message: string;
    }[];
  };
}

export interface CustomerAccessTokenDeleteResponse {
  customerAccessTokenDelete: {
    deletedAccessToken: string | null;
    deletedCustomerAccessTokenId: string | null;
    userErrors: {
      field: string[];
      message: string;
    }[];
  };
}

export interface CustomerResponse {
  customer: Customer;
}