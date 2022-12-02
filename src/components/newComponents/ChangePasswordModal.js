import React, { useState } from 'react'
import {Button, Modal} from 'semantic-ui-react'
import ChangePassword from '../auth/ChangePassword'

const ChangePasswordModal = (props) => {

    const { user, msgAlert } = props

    const [open, setOpen] = useState(false)

    return (
        <Modal
            onClose={() => {
                setOpen(false)
            }}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={
                <Button color='orange'>Change Password</Button>
            }
        >
        <Modal.Content>
            <ChangePassword user={user} msgAlert={msgAlert}/>
        </Modal.Content>
  </Modal>
    )
}

export default ChangePasswordModal