export const CART_FRAGMENT = `#graphql
    fragment cartFragment on Cart {
        id
        totalQuantity
        checkoutUrl
        cost {
            subtotalAmount {
                amount
                currencyCode
            }
        }
        lines(first: 100) {
            nodes {
                id
                quantity
                merchandise {
                    ...on ProductVariant {
                        id
                        title
                        image {
                            url
                            altText
                            width
                            height
                        }
                        product {
                            handle
                            title
                        }
                    }
                }
                cost {
                    amountPerQuantity{
                        amount
                        currencyCode
                    }
                    subtotalAmount {
                        amount
                        currencyCode
                    }
                    totalAmount {
                        amount
                        currencyCode
                    }
                }
            }
        }
    }
`;