const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'password',
    database:'AIRLINE',
  });

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

//BrowsePassengerList
app.post('/browse-passenger-list', (req, res) => {
  const sql = "SELECT * FROM Ticket WHERE `FlightID` = ? ";
  const value = req.body.flightNumber
  db.query(sql, value, (err, data) => {
      if(err) return res.json("Error");
      return res.json(data);
  })
});


// Endpoint to handle user input and fetch data from MySQL
//Get the query based on select Flight
app.post('/Flights', (req, res) => {
  const query = `
    SELECT * FROM Flight
    WHERE Origin = ? AND Destination = ? AND DestinationDate = ?`;
  const values =[
    req.body.from, 
    req.body.to,
    req.body.departureDate]

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(results);
    }
  })
})

//Ticket Information
app.post('/cancel-flight', (req, res) => {
  const sql = "SELECT * FROM Ticket WHERE `TicketID` = ? ";
  const value = req.body.bookingID
  db.query(sql, value, (err, data) => {
      if(err) return res.json("Error");
      return res.json(data);
  })
});

//Cancel Flight
app.delete('/cancel-flight/:id',(req, res)=> {
  const sql ="DELETE FROM Ticket WHERE `TicketID` = ?"
  const id = req.params.id

  db.query(sql, [id], (err, data) =>{
    if (err) return res.json("Error");
    return res.json(data);
  })
})

/* app.delete('/cancel-flight',(req, res)=> {
  const sql ="DELETE FROM Ticket WHERE `TicketID` = ?"
  const value = req.body.TicketID

  db.query(sql, value, (err, data) =>{
    if (err) return res.json("Error");
    return res.json(data);
  })
}) */

// Start the server
const port = 8081;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
