import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'; // Import Row
import Col from 'react-bootstrap/Col'; // Import Col
function Payment() {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Process payment details
    console.log(paymentDetails);
  };

  return (
    <div>
      <h2>Payment Details</h2>
      <div className='d-flex justify-content-center align-items-center'>
        <div className='p-3 bg-white w-25'>
          <p>Total: <b>$INSERT PRICE FROM BACKEND HERE</b></p>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Card Number"
                name="cardNumber"
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
              <p></p>
              <Form.Label>CVV</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter CVV"
                name="cvv"
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
    </div>
  );
}

export default Payment;
