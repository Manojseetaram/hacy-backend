const User = require('../models/User'); // Import the Mongoose model

const resetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email }); // Mongoose query: no 'where' keyword

        if (!user) {
            return res.status(400).json({
                message: "User with this email is not found",
                valid: false
            });
        } else {
            // Generate a random 6-digit OTP as verification token
            const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

            try {
                // Update the user's verification token
                await User.updateOne(
                    { email }, // Filter condition
                    { $set: { verificationToken } } // Update data
                );

                // Send response
                return res.status(200).json({
                    message: "OTP sent to your email",
                    valid: true,
                    email
                });
            } catch (updateError) {
                console.error("Error updating token:", updateError);
                return res.status(500).json({
                    message: "Internal server error"
                });
            }
        }
    } catch (error) {
        console.error("Error finding user:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = resetPassword;
