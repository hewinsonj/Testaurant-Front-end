import React, { useCallback, memo } from "react";
import { Button, Form, Container } from "semantic-ui-react";
import PropTypes from "prop-types";

const AddItem = (props) => {
  const { question, handleChange, handleSubmit, heading, getAllRestaurants, user } = props;

  const role = user?.role || '';
  const userRestaurantId = (typeof user?.restaurant === 'object') ? (user?.restaurant?.id ?? null) : (user?.restaurant ?? null);

  const [restaurants, setRestaurants] = React.useState([]);
  const [restLoading, setRestLoading] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (typeof getAllRestaurants !== 'function') return;
      try {
        setRestLoading(true);
        const resp = user ? await getAllRestaurants(user) : await getAllRestaurants();
        const list = Array.isArray(resp?.data) ? resp.data : (resp?.data?.restaurants || resp?.data || []);
        if (mounted) setRestaurants(Array.isArray(list) ? list : []);
      } catch (e) {
        if (mounted) setRestaurants([]);
        if (process.env.NODE_ENV !== 'production') {
          console.warn('[AddItem] getAllRestaurants failed', e?.response?.status, e?.response?.data);
        }
      } finally {
        if (mounted) setRestLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [user, getAllRestaurants]);

  // If Manager/GM, force their restaurant into the form state so submit carries it
  React.useEffect(() => {
    if (user && ["GeneralManager", "Manager"].includes(role)) {
      if (userRestaurantId != null) {
        handleChange?.(null, { name: 'restaurant', value: userRestaurantId });
      }
    }
  }, [role, userRestaurantId, user, handleChange]);

  const restaurantOptions = React.useMemo(() => {
    if (!Array.isArray(restaurants)) return [];
    const opts = restaurants.map(r => ({
      key: String(r.id),
      value: r.id,
      text: r.city && r.state ? `${r.name} — ${r.city}, ${r.state}` : r.name,
    }));
    // Add a No Restaurant option for Admins
    return [{ key: 'none', value: '', text: 'No Restaurant' }, ...opts];
  }, [restaurants]);

  const forcedRestaurantLabel = React.useMemo(() => {
    if (userRestaurantId === null) return '';
    const match = restaurants.find(r => r.id === userRestaurantId);
    if (!match) return String(userRestaurantId);
    return match.city && match.state ? `${match.name} — ${match.city}, ${match.state}` : match.name;
  }, [restaurants, userRestaurantId]);

  const handleRestaurantSelect = useCallback((e, { value }) => {
    return handleChange(e, { name: 'restaurant', value });
  }, [handleChange]);

  return (
    <Container className="justify-content-center">
      <h3>{heading}</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            required
            name="question_str"
            id="question_str"
            label="Question String"
            placeholder="Question String"
            value={question.question_str}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Input
          required
          name="option1"
          id="option1"
          label="Option 1"
          placeholder="Option 1"
          value={question.option1}
          onChange={handleChange}
        />
        <Form.Input
          required
          name="option2"
          id="option2"
          label="Option 2"
          placeholder="Option 2"
          value={question.option2}
          onChange={handleChange}
        />
        <Form.Input
          required
          name="option3"
          id="option3"
          label="Option 3"
          placeholder="Option 3"
          value={question.option3}
          onChange={handleChange}
        />
        <Form.Input
          required
          name="option4"
          id="option4"
          label="Option 4"
          placeholder="Option 4"
          value={question.option4}
          onChange={handleChange}
        />
        <Form.Input
          required
          name="answer"
          id="answer"
          label="answer"
          placeholder="answer"
          value={question.answer}
          onChange={handleChange}
        />
        {role === 'Admin' ? (
          <Form.Select
            name="restaurant"
            id="restaurant"
            label="Restaurant"
            placeholder={restLoading ? 'Loading…' : 'Select restaurant'}
            loading={restLoading}
            disabled={restLoading}
            options={restaurantOptions}
            value={(() => {
              const val = question?.restaurant ?? question?.restaurant_id ?? (typeof question?.restaurant === 'object' ? question.restaurant?.id : '');
              return val === null ? '' : val;
            })()}
            onChange={handleRestaurantSelect}
            clearable
          />
        ) : (
          <Form.Input
            label="Restaurant"
            value={forcedRestaurantLabel}
            readOnly
          />
        )}
        <Button type="submit" color="orange">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

AddItem.propTypes = {
  question: PropTypes.object.isRequired,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  heading: PropTypes.node,
  getAllRestaurants: PropTypes.func,
  user: PropTypes.shape({
    role: PropTypes.string,
    restaurant: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({ id: PropTypes.number })
    ])
  })
};

export default memo(AddItem);
