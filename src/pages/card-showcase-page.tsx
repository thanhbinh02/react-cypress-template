import BackToHome from "@/components/back-to-home";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
import React, { useState } from "react";

const CardShowcasePage: React.FC = () => {
  const [actionMessage, setActionMessage] = useState("");

  const handleActionClick = (index: number) => {
    setActionMessage(`Action ${index + 1} clicked`);
  };

  return (
    <div className="flex flex-col gap-2">
      <BackToHome />

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
