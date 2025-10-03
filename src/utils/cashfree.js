// Cashfree Payment Gateway Integration
// Note: In production, these API calls should be made from your backend server

const CASHFREE_CONFIG = {
  // Replace with your actual Cashfree credentials
  APP_ID: 'TEST_APP_ID', // Get from Cashfree Dashboard
  SECRET_KEY: 'TEST_SECRET_KEY', // Get from Cashfree Dashboard
  BASE_URL: 'https://sandbox.cashfree.com/pg', // Use https://api.cashfree.com/pg for production
};

export const createCashfreeOrder = async (orderData) => {
  try {
    // In a real implementation, this should be called from your backend
    // This is just for demonstration purposes
    
    const orderPayload = {
      order_id: orderData.order_id,
      order_amount: orderData.order_amount,
      order_currency: orderData.order_currency || 'INR',
      customer_details: orderData.customer_details,
      order_meta: {
        return_url: orderData.order_meta?.return_url || window.location.origin + '/payment-success',
        notify_url: orderData.order_meta?.notify_url || window.location.origin + '/api/payment-webhook'
      }
    };

    // Simulate API response for demo
    // In production, make actual API call to your backend
    const mockResponse = {
      cf_order_id: Date.now(),
      order_id: orderPayload.order_id,
      payment_session_id: 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      order_status: 'ACTIVE',
      order_amount: orderPayload.order_amount,
      order_currency: orderPayload.order_currency
    };

    return mockResponse;
  } catch (error) {
    console.error('Error creating Cashfree order:', error);
    throw error;
  }
};

export const verifyCashfreePayment = async (orderId) => {
  try {
    // In production, verify payment status from your backend
    // This is just for demonstration
    
    const mockVerification = {
      order_id: orderId,
      order_status: 'PAID',
      payment_status: 'SUCCESS',
      cf_payment_id: Date.now(),
      payment_amount: 2500,
      payment_currency: 'INR',
      payment_time: new Date().toISOString()
    };

    return mockVerification;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};

// Payment configuration for different environments
export const getPaymentConfig = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  return {
    mode: isProduction ? 'production' : 'sandbox',
    app_id: CASHFREE_CONFIG.APP_ID,
    // Note: Never expose secret key in frontend in production
    // This should only be used in backend
  };
};