// routes/subscriptionRoutes.js
const express = require('express');
const Subscription = require('../models/subscriptionModel');
const authenticateAdmin = require('../middleware/authenticateAdmin');
const router = express.Router();

// Create a new subscription
router.post('/api/subscriptions', authenticateAdmin, async (req, res) => {
  const { userId, expirationDate } = req.body;

  const existingSubscription = await Subscription.findOne({ userId });
  if (existingSubscription) {
    return res.status(409).json({ error: 'Subscription already exists for this user.' });
  }

  const subscription = new Subscription({
    userId,
    expirationDate,
    isActive: true,
  });

  await subscription.save();
  res.status(201).json({ message: 'Subscription created successfully.', subscription });
});

// Activate subscription after payment
router.post('/api/activate-subscription', authenticateAdmin, async (req, res) => {
  const { userId, expirationDate } = req.body;

  const subscription = await Subscription.findOne({ userId });
  if (!subscription) {
    return res.status(404).json({ error: 'No subscription found for this user.' });
  }

  subscription.isActive = true;
  subscription.expirationDate = expirationDate;

  await subscription.save();
  res.json({ message: 'Subscription activated successfully.' });
});

// Check subscription status
router.get('/api/subscription-status', authenticateAdmin, async (req, res) => {
  const userId = req.admin.id; // The userId is obtained from the JWT payload

  const subscription = await Subscription.findOne({ userId });
  if (!subscription || !subscription.isActive || subscription.expirationDate < new Date()) {
    return res.status(403).json({ error: 'Your subscription is either inactive or expired.' });
  }

  res.json({ message: 'Subscription is active.', subscription });
});

module.exports = router;
