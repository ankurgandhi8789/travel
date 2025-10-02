import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Tutors() {
  const [searchParams] = useSearchParams();
  const [tutors, setTutors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || '');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  useEffect(() => {
    // Mock tutors data
    setTutors([
      {
        id: 1,
        name: "Rajesh Kumar",
        location: "Rishikesh, Uttarakhand",
        rating: 4.9,
        reviews: 150,
        price: 2500,
        specialties: ["Spiritual Tours", "Adventure Sports", "Yoga Retreats"],
        languages: ["Hindi", "English", "Sanskrit"],
        experience: "8 years",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
        description: "Expert in spiritual tourism and adventure activities. Certified yoga instructor with deep knowledge of local temples and ashrams."
      },
      {
        id: 2,
        name: "Priya Sharma",
        location: "Haridwar, Uttarakhand",
        rating: 4.8,
        reviews: 120,
        price: 2000,
        specialties: ["Cultural Tours", "Photography", "Local Cuisine"],
        languages: ["Hindi", "English", "Punjabi"],
        experience: "6 years",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
        description: "Passionate about showcasing local culture and traditions. Professional photographer who captures the essence of spiritual India."
      },
      {
        id: 3,
        name: "Amit Singh",
        location: "Kedarnath, Uttarakhand",
        rating: 4.9,
        reviews: 95,
        price: 3000,
        specialties: ["Trekking", "Pilgrimage Tours", "Mountain Safety"],
        languages: ["Hindi", "English", "Garhwali"],
        experience: "10 years",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
        description: "Mountain guide with extensive experience in high-altitude trekking and pilgrimage routes. Safety certified and first-aid trained."
      },
      {
        id: 4,
        name: "Sunita Devi",
        location: "Badrinath, Uttarakhand",
        rating: 4.7,
        reviews: 80,
        price: 2200,
        specialties: ["Temple Tours", "Local Crafts", "Ayurveda"],
        languages: ["Hindi", "English", "Kumaoni"],
        experience: "5 years",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
        description: "Local artisan and temple guide with deep knowledge of Ayurvedic practices and traditional crafts of the region."
      }
    ]);
  }, []);

  const filteredTutors = tutors.filter(tutor => {
    const matchesSearch = tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutor.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutor.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLocation = !selectedLocation || tutor.location.includes(selectedLocation);
    const matchesSpecialty = !selectedSpecialty || tutor.specialties.includes(selectedSpecialty);
    return matchesSearch && matchesLocation && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect Travel Tutor</h1>
          <p className="text-xl">Connect with verified local guides who know the best experiences</p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white shadow-sm py-6">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search tutors, locations, or specialties..."
              className="p-3 border rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="p-3 border rounded-lg"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">All Locations</option>
              <option value="Rishikesh">Rishikesh</option>
              <option value="Haridwar">Haridwar</option>
              <option value="Kedarnath">Kedarnath</option>
              <option value="Badrinath">Badrinath</option>
            </select>
            <select
              className="p-3 border rounded-lg"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              <option value="">All Specialties</option>
              <option value="Spiritual Tours">Spiritual Tours</option>
              <option value="Adventure Sports">Adventure Sports</option>
              <option value="Cultural Tours">Cultural Tours</option>
              <option value="Trekking">Trekking</option>
            </select>
            <button className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 font-medium">
              Apply Filters
            </button>
          </div>
        </div>
      </section>

      {/* Tutors Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              {filteredTutors.length} Tutors Available
            </h2>
            <select className="p-2 border rounded-lg">
              <option>Sort by Rating</option>
              <option>Sort by Price (Low to High)</option>
              <option>Sort by Price (High to Low)</option>
              <option>Sort by Experience</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTutors.map(tutor => (
              <div key={tutor.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="relative">
                  <img src={tutor.image} alt={tutor.name} className="w-full h-48 object-cover" />
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Verified
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800">{tutor.name}</h3>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-medium">{tutor.rating}</span>
                      <span className="text-gray-500 text-sm ml-1">({tutor.reviews})</span>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 mb-3">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">{tutor.location}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{tutor.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-sm text-gray-800 mb-2">Specialties:</h4>
                    <div className="flex flex-wrap gap-2">
                      {tutor.specialties.slice(0, 3).map((specialty, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-green-600">₹{tutor.price}</span>
                      <span className="text-gray-500 text-sm">/day</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Experience</div>
                      <div className="font-semibold">{tutor.experience}</div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors">
                      View Profile
                    </button>
                    <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 text-sm font-medium transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTutors.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <p className="text-xl text-gray-500">No tutors found matching your criteria</p>
              <p className="text-gray-400 mt-2">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}