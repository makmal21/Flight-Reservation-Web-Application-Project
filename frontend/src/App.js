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
import Aircraft from './components/Aircraft'; 
import Crew from './components/Crew'; 
import AddCrew from './components/AddCrew.js'; 
import AddAircraft from './components/AddAircraft.js'; 
import AdminFlight from './components/AdminFlight.js';
import AddFlight from './components/AddFlight.js';
import UpdateFlight from './components/UpdateFlight.js'; 

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
          <Route path="/system-admin-view/aircraft" element={<Aircraft />} />
          <Route path="/system-admin-view/crew" element={<Crew />} />
          <Route path="/system-admin-view/adminFlight" element={<AdminFlight />} />
          <Route path="/system-admin-view/crew/add" element={<AddCrew />} />
          <Route path="/system-admin-view/aircraft/add" element={<AddAircraft />} />
          <Route path="/system-admin-view/adminFlight/add" element={<AddFlight />} />
          <Route path="/system-admin-view/adminFlight/update/:id" element={<UpdateFlight />} />
          {/* Add more routes as necessary */}
        </Routes>
      </div>
    </Router>
  );
}


export default App;