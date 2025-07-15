const axios = require('axios');

const registerApp = async () => {
  try {
    await axios.post(process.env.REGISTER_URL, {
      email: "vedanshi27vishu@gmail.com",
      name: "vedanshi aggarwal",
      rollNo: "2200270130193",
      accessCode: "uuMbyY",
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    });
    console.log("✅ App registered successfully");
  } catch (err) {
    console.error("❌ Registration failed:", err.message);
  }
};

module.exports = { registerApp };
