import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Place from './models/Place.js';

dotenv.config();

const places = [
  {
    name: "Kedarnath Temple",
    description: "One of the twelve Jyotirlingas of Lord Shiva, Kedarnath is nestled in the majestic Himalayas and is a sacred pilgrimage site.",
    price: 5000,
    offer: 10,
    discountedPrice: 4500,
    image: "https://images.unsplash.com/photo-1628064980478-7dd7ef17e76b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    location: "Kedarnath, Uttarakhand",
    duration: "5 days"
  },
  {
    name: "Badrinath Temple",
    description: "Dedicated to Lord Vishnu, Badrinath Temple is one of the Char Dham shrines and a must-visit for spiritual seekers.",
    price: 4800,
    offer: 15,
    discountedPrice: 4080,
    image: "https://images.unsplash.com/photo-1603264044682-43a577c6cdb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    location: "Badrinath, Uttarakhand",
    duration: "4 days"
  },
  {
    name: "Gangotri Temple",
    description: "Located on the banks of River Bhagirathi, Gangotri Temple is dedicated to Goddess Ganga, marking the origin of the holy river.",
    price: 4000,
    offer: 20,
    discountedPrice: 3200,
    image: "https://images.unsplash.com/photo-1627038682066-40e1a3e3d54d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    location: "Gangotri, Uttarakhand",
    duration: "3 days"
  },
  {
    name: "Yamunotri Temple",
    description: "The source of the sacred Yamuna River, this temple is surrounded by breathtaking mountains and glaciers.",
    price: 3800,
    offer: 12,
    discountedPrice: 3344,
    image: "https://images.unsplash.com/photo-1627038681897-1fceac4ef2b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    location: "Yamunotri, Uttarakhand",
    duration: "3 days"
  },
  {
    name: "Har Ki Pauri, Haridwar",
    description: "A famous ghat on the banks of the Ganga in Haridwar, known for its Ganga Aarti and spiritual atmosphere.",
    price: 3000,
    offer: 25,
    discountedPrice: 2250,
    image: "https://images.unsplash.com/photo-1602858174407-50c8c3b4e9bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    location: "Haridwar, Uttarakhand",
    duration: "2 days"
  },
  {
    name: "Rishikesh Ashrams & Temples",
    description: "The yoga capital of the world, Rishikesh offers spiritual ashrams, temples, and the iconic Laxman Jhula bridge.",
    price: 3200,
    offer: 18,
    discountedPrice: 2624,
    image: "https://images.unsplash.com/photo-1630843015911-0a419acf6807?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    location: "Rishikesh, Uttarakhand",
    duration: "3 days"
  },
  {
    name: "Tungnath Temple",
    description: "The highest Shiva temple in the world, Tungnath is part of the Panch Kedar and offers mesmerizing Himalayan views.",
    price: 4500,
    offer: 15,
    discountedPrice: 3825,
    image: "https://images.unsplash.com/photo-1654951377313-5b4f6baf8f9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    location: "Rudraprayag, Uttarakhand",
    duration: "3 days"
  },
  {
    name: "Hemkund Sahib",
    description: "A revered Sikh pilgrimage site, Hemkund Sahib is situated at 15,200 ft surrounded by glacial lakes and scenic beauty.",
    price: 5500,
    offer: 10,
    discountedPrice: 4950,
    image: "https://images.unsplash.com/photo-1652868012319-63dbcf9d62da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    location: "Chamoli, Uttarakhand",
    duration: "4 days"
  },
  {
    name: "Neelkanth Mahadev Temple",
    description: "Dedicated to Lord Shiva, this temple is surrounded by dense forests and located near Rishikesh.",
    price: 2800,
    offer: 15,
    discountedPrice: 2380,
    image: "https://images.unsplash.com/photo-1617364939021-d9a2e2f9ad49?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    location: "Rishikesh, Uttarakhand",
    duration: "2 days"
  },
  {
    name: "Jageshwar Dham",
    description: "A cluster of over 100 ancient Hindu temples dedicated to Lord Shiva, showcasing Nagara style architecture.",
    price: 3700,
    offer: 10,
    discountedPrice: 3330,
    image: "https://images.unsplash.com/photo-1657471071022-21fce5f8df34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    location: "Almora, Uttarakhand",
    duration: "3 days"
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    await Place.deleteMany({});
    console.log('Cleared existing places');
    
    await Place.insertMany(places);
    console.log('Seeded places data');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();