// Subscription Schema
const subscriptionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isActive: { type: Boolean, default: false },
    subscribedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date },
  });
  
  const Subscription = mongoose.model('Subscription', subscriptionSchema);
  
  // Subscription Route
  app.post('/api/subscribe', authenticateAdmin, async (req, res) => {
    const { userId, plan } = req.body; // 'plan' could be "monthly", "yearly", etc.
  
    // Logic to handle payments with MTN or Stripe goes here
  
    // For simplicity, we directly mark the subscription as active (in real scenarios, 
    // this would be triggered after payment verification)
    const newSubscription = new Subscription({
      userId,
      isActive: true,
      expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 1)), // Example of 1 month subscription
    });
  
    await newSubscription.save();
    res.json({ message: "Subscription successful!" });
  });
  