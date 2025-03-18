require('dotenv').config();
const User = require('../models/userModel');
const auth = require('./authController')
const checkIp = require('../middlewares/ipMiddleware')
const jwt = require('jsonwebtoken');

// Create default admin user if not exists
const initializeAdmin = async () => {
    const defaultAdmin = {
        type: "user",
        _id: 'u-1',
        username: 'superadmin0',
        displayname: 'Administrator',
        password: await auth.hashPassword('admin123'),
        role: "Admin",
        isAdmin: true
    };
    const existingAdmin = await User.getUserByName(defaultAdmin.username);
    if (!existingAdmin) {
        await User.createUpdateUser(defaultAdmin);
    }
};
// Call the initialization
initializeAdmin();

const controller = {
    registerUser: async (req, res) => {
        try {
            const userData = req.body;
            const user = await User.getUserByName(userData.username);
            if (user) {
                console.log("duplicate");
                return res.json({ error: 'User Name already exists.', message: 'User Name already exists!' });
            }
            console.log("aaa");
            const maxid = await User.getMaximumUID();
            userData._id = "u-" + (maxid + 1);
            userData.password = await auth.hashPassword(userData.password);
            const response = await User.createUpdateUser(userData);
            res.status(201).json(response);
        } catch (error) {
            res.json({ error: 'Failed to create user.', message: 'Failed to create user!' });
        }
    },
    updateUser: async (req, res) => {
        try {
            const userData = req.body;
            const response = await User.createUpdateUser(userData);
            res.status(201).json(response);
        } catch (error) {
            res.json({ error: 'Failed to update user.' + error.message });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { _id, _rev } = req.body;
            const response = await User.deleteUser(_id, _rev);
            res.status(201).json(response);
        } catch (error) {
            res.json({ error: 'Failed to update user.' + error.message });
        }
    },
    loginUser: async (req, res) => {
        const { username, password } = req.body;
        const user = await User.getUserByName(username);
        if (!user)
            return res.json({ error: 'Invalid username.', message: 'Invalid username!' });
        const passwordMatches = await auth.verifyPassword(password, user.doc.password);

        //if (!user.doc.isAdmin) { // if not admin authorize connected ip
        //    const checkIPifNotAdmin = await checkIp(req, res, user.doc.isAdmin);
        //    if (!checkIPifNotAdmin)
        //        return res.json({ message: 'Unauthorized: Access from this IP is not allowed' });
        //}
        delete user.doc.password;
        if (passwordMatches) {
            const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ user: user.doc, message: 'Login successful!', token });
        } else {
            return res.json({ error: 'Invalid password.', message: 'Invalid password!' });
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const response = await User.getAllUsers();
            if (response)
                return res.status(200).json({ response })
            else
                return null;
        } catch (error) {
            res.status(500).json({ error: 'Could not fetch User List.' + error.message });
        }
    },
    changePassword: async (req, res) => {
        try {
            const userData = req.body;
            const doc = await User.getUserById(userData._id);
            userData._rev = doc._rev;
            userData.password = await auth.hashPassword(userData.password);
            const response = await User.createUpdateUser(userData);
            if (response)
                return res.status(200).json({ response })
            else
                return null;
        } catch (error) {
            res.status(500).json({ error: 'Could not change password.' + error.message });
        }
    },
}

module.exports = { controller };