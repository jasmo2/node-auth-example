const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

// hashes the password
UserSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  });
});

// used for authentication
UserSchema.statics.authenticate = (username, password, cb) => {
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      return cb(err);
    } else if (!user) {
      const err = new Error("User not found");
      err.status = 401
      return cb(err);
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (result === true) {
        return cb(null, user);
      } else {
        return cb();
      }
    });
  })
};

var User = mongoose.model("User", UserSchema);

module.exports = User;
