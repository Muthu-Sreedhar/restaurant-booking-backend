import AppUser from "../../models/user.js";


export const checkAppUser = async (req, res) => {
    const { Email } = req.body;

    try {
        const user = await AppUser.findOne({ Email });

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

        return res.status(200).json({
            outputResponse: {
                Username: user.Username,
                Email: user.Email,
                IsActive: user.IsActive,
            },
            serviceResponse: {
                status: 200,
                message: "Given filter-based AppUser Read Successfully",
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
