import React from "react";
import { Button, Form, Container, Segment, Grid } from "semantic-ui-react";
import LoadingScreen from "../shared/LoadingPage";


const AddTest = (props) => {
  const {
    heading,
    test,
    allQuestions,
    relatedQuestions,
    handleSubmit,
    handleChange,
    handleChangeOther,
    user,
    getAllRestaurants
  } = props;

  const role = user?.role || '';
  const userRestaurantId = (typeof user?.restaurant === 'object') ? (user?.restaurant?.id ?? null) : (user?.restaurant ?? null);

  const [restaurants, setRestaurants] = React.useState([]);
  const [restLoading, setRestLoading] = React.useState(false);

  const handleAllottedTimeChange = (e, data) => {
    const raw = data?.value;
    const num = Number(raw);
    const safe = Number.isFinite(num) && num > 0 ? Math.floor(num) : 0;
    // Call the parent handler in Semantic-UI style with a normalized payload
    return handleChangeOther(e, { ...data, name: 'allotted_time', value: String(safe) });
  };

  const TIME_OPTIONS = [0, 5, 10, 15, 20, 30, 45, 60, 90, 120, 160].map((m) => ({
    key: String(m),
    value: String(m),
    text: m === 0 ? 'No limit' : `${m} min`,
  }));

  const handleTimeSelect = (e, { value }) => {
    const num = Number(value);
    const safe = Number.isFinite(num) && num >= 0 ? Math.floor(num) : 0;
    return handleChangeOther(e, { name: 'allotted_time', value: String(safe) });
  };

  // Effect to fetch restaurants when form mounts
  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setRestLoading(true);
        // Try with user if parent provided it; otherwise call without (endpoint allows public GET)
        const resp = props.user ? await getAllRestaurants(props.user) : await getAllRestaurants();
        const list = Array.isArray(resp?.data) ? resp.data : (resp?.data?.restaurants || resp?.data || []);
        if (mounted) setRestaurants(Array.isArray(list) ? list : []);
      } catch (e) {
        if (mounted) setRestaurants([]);
        if (process.env.NODE_ENV !== 'production') {
          console.warn('[AddTest] getAllRestaurants failed', e?.response?.status, e?.response?.data);
        }
      } finally {
        if (mounted) setRestLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [props.user]);

  React.useEffect(() => {
    if (user && ["GeneralManager", "Manager"].includes(role)) {
      if (userRestaurantId != null) {
        // Force the restaurant id into the form state so submit always carries it
        handleChangeOther?.(null, { name: 'restaurant', value: String(userRestaurantId) });
      }
    }
  }, [role, userRestaurantId]);

  const forcedRestaurantLabel = React.useMemo(() => {
    if (userRestaurantId == null) return '';
    const match = restaurants.find(r => String(r.id) === String(userRestaurantId));
    if (!match) return String(userRestaurantId);
    return match.city && match.state ? `${match.name} — ${match.city}, ${match.state}` : match.name;
  }, [restaurants, userRestaurantId]);

  // Compute dropdown options from the fetched restaurants
  const restaurantOptions = React.useMemo(() => {
    if (!Array.isArray(restaurants)) return [];
    const opts = restaurants.map(r => ({
      key: String(r.id),
      value: String(r.id),
      text: r.city && r.state ? `${r.name} — ${r.city}, ${r.state}` : r.name,
    }));
    // Add a 'No Restaurant' option at the top for Admins
    return [{ key: 'none', value: '', text: 'No Restaurant' }, ...opts];
  }, [restaurants]);

  // Change handler for restaurant select
  const handleRestaurantSelect = (e, { value }) => {
    return handleChangeOther(e, { name: 'restaurant', value: String(value) });
  };

  return (
    <Container className="justify-content-center">
      <h3>{heading}</h3>
      <Form onSubmit={handleSubmit}>
        <Grid centered columns={1}>
          <Grid.Row>
            <Segment>
              <Form.Input
                required
                name="name"
                id="name"
                label="Test Name"
                placeholder="Test Name"
                value={test?.name ?? ''}
                onChange={handleChangeOther}
              />
              <Form.Select
                name="allotted_time"
                id="allotted_time"
                label="Allotted Time"
                placeholder="Select duration"
                options={(() => {
                  const minutes = Number(test?.allotted_time ?? 0);
                  const exists = TIME_OPTIONS.some(o => Number(o.value) === minutes);
                  return exists || minutes <= 0
                    ? TIME_OPTIONS
                    : [...TIME_OPTIONS, { key: `custom-${minutes}`, value: String(minutes), text: `${minutes} min` }];
                })()}
                value={String(Number(test?.allotted_time ?? 0))}
                onChange={handleTimeSelect}
                clearable
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
                    const val = test?.restaurant ?? test?.restaurant_id ?? (typeof test?.restaurant === 'object' ? test.restaurant?.id : '');
                    return val == null ? '' : String(val);
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
            </Segment>
          </Grid.Row>
          <Grid.Column>
            <Segment raised >
              <h1 id="commFeed">All Questions</h1>
              <div className="scrolling-group">
                {allQuestions ? (
                  allQuestions.map((question) => (
                    <Form.Checkbox
                      key={question.id}
                      name="question_ids"
                      id={String(question.id)}
                      label={question.question_str}
                      value={question.id}
                      defaultChecked={Array.isArray(test?.question_new) && test.question_new.some((q) => q.id === question.id)} // Preselect relevant questions
                      
                      onChange={handleChange}
                    />
                  ))
                ) : (
                  <LoadingScreen />
                )}
              </div>
            </Segment>
          </Grid.Column>
        </Grid>
        <Button type="submit" color="green">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AddTest;