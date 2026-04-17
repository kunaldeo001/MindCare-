export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  rating?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  costForTwo: number;
  image: string;
  description: string;
  menu: MenuItem[];
}

export const CATEGORIES = [
  { name: "Biryani", imageId: "cuisine-biryani" },
  { name: "Pizza", imageId: "cuisine-pizza" },
  { name: "Burgers", imageId: "cuisine-burgers" },
  { name: "North Indian", imageId: "cuisine-north-indian" },
  { name: "Chinese", imageId: "cuisine-chinese" },
  { name: "Desserts", imageId: "cuisine-desserts" },
  { name: "Healthy Food", imageId: "cuisine-healthy" },
  { name: "South Indian", imageId: "cuisine-south-indian" },
  { name: "Japanese", imageId: "cuisine-japanese" },
  { name: "Thai", imageId: "cuisine-thai" },
  { name: "Mexican", imageId: "cuisine-mexican" },
  { name: "Middle Eastern", imageId: "cuisine-middle-eastern" }
];

export const RESTAURANTS: Restaurant[] = [
  {
    id: "r1",
    name: "Biryani Blues",
    cuisine: "North Indian, Biryani",
    rating: 4.3,
    deliveryTime: "30-35 min",
    costForTwo: 500,
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80",
    description: "Authentic Hyderabadi biryanis and North Indian delights.",
    menu: [
      { id: "m1", name: "Hyderabadi Chicken Biryani", description: "Long grain basmati rice cooked with succulent chicken and spices.", price: 320, image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80", category: "Biryani", isVeg: false, rating: true },
      { id: "m2", name: "Paneer Tikka", description: "Grilled cottage cheese cubes marinated in yogurt and spices.", price: 240, image: "https://images.unsplash.com/photo-1599487405705-817812239f50?auto=format&fit=crop&w=800&q=80", category: "Starters", isVeg: true },
      { id: "m3", name: "Butter Chicken", description: "Classic creamy tomato-based chicken curry.", price: 350, image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80", category: "Main Course", isVeg: false }
    ]
  },
  {
    id: "r2",
    name: "Pizza Paradise",
    cuisine: "Italian, Pizzas",
    rating: 4.5,
    deliveryTime: "25-30 min",
    costForTwo: 600,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    description: "Hand-tossed pizzas with the freshest ingredients.",
    menu: [
      { id: "m4", name: "Margherita Pizza", description: "Classic tomato sauce, mozzarella, and fresh basil.", price: 299, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80", category: "Pizza", isVeg: true, rating: true },
      { id: "m5", name: "Pepperoni Feast", description: "Loaded with pork pepperoni and extra cheese.", price: 499, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80", category: "Pizza", isVeg: false },
      { id: "m6", name: "Garlic Breadsticks", description: "Freshly baked bread with garlic butter.", price: 149, image: "https://images.unsplash.com/photo-1619881589664-013662747596?auto=format&fit=crop&w=800&q=80", category: "Sides", isVeg: true }
    ]
  },
  {
    id: "r3",
    name: "Green Wok",
    cuisine: "Chinese, Asian",
    rating: 4.1,
    deliveryTime: "35-40 min",
    costForTwo: 450,
    image: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80",
    description: "Fusion Chinese food with a healthy twist.",
    menu: [
      { id: "m7", name: "Veg Hakka Noodles", description: "Stir-fried noodles with crisp vegetables.", price: 180, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80", category: "Main Course", isVeg: true, rating: true },
      { id: "m8", name: "Chicken Manchurian", description: "Spicy and tangy chicken balls in gravy.", price: 260, image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80", category: "Starters", isVeg: false }
    ]
  },
  {
    id: "r4",
    name: "Burger King",
    cuisine: "Burgers, American",
    rating: 4.2,
    deliveryTime: "20-25 min",
    costForTwo: 400,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    description: "Flame-grilled burgers and crispy fries.",
    menu: [
      { id: "m9", name: "Whopper", description: "A quarter-pound of flame-grilled beef.", price: 199, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80", category: "Burgers", isVeg: false, rating: true },
      { id: "m10", name: "Veggie Burger", description: "Crispy vegetable patty with fresh lettuce.", price: 149, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80", category: "Burgers", isVeg: true }
    ]
  },
  {
    id: "r5",
    name: "Dosa Delight",
    cuisine: "South Indian",
    rating: 4.4,
    deliveryTime: "25-30 min",
    costForTwo: 300,
    image: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?auto=format&fit=crop&w=800&q=80",
    description: "Crispy dosas and fluffy idlis with authentic chutneys.",
    menu: [
      { id: "m11", name: "Masala Dosa", description: "Crispy rice crepe filled with spiced potato mash.", price: 160, image: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?auto=format&fit=crop&w=800&q=80", category: "Main Course", isVeg: true, rating: true },
      { id: "m12", name: "Idli Sambhar", description: "Steamed rice cakes served with lentil stew and coconut chutney.", price: 120, image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", category: "Main Course", isVeg: true }
    ]
  },
  {
    id: "r6",
    name: "The Sweet Spot",
    cuisine: "Desserts, Bakery",
    rating: 4.7,
    deliveryTime: "15-20 min",
    costForTwo: 350,
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80",
    description: "Satisfy your sweet tooth with our fresh bakes.",
    menu: [
      { id: "m13", name: "Chocolate Lava Cake", description: "Warm chocolate cake with a gooey molten center.", price: 180, image: "https://images.unsplash.com/photo-1606313564200-e75d5e5da438?auto=format&fit=crop&w=800&q=80", category: "Desserts", isVeg: true, rating: true }
    ]
  },
  {
    id: "r7",
    name: "Healthy Bowls",
    cuisine: "Healthy Food, Salads",
    rating: 4.6,
    deliveryTime: "30-35 min",
    costForTwo: 550,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    description: "Fresh, nutritious, and delicious bowls for a better you.",
    menu: [
      { id: "m14", name: "Avocado Quinoa Salad", description: "Fresh greens with avocado, quinoa, and lemon dressing.", price: 340, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80", category: "Salads", isVeg: true, rating: true }
    ]
  },
  {
    id: "r8",
    name: "The Curry House",
    cuisine: "North Indian",
    rating: 4.0,
    deliveryTime: "40-45 min",
    costForTwo: 450,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
    description: "Home-style Indian curries and fragrant basmati rice.",
    menu: [
      { id: "m15", name: "Kadai Paneer", description: "Paneer cooked in a spicy gravy with bell peppers.", price: 280, image: "https://images.unsplash.com/photo-1631452180519-c014dfaa7802?auto=format&fit=crop&w=800&q=80", category: "Main Course", isVeg: true, rating: true }
    ]
  },
  {
    id: "r9",
    name: "Pasta Palace",
    cuisine: "Italian, Pasta",
    rating: 4.3,
    deliveryTime: "25-30 min",
    costForTwo: 700,
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
    description: "Authentic Italian pastas and creamy sauces.",
    menu: [
      { id: "m16", name: "Penne Alfredo", description: "Penne pasta in a rich and creamy white sauce.", price: 399, image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=800&q=80", category: "Pasta", isVeg: true, rating: true }
    ]
  },
  {
    id: "r10",
    name: "Sakura Sushi",
    cuisine: "Japanese, Sushi",
    rating: 4.8,
    deliveryTime: "35-40 min",
    costForTwo: 900,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
    description: "Authentic sushi rolls and soulful ramen bowls.",
    menu: [
      { id: "m17", name: "Spicy Tuna Roll", description: "Fresh tuna with spicy mayo and cucumber.", price: 450, image: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=400&q=80", category: "Sushi", isVeg: false, rating: true },
      { id: "m18", name: "Miso Ramen", description: "Rich miso broth with chashu pork and noodles.", price: 550, image: "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?auto=format&fit=crop&w=400&q=80", category: "Mains", isVeg: false }
    ]
  },
  {
    id: "r11",
    name: "Taco Fiesta",
    cuisine: "Mexican, Tacos",
    rating: 4.4,
    deliveryTime: "20-25 min",
    costForTwo: 500,
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=800&q=80",
    description: "Vibrant Mexican flavors with handmade tortillas.",
    menu: [
      { id: "m19", name: "Chicken Fajita Tacos", description: "Grilled chicken layered with peppers and onions.", price: 280, image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=400&q=80", category: "Tacos", isVeg: false, rating: true },
      { id: "m20", name: "Loaded Nachos", description: "Crispy chips topped with cheese, jalapenos, and salsa.", price: 320, image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=400&q=80", category: "Sides", isVeg: true }
    ]
  },
  {
    id: "r12",
    name: "Bangkok Bites",
    cuisine: "Thai, Asian",
    rating: 4.6,
    deliveryTime: "30-35 min",
    costForTwo: 650,
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=800&q=80",
    description: "Spicy, sour, sweet, and salty traditional Thai dishes.",
    menu: [
      { id: "m21", name: "Pad Thai", description: "Classic stir-fried rice noodles with peanuts and tofu.", price: 350, image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=400&q=80", category: "Mains", isVeg: true, rating: true },
      { id: "m22", name: "Tom Yum Soup", description: "Hot and sour aromatic broth with shrimp.", price: 290, image: "https://images.unsplash.com/photo-1548943487-a2e4142f4cce?auto=format&fit=crop&w=400&q=80", category: "Starters", isVeg: false }
    ]
  },
  {
    id: "r13",
    name: "Oasis Shawarma",
    cuisine: "Middle Eastern, Lebanese",
    rating: 4.5,
    deliveryTime: "25-30 min",
    costForTwo: 450,
    image: "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?auto=format&fit=crop&w=800&q=80",
    description: "Authentic shawarmas, falafels, and creamy hummus.",
    menu: [
      { id: "m23", name: "Classic Chicken Shawarma", description: "Spiced grilled chicken wrapped in warm pita.", price: 220, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=400&q=80", category: "Wraps", isVeg: false, rating: true },
    ]
  }
];
