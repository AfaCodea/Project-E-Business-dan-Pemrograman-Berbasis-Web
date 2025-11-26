export interface Product {
    id: number
    name: string
    category: "Men" | "Women" | "Sports"
    price: number
    rating: number
    image: string
    description?: string
}

export const allProducts: Product[] = [
    // Men's Products
    {
        id: 1,
        name: "Classic White Sneakers",
        category: "Men",
        price: 129,
        rating: 5,
        image: "/images/men/men1.png",
        description: "Timeless white sneakers perfect for any casual outfit"
    },
    {
        id: 2,
        name: "Premium Leather Boots",
        category: "Men",
        price: 199,
        rating: 5,
        image: "/images/men/men2.png",
        description: "Handcrafted leather boots for the modern gentleman"
    },
    {
        id: 5,
        name: "Urban Street Sneakers",
        category: "Men",
        price: 119,
        rating: 5,
        image: "/images/men/men3.png",
        description: "Street-style sneakers with superior comfort"
    },
    {
        id: 6,
        name: "Elegant Dress Boots",
        category: "Men",
        price: 219,
        rating: 5,
        image: "/images/men/men4.png",
        description: "Sophisticated boots for formal occasions"
    },
    {
        id: 9,
        name: "Casual Men's Loafers",
        category: "Men",
        price: 149,
        rating: 5,
        image: "/images/men/men5.png",
        description: "Comfortable loafers for everyday wear"
    },
    {
        id: 10,
        name: "Formal Men's Oxford",
        category: "Men",
        price: 189,
        rating: 5,
        image: "/images/men/men6.png",
        description: "Classic oxford shoes for business attire"
    },
    // Women's Products
    {
        id: 3,
        name: "Fashionable Women Shoes",
        category: "Women",
        price: 89,
        rating: 5,
        image: "/images/women/women1.png",
        description: "Trendy and comfortable shoes for everyday style"
    },
    {
        id: 7,
        name: "Stylish Women Heels",
        category: "Women",
        price: 99,
        rating: 5,
        image: "/images/women/women2.png",
        description: "Elegant heels that combine style and comfort"
    },
    {
        id: 11,
        name: "Elegant Women Boots",
        category: "Women",
        price: 139,
        rating: 5,
        image: "/images/women/women3.png",
        description: "Fashionable boots perfect for any season"
    },
    {
        id: 12,
        name: "Comfort Women Flats",
        category: "Women",
        price: 79,
        rating: 5,
        image: "/images/women/women4.png",
        description: "All-day comfort in stylish flat shoes"
    },
    {
        id: 13,
        name: "Designer Women Sandals",
        category: "Women",
        price: 109,
        rating: 5,
        image: "/images/women/women5.png",
        description: "Premium sandals with designer aesthetics"
    },
    // Sports Products
    {
        id: 4,
        name: "Running Sport Shoes",
        category: "Sports",
        price: 149,
        rating: 5,
        image: "/images/sports/sports1.png",
        description: "High-performance running shoes for athletes"
    },
    {
        id: 8,
        name: "Professional Athletic Shoes",
        category: "Sports",
        price: 159,
        rating: 5,
        image: "/images/sports/sports2.png",
        description: "Professional-grade athletic footwear"
    },
    {
        id: 14,
        name: "Training Sports Shoes",
        category: "Sports",
        price: 139,
        rating: 5,
        image: "/images/sports/sports3.png",
        description: "Versatile training shoes for all workouts"
    },
    {
        id: 15,
        name: "Basketball Sports Shoes",
        category: "Sports",
        price: 169,
        rating: 5,
        image: "/images/sports/sports4.png",
        description: "High-top basketball shoes with ankle support"
    },
]
