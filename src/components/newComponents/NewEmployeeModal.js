import React, { useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import { signUp } from '../../api/auth';
import msgAlert from '../shared/AutoDismissAlert/AutoDismissAlert';

const NewEmployeeModal = ({ open, onClose, refreshEmployees }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
    firstName: '',
    lastName: '',
    hireDate: '',
    role: 'employee',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e, { name, value }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await signUp(formData);
      msgAlert({
        heading: 'Success',
        message: 'New employee created!',
        variant: 'success',
      });
      onClose();
      refreshEmployees?.();
    } catch (error) {
      msgAlert({
        heading: 'Error',
        message: 'Something went wrong. Please try again.',
        variant: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} size='small'>
      <Modal.Header>Create New Employee</Modal.Header>
      <Modal.Content>
        <Form loading={loading} onSubmit={handleSubmit}>
          <Form.Input
            label='Email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Form.Input
            label='Password'
            name='password'
            type='password'
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Form.Input
            label='Confirm Password'
            name='passwordConfirmation'
            type='password'
            value={formData.passwordConfirmation}
            onChange={handleChange}
            required
          />
          <Form.Input
            label='First Name'
            name='firstName'
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <Form.Input
            label='Last Name'
            name='lastName'
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <Form.Input
            label='Hire Date'
            name='hireDate'
            type='date'
            value={formData.hireDate}
            onChange={handleChange}
            required
          />
          <Form.Select
            label='Role'
            name='role'
            value={formData.role}
            onChange={handleChange}
            options={[
              { key: 'employee', text: 'Employee', value: 'employee' },
              { key: 'manager', text: 'Manager', value: 'manager' },
            ]}
          />
          <Button type='submit' primary fluid>
            Create Employee
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default NewEmployeeModal;