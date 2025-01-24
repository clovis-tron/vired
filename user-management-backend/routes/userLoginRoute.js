// Login route for users
app.post("/api/users/login", async (req, res) => {
    try {
      const { email, password, role } = req.body;
  
      // Find the user by email and validate password
      const user = await User.findOne({ email, role });
  
      // Log the user to debug if it's null or not
      console.log("Found User:", user);
  
      if (!user) {
        return res.status(400).json({ error: "User not found." });
      }
  
      // Compare the provided password with the hashed password stored in the DB
      const isMatch = await bcrypt.compare(password, user.password);
  
      // Log the password match result for debugging
      console.log("Password Match:", isMatch);
  
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials." });
      }
  
      // Generate a JWT token
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      // Respond with the generated token
      res.json({ token });
    } catch (error) {
      // Log any unexpected errors that occur
      console.error("Error during login:", error);
      return res.status(500).json({ error: "Server error, try again later." });
    }
  });
  