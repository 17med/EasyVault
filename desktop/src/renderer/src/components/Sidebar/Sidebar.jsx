import React, { useEffect, useState } from 'react'
import { Nav, Navbar, Accordion, Button } from 'react-bootstrap'
import {
  BsHouse,
  BsDatabase,
  BsFolder,
  BsPlus,
  BsGear,
  BsTrash,
  BsArrowClockwise,
  BsBookshelf,
  BsPersonGear,
  BsBoxArrowLeft,
  BsHddStack
} from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import './sidebar.css'
const Sidebar = ({ setlogin, db, adddb, refrech, addcollaction }) => {
  const [expandedKeys, setExpandedKeys] = useState({})
  const [sidebarItems, setSidebarItems] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    // Generate sidebar items based on db data
    const items = db.map((element) => ({
      label: element.main,
      icon: <BsDatabase className="me-2" />,
      collections: element.elements
    }))
    setSidebarItems(items)
  }, [db])

  // Delete database function
  const deletedb = async (name) => {
    try {
      const response = await window.DB.deletedb({ name })
      if (response === 200) {
        toast.success('Database deleted successfully')
        refrech() // Refresh the database list after deletion
      }
    } catch (e) {
      toast.error('Error deleting database')
    }
  }

  // Logout function
  const logout = async () => {
    try {
      const response = await window.DB.disconnect()
      setlogin(false)
      if (response) navigate('/')
    } catch (error) {
      console.log('Error logging out')
    }
  }

  return (
    <div className="sidebar-container">
      <div
        className="sidebar-content d-flex flex-column  vh-100 bg-light p-3 "
        style={{ width: '20vw' }}
      >
        <Navbar.Brand className="mb-4">EasyVaultDBx</Navbar.Brand>
        <Nav className="flex-column">
          {/* Dashboard */}
          <Nav.Item className="mb-2">
            <Nav.Link style={{ color: 'black' }}>
              <BsHouse className="me-2" />
              Dashboard
            </Nav.Link>
          </Nav.Item>

          {/* Databases Section */}
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <BsDatabase className="me-2" />
                Databases
              </Accordion.Header>
              <Accordion.Body>
                <Nav className="flex-column ms-3">
                  <Nav.Link onClick={refrech} style={{ color: 'black' }}>
                    <BsArrowClockwise className="me-2" />
                    Refresh
                  </Nav.Link>
                  <Nav.Link onClick={() => adddb(true)} style={{ color: 'black' }}>
                    <BsPlus className="me-2" />
                    Add Database
                  </Nav.Link>
                  {sidebarItems.map((dbItem, idx) => (
                    <Accordion key={idx}>
                      <Accordion.Item eventKey={String(idx)}>
                        <Accordion.Header>
                          <BsBookshelf className="me-2" />
                          {dbItem.label}
                        </Accordion.Header>
                        <Accordion.Body>
                          <Nav className="flex-column ms-3">
                            <Nav.Link
                              onClick={() => addcollaction(dbItem.label)}
                              style={{ color: 'black' }}
                            >
                              <BsPlus className="me-2" />
                              Add Collection
                            </Nav.Link>
                            {dbItem.collections.map((col, colIdx) => (
                              <Accordion key={colIdx}>
                                <Accordion.Item eventKey={String(idx)}>
                                  <Accordion.Header>
                                    <BsFolder className="me-2" />
                                    {col}
                                  </Accordion.Header>
                                  <Accordion.Body>
                                    <Nav.Link onClick={() => {}} style={{ color: 'black' }}>
                                      <BsTrash className="me-2" />
                                      Delete {col}
                                    </Nav.Link>
                                  </Accordion.Body>
                                </Accordion.Item>
                              </Accordion>
                            ))}
                            <Nav.Link onClick={() => adddb(true)} style={{ color: 'black' }}>
                              <BsPersonGear className="me-2" />
                              Permesions
                            </Nav.Link>
                            <Nav.Link
                              onClick={() => deletedb(dbItem.label)}
                              style={{ color: 'black' }}
                            >
                              <BsTrash className="me-2" />
                              Delete Database
                            </Nav.Link>
                          </Nav>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  ))}
                </Nav>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          {/* Management */}
          <Nav.Item className="mt-3 mb-2">
            <Nav.Link style={{ color: 'black' }}>
              <BsHddStack className="me-2" />
              Management
            </Nav.Link>
          </Nav.Item>

          {/* Settings */}
          <Nav.Item>
            <Nav.Link style={{ color: 'black' }}>
              <BsGear className="me-2" />
              Settings
            </Nav.Link>
          </Nav.Item>

          {/* Logout */}
          <Nav.Item>
            <Nav.Link onClick={logout} style={{ color: 'black' }}>
              <BsBoxArrowLeft className="me-2" />
              Logout
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </div>
  )
}

export default Sidebar
