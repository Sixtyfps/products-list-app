"use server";

import {Product} from "@/components/shared/types";

export async function getProducts(): Promise<Product[]> {
    const res = await fetch("https://fakestoreapi.com/products");
    return await res.json();
}