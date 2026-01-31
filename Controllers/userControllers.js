const db = require("../Models/userModel");
const { contactsModel, feedbacksModel } = require("../Models/userModel");
const sendMail = require("./sendmail");

//HandleGet Request
async function handleAll(req, res) {
  return res.status(200).send("Hello from server");
}

//HandleContact POST Request
async function handleContact(req, res) {
  const username = req.body.name;
  const useremail = req.body.email;
  const usermessage = req.body.message;

  try {
    // Save Data DB
    try{
       await contactsModel
      .create({
        name: username,
        email: useremail,
        message: usermessage,
      })
    }catch(e){
      console.log("Error During Save data in DB");
    }
    
    //Send Mail 
    try{
      await sendMail({ username, useremail, usermessage });
      res.status(201).json({ message: "success" });
    }catch(e){
      res.status(400).json({message:"success"});
    }
  } catch (e) {
    res.status(500).json({message:"server error"});
    console.log(e);
  }
}

//Handle POST Feedback Request
async function handleFeedback(req, res) {
  try {
    // console.log("Feedback Body:", req.body);
    feedbacksModel
      .create({
        name: req.body.name,
        rating: req.body.rating,
        message: req.body.message,
      })
      .then(() => {
        return res.status(201).json({
          message: "success",
        });
      })
      .catch(() => {
        console.log("Not Created");
      });
  } catch (e) {
    console.error("Error server side:", e);
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
