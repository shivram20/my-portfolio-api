const db = require("../Models/userModel");
const { contactsModel, feedbacksModel } = require("../Models/userModel");
const sendMail = require("./sendmail");

//HandleGet Request
async function handleAll(req, res) {
  return res.status(200).send("Hello from server");
}

//HandleContact POST Request
async function handleContact(req, res) {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    //  Save to DB
    await contactsModel.create({
      name,
      email,
      message,
    });

    //  ONE response only
    return res.status(200).json({
      message: "Request sent successfully",
    });

    // Send Email
    await sendMail({
      username: name,
      useremail: email,
      usermessage: message,
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

  const { reqname, reqrating, reqmessage } = req.body;

  try {
    await feedbacksModel.create({
      name: reqname,
      rating: reqrating,
      message: reqmessage,
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
