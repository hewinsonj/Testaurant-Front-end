import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Header, Segment, Icon } from "semantic-ui-react";
import { updateEmployee } from "../../api/user";

const UpdateEmployeeModal = ({ user, employee, msgAlert, allRestaurants }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    role: "",
    hire_date: "",
    restaurant: "",
  });

  

  // Auto-fill the form when modal opens or employee changes
  useEffect(() => {
    if (employee && open) {
      setFormData({
        email: employee.email || "",
        first_name: employee.first_name || "",
        last_name: employee.last_name || "",
        role: employee.role || "",
        hire_date: employee.hire_date || "",
        restaurant: (employee.restaurant && employee.restaurant.id) ? employee.restaurant.id : (employee.restaurant || ""),      });
    }
  }, [employee, open]);

  const handleChange = (e, { name, value }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    updateEmployee(user, employee.id, formData)
      .then(() => {
        msgAlert({
          heading: "Success",
          message: "Employee updated successfully.",
          variant: "success",
        });
        setOpen(false);
      })
      .catch((error) => {
        msgAlert({
          heading: "Error",
          message: "Failed to update employee: " + error.message,
          variant: "danger",
        });
      });
  };

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
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
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
            <Form.Field>
              <label>Role</label>
              <Form.Group inline>
                
                
                <Form.Radio
                  label="Admin"
                  name="role"
                  value="Admin"
                  checked={formData.role === "Admin"}
                  onChange={handleChange}
                />
                <Form.Radio
                  label="General Manager"
                  name="role"
                  value="GeneralManager"
                  checked={formData.role === "GeneralManager"}
                  onChange={handleChange}
                />
                <Form.Radio
                  label="Manager"
                  name="role"
                  value="Manager"
                  checked={formData.role === "Manager"}
                  onChange={handleChange}
                />
                <Form.Radio
                  label="Employee"
                  name="role"
                  value="Employee"
                  checked={formData.role === "Employee"}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form.Field>
            <Form.Input
              label="Hire Date"
              name="hire_date"
              type="date"
              value={formData.hire_date}
              onChange={handleChange}
            />
            <Form.Select
              clearable
              label="Restaurant"
              name="restaurant"
              value={formData.restaurant}
              onChange={handleChange}
              options={[
                { key: 'none', text: 'None', value: '' },
                ...(allRestaurants || []).map(r => ({
                  key: r.id,
                  text: r.name,
                  value: r.id,
                }))
              ]}
              placeholder="Select a restaurant"
            />
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
  );
};

export default UpdateEmployeeModal;
