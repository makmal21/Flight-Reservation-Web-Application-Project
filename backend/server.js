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

//Fetch data from sql, get query for Crew table 
app.get("/system-admin-view/crew", (req, res) => {
  const sql = "SELECT * FROM Crew";
  db.query(sql, (err, data) => {
      if(err) return res.json("Error");
      return res.json(data);
  })
});

//add into crew table
app.post('/system-admin-view/crew/add', (req, res) => {
  const sql = "INSERT INTO Crew (`CrewID`, `Name`, `Role`, `FlightID`) VALUES (?, ?, ?, ?)";
  const values = [
      req.body.crewID,
      req.body.name, 
      req.body.role, 
      req.body.flightID
  ] 
  db.query(sql, values, (err, data) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.json(data);
  })
})



//Delete data that matches CrewID
app.delete('/system-admin-view/crew:id', (req, res) => {
  const sql = "DELETE FROM Crew WHERE CrewID = ?";
  const id = req.params.id

  db.query(sql, [id], (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.json(data);
  })
})

//Fetch data from sql, get query for Aircraft table 
app.get("/system-admin-view/aircraft", (req, res) => {
  const sql = "SELECT * FROM Aircraft";
  db.query(sql, (err, data) => {
      if(err) return res.json("Error");
      return res.json(data);
  })
});

//add into Aircraft table
app.post('/system-admin-view/aircraft/add', (req, res) => {
  const sql = "INSERT INTO Aircraft (`AircraftID`, `Model`, `Capacity`, `FlightID`) VALUES (?, ?, ?, ?)";
  const values = [
      req.body.aircraftID,
      req.body.model, 
      req.body.capacity, 
      req.body.flightID
  ] 
  db.query(sql, values, (err, data) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.json(data);
  })
})

//Delete data that matches AircraftID 
app.delete('/system-admin-view/aircraft:id', (req, res) => {
  const sql = "DELETE FROM Aircraft WHERE AircraftID = ?";
  const id = req.params.id

  db.query(sql, [id], (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  )
}
);

//Fetch data from sql, get query for Flight table 
app.get("/system-admin-view/adminFlight", (req, res) => {
  const sql = "SELECT * FROM Flight";
  db.query(sql, (err, data) => {
      if(err) return res.json("Error");
      return res.json(data);
  })
});

//add into Flight table
app.post('/system-admin-view/adminFlight/add', (req, res) => {
  const sql = "INSERT INTO Flight (`FlightID`, `Origin`, `Destination`, `DepartureDate`, `Price`) VALUES (?, ?, ?, ?, ?)";
  const values = [
      req.body.flightID,
      req.body.origin, 
      req.body.destination, 
      req.body.departureDate, 
      req.body.Price 
  ] 
  db.query(sql, values, (err, data) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.json(data);
  })
})

//Remove data that matches FlightID in database
app.delete('/system-admin-view/adminFlight:id', (req, res) => {
  const sql = "DELETE FROM Flight WHERE FlightID = ?";
  const id = req.params.id

  db.query(sql, [id], (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  )
}
);

//Update data in database modified by system admin 
app.put('/system-admin-view/adminFlight/update/:id', (req, res) => {
  const sql = "UPDATE Flight set `Origin` = ?, `Destination` =?, `DepartureDate` =?, `Price` =?  where FlightID = ?";
  const values = [
      req.body.origin, 
      req.body.destination,
      req.body.departureDate, 
      req.body.price
  ]  
  const id = req.params.id
  db.query(sql, [...values, id], (err, data) => {
      if (err) return res.json("Error");
      return res.json(data);
  })
})


// Login
app.post('/login', (req,res) => {
  const sql = "SELECT * FROM User WHERE Email = ? AND Password = ?";
  db.query(sql, [req.body.email,req.body.password], (err,data) => {
      if(err){
          return res.json("Error");
      }
      if(data.length > 0){
          return res.json({status:"Success", data: data});
      } else{
          return res.json({status:"Failed", data: data});
      }
  })
})

// Register
app.post('/register', (req,res) => {
  const sql = "INSERT INTO user (email, password, StaffFlag) VALUES (?, ?, ?)";
  const values = [
      req.body.email,
      req.body.password,
      '0'
  ]
  db.query(sql, values, (err,data) => {
      if(err){
          return res.json("Error");
      }
      return res.json(data);
  })
})

// Payment
app.post('/pay', (req,res) => {

  const paymentID = generateUniqueID();
  const amount = req.body.price;
  const sql = "INSERT INTO payment (PaymentID, Amount) VALUES (?, ?)";
  console.log(paymentID)
  db.query(sql, [paymentID, amount], (err,data) => {
      if(err){
        return res.json(err);
      }
      return res.json({data: data, paymentID: paymentID});
  })
})

// Get price
app.post('/price', (req, res) => {
  const sql = "SELECT flight.Price AS flightPrice FROM flight WHERE flight.FlightID = ?";
  const fID = req.body.fID;
  console.log(fID);
  db.query(sql, fID, (err, data) => {
    console.log(data)
    if (err) return res.status(500).json({ error: err.message });
    return res.json(data)
  })
})

// Get 
app.post('/update_ticket', (req, res) => {
  const { paymentDetails, selectedSeat, price } = req.body;
  const cardholderName = paymentDetails.cardholderName;
  const email = paymentDetails.email;
  const { SeatID, SeatNo, Type, Status, FlightID } = selectedSeat;
  const paymentID = generateUniqueID();
  console.log(paymentID)
  console.log(price)
  const seat_sql = "INSERT INTO seat (SeatID, SeatNo, Type, Status, FlightID) VALUES (?, ?, ?, ?, ?)";
  const tic_sql = "INSERT INTO Ticket (TicketID, Name, Email, FlightID, PaymentID, SeatID) VALUES (?, ?, ?, ?, ?, ?)";
  const pay_sql = "INSERT INTO payment (PaymentID, Amount) VALUES (?, ?)"
  db.query(pay_sql, [paymentID, price], (err,data) => {
    if (err) return res.status(500).json({ error: err.message });
    db.query(seat_sql, [SeatID, SeatNo, Type, 'Unavailable', FlightID], (err1, data1) => {
      if (err1) return res.status(500).json({ error: err1.message });
      db.query(tic_sql, [generateUniqueID(), cardholderName, email, FlightID, paymentID, SeatID], (err2, data2) => {
        if (err2) return res.status(500).json({ error: err2.message });
        return res.json(data2)
      })
    })
  })
})


// UniqueID for payment
const generateUniqueID = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let uniqueID = '';

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uniqueID += characters.charAt(randomIndex);
  }

  return uniqueID;
};

// Start the server
const port = 8081;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});









