// SystemAdminView.js

import React from 'react'
import { Link } from 'react-router-dom'

function SystemAdminView() {

  return (
    <div>
        <h2>System Administrator Portal</h2>
        <div>
          <Link to ='/system-admin-view/aircraft'className='btn btn-success'>View Aircraft Information</Link>
          <Link to ='/system-admin-view/crew'className='btn btn-success'>View Crew Information</Link>
          <Link to ='/system-admin-view/flight'className='btn btn-success'>View Flight Information</Link>
        </div>
    </div>
  );
}

export default SystemAdminView;