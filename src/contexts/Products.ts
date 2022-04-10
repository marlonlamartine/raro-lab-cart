import axios from 'axios';
import { useState } from 'react';
import create from 'zustand';
import { ProductProps } from '../components/Product';

interface ProductInterface {
    products: ProductProps[],
    setProducts: () => void,
    setProductsInitial: (productsList: ProductProps[]) => void
}

export const useProductStore = create<ProductInterface>(set => ({
    products: [],
    setProducts: async () => {
        const response = await (await axios.get("http://localhost:3001/products")).data;
        response.map((product: ProductProps) => product.amount = 0)
        set({ products: response })
    },
    setProductsInitial: (productsList) => set({ products: productsList })
})
)




interface CartInterface {
    cart: ProductProps[],
    loadCart: (id: number, name: string, price: number, picture: string, amount: number) => void
}

/*export const useCartStore = create<CartInterface>((set) => ({
    cart: [],
    loadCart: (id, name, price, picture, amount) => {
        set(({ cart }) => {
            let canAdd = true;
            cart.forEach(products => {
                if (products.id === id) {
                    return canAdd = false;
                }
                if (canAdd) {
                    return {
                        cart: [...cart, { id, name, price, picture, amount }]
                    }
                }
                return { cart };
            })
        })
    }
}))*/

export const useCartStore = create<CartInterface>((set) => ({
    cart: [],
    loadCart: (id, name, price, picture, amount) => {
        set(({ cart }) => {
            let permission = true;
            cart.forEach(products => { if (products.id === id) permission = false });

            if (permission) {
                return { cart: [...cart, { id, name, price, picture, amount }] }
            }
            return { cart };
        })
    }
}))