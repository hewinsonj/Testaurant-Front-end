import React from "react";
import { Grid, Image } from "semantic-ui-react";

const TheLandingDisplay = () => {
  return (
    <>
      <Image
        src="https://i.imgur.com/iOGXwfn.png"
        size="medium"
        wrapped
        floated="right"
      />
      <Image
        src="https://i.imgur.com/mofgSx8.png"
        size="small"
        floated="right"
      />
      <Grid padded>
        <div id="crooked">
          <p>Testaurant</p>
          <p>Know What You're Serving!</p>
        </div>
      </Grid>
      <Image src="https://i.imgur.com/ndocnm5.png" size="small" wrapped />
      <Image
        src="https://i.imgur.com/IGvFEhh.png"
        size="small"
        wrapped
        floated="right"
      />
    </>
  );
};

export default TheLandingDisplay;
