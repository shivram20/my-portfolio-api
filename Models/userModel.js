const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true },
);

const userSchema1 = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true },
);

const contactsModel = mongoose.model("contacts", userSchema);
const feedbacksModel = mongoose.model("feedbacks", userSchema1);

module.exports = {
  contactsModel,
  feedbacksModel,
};
