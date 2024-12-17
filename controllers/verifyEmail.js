const User = require("../models/User");

const verifyEmail = async (req, res) => {
  const { otp, email } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // If user not found
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        valid: false,
      });
    }

    // Check if the OTP matches
    if (user.verificationToken === otp) {
      try {
        // Update the verificationToken field to null
        await User.updateOne(
          { email }, // Filter condition
          { $set: { verificationToken: null } } // Update operation
        );

        return res.status(200).json({
          message: "OTP is verified",
          valid: true,
        });
      } catch (updateError) {
        console.error("Error updating token:", updateError);
        return res.status(500).json({
          message: "Internal server error",
        });
      }
    } else {
      // If OTP does not match
      return res.status(401).json({
        message: "Invalid OTP",
        valid: false,
      });
    }
  } catch (error) {
    console.error("Error finding user:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = verifyEmail;
