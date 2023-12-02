const nodemailer = require('nodemailer');

function sendCancellationEmail(email, TicketID) {
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
    subject: 'Flight Cancellation Confirmation',
    text: `Your flight with booking ID ${TicketID} has been successfully cancelled.`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = sendCancellationEmail;