import axios from 'axios';

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:5000';

// Add request interceptor to include auth token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Places API functions
export const placesAPI = {
  // Get comprehensive places data
  async getPopularPlaces() {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=50');
      const posts = response.data;
      
      const allDestinations = [
        { name: 'Eiffel Tower', location: 'Paris, France', state: 'Europe', category: 'cultural', image: 'https://picsum.photos/400/300?random=1' },
        { name: 'Great Wall', location: 'Beijing, China', state: 'Asia', category: 'historical', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&h=300&fit=crop' },
        { name: 'Statue of Liberty', location: 'New York, USA', state: 'New York', category: 'cultural', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop' },
        { name: 'Big Ben', location: 'London, UK', state: 'Europe', category: 'cultural', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop' },
        { name: 'Taj Mahal', location: 'Agra, India', state: 'Uttar Pradesh', category: 'historical', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop' },
        { name: 'Golden Gate Bridge', location: 'San Francisco, USA', state: 'California', category: 'adventure', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop' },
        { name: 'Grand Canyon', location: 'Arizona, USA', state: 'Arizona', category: 'nature', image: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=400&h=300&fit=crop' },
        { name: 'Yellowstone Park', location: 'Wyoming, USA', state: 'Wyoming', category: 'nature', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop' },
        { name: 'Miami Beach', location: 'Miami, USA', state: 'Florida', category: 'nature', image: 'https://picsum.photos/400/300?random=9' },
        { name: 'Las Vegas Strip', location: 'Las Vegas, USA', state: 'Nevada', category: 'adventure', image: 'https://picsum.photos/400/300?random=10' },
        { name: 'Hollywood Sign', location: 'Los Angeles, USA', state: 'California', category: 'cultural', image: 'https://picsum.photos/400/300?random=11' },
        { name: 'Space Needle', location: 'Seattle, USA', state: 'Washington', category: 'cultural', image: 'https://picsum.photos/400/300?random=12' },
        { name: 'Mount Rushmore', location: 'South Dakota, USA', state: 'South Dakota', category: 'historical', image: 'https://picsum.photos/400/300?random=13' },
        { name: 'Niagara Falls', location: 'New York, USA', state: 'New York', category: 'nature', image: 'https://picsum.photos/400/300?random=14' },
        { name: 'French Quarter', location: 'New Orleans, USA', state: 'Louisiana', category: 'cultural', image: 'https://picsum.photos/400/300?random=15' },
        { name: 'Colosseum', location: 'Rome, Italy', state: 'Europe', category: 'historical', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=300&fit=crop' },
        { name: 'Burj Khalifa', location: 'Dubai, UAE', state: 'Middle East', category: 'adventure', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop' },
        { name: 'Santorini', location: 'Greece', state: 'Europe', category: 'nature', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop' },
        { name: 'Mount Fuji', location: 'Tokyo, Japan', state: 'Asia', category: 'nature', image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=400&h=300&fit=crop' },
        { name: 'Maldives Resort', location: 'Maldives', state: 'Indian Ocean', category: 'nature', image: 'https://picsum.photos/400/300?random=20' },
        { name: 'Sagrada Familia', location: 'Barcelona, Spain', state: 'Europe', category: 'cultural', image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=300&fit=crop' },
        { name: 'Sydney Opera House', location: 'Sydney, Australia', state: 'Oceania', category: 'cultural', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=300&fit=crop' },
        { name: 'Hagia Sophia', location: 'Istanbul, Turkey', state: 'Europe/Asia', category: 'historical', image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&h=300&fit=crop' },
        { name: 'Machu Picchu', location: 'Cusco, Peru', state: 'South America', category: 'historical', image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400&h=300&fit=crop' },
        { name: 'Prague Castle', location: 'Prague, Czech Republic', state: 'Europe', category: 'historical', image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=400&h=300&fit=crop' },
        { name: 'Neuschwanstein Castle', location: 'Bavaria, Germany', state: 'Europe', category: 'historical', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop' },
        { name: 'Pyramids of Giza', location: 'Cairo, Egypt', state: 'Africa', category: 'historical', image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=300&fit=crop' },
        { name: 'Petra', location: 'Jordan', state: 'Middle East', category: 'historical', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop' },
        { name: 'Times Square', location: 'New York, USA', state: 'New York', category: 'adventure', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop' },
        { name: 'Alamo', location: 'San Antonio, USA', state: 'Texas', category: 'historical', image: 'https://picsum.photos/400/300?random=30' },
        { name: 'Gateway Arch', location: 'St. Louis, USA', state: 'Missouri', category: 'cultural', image: 'https://picsum.photos/400/300?random=31' },
        { name: 'Liberty Bell', location: 'Philadelphia, USA', state: 'Pennsylvania', category: 'historical', image: 'https://picsum.photos/400/300?random=32' },
        { name: 'Alcatraz Island', location: 'San Francisco, USA', state: 'California', category: 'historical', image: 'https://picsum.photos/400/300?random=33' },
        { name: 'Graceland', location: 'Memphis, USA', state: 'Tennessee', category: 'cultural', image: 'https://picsum.photos/400/300?random=34' },
        { name: 'Kennedy Space Center', location: 'Florida, USA', state: 'Florida', category: 'adventure', image: 'https://picsum.photos/400/300?random=35' },
        { name: 'Mammoth Cave', location: 'Kentucky, USA', state: 'Kentucky', category: 'nature', image: 'https://picsum.photos/400/300?random=36' },
        { name: 'Crater Lake', location: 'Oregon, USA', state: 'Oregon', category: 'nature', image: 'https://picsum.photos/400/300?random=37' },
        { name: 'Denali National Park', location: 'Alaska, USA', state: 'Alaska', category: 'nature', image: 'https://picsum.photos/400/300?random=38' },
        { name: 'Pearl Harbor', location: 'Hawaii, USA', state: 'Hawaii', category: 'historical', image: 'https://picsum.photos/400/300?random=39' },
        { name: 'Antelope Canyon', location: 'Arizona, USA', state: 'Arizona', category: 'nature', image: 'https://picsum.photos/400/300?random=40' },
        { name: 'Bryce Canyon', location: 'Utah, USA', state: 'Utah', category: 'nature', image: 'https://picsum.photos/400/300?random=41' },
        { name: 'Arches National Park', location: 'Utah, USA', state: 'Utah', category: 'nature', image: 'https://picsum.photos/400/300?random=42' },
        { name: 'Zion National Park', location: 'Utah, USA', state: 'Utah', category: 'nature', image: 'https://picsum.photos/400/300?random=43' },
        { name: 'Yosemite Valley', location: 'California, USA', state: 'California', category: 'nature', image: 'https://picsum.photos/400/300?random=44' },
        { name: 'Death Valley', location: 'California, USA', state: 'California', category: 'nature', image: 'https://picsum.photos/400/300?random=45' },
        { name: 'Glacier National Park', location: 'Montana, USA', state: 'Montana', category: 'nature', image: 'https://picsum.photos/400/300?random=46' },
        { name: 'Great Smoky Mountains', location: 'Tennessee, USA', state: 'Tennessee', category: 'nature', image: 'https://picsum.photos/400/300?random=47' },
        { name: 'Acadia National Park', location: 'Maine, USA', state: 'Maine', category: 'nature', image: 'https://picsum.photos/400/300?random=48' },
        { name: 'Everglades', location: 'Florida, USA', state: 'Florida', category: 'nature', image: 'https://picsum.photos/400/300?random=49' },
        { name: 'Rocky Mountain Park', location: 'Colorado, USA', state: 'Colorado', category: 'nature', image: 'https://picsum.photos/400/300?random=50' },
        { name: 'Olympic National Park', location: 'Washington, USA', state: 'Washington', category: 'nature', image: 'https://picsum.photos/400/300?random=51' }
      ];
      
      return posts.slice(0, allDestinations.length).map((post, index) => {
        const destination = allDestinations[index] || { name: `Destination ${index + 1}`, location: 'Unknown', state: 'Unknown', image: 'https://picsum.photos/400/300?random=1' };
        
        return {
          _id: post.id.toString(),
          name: destination.name,
          location: destination.location,
          state: destination.state,
          description: `Discover the amazing ${destination.name} in ${destination.location}. Experience breathtaking views, rich culture, and unforgettable adventures at this world-renowned destination.`,
          image: destination.image,
          price: Math.floor(Math.random() * 50000) + 20000,
          discountedPrice: Math.floor(Math.random() * 40000) + 15000,
          duration: `${Math.floor(Math.random() * 8) + 3} days`,
          category: destination.category,
          rating: ((post.id % 20) / 10 + 3.5).toFixed(1)
        };
      });
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

export default axios;