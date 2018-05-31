const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("./user");

// authentication middleware
const requireUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/login");
  } else {
    jwt.verify(token, "secretcode", (err, decoded) => {
      if (err) {
        res.clearCookie("token");
        return res.redirect("/login");
      }
      next();
    });
  }
};

router.get("/", requireUser, (req, res) => {
  res.render("index");
});

router.get("/register", (req, res) => {
  res.render("register");
})

router.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const data = {
    username: username,
    password: password
  };

  try {
    const user = await User.create(data);
  } catch (e) {
    console.log(e);
  }
  res.redirect("/login");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.authenticate(username, password, (err, user) => {
    if (err || !user) {
      const err = new Error("Wrong email or password");
      err.status = 401;
      return next(err);
    } else {
      var token = jwt.sign({ userId: user._id }, "secretcode");
      res.cookie("token", token, { expires: new Date(Date.now() + 900000), httpOnly: true });
      return res.redirect("/");
    }
  })
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

module.exports = router;
