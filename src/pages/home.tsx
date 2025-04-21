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
    </div>
  );
};

export default HomePage;
