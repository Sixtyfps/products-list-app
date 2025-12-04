"use server";

import { Product } from "@/components/shared/types";

export async function getProducts(): Promise<Product[] | null> {
    try {
        const res = await fetch(`https://fakestoreapi.com/products`, {
            cache: "no-store",
        });

        if (!res.ok) {
            console.error(`API returned error ${res.status}`);
            return null;
        }

        const text = await res.text();

        try {
            return JSON.parse(text);
        } catch {
            console.error("API returned non-JSON response:", text.slice(0, 200));
            return null;
        }
    } catch (error) {
        console.error("Failed to fetch product:", error);
        return null;
    }
}


// "use server";
//
// import {Product} from "@/components/shared/types";
//
// export async function getProducts(): Promise<Product[]> {
//     try {
//         const res = await fetch("https://fakestoreapi.com/products");
//         return await res.json();
//     } catch (error) {
//         console.error("Error fetching the products list from server", error);
//         throw new Error("Error during fetching the products list");
//     }
// }