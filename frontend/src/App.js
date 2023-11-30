import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home';
import Flights from './components/Flights'; 
import NavBar from './components/NavBar'; 
import RegisterForMembership from './components/RegisterForMembership'; 
import SeatSelect from './components/SeatSelect'; 
import Payment from './components/Payment'; 
import Login from './components/Login'; 
import BrowsePassengerList from './components/BrowsePassengerList'; 
import CancelFlight from './components/CancelFlight'; 
import SystemAdminView from './components/SystemAdminView'; 
import Update from './components/Update'; 
import Add from './components/Add.js'; 



function App() {
  return (
    <Router>
      <div className="App">
        <NavBar /> {/* Render NavBar */}
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/flights" element={<Flights />} />
          <Route path="/register" element={<RegisterForMembership />} />
          <Route path="/seat-select" element={<SeatSelect />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/browse-passenger-list" element={<BrowsePassengerList />} />
          <Route path="/cancel-flight" element={<CancelFlight />} />
          <Route path="/system-admin-view" element={<SystemAdminView />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/add" element={<Add />} />
          {/* Add more routes as necessary */}
        </Routes>
      </div>
    </Router>
  );
}


export default App;