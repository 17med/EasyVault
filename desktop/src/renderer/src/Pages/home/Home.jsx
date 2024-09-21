import React, { useEffect, useState } from 'react'
import CompassSidebar from '../../components/CompassSidebar/CompassSidebar'
import './Home.css'

const Home = ({ setlogin, islogin }) => {
  const [db, setdb] = useState([])
  useEffect(() => {
    if (islogin) {
      window.DB.getDatabases()
        .then((x) => {
          setdb(x)
        })
        .catch((e) => {
          console.log('error ', e)
        })
    }
  }, [islogin])
  return (
    <div className="home-container">
      {/* Sidebar */}
      <CompassSidebar setlogin={setlogin} db={db} />

      {/* Main Content Area */}
      <div className="content">
        <h1>Main Content</h1>
        <p>Welcome to the dashboard. This is the main content area.</p>
      </div>
    </div>
  )
}

export default Home
