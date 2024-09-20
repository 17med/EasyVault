import { useState } from 'react'
function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [url, seturl] = useState('')

  const connectToDB = async () => {
    try {
      if (!window.DB) {
        throw new Error('window.DB is not defined')
      }
      const response = await window.DB.Connect({ username, password, url })
      console.log(response) // Output from Electron's function
    } catch (error) {
      console.error('Error calling Electron function:', error)
    }
  }
  return (
    <>
      <input
        placeholder={'name'}
        onChange={(event) => {
          setpassword(event.target.value)
        }}
      />{' '}
      <br />
      <input
        placeholder={'password'}
        onChange={(event) => {
          setpassword(event.target.value)
        }}
      />{' '}
      <br />
      <input
        placeholder={'url'}
        onChange={(event) => {
          seturl(event.target.value)
        }}
      />{' '}
      <br />
      <button onClick={connectToDB}>test</button>
    </>
  )
}

export default App
