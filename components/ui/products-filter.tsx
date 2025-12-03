"use client";

import {Input} from "@/components/ui/input";
import {Product} from "@/components/shared/types";
import {useState, useEffect} from "react";
import ProductCard from "@/components/product-card";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from "@/components/ui/pagination";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

type ProductsFilterProps = {
    products: Product[];
};

const ProductsFilter = ({products}: ProductsFilterProps) => {
    //Filtering state
    const [search, setSearch] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(products);
    //Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    //Pagination logic
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);


    const onPageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const onSelectChange = (value: string) => {
        setItemsPerPage(Number(value));
        setCurrentPage(1);
    }

    //Filtration with debounce
    useEffect(() => {
        const handler = setTimeout(() => {
            if (!search) {
                setFilteredProducts(products);
            } else {
                setFilteredProducts(
                    products.filter((p) =>
                        p.title.toLowerCase().includes(search.toLowerCase())
                    )
                );
            }
            //Reset the page during the new search
            setCurrentPage(1);
        }, 500);
        return () => clearTimeout(handler);
    }, [search, products]);

    return (
        <div className="flex flex-col gap-5">
            <Input
                placeholder="Search..."
                className="w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {currentProducts.length === 0 ? (
                <p className="text-center text-lg text-muted-foreground">Nothing found</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {currentProducts.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </div>
            )}

            {totalPages > 1 && (
                <div>
                    <div>
                        <Select
                            onValueChange={onSelectChange}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="8 Items per page"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="4">4</SelectItem>
                                <SelectItem value="8">8</SelectItem>
                                <SelectItem value="12">12</SelectItem>
                                <SelectItem value="16">16</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Pagination className="mt-4">
                            <PaginationPrevious className="cursor-pointer"
                                                onClick={() => onPageChange(currentPage - 1)}/>
                            <PaginationContent>
                                {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
                                    <PaginationItem className="cursor-pointer" key={page}>
                                        <PaginationLink
                                            isActive={page === currentPage}
                                            onClick={() => onPageChange(page)}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                            </PaginationContent>
                            <PaginationNext className="cursor-pointer" onClick={() => onPageChange(currentPage + 1)}/>
                        </Pagination>
                    </div>
                </div>


            )}
        </div>
    );
};

export default ProductsFilter;
