import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { useState } from 'react'
import { toast } from 'react-toastify'
export default function Adddb({ visiable, setVisible, refrech }) {
  const [namesb, setnamedb] = useState('')
  const create = async () => {
    try {
      const response = await window.DB.createdb({ name: namesb })
      console.log('response zebi', response)

      if (response == 201) {
        toast.success('database added successfully')
        setVisible(false)
        refrech()
      } else {
        if (response == 400) {
          toast.error('DataBase is already exist')
        } else {
          toast.error('error')
        }
      }
    } catch (error) {
      console.log('Error calling Electron function:')
    }
  }
  return (
    <Dialog
      header="Add DataBase"
      visible={visiable}
      style={{ width: '35vw' }}
      onHide={() => {
        setVisible(false)
      }}
    >
      <p className="m-0">
        Name DataBase :{' '}
        <InputText
          placeholder="Name DataBase"
          onChange={(e) => {
            setnamedb(e.target.value)
          }}
          style={{ width: '70%' }}
        />
        <br />
        <br />
        <Button style={{ width: '100%' }} className="text-center" onClick={create}>
          Add DataBase
        </Button>
      </p>
    </Dialog>
  )
}
