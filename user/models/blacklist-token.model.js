const mongoose = require("mongoose");

const blacklistTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("blacklisttoken", blacklistTokenSchema);
