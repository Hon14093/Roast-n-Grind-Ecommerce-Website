import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

export const validateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied. No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch (e) {
        console.log(e);
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
}

export const validateAdmin = (req, res, next) => {
    if (!req.user || !req.user.is_admin) {
        return res.status(403).json({ message: 'Access denied. Admin only' });
    }

    next();
}