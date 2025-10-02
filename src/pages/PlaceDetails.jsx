import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api.js';

const vehicles = [
  { id: 1, name: "Tempo Traveller", type: "Bus", capacity: "12 seater", price: 2500, image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60" },
  { id: 2, name: "SUV", type: "Car", capacity: "7 seater", price: 3500, image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60" },
  { id: 3, name: "Helicopter", type: "Air", capacity: "4 seater", price: 15000, image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60" }
];

const accommodations = [
  { id: 1, name: "Dharamshala", type: "Basic", amenities: "Shared rooms, Basic meals", price: 500, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60" },
  { id: 2, name: "Guest House", type: "Standard", amenities: "Private rooms, Attached bath", price: 1200, image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60" },
  { id: 3, name: "Hotel", type: "Premium", amenities: "AC rooms, Restaurant, WiFi", price: 2500, image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60" }
];

const localTutors = [
  { id: 1, name: "Rajesh Kumar", rating: 4.9, reviews: 150, price: 2500, specialties: ["Spiritual Tours", "Adventure"], languages: ["Hindi", "English"], image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
  { id: 2, name: "Priya Sharma", rating: 4.8, reviews: 120, price: 2000, specialties: ["Cultural Tours", "Photography"], languages: ["Hindi", "English"], image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" },
  { id: 3, name: "Amit Singh", rating: 4.9, reviews: 95, price: 3000, specialties: ["Trekking", "Mountain Safety"], languages: ["Hindi", "Garhwali"], image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" }
];

export default function PlaceDetails() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlace();
  }, [id]);

  const fetchPlace = async () => {
    try {
      const response = await api.get(`/api/places/${id}`);
      setPlace(response.data);
    } catch (error) {
      console.error('Error fetching place:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="container mx-auto p-4 text-center">Loading...</div>;
  }

  if (!place) {
    return <div className="container mx-auto p-4 text-center">Place not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Place Details */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <img src={place.image} alt={place.name} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{place.name}</h1>
          <p className="text-gray-600 mb-4">{place.description}</p>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center">
              <span className="font-semibold">Location:</span>
              <span className="ml-2">{place.location}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold">Duration:</span>
              <span className="ml-2">{place.duration}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold">Price:</span>
              <span className="ml-2 text-green-600 font-bold">₹{place.discountedPrice}</span>
              <span className="ml-2 text-gray-500 line-through">₹{place.price}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Recommendations */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Recommended Vehicles</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {vehicles.map(vehicle => (
            <div key={vehicle.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={vehicle.image} alt={vehicle.name} className="w-full h-32 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold">{vehicle.name}</h3>
                <p className="text-sm text-gray-600">{vehicle.type} - {vehicle.capacity}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-green-600 font-bold">₹{vehicle.price}/day</span>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Book</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accommodation Recommendations */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Recommended Accommodations</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {accommodations.map(room => (
            <div key={room.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={room.image} alt={room.name} className="w-full h-32 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold">{room.name}</h3>
                <p className="text-sm text-gray-600">{room.type}</p>
                <p className="text-xs text-gray-500 mb-2">{room.amenities}</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-bold">₹{room.price}/night</span>
                  <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">Book</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Local Tutors */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Local Tutors Available</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {localTutors.map(tutor => (
            <div key={tutor.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <img src={tutor.image} alt={tutor.name} className="w-12 h-12 rounded-full object-cover mr-3" />
                  <div>
                    <h3 className="font-semibold">{tutor.name}</h3>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm">{tutor.rating} ({tutor.reviews})</span>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {tutor.specialties.map((specialty, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {tutor.languages.map((language, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-bold">₹{tutor.price}/day</span>
                  <button className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600">Contact</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About the Place */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">About {place.name}</h2>
        <div className="prose max-w-none">
          <p className="mb-4">{place.description}</p>
          <h3 className="text-lg font-semibold mb-2">Best Time to Visit</h3>
          <p className="mb-4">The best time to visit {place.name} is during the summer months (May to June) and post-monsoon period (September to October) when the weather is pleasant and the routes are accessible.</p>
          
          <h3 className="text-lg font-semibold mb-2">How to Reach</h3>
          <p className="mb-4">The nearest railway station is Haridwar, and the nearest airport is Jolly Grant Airport in Dehradun. From there, you can hire a taxi or take a bus to reach the base camp.</p>
          
          <h3 className="text-lg font-semibold mb-2">Things to Remember</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Carry warm clothes as temperatures can drop significantly</li>
            <li>Book accommodations in advance during peak season</li>
            <li>Carry necessary medications and first aid</li>
            <li>Respect local customs and traditions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}