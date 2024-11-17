const User = require('../../Models/User');
const { EmailFuncationality, resetPassword: RessetEmailFuncationality } = require("../../Services/OtpSender");
const { validationResult } = require('express-validator');
const { generateOtpToken } = require("../../config/otpToken");
const { generateRefreshToken } = require("../../config/refreshtoken");
const { generateToken } = require("../../config/jwtToken");
const bcrypt = require("bcrypt");
const { default: mongoose } = require('mongoose');

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log('login')
    try {
        // Validate the request
        if (!email || !password) {
            return res.status(400).json({
                status: 400,
                errors: [{
                    type: "field",
                    msg: "Email and password are required.",
                }]
            });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                status: 404,
                errors: [{
                    type: "field",
                    msg: "User not found.",
                }]
            });
        }

        // Check if the password matches
        // const isMatch = await bcrypt.compareSync(password, user.password);
        const isMatch = password === user.password;

        if (!isMatch) {
            return res.status(400).json({
                status: 400,
                errors: [{
                    type: "field",
                    msg: "Invalid credentials.",
                }]
            });
        }

        // Check if the user is verified
        if (!user.isVerified) {
            return res.status(400).json({
                status: 400,
                errors: [{
                    type: "field",
                    msg: "User is not verified. Please verify your email.",
                }]
            });
        }

        // Generate tokens
        const accessToken = generateToken({ id: user._id, email: user.email, roles: user.roles });
        const refreshToken = generateRefreshToken({ id: user._id, email: user.email });

        // Update user with the new refresh token
        await User.findByIdAndUpdate(user._id, { refreshToken: refreshToken }, { new: true });

        // Set tokens in cookies
        res.cookie('accessToken', accessToken, {
            maxAge: 259200000, // 3 days
        });
        res.cookie('refreshToken', refreshToken, {
            maxAge: 604800000, // 7 days
        });
        res.cookie('roles', JSON.stringify(user.roles), {
            maxAge: 604800000, // 7 days
        });
        res.cookie('permission', JSON.stringify(user.permissions), {
            maxAge: 604800000, // 7 days
        });

        return res.status(200).json({
            status: 200,
            message: "Login successful.",
            auth: {
                _id: user._id,
                username: user.username,
                email: user.email,
                roles: user.roles,
                accessToken,
                refreshToken,
                isVerified: user.isVerified,
                permissions: user.permissions,
            }
        });

    } catch (err) {
        console.error("Login Error:", err.message);
        return res.status(500).json({
            status: 500,
            errors: [{
                type: "server",
                msg: "Server error during login. Please try again later.",
            }]
        });
    }
};



function generateOTP() {
    const characters = 'ABCDEFGHiJKLMNOPQRSTUVWXYZabcdefghijkLmnopqrstuvwxyz0123456789@$';
    let otp = '';
    for (let i = 0; i < 6; i++) {
        otp += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return otp;
}

const signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            errors: errors.array()
        });
    }
    // ['ADMIN', 'ACCOUNTANT', 'DATA_ENTRY', 'AGENT', 'MANAGER']
    try {
        const { username, email, password, roles } = req.body;

        let role_ = roles.filter((dta, i) => {
            if (dta !== 'AGENT') {
                return dta
            }
        })

        let permissions = role_.map((role) => {
            if (role === 'ADMIN') {
                return {
                    "resource": "Admin",
                    "access": {
                        "View": true,
                        "Edit": true,
                        "Delete": true,
                        "Add": true
                    }
                }
            } else if (role === 'ACCOUNTANT') {
                return {
                    "resource": "Accountant",
                    "access": {
                        "View": true,
                        "Edit": true,
                        "Delete": false,
                        "Add": true
                    }
                }
            } else if (role === 'DATA_ENTRY') {
                return {
                    "resource": "DataEntry",
                    "access": {
                        "View": true,
                        "Edit": true,
                        "Delete": false,
                        "Add": true
                    }
                }
            } else if (role === 'MANAGER') {
                return {
                    "resource": "Manager",
                    "access": {
                        "View": true,
                        "Edit": true,
                        "Delete": false,
                        "Add": true
                    }
                }
            }
        });


        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: 400,
                errors: [{
                    type: "field",
                    value: email,
                    msg: "User already exists",
                    path: "email",
                    location: "body"
                }]
            });
        }

        // Hash the password
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = await User.create({
            username,
            email,
            password: password, // Save hashed password
            roles,
            isVerified: true,
            permissions
        });

        // Generate OTP and OTP Token
        const otp = generateOTP();
        const otpToken = generateOtpToken({ id: newUser._id, email: newUser.email });
        const otpArray = password.split('');

        // Update the user with OTP
        await User.findByIdAndUpdate(newUser._id, { otp: otp }, { new: true });

        // Send OTP via email
        const emailSent = await EmailFuncationality(newUser.email, "Your Credentials", password);
        console.log('emailSent', emailSent)
        if (!emailSent) {
            return res.status(400).json({
                status: 400,
                errors: [{
                    type: "field",
                    value: email,
                    msg: "Failed to send OTP. Please try again.",
                }]
            });
        }

        // // Set OTP token in cookies
        // res.cookie('otpToken', otpToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 3600000 }); // 1 hour

        return res.status(200).json({
            status: 200,
            message: "User created successfully",
        });

    } catch (err) {
        console.error("Signup Error:", err.message);
        return res.status(500).json({
            status: 500,
            errors: [{
                type: "server",
                msg: "Server error during Add user. Please try again later.",
            }]
        });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password -otp');
        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error: Unable to fetch users',
        });
    }
};
const getUserByID = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({ _id: id }).select('-password -otp'); // 
        if (user) {
            res.status(200).json({
                success: true,
                data: user,
            });
        } else {
            res.status(400).json({
                success: false,
                msg: "User Not Found",
            });
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error: Unable to fetch users',
        });
    }
};

const assignPermissions = async (req, res) => {
    const id = req.params.id;

    try {
        const roles = req.body.map((dta, i) => {
            if (dta.access.View || dta.access.Edit || dta.access.Delete || dta.access.Add) {
                return dta;
            }
        }).map((dta) => {
            if (dta.resource === 'DataEntry') {
                return "DATA_ENTRY"
            }
            return dta.resource.toUpperCase()
        })
        console.log('roles', roles)
        const updatedUser = await User.findByIdAndUpdate(
            { _id: id },
            { permissions: req.body, roles: roles },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({
            message: 'Permissions updated successfully',
            user: updatedUser
        });
    } catch (error) {
        console.error('Error updating permissions:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getPermissions = async (req, res) => {
    try {
        // Extract user ID from the request object
        const id = req.user.id;

        // Fetch the user's permissions and roles from the database
        const user = await User.findById(id).select('permissions roles');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Log the permissions for debugging (optional)
        console.log('permissions', user.permissions);

        // Send the user's permissions and roles in the response
        return res.status(200).json({
            permissions: user.permissions,
            roles: user.roles,
        });
    } catch (error) {
        console.error('Error fetching permissions:', error);
        return res.status(500).json({ message: 'Server error while fetching permissions' });
    }
};


const verify = async (req, res, next) => {
    const user = req.user;
    const { otp } = req.body;
    try {
        const findUser = await User.findOne({ email: user.email }).select('-password');
        if (!findUser) {
            return res.status(400).json({
                status: 400,
                errors: [{
                    type: "field",
                    msg: "Invalid Credentials",
                }]
            });
        }

        if (otp !== findUser.otp) {
            return res.status(400).json({
                status: 400,
                errors: [{
                    type: "field",
                    msg: "Invalid OTP",
                }]
            });
        }
        const updatedUser = await User.findByIdAndUpdate(findUser._id, { isVerified: true }, { new: true });
        delete updatedUser.otp;
        res.clearCookie('otpToken');
        next();


    } catch (err) {
        return res.status(500).json({
            status: 500,
            errors: [{
                type: "server",
                msg: "Server error during OTP verification. Please try again later.",
            }]
        });
    }
};

const resendOtp = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                status: 404,
                errors: [{
                    type: "field",
                    msg: "User not found",
                }]
            });
        }

        const otp = generateOTP();

        const otpToken = generateOtpToken({ id: user._id, email: user.email });
        const otpArray = otp.split('');
        await User.findByIdAndUpdate(user._id, { otp: otp }, { new: true });
        const emailSent = await EmailFuncationality(email, "OTP", otpArray);
        if (!emailSent) {
            console.log('emailSent', emailSent)
            return res.status(400).json({
                status: 400,
                errors: [{
                    type: "field",
                    value: email,
                    msg: "Failed to send OTP. Please try again.",
                }]
            });
        }
        res.cookie('otpToken', otpToken, { httpOnly: true, maxAge: 3600000 }); // 1 hour
        console.log('first')
        return res.status(200).json({
            status: 200,
            message: "OTP send successfully.",

        });

    } catch (err) {
        console.error("Resend OTP Error:", err);
        return res.status(500).json({
            status: 500,
            errors: [{
                type: "server",
                msg: "Server error during OTP resend. Please try again later.",
            }]
        });
    }
};
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                status: 404,
                errors: [{
                    type: "field",
                    msg: "User not found.",
                }]
            });
        }

        const resetToken = generateOtpToken({ id: user._id, email: user.email });
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/`;
        const emailSent = await RessetEmailFuncationality(user.email, "Password Reset", [`Click here to reset your password: ${resetLink}`]);
        if (!emailSent) {
            return res.status(400).json({
                status: 400,
                errors: [{
                    type: "field",
                    msg: "Failed to send reset email. Please try again.",
                }]
            });
        }
        res.cookie('resetToken', resetToken, {
            httpOnly: true,
            maxAge: 259200000 // 3 days
        });

        return res.status(200).json({
            status: 200,
            message: "Password reset link sent successfully.",
            resetToken
        });

    } catch (err) {
        console.error("Forgot Password Error:", err.message);
        return res.status(500).json({
            status: 500,
            errors: [{
                type: "server",
                msg: "Server error during password reset. Please try again later.",
            }]
        });
    }
};

const resetPassword = async (req, res) => {
    const { password } = req.body;
    const user_ = req.user;
    if (!password?.trim()) {
        return res.status(400).json({
            status: 400,
            errors: [{
                type: "field",
                msg: "New password is required.",
            }]
        });
    }
    try {
        const user = await User.findById(user_.id);
        if (!user) {
            return res.status(404).json({
                status: 404,
                errors: [{
                    type: "field",
                    msg: "User not found.",
                }]
            });
        }
        user.password = password;
        await user.save();
        res.clearCookie('otpToken');
        return res.status(200).json({
            status: 200,
            message: "Password reset successfully.",
        });

    } catch (err) {
        console.error("Reset Password Error:", err.message);
        return res.status(500).json({
            status: 500,
            errors: [{
                type: "server",
                msg: "Server error during password reset. Please try again later.",
            }]
        });
    }
};



module.exports = { login, signup, verify, resendOtp, forgotPassword, resetPassword, getUsers, assignPermissions, getUserByID, getPermissions };
