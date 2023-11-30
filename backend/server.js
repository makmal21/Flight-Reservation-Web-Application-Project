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
    WHERE Origin = ? AND Destination = ?`;
  const values =[
    req.body.from, 
    req.body.to]

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


//Get origin options from homepage
app.get('/api/flights/origin', (req, res) => {
  const sql = "SELECT DISTINCT Origin FROM Flight";
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching origins:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Extract only the 'Origin' values into an array
      const origins = results.map(row => row.Origin);
      res.status(200).json(origins);
    }
  });
});

//Get Destinations options from homepage (based on selected Origin)
app.get('/api/flights/destinations/:origin', (req, res) => {
  const origin = req.params.origin;
  const sql = "SELECT DISTINCT Destination FROM Flight WHERE Origin = ?";
  db.query(sql, [origin], (err, results) => {
    if (err) {
      console.error('Error fetching destinations for origin:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Extract only the 'Destination' values into an array
      const destinations = results.map(row => row.Destination);
      res.status(200).json(destinations);
    }
  });
});

// seatRoutes
const seatRoutes = require('./routes/seatRoute');
app.use('/api', seatRoutes);


/*SYSTEM ADMIN SQL QUERIES */

//Fetch data from sql, get query 
app.get("/system-admin-view", (req, res) => {
  const sql = "SELECT * FROM Crew";
  db.query(sql, (err, data) => {
      if(err) return res.json("Error");
      return res.json(data);
  })
});

//Put data entered into Crew relation table 
app.put('/update/:id', (req, res) => {
  const sql = "UPDATE Crew set `Name` = ?, `Role` = ?, `FlightID` =?  where ID = ?";
  const values = [
      req.body.name, 
      req.body.role,
      req.body.flightID
  ]  
  const id = req.params.id
  db.query(sql, [...values, id], (err, data) => {
      if (err) return res.json("Error");
      return res.json(data);
  })
})

//add into
app.post('/add', (req, res) => {
  const sql = "INSERT INTO Crew ('CrewID','Name', 'Role', 'FlightID') VALUES (?)";
  const values = [
      req.body.name, 
      req.body.role, 
      req.body.flightID
  ] 
  db.query(sql, [values], (err, data) => {
      if (err) return res.json("Error");
      return res.json(data);
  })
})

//Delete data that matches ID
app.delete('/system-admin-view/:id', (req, res) => {
  const sql = "DELETE FROM Crew WHERE CrewID =?";
  const id = req.params.id

  db.query(sql, id, (err, data) => {
      if (err) return res.json("Error");
      return res.json(data);
  })
})

// Start the server
const port = 8081;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
