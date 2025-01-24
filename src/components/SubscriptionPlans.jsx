import React, { useState } from "react";
import { useFlutterwave, FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3"; // Import useFlutterwave and FlutterwaveButton

export default function SubscriptionPlans() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currency, setCurrency] = useState("RWF");
  const [paymentOptions, setPaymentOptions] = useState("mobilemoneyrwanda");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Define subscription plans
  const plans = [
    { name: "1 Month", price: 15000, description: "1 Month subscription" },
    { name: "6 Months", price: 60000, description: "6 Months subscription" },
    { name: "1 Year", price: 120000, description: "1 Year subscription" },
  ];

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setIsFormVisible(true); // Show the form once a plan is selected
  };

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneChange = (e) => setPhoneNumber(e.target.value);
  const handleCurrencyChange = (e) => setCurrency(e.target.value);
  const handlePaymentOptionChange = (e) => setPaymentOptions(e.target.value);

  // Define the Flutterwave config
  const config = {
    public_key: "FLWPUBK_TEST-30010dbc0f63942239a7796d2c3bea45-X", // Replace with your public key
    tx_ref: Date.now(), // Transaction reference
    amount: selectedPlan ? selectedPlan.price : 0, // Amount in cents/smallest currency unit
    currency: currency,
    payment_options: paymentOptions,
    customer: {
      email: email,
      phone_number: phoneNumber,
      name: name,
    },
    customizations: {
      title: "Subscription Payment",
      description: selectedPlan ? `Payment for ${selectedPlan.name} subscription` : "Select a plan",
    },
  };

  // Flutterwave payment modal hook
  const { openPaymentModal } = useFlutterwave(config);

  // Define the Flutterwave configuration with callback
  const fwConfig = {
    ...config,
    text: "Pay with Flutterwave!",
    callback: (response) => {
      console.log(response);
      if (response.status === "successful") {
        alert("Payment Successful!");
      } else {
        alert("Payment Failed. Please try again.");
      }
      closePaymentModal(); // Close the modal programmatically
    },
    onClose: () => {
      console.log("Payment modal closed");
    },
  };

  // Initiate payment when the "Pay Now" button is clicked
  const initiatePayment = () => {
    if (!name || !email || !phoneNumber || !selectedPlan) {
      setError("Please fill all the fields.");
      return;
    }
    setIsLoading(true);
    openPaymentModal(); // Trigger Flutterwave modal to initiate payment
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Choose Your Subscription Plan</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-gray-800 rounded-lg border-2 border-transparent p-6 cursor-pointer hover:border-indigo-500 hover:bg-gray-700 ${selectedPlan === plan ? "border-indigo-500 bg-gray-700" : ""}`}
              onClick={() => handlePlanSelect(plan)}
            >
              <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
              <p className="text-gray-400">{plan.description}</p>
              <div className="mt-4">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded">
                  {selectedPlan === plan ? "Selected" : "Choose Plan"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {isFormVisible && (
          <div className="mt-8 p-6 bg-gray-800 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Enter Your Payment Details</h3>

            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                placeholder="Enter your full name"
                value={name}
                onChange={handleNameChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                placeholder="Enter your email address"
                value={email}
                onChange={handleEmailChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-gray-300 mb-2">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={handlePhoneChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="currency" className="block text-gray-300 mb-2">Currency</label>
              <select
                id="currency"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                value={currency}
                onChange={handleCurrencyChange}
              >
                <option value="RWF">RWF</option>
                <option value="NGN">NGN</option>
                <option value="USD">USD</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="paymentOptions" className="block text-gray-300 mb-2">Payment Option</label>
              <select
                id="paymentOptions"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                value={paymentOptions}
                onChange={handlePaymentOptionChange}
              >
                <option value="mobilemoneyrwanda">Mobile Money Rwanda</option>
                <option value="card">Credit/Debit Card</option>
                <option value="ussd">USSD</option>
              </select>
            </div>

            <div className="mt-6">
              <button
                className={`bg-orange-500 text-white px-6 py-3 rounded-lg ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isLoading}
                onClick={initiatePayment} // Use initiatePayment here
              >
                {isLoading ? "Processing..." : "Pay Now"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
