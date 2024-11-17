const isAdmin = (req, res, next) => {
    if (req.user && req.user.roles && req.user.roles.includes('ADMIN')) {
        next(); // User is an admin, proceed to the next middleware or route handler
    } else {
        // User is not an admin, send a forbidden response
        res.status(403).json({
            status: 403,
            message: 'Access denied. Admins only.'
        });
    }
};


const isManager = async (req, res, next) => {
}

module.exports = { isAdmin, isManager }