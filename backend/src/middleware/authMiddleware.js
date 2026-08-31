const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'token nggak ada' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'token nggak valid' });
    }
    req.user = decoded;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.user.role_id !== 1) {
    return res.status(403).json({ message: 'khusus admin' });
  }
  next();
};

const isTeknisi = (req, res, next) => {
  if (req.user.role_id !== 2) {
    return res.status(403).json({ message: 'khusus teknisi' });
  }
  next();
};

const isPegawai = (req, res, next) => {
  if (req.user.role_id !== 3) {
    return res.status(403).json({ message: 'khusus pegawai' });
  }
  next();
};

const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role_id)) {
      return res.status(403).json({ message: 'nggak punya akses' });
    }
    next();
  };
};

module.exports = { verifyToken, isAdmin, isTeknisi, isPegawai, allowRoles };