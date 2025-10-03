import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { placesAPI, tutorsAPI } from '../utils/api.js';
import '../styles/animations.css';

const vehicles = [
  { id: 1, name: "Hatchback Car", type: "Car", capacity: "4 seater", price: 1500, image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60" },
  { id: 2, name: "SUV", type: "Car", capacity: "7 seater", price: 2500, image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60" },
  { id: 3, name: "Motorcycle", type: "Bike", capacity: "2 seater", price: 800, image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60" },
  { id: 4, name: "Scooter", type: "Scooter", capacity: "2 seater", price: 500, image: "data:image/jpeg;base64,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" },
  { id: 5, name: "Sedan Car", type: "Car", capacity: "5 seater", price: 2000, image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60" },
  { id: 6, name: "Electric Bike", type: "E-Bike", capacity: "2 seater", price: 600, image: "data:image/jpeg;base64,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" },
  { id: 7, name: "Compact SUV", type: "SUV", capacity: "5 seater", price: 2200, image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60" },
  { id: 8, name: "Sports Bike", type: "Bike", capacity: "2 seater", price: 1000, image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60" }
];

const accommodations = [
  { id: 1, name: "Dharamshala", type: "Basic", amenities: "Shared rooms, Basic meals", price: 500, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60" },
  { id: 2, name: "Guest House", type: "Standard", amenities: "Private rooms, Attached bath", price: 1200, image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60" },
  { id: 3, name: "Hotel", type: "Premium", amenities: "AC rooms, Restaurant, WiFi", price: 2500, image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60" },
  { id: 4, name: "Hostel", type: "Budget", amenities: "Dormitory, Common kitchen", price: 300, image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60" },
  { id: 5, name: "Resort", type: "Luxury", amenities: "Pool, Spa, Fine dining", price: 5000, image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60" },
  { id: 6, name: "Homestay", type: "Local", amenities: "Family stay, Home food", price: 800, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60" }
];



export default function PlaceDetails() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [localTutors, setLocalTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlace();
    fetchTutors();
  }, [id]);

  const fetchPlace = async () => {
    try {
      const places = await placesAPI.getPopularPlaces();
      const foundPlace = places.find(p => p._id === id);
      if (foundPlace) {
        setPlace(foundPlace);
      } else {
        setPlace(null);
      }
    } catch (error) {
      console.error('Error fetching place:', error);
      setPlace(null);
    }
    setLoading(false);
  };

  const fetchTutors = async () => {
    try {
      const tutors = await tutorsAPI.getAllTutors();
      setLocalTutors(tutors);
    } catch (error) {
      console.error('Error fetching tutors:', error);
    }
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
            
          </div>
        </div>
      </div>

      {/* Vehicle Recommendations */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Recommended Vehicles</h2>
        <div className="overflow-hidden">
          <div className="flex animate-scroll space-x-4">
            {[...vehicles, ...vehicles].map((vehicle, index) => (
              <div key={`${vehicle.id}-${index}`} className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden">
                <img src={vehicle.image} alt={vehicle.name} className="w-full h-32 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold">{vehicle.name}</h3>
                  <p className="text-sm text-gray-600">{vehicle.type} - {vehicle.capacity}</p>
                  <p className="text-green-600 font-bold mt-2">₹{vehicle.price}/day</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accommodation Recommendations */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Recommended Accommodations</h2>
        <div className="overflow-hidden">
          <div className="flex animate-scroll-reverse space-x-4">
            {[...accommodations, ...accommodations].map((room, index) => (
              <div key={`${room.id}-${index}`} className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden">
                <img src={room.image} alt={room.name} className="w-full h-32 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold">{room.name}</h3>
                  <p className="text-sm text-gray-600">{room.type}</p>
                  <p className="text-xs text-gray-500 mb-2">{room.amenities}</p>
                  <p className="text-green-600 font-bold">₹{room.price}/night</p>
                </div>
              </div>
            ))}
          </div>
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
                  <Link 
                    to={`/tutor/${tutor.id}`}
                    className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                  >
                    Contact
                  </Link>
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