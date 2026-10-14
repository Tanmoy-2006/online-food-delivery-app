import northIndian from "../data/images/north indian.jpeg"
import cake from "../data/images/cake.jpeg";
import biryani from "../data/images/biryani.jpeg";
import pizza from "../data/images/piza.jpeg";
import desserts from "../data/images/desserts.jpeg";
import burger from "../data/images/burger.jpeg";
import south from "../data/images/south indian.jpeg";
import rolls from "../data/images/rolls.jpeg";
import pasta from "../data/images/pasta.jpeg";
import noodles from "../data/images/nodles.jpeg";
import salad from "../data/images/salad.jpeg";
import khichdi from "../data/images/khichdi.jpeg";
import idli from "../data/images/idli.jpeg";
import chole from "../data/images/chole bhature.jpeg";
import moton from "../data/images/motton biryani.jpeg";
import egg from "../data/images/egg.jpeg";
import cheese from "../data/images/cheess.jpeg";
import chickenPiza from "../data/images/chickenPiza.jpeg";
import cheesePiza from "../data/images/cheesePizza.jpeg";
import iceCream from "../data/images/iceCream.jpeg";
import chickenRice from "../data/images/chicken-rice.png";
import ChilliPaneer from "../data/images/ChilliPaneer.png";
import redSauce from "../data/images/redSauce.jpeg";



export const categories = [
  { id: "pizza", name: "Pizza", icon: "🍕", image: pizza, color: "#fff0e6" },
  { id: "burger", name: "Burger", icon: "🍔", image: burger, color: "#fff7d6" },
  { id: "biryani", name: "Biryani", icon: "🍛", image: biryani, color: "#ffe8d9" },
  { id: "chinese", name: "Chinese", icon: "🥡", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80", color: "#ffe5e5" },
  { id: "indian", name: "Indian", icon: "🍲", image: northIndian, color: "#fff0dc" },
  { id: "pasta", name: "Pasta", icon: "🍝", image: pasta, color: "#fff3dc" },
  { id: "rolls", name: "Rolls", icon: "🌯", image: rolls, color: "#e9f6e9" },
  { id: "healthy", name: "Healthy", icon: "🥗", image: salad, color: "#e6f5e9" },
  { id: "snacks", name: "Snacks", icon: "🧀", image: cheese, color: "#fff7d6" },
  { id: "dessert", name: "Dessert", icon: "🍰", image: desserts, color: "#fce8ff" },
  { id: "drinks", name: "Drinks", icon: "🥤", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80", color: "#e3f3ff" }
];

export const foods = [
  { id: 1, category: "pizza", name: "Margherita Pizza", price: 249, rating: 4.7, time: "25 min", emoji: "🍕", image: pizza, desc: "Classic cheese, tomato and basil pizza." },
  { id: 2, category: "pizza", name: "Chicken Tikka Pizza", price: 329, rating: 4.8, time: "30 min", emoji: "🍕", image: chickenPiza, desc: "Loaded with spicy chicken tikka and cheese." },
  { id: 3, category: "pizza", name: "Farmhouse Pizza", price: 299, rating: 4.6, time: "28 min", emoji: "🍕", image: cheesePiza, desc: "Fresh vegetables, herbs and mozzarella." },
  { id: 4, category: "burger", name: "Classic Chicken Burger", price: 199, rating: 4.6, time: "20 min", emoji: "🍔", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85", desc: "Crispy chicken, lettuce, cheese and sauce." },
  { id: 5, category: "burger", name: "Cheese Burger", price: 249, rating: 4.8, time: "22 min", emoji: "🍔", image: burger, desc: "Juicy patty with double cheese and onions." },
  { id: 6, category: "burger", name: "Veg Supreme Burger", price: 169, rating: 4.5, time: "18 min", emoji: "🍔", image: "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=900&q=85", desc: "Crunchy veggie patty with fresh salad." },
  { id: 7, category: "biryani", name: "Chicken Biryani", price: 229, rating: 4.9, time: "30 min", emoji: "🍛", image: biryani, desc: "Aromatic basmati rice with tender chicken." },
  { id: 9, category: "biryani", name: "Egg Biryani", price: 179, rating: 4.5, time: "25 min", emoji: "🍛", image:egg, desc: "Fragrant rice cooked with vegetables and spices." },
  { id: 8, category: "biryani", name: "Mutton Biryani", price: 319, rating: 4.9, time: "35 min", emoji: "🍛", image: moton, desc: "Rich dum biryani with succulent mutton." },
  { id: 10, category: "chinese", name: "Chicken Noodles", price: 189, rating: 4.5, time: "20 min", emoji: "🥡", image: noodles, desc: "Wok-tossed noodles with chicken and vegetables." },
  { id: 11, category: "chinese", name: "Chicken Fried Rice", price: 199, rating: 4.6, time: "22 min", emoji: "🍚", desc: "Smoky fried rice with chicken and vegetables.", image: chickenRice },
  { id: 12, category: "chinese", name: "Chilli Paneer", price: 179, rating: 4.4, time: "20 min", emoji: "🥢", desc: "Crispy paneer tossed in chilli garlic sauce.", image: ChilliPaneer },
  { id: 13, category: "dessert", name: "Chocolate Cake", price: 149, rating: 4.8, time: "15 min", emoji: "🍰", image: cake, desc: "Soft chocolate cake with rich chocolate cream." },
  { id: 14, category: "dessert", name: "Brownie", price: 119, rating: 4.7, time: "15 min", emoji: "🍫", image: desserts, desc: "Warm fudgy brownie with chocolate chunks." },
  { id: 15, category: "dessert", name: "Ice Cream Sundae", price: 139, rating: 4.6, time: "10 min", emoji: "🍨", image: iceCream, desc: "Vanilla ice cream, chocolate sauce and nuts." },
  { id: 16, category: "drinks", name: "Cold Coffee", price: 99, rating: 4.6, time: "10 min", emoji: "🥤", image: "https://images.unsplash.com/photo-1625126625143-4e7efb664206?auto=format&fit=crop&w=900&q=85", desc: "Creamy chilled coffee with a smooth finish." },
  { id: 17, category: "drinks", name: "Fresh Lime Soda", price: 79, rating: 4.5, time: "8 min", emoji: "🍋", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85", desc: "Refreshing lime soda, sweet or salty." },
  { id: 18, category: "drinks", name: "Mango Shake", price: 129, rating: 4.7, time: "10 min", emoji: "🥭", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=85", desc: "Thick creamy shake made with ripe mango." },
  { id: 19, category: "indian", name: "Masala Dosa", price: 159, rating: 4.7, time: "20 min", emoji: "🥞", image: south, desc: "Golden crisp dosa filled with spiced potato and served with chutneys." },
  { id: 20, category: "indian", name: "Idli Sambar", price: 99, rating: 4.6, time: "15 min", emoji: "🥣", image: idli, desc: "Soft steamed idlis served with warm sambar and coconut chutney." },
  { id: 21, category: "indian", name: "Chole Bhature", price: 169, rating: 4.8, time: "25 min", emoji: "🫓", image: chole, desc: "Fluffy bhature paired with hearty Punjabi chickpea curry." },
  { id: 22, category: "indian", name: "North Indian Thali", price: 249, rating: 4.7, time: "30 min", emoji: "🍱", image: northIndian, desc: "A satisfying spread of curry, dal, rice, bread and sides." },
  { id: 23, category: "rolls", name: "Paneer Kathi Roll", price: 179, rating: 4.6, time: "18 min", emoji: "🌯", image: rolls, desc: "Spiced paneer and crunchy vegetables wrapped in a flaky paratha." },
  { id: 24, category: "pasta", name: "Creamy Alfredo Pasta", price: 229, rating: 4.7, time: "25 min", emoji: "🍝", image: pasta, desc: "Creamy herb sauce tossed with pasta and parmesan." },
  { id: 25, category: "pasta", name: "Arrabbiata Pasta", price: 219, rating: 4.6, time: "25 min", emoji: "🍝", image: redSauce, desc: "Pasta tossed in a bright, mildly spicy tomato sauce." },
  { id: 26, category: "healthy", name: "Garden Fresh Salad", price: 149, rating: 4.5, time: "12 min", emoji: "🥗", image: salad, desc: "Crisp greens, seasonal vegetables and a light house dressing." },
  { id: 27, category: "healthy", name: "Moong Dal Khichdi", price: 139, rating: 4.6, time: "25 min", emoji: "🍲", image: khichdi, desc: "Comforting rice and lentils cooked with gentle spices." },
  { id: 28, category: "snacks", name: "Grilled Cheese Toastie", price: 129, rating: 4.5, time: "15 min", emoji: "🧀", image: cheese, desc: "Golden toasted bread filled with gooey melted cheese." }
];