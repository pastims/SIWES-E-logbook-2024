import jwt from "jsonwebtoken";

// const checkRole = (role) => {
//     return (req, res, next) => {
//         if (req.user && req.user.role === role) {
//             const token = req.header('Authorization');
//             if (!token) return res.status(401).json({message: "Access denied. No token provided."});
//             try {
//                 const decoded = jwt.verify(token, process.env.JWT_SECRET);
//                 if (req.user.role === role) {
//                     next();
//                 } else {
//                     return res.status(403).json({ message: "Access denied. Insufficient privileges." });
//                 }
//             } catch (error) {
//                 return res.status(400).json({ message: "Invalid token." });
//             }
//         }
//     };
// }

// export { checkRole };

const authMiddleware = (req, res, next) => {

        const token = req.header('Authorization')?.split(' ')[1];

        if (!token) {
            return res.status(401).json({message: "Access denied. No token provided."});
        }

        try {
            const decoded = jwt.verify(token, "4781SIWES9912sjad34&*@");
            req.user = { id: decoded.id, role: decoded.role }
            next();
        } catch (err) {
            return res.status(400).json({ message: `Invalid token. ${token}` });
        }
}

export {authMiddleware}