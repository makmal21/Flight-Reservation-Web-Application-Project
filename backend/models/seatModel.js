// seatModel.js
// This module interacts with the database to perform operations related to seats.
const db = require('../dbConnection'); 

const seatModel = {
    // Func to get status of all unavailable seats for given flight
    async getSeatsByFlightID(flightId) {
        // SQL query
      const query = 'SELECT * FROM Seat WHERE FlightID = ?';
      const [seats] = await db.query(query, [flightId]);
      return seats;
    },
    // other methods...
  };

module.exports = seatModel;
