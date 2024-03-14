const { User } = require("../model/LoginSignup")

const getUserData = async (req, res) => {
    try {
        const { email } = req.query;
        console.log(email);
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ accountStatus: user.accounttype });
    } catch (error) {
        console.error('Error getting user data:', error);
        res.status(500).json({ message: 'Error getting user data' });
    }
};

module.exports = {
    getUserData
}