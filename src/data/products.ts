export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  sizes?: string[];
  colors?: string[];
  badge?: string;
}
import BagImg1 from '../assets/bag1.jpg'
import BagImg2 from '../assets/bag2.jpg'
import BagImg3 from '../assets/bag3.jpg'
import AccessImg1 from '../assets/Access1.jpg'
import AccessImg2 from '../assets/Access2.jpg'
import AccessImg3 from '../assets/Access3.jpg'
import AccessImg4 from '../assets/Access4.jpg'
import Cloth1 from '../assets/clothing1.jpg'
import Cloth2 from '../assets/clothing2.jpg'
import Cloth3 from '../assets/clothing3.jpg'
import Shoe1 from '../assets/shoe1.jpg'
import Shoe2 from '../assets/shoe2.jpg'
import Shoe3 from '../assets/shoe3.jpg'


export const products: Product[] = [

  {
    id: 1,
    name: "Tailored Wool Blazer",
    price: 329,
    originalPrice: 399,
    image: Cloth1,
    category: "Clothing",
    description: "Expertly tailored from premium wool, this blazer offers timeless sophistication.",
    sizes: ["S", "M", "L"],
    colors: ["Black", "Charcoal", "Navy"],
    badge: "New",
  },
  {
    id: 2,
    name: "Silk Satin Shirt",
    price: 179,
    originalPrice: 229,
    image: Cloth2,
    category: "Clothing",
    description: "Crafted from pure silk satin, blending elegance with comfort.",
    sizes: ["S", "M", "L"],
    colors: ["Ivory", "Champagne", "Blush"],
    badge: "Sale",
  },
  {
    id: 3,
    name: "Cashmere Knit Dress",
    price: 299,
    originalPrice: 369,
    image: Cloth3,
    category: "Clothing",
    description: "Soft cashmere construction delivers warmth and refined style.",
    sizes: ["S", "M", "L"],
    colors: ["Beige", "Mocha", "Grey"],
  },
  {
    id: 4,
    name: "Classic Leather Tote",
    price: 189,
    originalPrice: 249,
    image: BagImg1,
    category: "Bags",
    description: "Handcrafted from premium Italian leather with timeless elegance.",
    sizes: ["S", "M", "L"],
    colors: ["Black", "Tan", "Burgundy"],
    badge: "Sale",
  },
  {
    id: 5,
    name: "Structured Mini Handbag",
    price: 259,
    originalPrice: 319,
    image: BagImg2,
    category: "Bags",
    description: "A modern structured silhouette for elevated everyday style.",
    sizes: ["S"],
    colors: ["Black", "Emerald", "Ivory"],
    badge: "New",
  },
  {
    id: 6,
    name: "Luxury Crossbody Bag",
    price: 219,
    originalPrice: 279,
    image: BagImg3,
    category: "Bags",
    description: "Minimal and refined for effortless dressing.",
    sizes: ["S"],
    colors: ["Cognac", "Black", "Stone"],
  },
  {
    id: 7,
    name: "Leather Pointed Heels",
    price: 249,
    originalPrice: 299,
    image: Shoe1,
    category: "Shoes",
    description: "Fine leather heels crafted for modern elegance.",
    sizes: ["36", "37", "38", "39"],
    colors: ["Black", "Nude", "Red"],
    badge: "Best Seller",
  },
  {
    id: 8,
    name: "Minimal Leather Sneakers",
    price: 199,
    originalPrice: 249,
    image: Shoe2,
    category: "Shoes",
    description: "Clean, modern sneakers designed for comfort.",
    sizes: ["40", "41", "42", "43"],
    colors: ["White", "Beige", "Grey"],
  },
  {
    id: 9,
    name: "Suede Ankle Boots",
    price: 289,
    originalPrice: 349,
    image: Shoe3,
    category: "Shoes",
    description: "Luxurious suede boots with refined craftsmanship.",
    sizes: ["36", "37", "38", "39"],
    colors: ["Tan", "Black", "Mocha"],
    badge: "New",
  },
  {
    id: 10,
    name: "Gold Minimal Bracelet",
    price: 129,
    originalPrice: 169,
    image: AccessImg1,
    category: "Accessories",
    description: "Timeless gold bracelet with understated elegance.",
    sizes: ["One Size"],
    colors: ["Gold"],
  },
  {
    id: 11,
    name: "Luxury ",
    price: 149,
    originalPrice: 189,
    image: AccessImg2,
    category: "Accessories",
    description: "Pure silk scarf with timeless versatility.",
    sizes: ["One Size"],
    colors: ["Ivory", "Navy", "Blush"],
    badge: "Sale",
  },
  {
    id: 13,
    name: "Diamond Stud Earrings",
    price: 349,
    originalPrice: 429,
    image: AccessImg3,
    category: "Accessories",
    description: "Elegant diamond studs for timeless style.",
    sizes: ["One Size"],
    colors: ["Silver", "Gold"],
    badge: "Best Seller",
  },
  {
    id: 14,
    name: "Premium Watch",
    price: 499,
    originalPrice: 599,
    image: AccessImg4,
    category: "Accessories",
    description: "A refined timepiece blending heritage and luxury.",
    sizes: ["One Size"],
    colors: ["Black", "Silver"],
  },
];


export const categories = ["All", "Clothing", "Bags", "Shoes", "Accessories"];
