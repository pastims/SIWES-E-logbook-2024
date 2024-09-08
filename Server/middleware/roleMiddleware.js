const roleMiddleware = (requiredRole) => (req, res, next) => {
    if (req.user.role === requiredRole) {
        next();
    } else {
        res.status(403).json({message: "Access Forbidden - role."});
    }
};

export { roleMiddleware }