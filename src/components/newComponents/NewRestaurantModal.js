import React, { useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import { createRestaurant } from '../../api/restaurant'; // expects POST /restaurants/

const NewRestaurantModal = ({ open, onClose, refreshRestaurants, refreshEmployees, msgAlert, user }) => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    state: '',
    address: '',
    zip_code: '',
  });
  const [loading, setLoading] = useState(false);

  const alertFn = typeof msgAlert === 'function' ? msgAlert : () => {};

  const handleChange = (e, { name, value }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!formData.name?.trim()) {
        alertFn({ heading: 'Restaurant name required', message: 'Please enter a name.', variant: 'warning' });
        setLoading(false);
        return;
      }

      const payload = {
        name: formData.name.trim(),
        city: formData.city || '',
        state: formData.state || '',
        address: formData.address || '',
        zip_code: formData.zip_code || '',
      };

      console.log('[Restaurant] posting payload', payload);
      await createRestaurant(user, payload);

      alertFn({ heading: 'Success', message: 'Restaurant created!', variant: 'success' });
      onClose?.();
      // Prefer refreshRestaurants(), fallback to refreshEmployees() if that’s what caller wired
      if (typeof refreshRestaurants === 'function') refreshRestaurants();
      else if (typeof refreshEmployees === 'function') refreshEmployees();
    } catch (error) {
      const status = error?.response?.status;
      const data = error?.response?.data;
      console.error('[Restaurant] create failed', status, data);
      let msg = 'Could not create restaurant.';
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
      <Modal.Header>Create New Restaurant</Modal.Header>
      <Modal.Content>
        <Form loading={loading} onSubmit={handleSubmit}>
          <Form.Input
            label='Name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Form.Group widths='equal'>
            <Form.Input
              label='City'
              name='city'
              value={formData.city}
              onChange={handleChange}
            />
            <Form.Input
              label='State'
              name='state'
              value={formData.state}
              onChange={handleChange}
              maxLength={60}
            />
          </Form.Group>
          <Form.Input
            label='Address'
            name='address'
            value={formData.address}
            onChange={handleChange}
          />
          <Form.Input
            label='ZIP Code'
            name='zip_code'
            value={formData.zip_code}
            onChange={handleChange}
          />
          <Button type='submit' primary fluid>
            Create Restaurant
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default NewRestaurantModal;