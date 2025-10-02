import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function TutorProfile() {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock tutor data based on ID
    const tutors = {
      '1': {
        id: 1,
        name: "Rajesh Kumar",
        location: "Rishikesh, Uttarakhand",
        rating: 4.9,
        reviewCount: 150,   // ✅ changed
        price: 2500,
        experience: "8 years",
        specialties: ["Spiritual Tours", "Adventure Sports", "Yoga Retreats", "Temple Visits"],
        languages: ["Hindi", "English", "Sanskrit"],
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        description: "Expert in spiritual tourism and adventure activities. Certified yoga instructor with deep knowledge of local temples and ashrams. I have been guiding travelers for over 8 years and specialize in creating personalized spiritual journeys.",
        certifications: ["Certified Yoga Instructor", "First Aid Certified", "Licensed Tour Guide"],
        availability: "Available 7 days a week",
        phone: "+91 98765 43210",
        email: "rajesh.kumar@example.com",
        gallery: [
          "https://images.unsplash.com/photo-1628064980478-7dd7ef17e76b?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1630843015911-0a419acf6807?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1602858174407-50c8c3b4e9bb?w=300&h=200&fit=crop"
        ],
        reviews: [
          { name: "Sarah Johnson", rating: 5, comment: "Amazing experience! Rajesh showed us hidden gems in Rishikesh that we never would have found on our own.", date: "2 weeks ago" },
          { name: "Michael Chen", rating: 5, comment: "Very knowledgeable about local culture and spirituality. Highly recommended!", date: "1 month ago" },
          { name: "Emma Wilson", rating: 4, comment: "Great guide with excellent English. Made our trip memorable.", date: "2 months ago" }
        ]
      },
      '2': {
        id: 2,
        name: "Priya Sharma",
        location: "Haridwar, Uttarakhand",
        rating: 4.8,
        reviewCount: 120,   // ✅ changed
        price: 2000,
        experience: "6 years",
        specialties: ["Cultural Tours", "Photography", "Local Cuisine", "Heritage Sites"],
        languages: ["Hindi", "English", "Punjabi"],
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
        description: "Passionate about showcasing local culture and traditions. Professional photographer who captures the essence of spiritual India. I love sharing stories about our rich heritage and helping travelers understand the deeper meaning behind our customs.",
        certifications: ["Professional Photography", "Cultural Heritage Guide", "Food Safety Certified"],
        availability: "Available Monday to Saturday",
        phone: "+91 98765 43211",
        email: "priya.sharma@example.com",
        gallery: [
          "https://images.unsplash.com/photo-1602858174407-50c8c3b4e9bb?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1603264044682-43a577c6cdb0?w=300&h=200&fit=crop",
          "https://images.unsplash.com/photo-1627038682066-40e1a3e3d54d?w=300&h=200&fit=crop"
        ],
        reviews: [
          { name: "David Brown", rating: 5, comment: "Priya's photography skills are amazing! She helped us capture beautiful memories.", date: "1 week ago" },
          { name: "Lisa Anderson", rating: 5, comment: "Excellent cultural insights and delicious food recommendations.", date: "3 weeks ago" }
        ]
      }
    };

    setTimeout(() => {
      setTutor(tutors[id] || tutors['1']);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading tutor profile...</div>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-500">Tutor not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img 
              src={tutor.image} 
              alt={tutor.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">{tutor.name}</h1>
              <div className="flex items-center justify-center md:justify-start mb-2">
                <svg className="w-5 h-5 text-red-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-xl">{tutor.location}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start mb-4">
                <svg className="w-5 h-5 text-yellow-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-lg font-semibold">{tutor.rating}</span>
                <span className="ml-2">({tutor.reviewCount} reviews)</span> {/* ✅ fixed */}
              </div>
              <div className="text-2xl font-bold">₹{tutor.price}/day</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">About {tutor.name}</h2>
              <p className="text-gray-700 leading-relaxed">{tutor.description}</p>
            </div>

            {/* Specialties */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Specialties</h2>
              <div className="flex flex-wrap gap-3">
                {tutor.specialties.map((specialty, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Gallery */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Photo Gallery</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {tutor.gallery.map((photo, index) => (
                  <img key={index} src={photo} alt={`Gallery ${index + 1}`} className="w-full h-40 object-cover rounded-lg" />
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Reviews</h2>
              <div className="space-y-4">
                {tutor.reviews.map((review, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{review.name}</h4>
                      <div className="flex items-center">
                        {[...Array(review.rating)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-sm text-gray-500 ml-2">{review.date}</span>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{tutor.phone}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{tutor.email}</span>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div>
                  <span className="font-semibold">Experience:</span>
                  <span className="ml-2">{tutor.experience}</span>
                </div>
                <div>
                  <span className="font-semibold">Languages:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {tutor.languages.map((language, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-semibold">Availability:</span>
                  <span className="ml-2">{tutor.availability}</span>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Certifications</h3>
              <ul className="space-y-2">
                {tutor.certifications.map((cert, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Book Now */}
            <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Ready to Book?</h3>
              <p className="mb-4">Contact {tutor.name} to plan your perfect trip!</p>
              <button className="w-full bg-white text-orange-600 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Contact Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
