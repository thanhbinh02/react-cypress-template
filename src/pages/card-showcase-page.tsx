import React, { useState } from "react";
import { Card, Typography } from "antd";
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const CardShowcasePage: React.FC = () => {
  const [actionMessage, setActionMessage] = useState("");

  const handleActionClick = (index: number) => {
    setActionMessage(`Action ${index + 1} clicked`);
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Ant Design Card Showcase</Title>

      <Card title="Card Title" style={{ width: 300, marginBottom: 24 }}>
        This is the content of the card.
      </Card>

      <Card
        style={{ width: 300, marginBottom: 24 }}
        cover={<img alt="example" src="https://picsum.photos/300/180" />}
        actions={[
          <SettingOutlined
            key="setting"
            onClick={() => handleActionClick(0)}
          />,
          <EditOutlined key="edit" onClick={() => handleActionClick(1)} />,
          <EllipsisOutlined
            key="ellipsis"
            onClick={() => handleActionClick(2)}
          />,
        ]}
      >
        <Card.Meta
          title="Card with Cover"
          description="This card includes a cover image and actions."
        />
      </Card>

      <div id="actionResult" style={{ marginTop: 16, fontStyle: "italic" }}>
        {actionMessage}
      </div>
    </div>
  );
};

export default CardShowcasePage;
