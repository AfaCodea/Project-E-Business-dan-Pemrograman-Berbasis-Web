export interface Product {
    id: number
    name: string
    category: "Men" | "Women" | "Sports"
    price: number
    rating: number
    image: string
    description?: string
    images?: string[]
    sizes?: number[]
    specifications?: {
        material?: string
        color?: string
        weight?: string
        sole?: string
        style?: string
    }
    inStock?: boolean
    detailedDescription?: string
    isNew?: boolean
}


export const allProducts: Product[] = [
    // Men's Products
    {
        id: 1,
        name: "Classic White Sneakers",
        category: "Men",
        price: 1290000,
        rating: 5,
        image: "/images/men/men1.png",
        description: "Timeless white sneakers perfect for any casual outfit",
        images: ["/images/men/men1.png", "/images/men/men1.png", "/images/men/men1.png"],
        sizes: [7, 8, 9, 10, 11, 12],
        specifications: {
            material: "Premium Leather & Canvas",
            color: "Classic White",
            weight: "350g per shoe",
            sole: "Rubber with Air Cushioning",
            style: "Casual Sneakers"
        },
        inStock: true,
        detailedDescription: "Step into timeless style with our Classic White Sneakers. Crafted from premium leather and canvas, these versatile sneakers feature a clean, minimalist design that pairs perfectly with any casual outfit. The rubber sole with air cushioning provides all-day comfort, while the classic white colorway ensures these shoes will never go out of style.",
        isNew: true
    },
    {
        id: 2,
        name: "Premium Leather Boots",
        category: "Men",
        price: 1990000,
        rating: 5,
        image: "/images/men/men2.png",
        description: "Handcrafted leather boots for the modern gentleman",
        images: ["/images/men/men2.png", "/images/men/men2.png", "/images/men/men2.png"],
        sizes: [7, 8, 9, 10, 11, 12],
        specifications: {
            material: "Full-Grain Leather",
            color: "Rich Brown",
            weight: "580g per boot",
            sole: "Durable Rubber Outsole",
            style: "Chelsea Boots"
        },
        inStock: true,
        detailedDescription: "Elevate your style with our Premium Leather Boots. Handcrafted from full-grain leather, these boots feature a sophisticated design that's perfect for the modern gentleman. The durable rubber outsole provides excellent traction, while the rich brown color adds a touch of elegance to any outfit."
    },
    {
        id: 5,
        name: "Urban Street Sneakers",
        category: "Men",
        price: 1190000,
        rating: 5,
        image: "/images/men/men3.png",
        description: "Street-style sneakers with superior comfort",
        images: ["/images/men/men3.png", "/images/men/men3.png", "/images/men/men3.png"],
        sizes: [7, 8, 9, 10, 11, 12],
        specifications: {
            material: "Mesh & Synthetic Leather",
            color: "Black & White",
            weight: "320g per shoe",
            sole: "EVA Foam Cushioning",
            style: "Urban Streetwear"
        },
        inStock: true,
        detailedDescription: "Make a statement with our Urban Street Sneakers. Designed for the modern urbanite, these sneakers combine street-style aesthetics with superior comfort. The breathable mesh upper keeps your feet cool, while the EVA foam cushioning provides exceptional support for all-day wear.",
        isNew: true
    },
    {
        id: 6,
        name: "Elegant Dress Boots",
        category: "Men",
        price: 2190000,
        rating: 5,
        image: "/images/men/men4.png",
        description: "Sophisticated boots for formal occasions"
    },
    {
        id: 9,
        name: "Casual Men's Loafers",
        category: "Men",
        price: 1490000,
        rating: 5,
        image: "/images/men/men5.png",
        description: "Comfortable loafers for everyday wear"
    },
    {
        id: 10,
        name: "Formal Men's Oxford",
        category: "Men",
        price: 1890000,
        rating: 5,
        image: "/images/men/men6.png",
        description: "Classic oxford shoes for business attire"
    },
    // Women's Products
    {
        id: 3,
        name: "Fashionable Women Shoes",
        category: "Women",
        price: 890000,
        rating: 5,
        image: "/images/women/women1.png",
        description: "Trendy and comfortable shoes for everyday style",
        isNew: true
    },
    {
        id: 7,
        name: "Stylish Women Heels",
        category: "Women",
        price: 990000,
        rating: 5,
        image: "/images/women/women2.png",
        description: "Elegant heels that combine style and comfort"
    },
    {
        id: 11,
        name: "Elegant Women Boots",
        category: "Women",
        price: 1390000,
        rating: 5,
        image: "/images/women/women3.png",
        description: "Fashionable boots perfect for any season"
    },
    {
        id: 12,
        name: "Comfort Women Flats",
        category: "Women",
        price: 790000,
        rating: 5,
        image: "/images/women/women4.png",
        description: "All-day comfort in stylish flat shoes"
    },
    {
        id: 13,
        name: "Designer Women Sandals",
        category: "Women",
        price: 1090000,
        rating: 5,
        image: "/images/women/women5.png",
        description: "Premium sandals with designer aesthetics",
        isNew: true
    },
    // Sports Products
    {
        id: 4,
        name: "Running Sport Shoes",
        category: "Sports",
        price: 1490000,
        rating: 5,
        image: "/images/sports/sports1.png",
        description: "High-performance running shoes for athletes",
        isNew: true
    },
    {
        id: 8,
        name: "Professional Athletic Shoes",
        category: "Sports",
        price: 1590000,
        rating: 5,
        image: "/images/sports/sports2.png",
        description: "Professional-grade athletic footwear"
    },
    {
        id: 14,
        name: "Training Sports Shoes",
        category: "Sports",
        price: 1390000,
        rating: 5,
        image: "/images/sports/sports3.png",
        description: "Versatile training shoes for all workouts",
        isNew: true
    },
    {
        id: 15,
        name: "Basketball Sports Shoes",
        category: "Sports",
        price: 1690000,
        rating: 5,
        image: "/images/sports/sports4.png",
        description: "High-top basketball shoes with ankle support"
    },
]
