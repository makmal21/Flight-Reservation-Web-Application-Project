// always in route.js
const express = require('express');
// routes always require controller if you break them up
const seatController = require('../controllers/seatController'); 
// middle ware below
const router = express.Router();

// Route for getting seat statuses by flight ID
// It uses the controller function to handle requests
router.get('/seats/:flightId', seatController.fetchSeats);

module.exports = router; // exporting router for use in other parts of the application