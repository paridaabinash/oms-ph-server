const bcrypt = require('bcrypt');

const saltRounds = 10; // The cost factor, higher is more secure but slower
const Encrypt = {
    hashPassword: async function (plainPassword) {
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        return hashedPassword;
    },
    verifyPassword: async function (plainPassword, hashedPassword) {
        if (!plainPassword || !hashedPassword) {
            console.error("Password or hash is missing!");
            return false;
        }
        const match = await bcrypt.compare(plainPassword, hashedPassword);
        return match;
    }
}
module.exports = Encrypt;