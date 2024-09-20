import React from 'react'
import CompassSidebar from '../../components/CompassSidebar/CompassSidebar'
import './Home.css'

const Home = ({ setlogin }) => {
  return (
    <div className="home-container">
      {/* Sidebar */}
      <CompassSidebar setlogin={setlogin} />

      {/* Main Content Area */}
      <div className="content">
        <h1>Main Content</h1>
        <p>Welcome to the dashboard. This is the main content area.</p>
      </div>
    </div>
  )
}

export default Home
