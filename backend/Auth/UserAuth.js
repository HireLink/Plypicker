// const jwt = require('jsonwebtoken');

// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];

//   if (!authHeader) {
//     return res.json({ message: 'Access Denied' });
//   }

//   const token = authHeader.split(' ')[1];
// console.log(token);
//   try {
//     const verified = jwt.verify(token, "secret-key");
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.json({ message: 'Invalid Token' });
//   }
// };

// module.exports = verifyToken;