// stripePaymentFrontend.js
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe('your-publishable-key-here');

const handlePayment = async (event) => {
  event.preventDefault();
  
  const stripe = await stripePromise;
  const { token, error } = await stripe.createToken(cardElement);

  if (error) {
    console.error(error);
    return;
  }

  const response = await axios.post('http://localhost:4999/api/subscribe/stripe', {
    userId: 'user-id-here',
    amount: 20, // Example amount in USD
    currency: 'usd',
    token: token.id,
  });

  if (response.status === 200) {
    alert('Subscription Successful!');
  } else {
    alert('Subscription Failed!');
  }
};
