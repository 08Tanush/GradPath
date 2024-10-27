const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) return res.status(403).json({ message: 'Authorization header is missing' });

  const token = authHeader.split(' ')[1];

  if (!token) return res.status(403).json({ message: 'Token is missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is in your .env
    req.user = decoded; // Attach user details (userId) to the request
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};
