const nodemailer = require("nodemailer");

const sendMail = async ({ username, useremail, usermessage }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Portfolio Content" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    replyTo: useremail,
    subject: `New Contact Message From ${username}`,
    html: `
        <h3>New Contact Request</h3>
        <p><strong>Name:</strong> ${username}</p>
        <p><strong>Email:</strong> ${useremail}</p>
        <p><strong>Message:</strong></p>x
        <p>${usermessage}</p>
    `,
  });
};

module.exports = sendMail;
