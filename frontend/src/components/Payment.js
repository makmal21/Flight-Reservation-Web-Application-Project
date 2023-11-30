import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'; // Import Row
import Col from 'react-bootstrap/Col'; // Import Col

function Payment() {
  const [paymentDetails, setPaymentDetails] = useState({
    passengerName: '', // Added passenger name
    email: '', // Added email
    cardNumber: '',
    cardholderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });

  const [validationError, setValidationError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    // Only apply digit filtering and length restriction for card number and CVV
    if (name === 'cardNumber' || name === 'cvv') {
      const sanitizedValue = value.replace(/\D/g, ''); // Remove non-digit characters
      if ((name === 'cardNumber' && sanitizedValue.length <= 16) ||
          (name === 'cvv' && sanitizedValue.length <= 3)) {
        setPaymentDetails({ ...paymentDetails, [name]: sanitizedValue });
      }
    } else {
      // Allow all values for other fields (including cardholder name, month, and year)
      setPaymentDetails({ ...paymentDetails, [name]: value });
    }
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    setValidationError(''); // Reset validation error message

    // Check if card number is exactly 16 digits and CVV is exactly 3 digits
    if (paymentDetails.cardNumber.length !== 16) {
      setValidationError('Invalid Credit Card number.');
      return;
    } else if (paymentDetails.cvv.length !== 3) {
      setValidationError('Invalid CVV number.');
      return;
    }

      // Email validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(paymentDetails.email)) {
      setValidationError('Invalid email address.');
    return;
  }

    // Process payment details if validation passes
    console.log(paymentDetails);
    // Add your logic to process the payment here
  };

  return (
    <div>
      <h2>Payment Details</h2>
      <div className='d-flex justify-content-center align-items-center'>
        <div className='p-3 bg-white w-25'>
          <p>Total: <b>$INSERT PRICE FROM BACKEND HERE</b></p>


          <Form onSubmit={handleSubmit}>


            {/* Passenger Name input */}
            <Form.Group className="mb-3">
              <Form.Label>Passenger Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Passenger Name"
                name="passengerName"
                value={paymentDetails.passengerName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            {/* Email input */}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email" // Email type for proper validation
                placeholder="Enter Email"
                name="email"
                value={paymentDetails.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Card Number"
                name="cardNumber"
                inputMode="numeric"
                maxLength="16" // Restrict to 16 characters
                value={paymentDetails.cardNumber}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cardholder Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Cardholder Name"
                name="cardholderName"
                value={paymentDetails.cardholderName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>


            <Row>
              {/* Expiry Month */}
              <Form.Group as={Col} xs={5} controlId="formExpiryMonth">
                <Form.Label>Expiry Month</Form.Label>
                <Form.Select
                  name="expiryMonth"
                  value={paymentDetails.expiryMonth}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Month</option>
                  {/* Month options */}
                  {[...Array(12).keys()].map((month) => (
                    <option key={month + 1} value={month + 1}>
                      {month + 1}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* Expiry Year */}
              <Form.Group as={Col} md={5} controlId="formExpiryYear">
                <Form.Label>Expiry Year</Form.Label>
                <Form.Select
                  name="expiryYear"
                  value={paymentDetails.expiryYear}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Year</option>
                  {/* Year options */}
                  {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i+1).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>CVV</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter CVV"
                name="cvv"
                inputMode="numeric"
                maxLength="3" // Restrict to 3 characters
                value={paymentDetails.cvv}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button variant="success" type="submit">
              Submit Payment
            </Button>
          </Form>
          

        </div>
      </div>
      {validationError && <p style={{ color: 'white', fontSize: '28px', fontWeight: 'bold' }}>{validationError}</p>}
    </div>
  );
}

export default Payment;
