import { Icon } from "semantic-ui-react";

const LoadingScreen = () => (
  <div style={{ textAlign: "center" }}>
    <h2>One moment please</h2>
    <Icon loading name="spinner" size="massive" />
  </div>
);

export default LoadingScreen;
