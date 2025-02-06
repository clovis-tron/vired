import React, { useState } from 'react';
import axios from 'axios';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [error, setError] = useState('');

  const handlePayment = async () => {
    try {
      const paymentDetails = {
        amount: 10, // Subscription fee
        phoneNumber: 'USER_PHONE_NUMBER', // Get this from user input for MoMo
      };

      if (paymentMethod === 'mobile-money') {
        const response = await axios.post('http://localhost:4999/api/momo-payment', paymentDetails);
        alert('Payment initiated: ' + response.data.message);
      } else if (paymentMethod === 'credit-card') {
        const response = await axios.post('http://localhost:4999/api/stripe-payment', paymentDetails);
        window.location.href = `https://checkout.stripe.com/pay/${response.data.clientSecret}`;
      }
    } catch (err) {
      setError('Payment failed. Please try again later.');
    }
  };

  return (
    <div>
      <button onClick={() => setPaymentMethod('mobile-money')}>Pay with Mobile Money</button>
      <button onClick={() => setPaymentMethod('credit-card')}>Pay with Credit Card</button>
      <button onClick={handlePayment}>Proceed with Payment</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default PaymentPage;
