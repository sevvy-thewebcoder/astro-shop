export interface Cart {
    id: string;
    checkoutUrl: string;
}

export interface CreateCartResponse {
    cartCreate: {
        cart: Cart;
    };
}