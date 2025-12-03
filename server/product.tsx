"use server";

import {Product} from "@/components/shared/types";

export async function getProduct(id: number): Promise<Product> {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    return await res.json();
}
