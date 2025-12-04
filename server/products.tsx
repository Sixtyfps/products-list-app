"use server";

import {Product} from "@/components/shared/types";

export async function getProducts(): Promise<Product[]> {
    try {
        const res = await fetch("https://fakestoreapi.com/products", {cache: "no-store"});
        return await res.json();
    } catch (error) {
        console.error("Error fetching the products list from server", error);
        throw new Error("Error during fetching the products list");
    }
}