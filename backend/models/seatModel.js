// seatModel.js
// This module interacts with the database to perform operations related to seats.
const db = require('../db'); 

const seatModel = {
    // Func to get status of all unavailable seats for given flight
    async getUnavailableSeatsByFlightID(flightId) {
        // SQL query
      const query = 'SELECT * FROM Seat WHERE FlightID = ? AND Status = "Unavailable"';
      return new Promise((resolve, reject) => {
        db.query(query, [flightId], (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    },
    // other methods...
  };

module.exports = seatModel;
