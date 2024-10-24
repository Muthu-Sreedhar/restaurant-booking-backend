import AppUser from '../../models/user.js';

export const updatePasswordAppUser = async (req, res) => {
    const { Username, Email, NewPassword, ConfirmPassword } = req.body;

    if (NewPassword !== ConfirmPassword) {
        return res.status(400).json({ 
            serviceResponse: {
                status: 400,
                endpoint: req.originalUrl,
                time: new Date().toISOString(),
                message: "NewPassword and ConfirmPassword do not match"
            }
        });
    }

    try {
        const user = await AppUser.findOne({ Username, Email });
    
        if (!user) {
            return res.status(404).json({ 
                serviceResponse: {
                    status: 404,
                    endpoint: req.originalUrl,
                    time: new Date().toISOString(),
                    message: "Given Username & Email is not found"
                }
            });
        }

        user.Password = NewPassword;
        user.ConfirmPassword = ConfirmPassword;
        await user.save();

        return res.status(200).json({ 
            serviceResponse: {
                status: 200,
                endpoint: req.originalUrl,
                time: new Date().toISOString(),
                message: "Password updated successfully"
            }
        });
    } catch (error) {
        return res.status(500).json({ 
            serviceResponse: {
                status: 500,
                endpoint: req.originalUrl,
                time: new Date().toISOString(),
                message: error.message || "An error occurred during the update"
            }
        });
    }
    
};
