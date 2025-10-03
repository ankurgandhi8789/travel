import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createCashfreeOrder } from '../utils/cashfree';
import { tutorsAPI } from '../utils/api.js';

export default function TutorProfile() {
  const { id } = useParams();
  const { user } = useAuth();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });
  const [reviews, setReviews] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentData, setPaymentData] = useState({ days: 1, totalAmount: 0 });


  useEffect(() => {
    fetchTutor();
  }, [id]);

  const fetchTutor = async () => {
    try {
      const tutorData = await tutorsAPI.getTutorById(parseInt(id));
      if (tutorData) {
        const enhancedTutor = {
          ...tutorData,
          reviewCount: tutorData.reviews,
          location: getLocationForTutor(tutorData.id),
          experience: getExperienceForTutor(tutorData.id),
          description: getDescriptionForTutor(tutorData.id),
          certifications: getCertificationsForTutor(tutorData.id),
          availability: getAvailabilityForTutor(tutorData.id),
          phone: getPhoneForTutor(tutorData.id),
          email: getEmailForTutor(tutorData.id),
          gallery: getGalleryForTutor(tutorData.id),
          reviews: getReviewsForTutor(tutorData.id)
        };
        setTutor(enhancedTutor);
        setReviews(enhancedTutor.reviews);
      }
    } catch (error) {
      console.error('Error fetching tutor:', error);
    }
    setLoading(false);
  };

  const getLocationForTutor = (id) => {
    const locations = {
      1: "Rishikesh, Uttarakhand",
      2: "Haridwar, Uttarakhand",
      3: "Kedarnath, Uttarakhand",
      4: "Badrinath, Uttarakhand",
      5: "Gangotri, Uttarakhand",
      6: "Yamunotri, Uttarakhand"
    };
    return locations[id] || "Uttarakhand";
  };

  const getExperienceForTutor = (id) => {
    const experiences = { 1: "8 years", 2: "6 years", 3: "10 years", 4: "5 years", 5: "7 years", 6: "9 years" };
    return experiences[id] || "5 years";
  };

  const getDescriptionForTutor = (id) => {
    const descriptions = {
      1: "Expert in spiritual tourism and adventure activities. Certified yoga instructor with deep knowledge of local temples and ashrams. I have been guiding travelers for over 8 years and specialize in creating personalized spiritual journeys.",
      2: "Passionate about showcasing local culture and traditions. Professional photographer who captures the essence of spiritual India. I love sharing stories about our rich heritage and helping travelers understand the deeper meaning behind our customs.",
      3: "Mountain trekking specialist with extensive experience in high-altitude expeditions. Safety-certified guide who has led hundreds of successful treks to Kedarnath and surrounding peaks.",
      4: "Local culture enthusiast specializing in traditional handicrafts and village tourism. Expert in Kumaoni traditions and local folklore with deep community connections.",
      5: "Wildlife and nature photography expert with comprehensive knowledge of Uttarakhand's flora and fauna. Specialized in eco-tourism and sustainable travel practices.",
      6: "Certified yoga and meditation instructor with Sanskrit knowledge. Specializes in spiritual retreats and ancient Vedic practices in authentic ashram settings."
    };
    return descriptions[id] || "Experienced local guide with extensive knowledge of the region.";
  };

  const getCertificationsForTutor = (id) => {
    const certifications = {
      1: ["Certified Yoga Instructor", "First Aid Certified", "Licensed Tour Guide"],
      2: ["Professional Photography", "Cultural Heritage Guide", "Food Safety Certified"],
      3: ["Mountain Guide Certification", "Wilderness First Aid", "High Altitude Training"],
      4: ["Cultural Heritage Specialist", "Handicraft Expert", "Community Tourism Guide"],
      5: ["Wildlife Photography", "Nature Guide Certification", "Eco-Tourism Specialist"],
      6: ["Yoga Alliance Certified", "Meditation Teacher", "Sanskrit Scholar"]
    };
    return certifications[id] || ["Licensed Tour Guide", "First Aid Certified"];
  };

  const getAvailabilityForTutor = (id) => {
    const availability = {
      1: "Available 7 days a week",
      2: "Available Monday to Saturday",
      3: "Available April to November",
      4: "Available year-round",
      5: "Available March to June, September to November",
      6: "Available 7 days a week"
    };
    return availability[id] || "Available on request";
  };

  const getPhoneForTutor = (id) => {
    const phones = {
      1: "+91 98765 43210",
      2: "+91 98765 43211",
      3: "+91 98765 43212",
      4: "+91 98765 43213",
      5: "+91 98765 43214",
      6: "+91 98765 43215"
    };
    return phones[id] || "+91 98765 43200";
  };

  const getEmailForTutor = (id) => {
    const emails = {
      1: "rajesh.kumar@example.com",
      2: "priya.sharma@example.com",
      3: "amit.singh@example.com",
      4: "sunita.devi@example.com",
      5: "vikram.thapa@example.com",
      6: "meera.joshi@example.com"
    };
    return emails[id] || "tutor@example.com";
  };

  const getGalleryForTutor = (id) => {
    const galleries = {
      1: [
        "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=270,height=180,dpr=2/tour_img/79fc4eb7a1dd60ff.jpeg",
        "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=270,height=180,dpr=2/tour_img/b91c8b04ace273b7e298eb6f9e1b98a5e3e9e42e9a2e000473e686ec4db0f8cd.jpg",
        "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=270,height=180,dpr=2/tour_img/02ab812e109e9dafaf70bebdc6b6c42993ee383ab380361c4a27b14ae9d4dae5.jpg",
        "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=270,height=180,dpr=2/tour_img/9a0fca45a8bc3a101e9d362ac70dd32160cbee91cf777b550a99104df892a962.jpg"
      ],
      2: [
        "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=270,height=180,dpr=2/tour_img/64b4db90ce127.png",
        "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=270,height=180,dpr=2/tour_img/79fc4eb7a1dd60ff.jpeg",
        "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=270,height=180,dpr=2/tour_img/b91c8b04ace273b7e298eb6f9e1b98a5e3e9e42e9a2e000473e686ec4db0f8cd.jpg",
        "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=270,height=180,dpr=2/tour_img/2dfb5c298fc386fdcbef903b48e24a9c70a603a2af7cb352ff2ba521078134e4.jpg"
      ],
      3: [
        "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=270,height=180,dpr=2/tour_img/64b4db90ce127.png",
        "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=270,height=180,dpr=2/tour_img/1777f2ab7a4a57e6.jpeg",
        "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=270,height=180,dpr=2/tour_img/02ab812e109e9dafaf70bebdc6b6c42993ee383ab380361c4a27b14ae9d4dae5.jpg",
        "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=270,height=180,dpr=2/tour_img/2dfb5c298fc386fdcbef903b48e24a9c70a603a2af7cb352ff2ba521078134e4.jpg"
      ],
      4: [
        "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=270,height=180,dpr=2/tour_img/b91c8b04ace273b7e298eb6f9e1b98a5e3e9e42e9a2e000473e686ec4db0f8cd.jpg",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
        "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=270,height=180,dpr=2/tour_img/9a0fca45a8bc3a101e9d362ac70dd32160cbee91cf777b550a99104df892a962.jpg",
        "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=270,height=180,dpr=2/tour_img/2dfb5c298fc386fdcbef903b48e24a9c70a603a2af7cb352ff2ba521078134e4.jpg"
      ],
      5: [
        "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=270,height=180,dpr=2/tour_img/64b4db90ce127.png",
        "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=270,height=180,dpr=2/tour_img/1777f2ab7a4a57e6.jpeg",
        "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=270,height=180,dpr=2/tour_img/02ab812e109e9dafaf70bebdc6b6c42993ee383ab380361c4a27b14ae9d4dae5.jpg",
        "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=270,height=180,dpr=2/tour_img/9a0fca45a8bc3a101e9d362ac70dd32160cbee91cf777b550a99104df892a962.jpg"
      ],
      6: [
        "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=270,height=180,dpr=2/tour_img/b91c8b04ace273b7e298eb6f9e1b98a5e3e9e42e9a2e000473e686ec4db0f8cd.jpg",
        "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=270,height=180,dpr=2/tour_img/1777f2ab7a4a57e6.jpeg",
        "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=270,height=180,dpr=2/tour_img/9a0fca45a8bc3a101e9d362ac70dd32160cbee91cf777b550a99104df892a962.jpg",
        "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=270,height=180,dpr=2/tour_img/79fc4eb7a1dd60ff.jpeg"
      ]
    };
    return galleries[id] || ["https://images.unsplash.com/photo-1628064980478-7dd7ef17e76b?w=300&h=200&fit=crop"];
  };

  const getReviewsForTutor = (id) => {
    const reviews = {
      1: [
        { id: 1, name: "Sarah Johnson", rating: 5, comment: "Amazing experience! Rajesh showed us hidden gems in Rishikesh that we never would have found on our own.", date: "2 weeks ago", userId: "user1" },
        { id: 2, name: "Michael Chen", rating: 5, comment: "Very knowledgeable about local culture and spirituality. Highly recommended!", date: "1 month ago", userId: "user2" },
        { id: 3, name: "Emma Wilson", rating: 4, comment: "Great guide with excellent English. Made our trip memorable.", date: "2 months ago", userId: "user3" }
      ],
      2: [
        { id: 4, name: "David Brown", rating: 5, comment: "Priya's photography skills are amazing! She helped us capture beautiful memories.", date: "1 week ago", userId: "user4" },
        { id: 5, name: "Lisa Anderson", rating: 5, comment: "Excellent cultural insights and delicious food recommendations.", date: "3 weeks ago", userId: "user5" },
        { id: 6, name: "Robert Taylor", rating: 5, comment: "Professional photographer who knows all the best spots. Highly recommended!", date: "1 month ago", userId: "user6" }
      ],
      3: [
        { id: 7, name: "Jennifer White", rating: 5, comment: "Amit is an excellent trekking guide. Very safety-conscious and knowledgeable about mountain routes.", date: "1 week ago", userId: "user7" },
        { id: 8, name: "Mark Davis", rating: 5, comment: "Best mountain guide in Uttarakhand! Made our Kedarnath trek safe and memorable.", date: "2 weeks ago", userId: "user8" },
        { id: 9, name: "Anna Martinez", rating: 4, comment: "Great experience with professional guidance throughout the trek.", date: "1 month ago", userId: "user9" }
      ],
      4: [
        { id: 10, name: "James Wilson", rating: 5, comment: "Sunita showed us authentic village life and traditional crafts. Wonderful cultural experience!", date: "1 week ago", userId: "user10" },
        { id: 11, name: "Maria Garcia", rating: 5, comment: "Amazing insights into local traditions and handicrafts. Very knowledgeable guide.", date: "3 weeks ago", userId: "user11" },
        { id: 12, name: "Thomas Brown", rating: 4, comment: "Great cultural tour with authentic local experiences.", date: "1 month ago", userId: "user12" }
      ],
      5: [
        { id: 13, name: "Linda Johnson", rating: 5, comment: "Vikram's wildlife knowledge is incredible! Saw amazing birds and animals with his guidance.", date: "2 weeks ago", userId: "user13" },
        { id: 14, name: "Paul Anderson", rating: 5, comment: "Best nature guide for wildlife photography. Knows all the secret spots!", date: "1 month ago", userId: "user14" },
        { id: 15, name: "Sophie Miller", rating: 5, comment: "Excellent eco-tourism experience with professional wildlife guidance.", date: "2 months ago", userId: "user15" }
      ],
      6: [
        { id: 16, name: "Rachel Green", rating: 5, comment: "Meera's yoga sessions were transformative! Perfect spiritual retreat experience.", date: "1 week ago", userId: "user16" },
        { id: 17, name: "Daniel Lee", rating: 5, comment: "Authentic yoga and meditation teacher with deep spiritual knowledge.", date: "2 weeks ago", userId: "user17" },
        { id: 18, name: "Karen Smith", rating: 5, comment: "Best yoga retreat guide! Meera creates a perfect spiritual atmosphere.", date: "1 month ago", userId: "user18" }
      ]
    };
    return reviews[id] || [];
  };

  const handlePayment = async () => {
    if (!user) {
      alert('Please login to make payment');
      return;
    }

    try {
      // Create order data
      const orderData = {
        order_id: 'tutor_booking_' + Date.now(),
        order_amount: paymentData.totalAmount,
        order_currency: 'INR',
        customer_details: {
          customer_id: user.id || 'customer_' + Date.now(),
          customer_name: user.name,
          customer_email: user.email || 'user@example.com',
          customer_phone: '9999999999'
        },
        order_meta: {
          return_url: window.location.origin + '/payment-success',
          tutor_id: tutor.id,
          tutor_name: tutor.name,
          booking_days: paymentData.days
        }
      };

      // Create order (in production, this calls your backend)
      const orderResponse = await createCashfreeOrder(orderData);
      
      if (!orderResponse.payment_session_id) {
        throw new Error('Failed to create payment session');
      }

      // Check if Cashfree SDK is loaded
      if (typeof window.Cashfree === 'undefined') {
        throw new Error('Cashfree SDK not loaded');
      }

      // Initialize Cashfree
      const cashfree = window.Cashfree({
        mode: 'sandbox' // Change to 'production' for live
      });

      const checkoutOptions = {
        paymentSessionId: orderResponse.payment_session_id,
        redirectTarget: '_modal'
      };

      // Open Cashfree checkout
      const result = await cashfree.checkout(checkoutOptions);
      
      if (result.error) {
        console.error('Payment failed:', result.error);
        alert('Payment failed: ' + result.error.message);
        return;
      }

      if (result.paymentDetails) {
        console.log('Payment successful:', result.paymentDetails);
        alert(`Payment successful! Booking confirmed for ${paymentData.days} day(s) with ${tutor.name}`);
        setShowPayment(false);
      }

    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed: ' + error.message);
    }
  };

  const openPaymentModal = () => {
    if (!user) {
      alert('Please login to book a tutor');
      return;
    }
    setPaymentData({ days: 1, totalAmount: tutor.price });
    setShowPayment(true);
  };

  const updatePaymentAmount = (days) => {
    setPaymentData({ days, totalAmount: tutor.price * days });
  };

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
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Reviews</h2>
                {user && (
                  <button 
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
                  >
                    Write Review
                  </button>
                )}
              </div>

              {/* Review Form */}
              {showReviewForm && user && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-3">Write a Review</h3>
                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-2">Rating</label>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setReviewData({...reviewData, rating: star})}
                          className={`w-6 h-6 ${star <= reviewData.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                          <svg fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-2">Comment</label>
                    <textarea
                      value={reviewData.comment}
                      onChange={(e) => setReviewData({...reviewData, comment: e.target.value})}
                      className="w-full p-3 border rounded-lg resize-none"
                      rows="3"
                      placeholder="Share your experience with {tutor.name}..."
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => {
                        const newReview = {
                          id: Date.now(),
                          name: user.name,
                          rating: reviewData.rating,
                          comment: reviewData.comment,
                          date: 'Just now',
                          userId: user._id || user.id
                        };
                        setReviews([newReview, ...reviews]);
                        setShowReviewForm(false);
                        setReviewData({ rating: 5, comment: '' });
                        alert('Review submitted successfully!');
                      }}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium transition-colors"
                    >
                      Submit Review
                    </button>
                    <button 
                      onClick={() => setShowReviewForm(false)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 text-sm font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Existing Reviews */}
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <div key={review.id || index} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{review.name}</h4>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          {[...Array(review.rating)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="text-sm text-gray-500 ml-2">{review.date}</span>
                        </div>
                        {user && (review.userId === user._id || review.userId === user.id) && (
                          <button
                            onClick={() => {
                              if (window.confirm('Are you sure you want to delete this review?')) {
                                setReviews(reviews.filter(r => r.id !== review.id));
                              }
                            }}
                            className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>

              {/* Login prompt for non-logged users */}
              {!user && (
                <div className="text-center py-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 mb-2">Want to write a review?</p>
                  <a href="/login" className="text-blue-600 hover:underline font-medium">Login to share your experience</a>
                </div>
              )}
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
              <p className="mb-4">Book {tutor.name} for your perfect trip!</p>
              <div className="space-y-3">
                <button 
                  onClick={openPaymentModal}
                  className="w-full bg-white text-orange-600 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Book Now - ₹{tutor.price}/day
                </button>
                <button className="w-full border-2 border-white text-white py-2 px-6 rounded-lg font-medium hover:bg-white hover:text-orange-600 transition-colors">
                  Contact First
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Book {tutor.name}</h3>
              <button 
                onClick={() => setShowPayment(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Number of Days</label>
                <select 
                  value={paymentData.days}
                  onChange={(e) => updatePaymentAmount(parseInt(e.target.value))}
                  className="w-full p-3 border rounded-lg"
                >
                  {[1,2,3,4,5,6,7,8,9,10].map(day => (
                    <option key={day} value={day}>{day} day{day > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span>Rate per day:</span>
                  <span>₹{tutor.price}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span>Days:</span>
                  <span>{paymentData.days}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total Amount:</span>
                    <span>₹{paymentData.totalAmount}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                <p>• Secure payment powered by Cashfree</p>
                <p>• 100% refund if cancelled 24hrs before</p>
                <p>• Direct contact with tutor after booking</p>
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowPayment(false)}
                  className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handlePayment}
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Pay ₹{paymentData.totalAmount}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
