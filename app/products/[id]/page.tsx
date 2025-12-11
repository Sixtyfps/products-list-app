import {getProduct} from "@/server/product";
import {Product} from "@/components/shared/types";
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
import Image from "next/image";
import {Badge} from "@/components/ui/badge";
import {notFound} from "next/navigation";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    const product: Product | null = await getProduct(Number(id));

    if (!product) {
        notFound()
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <Card className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 md:w-1/2 flex justify-center items-center">
                    <Image
                        width={300}
                        height={300}
                        src={product.image}
                        alt={product.title}
                        className="w-full max-w-sm object-contain"
                    />
                </div>
                <CardContent className="md:w-1/2 flex flex-col justify-between">
                    <CardHeader className="p-0">
                        <CardTitle className="text-2xl md:text-3xl">{product.title}</CardTitle>
                        <Badge className="mt-2">{product.category}</Badge>
                    </CardHeader>
                    <div className="mt-4 space-y-4">
                        <p className="text-lg font-semibold">€{product.price.toFixed(2)}</p>
                        <CardDescription>{product.description}</CardDescription>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
