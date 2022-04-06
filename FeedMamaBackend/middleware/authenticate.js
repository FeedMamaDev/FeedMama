const jwt = require("jsonwebtoken");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const verifyToken = (req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], process.env.API_SECRET, function (err, decode) {
      if (err){
          req.user = undefined;
      } else {
        req.user = prisma.users.findFirst({where: { UserId: decode.id }});
      }

      if(req.user === undefined || req.user === null) {
        res.status(403)
        .send({
          message: "Forbidden"
        });
      } else {
        next();
      }
      
    });
  } else {
    req.user = undefined;
    next();
  }
};
module.exports = verifyToken;