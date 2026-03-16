import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Product } from '@/constants/types';
import { dummyCart } from '@/assets/assets';


export type  CartItem ={
    id: string;
    productId: string;
    product: Product;
    quantity: number;
    size: string;
    price: number;
}

type CartContextType={
    cartItems: CartItem[],
    addToCart: (product: Product, size: string) => Promise<void>;
    removeFromCart: (itemId: string, size: string) => Promise<void>;
    updateQuantity: (itemId: string, quantity: number, size: string) => Promise<void>;
    clearCart: () => Promise<void>;
    cartTotal: number;
    itemCount: number;
    isloading: boolean;

}


// Création du contexte
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider pour envelopper les composants
export function CartProvider({ children }: { children: ReactNode }) {
    
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isloading, setIsLoading] = useState(false);
    const [cartTotal, setCartTotal] = useState(0);

    
    const fecthCart = async () => {
        setIsLoading(true); 
        const serverCart = dummyCart;
        const mappedItems: CartItem[] = serverCart.items.map((item: any) => ({
            id: item.id,
            productId: item.productId,
            product: item.product,
            quantity: item.quantity,
            size: item.size || "M",
            price: item.price,
        }));

        setCartItems(mappedItems);
        setCartTotal(serverCart.totalAmount);
        setIsLoading(false);
    }
   
    const addToCart = async (product: Product, size: string) => {
      
    }

    const removeFromCart = async (productId: string, size: string) => {
      
    }

    const updateQuantity = async (productId: string, quantity: number, size: string = "M") => {
       
    }
 
    const clearCart = async () => {
       
    }

    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);


    useEffect(() => {
        fecthCart();
    }, [])

    
    return (
        <CartContext.Provider 
        value={{
             cartItems, addToCart, removeFromCart, updateQuantity, 
             clearCart, cartTotal, itemCount, isloading

        }}>
            {children}
        </CartContext.Provider>
    )
}

// Hook pour utiliser le contexte facilement
export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}