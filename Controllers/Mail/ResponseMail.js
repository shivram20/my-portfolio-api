const transporter = require("./Transporter");

async function ResponseMail(email, name) {
  const Transporter = transporter();

  await Transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    replyTo: process.env.EMAIL_USER,
    subject: `Reply Email From Shivram`,
    html: `
        <h2> Hy ${name}</h2>
        <p> Thank you for the update. I have received the information.</p>
        <h5>Thanks</h5>
    `,
  });
}

module.exports = ResponseMail;
