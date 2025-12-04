"use server";

import {Product} from "@/components/shared/types";

export async function getProduct(id: number): Promise<Product> {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`, {cache: "no-store"});
        return await res.json();
    } catch (error) {
        console.error('Error fetching the product from server', error);
        throw new Error('Error during fetching the product');
    }
}
