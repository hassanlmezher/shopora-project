import headphones from "../images/headphones.png";
import tShirt from "../images/t-shirt.png";
import shoes from "../images/shoes.png";
import tShirtTwo from "../images/t-shirt2.png";
import tShirtThree from "../images/t-shirt3.png";
import tShirtFour from "../images/t-shirt4.png";
import tShirtFive from "../images/t-shirt5.png";
import headphonesTwo from "../images/headphones2.png";
import headphonesThree from "../images/headphones3.png";
import headphonesFour from "../images/headphones4.png";
import headphonesFive from "../images/headphones5.png";
import shoesTwo from "../images/shoes2.png";
import shoesThree from "../images/shoes3.png";
import shoesFour from "../images/shoes4.png";
import shoesFive from "../images/shoes5.png";


export interface CatalogueReview {
    reviewer: string;
    rating: number;
    text: string;
}

export interface CatalogueItem {
    image: string;
    name: string;
    namee: string;
    price: string;
    priceValue: number;
    description: string;
    ratings: string;
    by: string;
    category: string;
    reviews: CatalogueReview[];
}

export const catalogue: CatalogueItem[] = [
    {
        image: headphones,
        name: "Wirless",
        namee: "Headphones",
        price: "$199",
        priceValue: 199,
        description: "A perfect balance of high-fidelity audio",
        ratings: "(123)",
        by: "Mhamad's shop",
        category: "Headphones",
        reviews: [
            { reviewer: "Robin Hood", rating: 5, text: "I really liked the headphones" },
            { reviewer: "Jane Doe", rating: 5, text: "A great headphones i strongly recommend it" },
            { reviewer: "John Smith", rating: 4, text: "Good sound quality, but a bit pricey" }
        ]
    },
    {
        image: headphonesTwo,
        name: "Echo",
        namee: "Noise Cancelling",
        price: "$229",
        priceValue: 229,
        description: "Hybrid ANC blocks city noise on commutes.",
        ratings: "(212)",
        by: "Mhamad's shop",
        category: "Headphones",
        reviews: [
            { reviewer: "Isla", rating: 5, text: "Silence on every flight!" },
            { reviewer: "Leo", rating: 4, text: "Cushions could be softer." }
        ]
    },
    {
        image: headphonesThree,
        name: "Pulse",
        namee: "Studio Pods",
        price: "$259",
        priceValue: 259,
        description: "Reference sound for creators and mixers.",
        ratings: "(88)",
        by: "Mhamad's shop",
        category: "Headphones",
        reviews: [
            { reviewer: "Nora", rating: 5, text: "Mixes sound identical on every speaker." }
        ]
    },
    {
        image: headphonesFour,
        name: "Drift",
        namee: "Travel Earbuds",
        price: "$149",
        priceValue: 149,
        description: "Pocket sized buds with week-long battery life.",
        ratings: "(301)",
        by: "Mhamad's shop",
        category: "Headphones",
        reviews: [
            { reviewer: "Owen", rating: 4, text: "Great value for long trips." }
        ]
    },
    {
        image: headphonesFive,
        name: "Nova",
        namee: "Gaming Headset",
        price: "$189",
        priceValue: 189,
        description: "Spatial audio + detachable mic for streamers.",
        ratings: "(190)",
        by: "Mhamad's shop",
        category: "Headphones",
        reviews: [
            { reviewer: "Pia", rating: 5, text: "Footsteps sound crystal clear." }
        ]
    },
    {
        image: tShirt,
        name: "Metalica",
        namee: "T-shirt",
        price: "$299",
        priceValue: 299,
        description: "A high quality clothes brand.",
        ratings: "(101)",
        by: "Hassan's shop",
        category: "Shirts",
        reviews: [
            { reviewer: "Alice", rating: 5, text: "Amazing quality and fit!" },
            { reviewer: "Bob", rating: 4, text: "Love the design, but runs a bit small" },
            { reviewer: "Charlie", rating: 5, text: "Best t-shirt I've ever owned" }
        ]
    },
    {
        image: tShirtTwo,
        name: "Cedar",
        namee: "Oversized Tee",
        price: "$249",
        priceValue: 249,
        description: "Organic cotton in a relaxed cut.",
        ratings: "(89)",
        by: "Hassan's shop",
        category: "Shirts",
        reviews: [
            { reviewer: "Rami", rating: 4, text: "Soft and breathable." }
        ]
    },
    {
        image: tShirtThree,
        name: "Sprint",
        namee: "Performance Tee",
        price: "$199",
        priceValue: 199,
        description: "Moisture wicking fabric for training days.",
        ratings: "(120)",
        by: "Hassan's shop",
        category: "Shirts",
        reviews: [
            { reviewer: "Sara", rating: 5, text: "Dries instantly after runs." }
        ]
    },
    {
        image: tShirtFour,
        name: "Muse",
        namee: "Graphic Tee",
        price: "$179",
        priceValue: 179,
        description: "Limited screen print celebrating local artists.",
        ratings: "(66)",
        by: "Hassan's shop",
        category: "Shirts",
        reviews: [
            { reviewer: "Theo", rating: 5, text: "Print hasn't faded at all." }
        ]
    },
    {
        image: tShirtFive,
        name: "Solstice",
        namee: "Ribbed Tee",
        price: "$209",
        priceValue: 209,
        description: "Textured knit with subtle stretch for layering.",
        ratings: "(45)",
        by: "Hassan's shop",
        category: "Shirts",
        reviews: [
            { reviewer: "Uma", rating: 4, text: "Color stays vibrant after washes." }
        ]
    },
    {
        image: shoes,
        name: "Travis",
        namee: "Nike shoes",
        price: "$399",
        priceValue: 399,
        description: "Crafted for comfort. Designed for confidence.",
        ratings: "(211)",
        by: "Dani's shop",
        category: "Shoes",
        reviews: [
            { reviewer: "Diana", rating: 5, text: "Super comfortable and stylish" },
            { reviewer: "Eve", rating: 4, text: "Great for running, but not for everyday wear" },
            { reviewer: "Frank", rating: 5, text: "Excellent craftsmanship and support" }
        ]
    },
    {
        image: shoesTwo,
        name: "Orbit",
        namee: "Trail Runner",
        price: "$359",
        priceValue: 359,
        description: "Aggressive grip plus waterproof upper.",
        ratings: "(134)",
        by: "Dani's shop",
        category: "Shoes",
        reviews: [
            { reviewer: "Val", rating: 5, text: "Held up on muddy hikes." }
        ]
    },
    {
        image: shoesThree,
        name: "Prime",
        namee: "Court Sneaker",
        price: "$279",
        priceValue: 279,
        description: "Vintage tennis silhouette with modern foam.",
        ratings: "(201)",
        by: "Dani's shop",
        category: "Shoes",
        reviews: [
            { reviewer: "Will", rating: 4, text: "Looks great with everything." }
        ]
    },
    {
        image: shoesFour,
        name: "Comet",
        namee: "Daily Trainer",
        price: "$219",
        priceValue: 219,
        description: "Featherweight cushioning for long city walks.",
        ratings: "(58)",
        by: "Dani's shop",
        category: "Shoes",
        reviews: [
            { reviewer: "Xena", rating: 5, text: "My feet never felt lighter." }
        ]
    },
    {
        image: shoesFive,
        name: "Volt",
        namee: "High-top",
        price: "$329",
        priceValue: 329,
        description: "Statement sneaker with contrast laces.",
        ratings: "(149)",
        by: "Dani's shop",
        category: "Shoes",
        reviews: [
            { reviewer: "Yara", rating: 4, text: "Breaks in after a day." }
        ]
    }
];
