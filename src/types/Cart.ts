export interface CartCost {
  subtotalAmount: Money;
  totalAmount?: Money;
  totalTaxAmount?: Money;
}

export interface Money {
  amount: string;
  currencyCode: string;
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    image: {
      url: string;
      altText: string | null;
      width: number;
      height: number;
    };
    product: {
      handle: string;
      title: string;
    };
  };
  cost: {
    amountPerQuantity: Money;
    subtotalAmount: Money;
    totalAmount: Money;
  };
}

export interface Cart {
  id: string;
  totalQuantity: number;
  checkoutUrl: string;
  cost: CartCost;
  lines: {
    nodes: CartLine[];
  };
}

export interface CreateCartResponse {
  cartCreate: {
    cart: Cart;
    userErrors: {
      field: string;
      message: string;
    }[];
  };
}

export interface AddCartLinesResponse {
  cartLinesAdd: {
    cart: Cart;
    userErrors: {
      field: string;
      message: string;
    }[];
  };
}

export interface RemoveCartLinesResponse {
  cartLinesRemove: {
    cart: Cart;
    userErrors: {
      field: string;
      message: string;
    }[];
  };
}

export interface UpdateCartLinesResponse {
  cartLinesUpdate: {
    cart: Cart;
    userErrors: {
      field: string;
      message: string;
    }[];
  };
}

export interface GetCartResponse {
  cart: Cart;
}