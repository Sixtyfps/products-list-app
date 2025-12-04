import {getProducts} from "@/server/products";
import ProductsCatalog from "@/components/ui/products-catalog";

export default async function Home() {
    const products = await getProducts();

    if (!products) {
        return <p> Could not load products data. Please try again later</p>
    }
    return (
        <main className="pt-5 py-5 flex flex-col gap-5 justify-center max-w-6xl mx-auto">
            <h1 className="flex justify-center font-bold">Products List</h1>
            <ProductsCatalog products={products}/>
        </main>
    );
}
