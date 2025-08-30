import React, { useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import { signUp } from '../../api/auth';

const NewEmployeeModal = ({ open, onClose, refreshEmployees, msgAlert, user, allRestaurants }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirmation: '',
    firstName: '',
    lastName: '',
    hireDate: '',
    role: 'employee',
  });
  const [loading, setLoading] = useState(false);

  const alertFn = typeof msgAlert === 'function' ? msgAlert : () => {};

  const handleChange = (e, { name, value }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const normalizeRole = (r) => {
    const map = {
      employee: 'Employee',
      manager: 'Manager',
      generalmanager: 'GeneralManager',
      admin: 'Admin',
    };
    return map[(r || '').toLowerCase()] || null;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if ((formData.password || '') !== (formData.password_confirmation || '')) {
        alertFn({ heading: 'Passwords do not match', message: 'Please re-enter them.', variant: 'warning' });
        setLoading(false);
        return;
      }

      const payload = {
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
        first_name: formData.firstName || '',
        last_name: formData.lastName || '',
        hire_date: formData.hireDate || null,
        role: normalizeRole(formData.role),
      };

      console.log('[SignUp] posting payload', payload);
      await signUp(payload);

      alertFn({ heading: 'Success', message: 'New employee created!', variant: 'success' });
      onClose();
      refreshEmployees?.();
    } catch (error) {
      const status = error?.response?.status;
      const data = error?.response?.data;
      console.error('[SignUp] failed', status, data);
      let msg = 'Something went wrong. Please try again.';
      if (status === 400 && data) {
        msg = typeof data === 'string' ? data : JSON.stringify(data);
      }
      alertFn({ heading: 'Error', message: msg, variant: 'danger' });
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
            name='password_confirmation'
            type='password'
            value={formData.password_confirmation}
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
              { key: 'generalmanager', text: 'General Manager', value: 'generalmanager' },
              { key: 'admin', text: 'Admin', value: 'admin' },
            ]}
          />
          <Form.Select
            label="Restaurant"
            name="restaurant"
            value={formData.restaurant}
            onChange={handleChange}
            options={(allRestaurants || []).map(r => ({
              key: r.id,
              text: r.name,
              value: r.id,
            }))}
            placeholder="Select a restaurant"
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