import AppUser from '../../models/user.js';
import bcrypt from 'bcrypt';

export const createAppUser = async (req, res) => {
    const { Username, Email, Password, ConfirmPassword, PhoneNumber, IsActive } = req.body;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
        return res.status(400).json({
            serviceResponse: {
                status: 400,
                message: "Invalid Email format",
                timestamp: new Date().toLocaleString(),
                endpoint: req.originalUrl 
            }
        });
    }

    // Password validation (at least one letter, one number, one special character)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    if (!passwordRegex.test(Password)) {
        return res.status(400).json({
            serviceResponse: {
                status: 400,
                message: "Password must contain at least one letter, one number, and one special character",
                timestamp: new Date().toLocaleString(),
                endpoint: req.originalUrl
            }
        });
    }

    // Check if Password and ConfirmPassword match
    if (Password !== ConfirmPassword) {
        return res.status(400).json({
            serviceResponse: {
                status: 400,
                message: "Password and Confirm Password do not match",
                timestamp: new Date().toLocaleString(),
                endpoint: req.originalUrl
            }
        });
    }

    // Phone number validation (must be exactly 10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(PhoneNumber)) {
        return res.status(400).json({
            serviceResponse: {
                status: 400,
                message: "Phone number must be exactly 10 digits",
                timestamp: new Date().toLocaleString(),
                endpoint: req.originalUrl
            }
        });
    }

    // Validate IsActive is a boolean
    if (typeof IsActive !== 'boolean') {
        return res.status(400).json({
            serviceResponse: {
                status: 400,
                message: "IsActive must be a boolean value",
                timestamp: new Date().toLocaleString(),
                endpoint: req.originalUrl
            }
        });
    }

    try {
        // Check if user already exists (by Email or PhoneNumber)
        const existingUser = await AppUser.findOne({ $or: [{ Email }, { PhoneNumber }] });
        if (existingUser) {
            return res.status(409).json({
                outputResponse: null,
                serviceResponse: {
                    status: 409,
                    message: "Given Email or PhoneNumber already exists",
                    timestamp: new Date().toLocaleString(),
                    endpoint: req.originalUrl
                }
            });
        }

        // Create a new user with hashed password
        const newUser = new AppUser({
            Username,
            Email,
            Password,   // Only store the hashed password
            ConfirmPassword,   // Only store the hashed password
            PhoneNumber,
            IsActive
        });

        const savedUser = await newUser.save();

        // Create a copy of the response excluding sensitive data like Password
        const outputResponse = {
            Username: savedUser.Username,
            Email: savedUser.Email,
            Password: savedUser.Password,   // Only store the hashed password
            ConfirmPassword: savedUser.ConfirmPassword,   
            PhoneNumber: savedUser.PhoneNumber,
            IsActive: savedUser.IsActive
        };

        return res.status(200).json({
            outputResponse,  // Return only necessary fields without Password or ConfirmPassword
            serviceResponse: {
                status: 200,
                message: "User Created Successfully",
                timestamp: new Date().toLocaleString(),
                endpoint: req.originalUrl
            }
        });

    } catch (error) {
        return res.status(500).json({
            outputResponse: null,
            serviceResponse: {
                status: 500,
                message: error.message,
                timestamp: new Date().toLocaleString(),
                endpoint: req.originalUrl
            }
        });
    }
};
