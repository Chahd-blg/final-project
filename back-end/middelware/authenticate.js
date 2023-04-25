//fichier standar
const jwt = require("jsonwebtoken");
const authenticate = (req, res, next) => {
try {
 const token = req.headers.authorization.split(" ")[1];
 jwt.verify(token, "Testing");
 next();
 } catch (error) {
 console.log("Here error", error);
 res.status(401).json({ message: "Auth failed!" });
 //status code 401 of unauthorized
 }
};
module.exports = authenticate