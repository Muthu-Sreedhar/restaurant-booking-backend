import AppUser from "../../models/user.js";
import bcrypt from "bcrypt";

export const checkPassword = async (req, res) => {
    const { Email, Password } = req.body;
    console.log('request', Password);

    try {
        const user = await AppUser.findOne({ Email, Password });
        console.log('user', user);

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

        if (!user.IsActive) {
            return res.status(403).json({
                outputResponse: null,
                serviceResponse: {
                    status: 403,
                    message: "User cannot access the application",
                    timestamp: new Date().toLocaleString(),
                    endpoint: req.originalUrl,
                }
            });
        }

        const passwordMatch = Password === user.Password
        //await bcrypt.compare(Password, user.Password);

        console.log('%c⧭', 'color: #aa00ff', user.Password);
        console.log('passwordMatch', passwordMatch);

        if (!passwordMatch) {
            return res.status(404).json({
                outputResponse: null,
                serviceResponse: {
                    status: 404,
                    message: "Incorrect Password",
                    timestamp: new Date().toLocaleString(),
                    endpoint: req.originalUrl,
                }
            });
        }

        return res.status(200).json({
            outputResponse: {
                Username: user.Username,
                Email: user.Email,
                IsActive: user.IsActive,
            },
            serviceResponse: {
                status: 200,
                message: "Login Successfully",
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

