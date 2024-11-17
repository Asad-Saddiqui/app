const jwt = require('jsonwebtoken');
const User = require('../Models/User')
const verifyotpToken = (req, res, next) => {

    const token = req.cookies['otpToken']; // Replace 'accessToken' with your actual cookie name
    if (!token) {
        return res.status(403).json({
            status: 403,
            errors: [{
                type: "field",
                msg: "You are Unauthorized.",
            }]
        });
    }

    // Verify the token using your secret key
    jwt.verify(token, process.env.OTP_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                status: 403,
                errors: [{
                    type: "field",
                    msg: "You are Unauthorized.",
                }]
            });
        }
        // Attach decoded user information to request object
        req.user = decoded;
        next();
    });
};

const resetauthToken = (req, res, next) => {
    const token = req.cookies['otpToken']; 
    if (!token) {
        return res.status(403).json({
            status: 403,
            errors: [{
                type: "field",
                msg: "You are Unauthorized.",
            }]
        });
    }
    jwt.verify(token, process.env.OTP_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                status: 403,
                errors: [{
                    type: "field",
                    msg: "You are Unauthorized.",
                }]
            });
        }
        req.user = decoded;
        next();
    });
};


const RolePermission = (role, admin) => {
    return async (req, res, next) => {
        try {
            const user = await User.findById(req.user.id).select('roles');
            const hasPermission = user.roles.includes(role) || user.roles.includes(admin);
            if (hasPermission) {
                next();
            } else {
                return res.status(403).json({
                    status: 403,
                    errors: [{
                        type: "field",
                        mag: 'Access Denied: Insufficient role permissions'
                    }]
                });
            }
        } catch (error) {
            return res.status(403).json({
                status: 403,
                errors: [{
                    type: "Error",
                    msg: JSON.stringify(error),
                }]
            });
        }
    };
};
const hasAccess = (role, type) => {
    return async (req, res, next) => {
        try {
            // Fetch the roles of the user from the database using their ID
            // DataEntry
            let RequiredRole;
            if (role === 'ADMIN') {
                RequiredRole = "Admin"
            } else if (role === 'ACCOUNTANT') {
                RequiredRole = "Accountant"
            } else if (role === 'DATA_ENTRY') {
                RequiredRole = "DataEntry"
            } else if (role === 'MANAGER') {
                RequiredRole = "Manager"
            }
            const user = await User.findById(req.user.id).select('roles permissions');
            const hasPermission = user.roles.includes(role);
            const resourcePermission = user.permissions.find((perm) => perm.resource === RequiredRole);
            let isAccess = resourcePermission ? resourcePermission.access[type] || false : false;
            if (hasPermission, isAccess) {
                next();
            } else {
                return res.status(403).json({
                    status: 403,
                    errors: [{
                        type: "field",
                        msg: 'Access Denied: Insufficient  Action'
                    }]
                });
            }
        } catch (error) {
            return res.status(403).json({
                status: 403,
                errors: [{
                    type: "Error",
                    msg: JSON.stringify(error),
                }]
            });
        }
    };
};




// Export the middleware

const verifyaccessToken = (req, res, next) => {
    // Get the token from the cookies
    const token = req.cookies['accessToken']; // Replace 'accessToken' with 
    if (!token) {
        return res.status(403).json({
            status: 403,
            errors: [{
                type: "field",
                msg: "You are Unauthorized999.",
            }]
        });
    }

    // Verify the token using your secret key
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                status: 403,
                errors: [{
                    type: "field",
                    msg: "You are Unauthorized.",
                }]
            });
        }

        // Attach decoded user information to request object
        req.user = decoded;
        next();
    });
};


const verifyrefreshToken = (req, res, next) => {
    // Get the token from the cookies
    const token = req.cookies['refreshToken']; // Replace 'accessToken' with your actual cookie name

    if (!token) {
        return res.status(403).json({
            status: 403,
            errors: [{
                type: "field",
                msg: "You are Unauthorized.",
            }]
        });
    }

    // Verify the token using your secret key
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                status: 403,
                errors: [{
                    type: "field",
                    msg: "You are Unauthorized.",
                }]
            });
        }

        // Attach decoded user information to request object
        req.user = decoded;
        next();
    });
};

module.exports = { verifyotpToken, verifyaccessToken, verifyrefreshToken, resetauthToken, RolePermission, hasAccess };
