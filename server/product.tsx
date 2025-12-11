"use server";

import {Product} from "@/components/shared/types";

export async function getProduct(id: number): Promise<Product | null> {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const text = await res.text();
        if (!text.trim()) return null;
        return JSON.parse(text);
    } catch (error) {
        console.error('Error fetching the product from server', error);
        throw new Error('Error during fetching the product');
    }
}