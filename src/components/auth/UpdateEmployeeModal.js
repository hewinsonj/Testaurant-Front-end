import React, { useState } from "react"
import {
  Button,
  Modal,
  Form,
  Header,
  Segment,
  Icon,
} from "semantic-ui-react"
import { updateEmployee } from "../../api/user"

const UpdateEmployeeModal = ({ user, employee, msgAlert }) => {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    first_name: employee.first_name || "",
    last_name: employee.last_name || "",
    role: employee.role || "",
    // hire_date: employee.hire_date || "", // optional: wait until date field ready
  })

  const handleChange = (e, { name, value }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = () => {
    updateEmployee(user, employee.id, formData)
      .then(() => {
        msgAlert({
          heading: "Success",
          message: "Employee updated successfully.",
          variant: "success",
        })
        setOpen(false)
      })
      .catch((error) => {
        msgAlert({
          heading: "Error",
          message: "Failed to update employee: " + error.message,
          variant: "danger",
        })
      })
  }

  return (
    <Modal
      closeIcon
      open={open}
      trigger={
        <Button fluid color="blue" style={{ marginBottom: "1rem" }}>
          Update Employee
        </Button>
      }
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon="user circle" content={`Update ${employee.email}`} />
      <Modal.Content>
        <Segment basic>
          <Form>
            <Form.Input
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
            <Form.Input
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
            <Form.Input
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            />
            {/* <Form.Input
              label="Hire Date"
              name="hire_date"
              type="date"
              value={formData.hire_date}
              onChange={handleChange}
            /> */}
          </Form>
        </Segment>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setOpen(false)}>
          <Icon name="remove" /> Cancel
        </Button>
        <Button color="green" onClick={handleSubmit}>
          <Icon name="checkmark" /> Save
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default UpdateEmployeeModal