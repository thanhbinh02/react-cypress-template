import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <h1>Welcome</h1>
      <Button onClick={() => navigate("/message")}>
        Go to Message Showcase
      </Button>
      <Button onClick={() => navigate("/button")}>Go to Button Showcase</Button>
      <Button onClick={() => navigate("/input")}>Go to Input Showcase</Button>
      <Button onClick={() => navigate("/radio")}>Go to Radio Showcase</Button>
    </div>
  );
};

export default HomePage;
