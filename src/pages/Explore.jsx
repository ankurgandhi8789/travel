import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api.js';

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      const response = await api.get('/api/places');
      setPlaces(response.data);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
    setLoading(false);
  };

  const filteredPlaces = places.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         place.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'temples' && place.name.toLowerCase().includes('temple')) ||
                           (selectedCategory === 'ashrams' && place.name.toLowerCase().includes('ashram')) ||
                           (selectedCategory === 'ghats' && place.name.toLowerCase().includes('ghat'));
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading destinations...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Explore Sacred Destinations</h1>
          <p className="text-xl">Discover spiritual places and pilgrimage sites in Uttarakhand</p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white shadow-sm py-6">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Search destinations..."
              className="p-3 border rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="p-3 border rounded-lg"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="temples">Temples</option>
              <option value="ashrams">Ashrams</option>
              <option value="ghats">Ghats</option>
            </select>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">          

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlaces.map(place => (
              <div key={place._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
                <img 
                  src={place.image} 
                  alt={place.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">{place.name}</h3>
                  <p className="text-gray-600 mb-3 text-sm line-clamp-3">{place.description}</p>
                  <div className="flex items-center mb-3">
                    <svg className="w-4 h-4 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-500">{place.location}</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">{place.duration}</span>
                    <div className="text-right">
                      <span className="text-lg font-bold text-green-600">₹{place.discountedPrice}</span>
                      <span className="text-sm text-gray-500 line-through ml-1">₹{place.price}</span>
                    </div>
                  </div>
                  <Link 
                    to={`/place/${place._id}`} 
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-center block text-sm font-medium transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredPlaces.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-xl text-gray-500">No destinations found</p>
              <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}