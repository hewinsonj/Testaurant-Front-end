import React, { useState } from "react";
import { Grid, Form, Segment } from "semantic-ui-react";

const DrinksPage = () => {
  return (
    <>
      <Segment inverted color="yellow" class="capitalize-me">
        <Grid centered stretched>
          <Grid.Row padded>
            <Segment raised>
              <h1>Drinks</h1>
              <div className="headerSearch">
                <Form>
                  <Form.Input placeholder="Type  here  to  filter  results  by drink  name  or  allergens"></Form.Input>
                </Form>
              </div>
            </Segment>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment centered>
        <div id="menuItems"></div>
      </Segment>
    </>
  );
};

export default DrinksPage;
