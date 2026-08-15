const db = require("../Models/userModel");
const { contactsModel, feedbacksModel } = require("../Models/userModel");
const RequestMail = require("./Mail/RequestMail");
const ResponseMail = require("./Mail/ResponseMail");

//HandleGet Request
async function handleAll(req, res) {
  return res
    .status(200)
    .send("Hello from server {My-Personal-Portfolio server}");
}

//HandleContact POST Request
async function handleContact(req, res) {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    //  Save to DB
    const savedava = contactsModel.create({
      name,
      email,
      message,
    });

    // send email
    const sendemail = RequestMail({ name, email, message });

    Promise.all([savedava, sendemail]).then(async (result) => {
      let id = result[0]._id.toString();
      if (id) {
        await ResponseMail(email, name);
      }
    });
    return res.status(200).json({
      message: "Request sent successfully",
    });
  } catch (error) {
    console.error("Contact error:", error);
    return res.status(500).json({
      message: "Server error. Please try again later",
    });
  }
}

//Handle POST Feedback Request
async function handleFeedback(req, res) {
  const { name, rating, feedback } = req.body;

  if (!name || !rating || !feedback) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await feedbacksModel.create({
      name: name,
      rating: rating,
      message: feedback,
    });

    return res.status(201).json({
      message: "Feedback submitted successfully",
    });
  } catch (error) {
    console.error("Feedback error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
}

module.exports = {
  handleAll,
  handleContact,
  handleFeedback,
};
