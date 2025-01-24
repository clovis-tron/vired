// mtnPayment.js
const axios = require('axios');

app.post('/api/subscribe/mtn', authenticateAdmin, async (req, res) => {
  const { userId, amount, phoneNumber } = req.body;

  try {
    const response = await axios.post('https://api.mtn.com/payment/initialize', {
      amount: amount,
      phoneNumber: phoneNumber,
      apiKey: process.env.MTN_API_KEY,
    });

    if (response.data.status === 'success') {
      const subscription = new Subscription({
        userId,
        isActive: true,
        startDate: new Date(),
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      });

      await subscription.save();
      res.status(200).json({ message: 'Subscription successful' });
    } else {
      res.status(400).json({ error: 'Payment failed.' });
    }
  } catch (error) {
    console.error('MTN Payment Error:', error);
    res.status(500).json({ error: 'Error processing MTN payment.' });
  }
});
