import React, { useState, useEffect } from 'react';
import { Modal, Button, Checkbox, Form } from 'semantic-ui-react';

const FilterModal = ({ open, onClose, filters = [], onApply }) => {
  const [selectedFilters, setSelectedFilters] = useState({});

  useEffect(() => {
    const initial = {};
    filters.forEach(f => initial[f.key] = false);
    setSelectedFilters(initial);
  }, []);

  const handleCheckboxChange = (key) => {
    setSelectedFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // When applying filters, separate inclusion keys (is_vegan, is_vegetarian) from exclusion filters.
  // onApply now receives an object: { excludeKeys: [...], includeKeys: [...] }
  const handleApply = () => {
    const excludeKeys = [];
    const includeKeys = [];

    Object.entries(selectedFilters).forEach(([key, checked]) => {
      if (checked) {
        if (key === "is_vegan" || key === "is_vegetarian") {
          includeKeys.push(key);
        } else {
          excludeKeys.push(key);
        }
      }
    });

    onApply({ excludeKeys, includeKeys });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size="small">
      <Modal.Header>Filter Options</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Group widths="equal">
            <div style={{ flex: 1 }}>
              {filters.filter((_, i) => i % 2 === 0).map(filter => (
                <Form.Field key={filter.key}>
                  <Checkbox
                    label={filter.label}
                    checked={selectedFilters[filter.key]}
                    onChange={() => handleCheckboxChange(filter.key)}
                  />
                </Form.Field>
              ))}
            </div>
            <div style={{ flex: 1 }}>
              {filters.filter((_, i) => i % 2 === 1).map(filter => (
                <Form.Field key={filter.key}>
                  <Checkbox
                    label={filter.label}
                    checked={selectedFilters[filter.key]}
                    onChange={() => handleCheckboxChange(filter.key)}
                  />
                </Form.Field>
              ))}
            </div>
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={() => {
            const reset = {};
            filters.forEach(f => reset[f.key] = false);
            setSelectedFilters(reset);
          }}
        >
          Reset
        </Button>
        <Button onClick={onClose}>Cancel</Button>
        <Button primary onClick={handleApply}>Apply Filters</Button>
      </Modal.Actions>
    </Modal>
  );
};

export default FilterModal;
// Also export selected keys for parent display convenience (if needed)
export const getExcludedKeys = (selectedFilters) =>
  Object.entries(selectedFilters)
    .filter(([_, checked]) => checked)
    .map(([key]) => key);