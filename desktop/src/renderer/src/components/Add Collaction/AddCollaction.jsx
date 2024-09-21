import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { useState } from 'react'
import { toast } from 'react-toastify'
export default function AddCollaction({ visiable, setVisible, refrech, collaction }) {
  const [namecollaction, setnamecollaction] = useState('')
  const create = async () => {
    try {
      const response = await window.DB.createcollaction({
        dbname: collaction,
        collection: namecollaction
      })

      if (response == 200) {
        toast.success('collaction added successfully')
        setVisible(false)
        refrech()
      } else {
        if (response == 400) {
          toast.error('collaction is already exist')
        } else {
          toast.error('error')
        }
      }
    } catch (error) {
      console.log(error)
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
          defaultValue={collaction}
          value={collaction}
          readOnly={true}
          style={{ width: '70%' }}
        />
        <br />
        <br />
        Name Collaction :{' '}
        <InputText
          placeholder="Name Collaction"
          onChange={(e) => {
            setnamecollaction(e.target.value)
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
