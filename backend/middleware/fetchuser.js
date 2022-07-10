const jwt = require("jsonwebtoken");

//Jsonwebtoken Secret
const jwt_secret = "Thisisasecretstring";

const fetchuser = (req, res, next) => {
  let token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, jwt_secret);
    req.user = data.user;
    //runs next function
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
