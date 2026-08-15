const transporter = require("./Transporter");

const RequestMail = async ({ name, email, message }) => {
  const Transporter = transporter();

  // Request email
  let info = await Transporter.sendMail({
    from: `"Portfolio Content" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `New Contact Message From ${name}`,
    html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
    `,
  });
  return info;
};

module.exports = RequestMail;
