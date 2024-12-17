
const User = require('../models/User');

const resetPasswordOtp = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    
    if (!email || !otp || !newPassword) {
        return res.status(400).json({ message: "Invalid credentials", valid: false });
    }

    try {
       
        const findUser = await User.findOne({
            where: { email: email }  
        });

        if (!findUser) {
            return res.status(404).json({ message: "User not found", valid: false });
        }

     
        if (findUser.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP", valid: false });
        }

      
        if (findUser.otpExpiry && findUser.otpExpiry < new Date()) {
            return res.status(400).json({ message: "OTP has expired", valid: false });
        }

 
        const bcrypt = require('bcrypt');
        const saltRounds = 10;
         
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        await User.update(
            { password: hashedPassword, otp: null, otpExpiry: null },
            { where: { email: email } }
        );

        return res.status(200).json({ message: "Password reset successful", valid: true });

    } catch (error) {
        console.error("Error resetting password:", error);
        return res.status(500).json({ message: "Server error", valid: false });
    }
};

module.exports = resetPasswordOtp;
