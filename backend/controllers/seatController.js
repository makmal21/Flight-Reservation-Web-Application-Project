// seatController.js
// This module contains the controller functions for seat-related routes
const seatModel = require('../models/seatModel');

const seatController = {
    //Function to handle request for fetching unavailable seats
  async fetchSeats(req, res) {
    try {
        // grabbing flightID from request parameters
      const flightId = req.params.flightId;
      // grabbing seats
      const seats = await seatModel.getSeatsByFlightID(flightId);
      //sending fetched data as response
      res.json(seats);
    } catch (err) {
        //logging error
      res.status(500).send(err.message);
    }
  },

};

module.exports = seatController;
