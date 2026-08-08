const mongoose = require("mongoose");

const connectdb = async (url) => {
  if (!url) {
    throw new Error("MONGO_DB URL IS NOT DEFINED");
  }
  await mongoose.connect(url);
};

module.exports = {
  connectdb,
};
