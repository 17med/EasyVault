import { useState } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import 'primereact/resources/themes/saga-blue/theme.css' // Add your preferred theme
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import { useNavigate } from 'react-router-dom'
import useStore from '../Services/storage'
import './home.css' // Create this file for custom styling
import { toast } from 'react-toastify'
function App({ setlogin }) {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('admin')
  const [url, setUrl] = useState('127.0.0.1:51111')
  const navigate = useNavigate()
  const connectToDB = async () => {
    try {
      if (!window.DB) {
        throw new Error('window.DB is not defined')
      }

      const response = await window.DB.Connect({ username, password, url })
      if (response === 401) {
        toast.error('Please enter valid credentials')
        return
      }
      if (response == 500) {
        toast.error('Error connecting to the database')
        return
      }
      setlogin(true)
      navigate('/home')
      toast.success('Connected to the database')
    } catch (error) {
      toast.error('Error connecting to the database')
      console.error('Error calling Electron function:', error)
    }
  }

  return (
    <div className="app-container">
      <div className="form-container">
        <h2 className="form-title">EasyVaultDB</h2>
        <InputText
          placeholder="Name"
          value={username}
          defaultValue={'admin'}
          onChange={(event) => setUsername(event.target.value)}
          className="input-field"
        />
        <br />
        <InputText
          placeholder="Password"
          type="password"
          value={password}
          defaultValue={'admin'}
          onChange={(event) => setPassword(event.target.value)}
          className="input-field"
        />
        <br />
        <InputText
          placeholder="URL"
          value={url}
          defaultValue={'127.0.0.1:51111'}
          onChange={(event) => setUrl(event.target.value)}
          className="input-field"
        />
        <br />
        <Button onClick={connectToDB} style={{ width: '100%' }}>
          Connect
        </Button>
      </div>
    </div>
  )
}

export default App
