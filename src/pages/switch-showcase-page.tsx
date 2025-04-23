import React, { useState } from "react";
import { Switch, Typography } from "antd";

const { Title } = Typography;

const SwitchShowcasePage = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div style={{ padding: 24 }}>
      <Title level={4}>Ant Design Switch Example</Title>

      <div style={{ marginBottom: 16 }}>
        <Switch id="mainSwitch" checked={checked} onChange={setChecked} />
        <span id="switchStatus" style={{ marginLeft: 12 }}>
          {checked ? "ON" : "OFF"}
        </span>
      </div>

      <div>
        <Switch id="disabledSwitch" disabled />
        <span style={{ marginLeft: 12 }}>Disabled Switch</span>
      </div>
    </div>
  );
};

export default SwitchShowcasePage;
