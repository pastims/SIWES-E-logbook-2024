// import { req.user } from '../middleware/authMiddleware'

// const idMiddleware = (requiredId) => (req, res, next) => {
//     if (req.user.id === requiredId) {
//         next();
//     } else {
//         res.status(403).json({message: "Access Forbidden - id."});
//     }
// };

// const idMiddleware = (req, res, next) => {
//     const userIdFromToken = req.user.id;
//     const userIdFromParams = req.params.id;

//     if (userIdFromToken !== userIdFromParams) {
//         res.status(403).json({message: "Access Denied. User ID mismatch."});
//     }
//     next();
// }

const idMiddleware = (req, res, next) => {
    const userIdFromParams = req.params.id;
    const userIdFromToken = req.user.id;

    if (!userIdFromParams) {
        return res.status(400).json({message: 'user ID is required'});
    }

    if (!userIdFromToken) {
        return res.status(400).json({message: 'user token ID is required'});
    }

    if (String(userIdFromToken) !== String(userIdFromParams)) {
        // res.status(403).json({message: "Access Denied. User ID mismatch."});
        // res.status(403).json({message: `Access Denied. User ID mismatch. ${userIdFromParams} and ${userIdFromToken}`});
        return next(new Error('Forbidden'))
        // userIdFromParams = userIdFromToken;
    }
    next();
}

export { idMiddleware }