const mongoose = require("mongoose");
const UserSchema = require("./userSchema");

let db;
module.exports = {
  async connect() {
    await mongoose.connect(process.env.DATABASE_URL || "mongodb://localhost/auth-test-dev", { autoIndex: false });
    db = mongoose.connection;
    await mongoose.model("User", UserSchema, true).init();
  },

  async disconnect() {
    await mongoose.disconnect();
  },

  async close() {
    await db.close(true);
  },

  users() {
    return mongoose.model("User");
  }
};
