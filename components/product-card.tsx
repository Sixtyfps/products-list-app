import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Product} from "@/components/shared/types";
import Image from 'next/image';
import {Badge} from "@/components/ui/badge";
import {Button} from "./ui/button";
import {ShoppingCart} from "lucide-react";
import Link from "next/link";

type ProductCardProps = {
    product: Product;
}

const ProductCard = ({product}: ProductCardProps) => {
    return (
        <Link href={`/${product.id}`}>

            <Card key={product.id} className="p-3 h-full flex flex-col">
                <CardHeader className="relative">
                    <Badge className="absolute top-0 left-2">{product.category}</Badge>
                    <Image
                        src={product.image}
                        width={300}
                        height={300}
                        alt={product.title}
                        className="w-full h-full object-cover"
                    />
                </CardHeader>
                <CardContent className="flex flex-col gap-3 flex-grow">
                    <CardTitle>{product.title}</CardTitle>
                    <div className="text-xl font-bold">€{product.price.toFixed(2)}</div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full cursor-pointer">Buy<ShoppingCart/></Button>
                </CardFooter>
            </Card>

        </Link>

    );
};

export default ProductCard;