

const allowedIp = 'localhost'; // Replace this with the specific IP you want to allow

// Middleware to check IP address before login
const checkIpMiddleware = (req, res, next) => {
    const clientIp = req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress;

    if ((clientIp === allowedIp || clientIp === `::ffff:${allowedIp}`
        || clientIp === '::1' || clientIp === '127.0.0.1')) {//&& !isAdmin // IPv6 and IPv4 compatibility
        return true; // Allow login if the IP matches
    } else {
        return false;
    }
};

module.exports = checkIpMiddleware;
