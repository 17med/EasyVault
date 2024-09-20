import React from 'react'
import { PanelMenu } from 'primereact/panelmenu'
import 'primereact/resources/themes/lara-light-indigo/theme.css' // Theme CSS
import 'primereact/resources/primereact.min.css' // PrimeReact CSS
import 'primeicons/primeicons.css' // PrimeIcons CSS
import './CompassSidebar.css' // Custom CSS
import { useNavigate } from 'react-router-dom'
const CompassSidebar = ({ setlogin }) => {
  const navigate = useNavigate()
  const logout = async () => {
    try {
      const response = await window.DB.disconnect()
      setlogin(false)
      if (response) navigate('/')
    } catch (error) {
      console.log('Error calling Electron function:')
    }
  }
  const items = [
    {
      template: () => {
        return (
          <h1
            style={{
              marginTop: '50px',
              textAlign: 'center',
              fontSize: '20px',
              marginBottom: '50px'
            }}
          >
            EasyVaultDB
          </h1>
        )
      }
    },

    {
      label: 'Dashboard',
      icon: 'pi pi-fw pi-home',
      items: [
        { label: 'Overview', icon: 'pi pi-fw pi-chart-line' },
        { label: 'Analytics', icon: 'pi pi-fw pi-chart-bar' }
      ]
    },
    {
      label: 'DataBases',
      icon: 'pi pi-fw pi-database',
      items: [{ label: 'Overview', icon: 'pi pi-fw pi-database' }]
    },
    {
      label: 'Management',
      icon: 'pi pi-fw pi-users',
      items: [
        { label: 'Users', icon: 'pi pi-fw pi-user' },
        { label: 'Roles', icon: 'pi pi-fw pi-briefcase' }
      ]
    },
    {
      label: 'Settings',
      icon: 'pi pi-fw pi-cog',
      items: [
        {
          label: 'General',
          icon: 'pi pi-fw pi-sliders-h',
          command: () => {
            console.log('clicked')
          }
        },
        { label: 'Account', icon: 'pi pi-fw pi-user-edit' },
        { label: 'Logout', icon: 'pi pi-fw pi-sign-out', command: logout }
      ]
    }
  ]

  return (
    <div className="compass-sidebar">
      <PanelMenu model={items} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}

export default CompassSidebar
