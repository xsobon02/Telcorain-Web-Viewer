const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const pkg = require("mysql");
const { createConnection } = pkg;

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  validate(email, password)
    .then((isEqual) => {
      loadedUser = users[email];
      if (!isEqual) {
        const error = new Error("Wrong password");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        { email: loadedUser.email, userId: loadedUser.ID.toString() },
        "KEY",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        userId: loadedUser.ID.toString(),
        username: loadedUser.displayed_name,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

function validate(email, password) {
  if (Object.hasOwn(users, email)) {
    return bcrypt.compare(password, users[email].password);
  } else {
    const error = new Error("A user with this email doesn't exist.");
    error.statusCode = 401;
    throw error;
  }
}

let users = {};

let db = createConnection({
  host: "IP ADDRESS",
  user: "USERNAME",
  password: "PASSWORD",
});

db.query("SELECT * FROM telcorain_webapp.users;", function (err, result) {
  if (err) throw err;
  result.forEach((element) => {
    users[`${element.email}`] = element;
  });
});
