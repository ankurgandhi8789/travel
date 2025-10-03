import axios from 'axios';

// Spiritual destinations data from seedData.js
const spiritualPlaces = [
  {
    name: "Kedarnath Temple",
    description: "One of the twelve Jyotirlingas of Lord Shiva, Kedarnath is nestled in the majestic Himalayas and is a sacred pilgrimage site.",
    price: 5000,
    offer: 10,
    discountedPrice: 4500,
    image: "https://wallpapers.com/images/hd/kedarnath-temple-banners-4k-9pd6c84fjldyenjg.jpg",
    location: "Kedarnath, Uttarakhand",
    duration: "5 days"
  },
  {
    name: "Badrinath Temple",
    description: "Dedicated to Lord Vishnu, Badrinath Temple is one of the Char Dham shrines and a must-visit for spiritual seekers.",
    price: 4800,
    offer: 15,
    discountedPrice: 4080,
    image: "https://www.bing.com/th/id/OIP.V5Ql-mfZWSPQkSOPSRnuXgHaFj?w=264&h=211&c=8&rs=1&qlt=90&o=6&cb=12&dpr=1.3&pid=3.1&rm=2",
    location: "Badrinath, Uttarakhand",
    duration: "4 days"
  },
  {
    name: "Gangotri Temple",
    description: "Located on the banks of River Bhagirathi, Gangotri Temple is dedicated to Goddess Ganga, marking the origin of the holy river.",
    price: 4000,
    offer: 20,
    discountedPrice: 3200,
    image: "https://www.bing.com/th/id/OIP.HJDsUXouaWEfm0AgF7cmewHaE8?w=254&h=211&c=8&rs=1&qlt=90&o=6&cb=12&dpr=1.3&pid=3.1&rm=2",
    location: "Gangotri, Uttarakhand",
    duration: "3 days"
  },
  {
    name: "Yamunotri Temple",
    description: "The source of the sacred Yamuna River, this temple is surrounded by breathtaking mountains and glaciers.",
    price: 3800,
    offer: 12,
    discountedPrice: 3344,
    image: "https://www.bing.com/th/id/OIP.5NBQASLQKnS30F-DRPtOWQHaEo?w=248&h=211&c=8&rs=1&qlt=90&o=6&cb=12&dpr=1.3&pid=3.1&rm=2",
    location: "Yamunotri, Uttarakhand",
    duration: "3 days"
  },
  {
    name: "Har Ki Pauri, Haridwar",
    description: "A famous ghat on the banks of the Ganga in Haridwar, known for its Ganga Aarti and spiritual atmosphere.",
    price: 3000,
    offer: 25,
    discountedPrice: 2250,
    image: "https://www.bing.com/th/id/OIP.iMKUtZLxjfY2SAlFSaXdswHaEK?w=246&h=211&c=8&rs=1&qlt=90&o=6&cb=12&dpr=1.3&pid=3.1&rm=2",
    location: "Haridwar, Uttarakhand",
    duration: "2 days"
  },
  {
    name: "Rishikesh Ashrams & Temples",
    description: "The yoga capital of the world, Rishikesh offers spiritual ashrams, temples, and the iconic Laxman Jhula bridge.",
    price: 3200,
    offer: 18,
    discountedPrice: 2624,
    image: "https://tse2.mm.bing.net/th/id/OIP.JQxvEV8azy9Hk9nXRpoSpAHaFj?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    location: "Rishikesh, Uttarakhand",
    duration: "3 days"
  },
  {
    name: "Tungnath Temple",
    description: "The highest Shiva temple in the world, Tungnath is part of the Panch Kedar and offers mesmerizing Himalayan views.",
    price: 4500,
    offer: 15,
    discountedPrice: 3825,
    image: "https://www.bing.com/th/id/OIP.kqZ1XeBmGBQUwCnnH8j8BQHaFj?w=246&h=211&c=8&rs=1&qlt=90&o=6&cb=12&dpr=1.3&pid=3.1&rm=2",
    location: "Rudraprayag, Uttarakhand",
    duration: "3 days"
  },
  {
    name: "Hemkund Sahib",
    description: "A revered Sikh pilgrimage site, Hemkund Sahib is situated at 15,200 ft surrounded by glacial lakes and scenic beauty.",
    price: 5500,
    offer: 10,
    discountedPrice: 4950,
    image: "https://www.bing.com/th/id/OIP.2ulvBCDCjpac2SD_kt_e5QHaE8?w=251&h=211&c=8&rs=1&qlt=90&o=6&cb=12&dpr=1.3&pid=3.1&rm=2",
    location: "Chamoli, Uttarakhand",
    duration: "4 days"
  },
  {
    name: "Neelkanth Mahadev Temple",
    description: "Dedicated to Lord Shiva, this temple is surrounded by dense forests and located near Rishikesh.",
    price: 2800,
    offer: 15,
    discountedPrice: 2380,
    image: "https://www.bing.com/th/id/OIP.SccTCEDbv4qefi3pbryC4gHaFj?w=281&h=211&c=8&rs=1&qlt=90&o=6&cb=12&dpr=1.3&pid=3.1&rm=2",
    location: "Rishikesh, Uttarakhand",
    duration: "2 days"
  },
  {
    name: "Jageshwar Dham",
    description: "A cluster of over 100 ancient Hindu temples dedicated to Lord Shiva, showcasing Nagara style architecture.",
    price: 3700,
    offer: 10,
    discountedPrice: 3330,
    image: "https://www.bing.com/th/id/OIP.g9XQ2PHMdoLYj8gaaXML8gHaE8?w=247&h=211&c=8&rs=1&qlt=90&o=6&cb=12&dpr=1.3&pid=3.1&rm=2",
    location: "Almora, Uttarakhand",
    duration: "3 days"
  }
];

// Places API functions
export const placesAPI = {
  async getPopularPlaces() {
    try {
      return spiritualPlaces.map((place, index) => ({
        _id: (index + 1).toString(),
        name: place.name,
        location: place.location,
        state: 'Uttarakhand',
        description: place.description,
        image: place.image,
        price: place.price,
        discountedPrice: place.discountedPrice,
        duration: place.duration,
        category: 'spiritual',
        rating: (4.5 + Math.random() * 0.5).toFixed(1),
        offer: place.offer
      }));
    } catch (error) {
      console.error('Error fetching places:', error);
      return [];
    }
  },

  // Search places by query with comprehensive filtering
  async searchPlaces(query) {
    if (!query.trim()) {
      return this.getPopularPlaces();
    }
    
    const allPlaces = await this.getPopularPlaces();
    return allPlaces.filter(place => 
      place.name.toLowerCase().includes(query.toLowerCase()) ||
      place.location.toLowerCase().includes(query.toLowerCase()) ||
      place.state.toLowerCase().includes(query.toLowerCase()) ||
      place.description.toLowerCase().includes(query.toLowerCase()) ||
      place.category.toLowerCase().includes(query.toLowerCase())
    );
  }
};

// Tutors API functions
export const tutorsAPI = {
  async getAllTutors() {
    const tutors = [
      { id: 1, name: "Rajesh Kumar", rating: 4.9, reviews: 150, price: 2500, specialties: ["Spiritual Tours", "Adventure"], languages: ["Hindi", "English"], image: "https://th.bing.com/th/id/OIP.233gir0jKdEoHviypGoUowHaHa?w=176&h=180&c=7&r=0&o=7&cb=12&dpr=1.3&pid=1.7&rm=3" },
      { id: 2, name: "Priya Sharma", rating: 4.8, reviews: 120, price: 2000, specialties: ["Cultural Tours", "Photography"], languages: ["Hindi", "English"], image: "https://www.bing.com/th/id/OIP.jSQ_Bi0_yo7oJrEq3D6FlQHaJ4?w=160&h=211&c=8&rs=1&qlt=90&o=6&cb=12&dpr=1.3&pid=3.1&rm=2" },
      { id: 3, name: "Amit Singh", rating: 4.9, reviews: 95, price: 3000, specialties: ["Trekking", "Mountain Safety"], languages: ["Hindi", "Garhwali"], image: "https://www.bing.com/th/id/OIP.xC0kF1_VxNLyLrBA1TSwOAHaHa?w=185&h=211&c=8&rs=1&qlt=90&o=6&cb=12&dpr=1.3&pid=3.1&rm=2" },
      { id: 4, name: "Sunita Devi", rating: 4.7, reviews: 80, price: 1800, specialties: ["Local Culture", "Handicrafts"], languages: ["Hindi", "Kumaoni"], image: "https://th.bing.com/th/id/OIP.GzxZDpqHBkPrTKBNZTafUgHaHa?w=156&h=180&c=7&r=0&o=7&cb=12&dpr=1.3&pid=1.7&rm=3" },
      { id: 5, name: "Vikram Thapa", rating: 4.8, reviews: 110, price: 2800, specialties: ["Wildlife Tours", "Nature Photography"], languages: ["Hindi", "English", "Nepali"], image: "https://th.bing.com/th/id/OIP.QkU2zV53i99NTHvdQX1MPAHaHa?w=175&h=180&c=7&r=0&o=7&cb=12&dpr=1.3&pid=1.7&rm=3" },
      { id: 6, name: "Meera Joshi", rating: 4.9, reviews: 140, price: 2200, specialties: ["Yoga Retreats", "Meditation"], languages: ["Hindi", "English", "Sanskrit"], image: "https://www.bing.com/th/id/OIP.gvaKVQKTcDL6p_b7uTkzsAHaIC?w=163&h=211&c=8&rs=1&qlt=90&o=6&cb=12&dpr=1.3&pid=3.1&rm=2" }
    ];
    return tutors;
  },

  async getTutorById(id) {
    const tutors = await this.getAllTutors();
    return tutors.find(tutor => tutor.id === parseInt(id));
  },

  async getTutorsByLocation(location) {
    const tutors = await this.getAllTutors();
    return tutors.filter(tutor => 
      tutor.specialties.some(specialty => 
        specialty.toLowerCase().includes(location.toLowerCase())
      )
    );
  }
};

export default axios;