const nodemailer = require('nodemailer');

function sendTicketReceiptEmail(email, TicketID, cardholderName, SeatNo, price){//, flightDetails) {
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
    subject: `Booking Receipt Email ${TicketID}`,
    text: `Hello ${cardholderName},\n\n` +
          `You have successfully purchased ticket ${TicketID}.\n\n` +
          `Your seat number is ${SeatNo}.\n\n` +
          `This email will act as your receipt for the payment made of $${price}.\n\n` +
          `Best Regards,\n\n` +
          `Romil Airlines.`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = sendTicketReceiptEmail;
