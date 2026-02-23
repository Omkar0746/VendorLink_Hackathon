const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.json({ success: true, message: "Signup successful" });

  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
