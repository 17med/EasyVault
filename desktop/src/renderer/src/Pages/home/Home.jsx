import React, { useEffect, useState } from 'react'
import CompassSidebar from '../../components/CompassSidebar/CompassSidebar'
import './Home.css'
import Adddb from '../../components/Add DB/AddDB'
import AddCollaction from '../../components/Add Collaction/AddCollaction'
const Home = ({ setlogin, islogin }) => {
  const [db, setdb] = useState([])
  const [adddb, setadddb] = useState(false)
  const [refrech, setrefrech] = useState(true)
  const [addcollaction, setaddcollaction] = useState({ state: false, db: '' })
  const InitDATA = async () => {
    try {
      const x = await window.DB.getDatabases()
      const l = []
      for (var i = 0; i < x.length; i++) {
        l.push({ main: x[i], elements: await window.DB.getcollaction({ dbname: x[i] }) })
      }
      setdb(l)
    } catch (e) {
      
    }
  }
  useEffect(() => {
    if (islogin) {
      console.log('somthing change')
      InitDATA()
    }
  }, [islogin, refrech])
  return (
    <div className="home-container">
      <Adddb
        visiable={adddb}
        setVisible={setadddb}
        refrech={() => {
          setrefrech(!refrech)
        }}
      />
      <AddCollaction
        visiable={addcollaction.state}
        collaction={addcollaction.db}
        setVisible={() => {
          setaddcollaction({ state: !addcollaction.state, db: addcollaction.db })
        }}
        refrech={() => {
          setrefrech(!refrech)
        }}
      />
      {/* Sidebar */}
      <CompassSidebar
        setlogin={setlogin}
        db={db}
        adddb={setadddb}
        addcollaction={(db) => {
          console.log('dbbbbbbbbbb', db)
          setaddcollaction({ state: true, db: db })
        }}
        refrech={() => {
          setrefrech(!refrech)
        }}
      />

      {/* Main Content Area */}
      <div className="content">
        <h1>Main Content</h1>
        <p>Welcome to the dashboard. This is the main content area.</p>
      </div>
    </div>
  )
}

export default Home
