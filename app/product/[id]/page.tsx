import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allProducts } from '@/lib/products';
import ProductDetail from '@/components/ProductDetail';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface ProductPageProps {
    params: {
        id: string;
    };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const product = allProducts.find((p) => p.id === parseInt(params.id));

    if (!product) {
        return {
            title: 'Product Not Found',
        };
    }

    return {
        title: `${product.name} - Shoes Store X Afa`,
        description: product.description || `Buy ${product.name} at Shoes Store X Afa`,
    };
}

export default function ProductPage({ params }: ProductPageProps) {
    const product = allProducts.find((p) => p.id === parseInt(params.id));

    if (!product) {
        notFound();
    }

    return (
        <>
            <Header />
            <main className="product-page">
                <ProductDetail product={product} />
            </main>
            <Footer />
        </>
    );
}

// Generate static params for all products
export async function generateStaticParams() {
    return allProducts.map((product) => ({
        id: product.id.toString(),
    }));
}
