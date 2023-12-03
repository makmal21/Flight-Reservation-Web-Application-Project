const nodemailer = require('nodemailer');

function sendRegistrationPromo(email) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'airlineflight867@gmail.com',
      pass: 'tyug lfef vlfp hnyc '
    }
  });

  const mailOptions = {
    from: 'airlineflight867@gmail.com',
    to: email,
    subject: `Registration Successful and Welcome Bonus!`,
    text: `Hello,\n\n` +
            `Thank you for registering with us. We're excited to have you on board.\n\n` +
            `As a welcome gift, please enjoy this promotional offer of 10% off first ticket with code: MOUSSAVI.\n\n` +
            `We're looking forward to serving you.\n\n` +
            `Best Regards,\n\n` +
            `Romil Airlines`
  };

  transporter.sendMail(mailOptions, function(error, info){
    console.log(email)
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = sendRegistrationPromo;
