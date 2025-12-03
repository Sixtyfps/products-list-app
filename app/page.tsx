import {getProducts} from "@/server/products";
import ProductsFilter from "@/components/ui/products-filter";

export default async function Home() {

    const products = await getProducts();
    return (
        <main className="pt-5 py-5 flex flex-col gap-5 justify-center max-w-6xl mx-auto">
            <h1 className="flex justify-center font-bold">Products List</h1>
            <ProductsFilter products={products}/>
        </main>
    );
}
