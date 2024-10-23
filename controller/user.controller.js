import AppUser from "../models/user.js";


export const readUser = async (req, res) => {
    const { Email, Password } = req.body;

    try {
        const user = await AppUser.findOne({ Email, Password });

        if (!user) {
            return res.status(404).json({
                outputResponse: null,
                serviceResponse: {
                    status: 404,
                    message: "User not found",
                    timestamp: new Date().toLocaleString(),
                    endpoint: req.originalUrl,
                }
            });
        }

        return res.status(200).json({
            outputResponse: user,
            serviceResponse: {
                status: 200,
                message: "Given filter based AppUser Readed Successfully",
                timestamp: new Date().toLocaleString(),
                endpoint: req.originalUrl,
            }
        });
    } catch (error) {
        return res.status(500).json({
            outputResponse: null,
            serviceResponse: {
                status: 500,
                message: error.message,
                timestamp: new Date().toLocaleString(),
                endpoint: req.originalUrl,
            }
        });
    }
};




export const createUser = async (req, res) => {
    const { Username, Email, Password, ConfirmPassword, PhoneNumber } = req.body;

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

    try {
        const existingUser = await AppUser.findOne({ $or: [{ Email }, { PhoneNumber }] });
        if (existingUser) {
            return res.status(409).json({
                outputResponse: null,
                serviceResponse: {
                    status: 409,
                    message: "Given Email already exists",
                    timestamp: new Date().toLocaleString(),
                    endpoint: req.originalUrl
                }
            });
        }

        const newUser = new AppUser({
            Username,
            Email,
            Password,
            ConfirmPassword,
            PhoneNumber
        });

        const response = await newUser.save();

        return res.status(200).json({
            outputResponse: response,
            serviceResponse: {
                status: 200,
                message: "User created successfully",
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








export const singleReadUser = async (req, res) => {
    try {
        const updateUser = await AppUser.findById(req.params.id);
        if(updateUser === null) {
            return res.status(404).json({ message: "Cannot find User"})
        } else {
            res.json(updateUser)
        }
    } catch(error) {
        return res.status(500).json({message: error.message});
    }
}



export const updateUser = async (req, res) => {
    try {
        const updatedUser =  await AppUser.findOneAndUpdate({ _id: req.params.id}, 
            {
                email: req.body.email,
                password: req.body.password
            },
            {
                new: true  // Its like currently updated data show it
            }
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
};

export const deleteUser = async (req, res) => {
    const UserId = req.params.id;
   // const foundUser = User.findOne( { _id: UserId});

    try {
        await AppUser.deleteOne({ _id: UserId});
        res.json({ message: "User Deleted..."});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }

};
