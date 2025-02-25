const { db } = require('../config/db'); // CouchDB instance

const designDoc = 'users'; // Design document
const userListView = 'userList'; // View name
const userCountView = 'userCount'; // View name
const loginView = 'login'; // View name
const User = {
    createUpdateUser: async (userData) => {
        userData.type = 'user'; // This is essential for the view
        const response = await db.insert(userData);
        if (!response)
            return null;
        userData._id = response.id;
        userData._rev = response.rev;
        return userData ?? null;
    },
    deleteUser: async (id, rev) => {
        const response = await db.destroy(id, rev);
        return response ?? null;
    },
    getUserById: async (id) => {
        const response = await db.get(id);
        return response ?? null;
    },
    getUserByName: async (username) => {
        const response = await db.view(designDoc, loginView, { key: username, include_docs: true });
        return response && response.rows ? response.rows[0] : null;
    },
    getMaximumUID: async () => {
        const response = await db.view(designDoc, userCountView, {});
        return response && response.rows ? response.rows[0].value : null;
    },
    getAllUsers: async () => {
        const response = await db.view(designDoc, userListView, { include_docs: true });
        return response && response.rows ? response.rows.slice(1) : null;
    },
};

module.exports = User;
