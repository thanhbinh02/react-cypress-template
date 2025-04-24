import BackToHome from "@/components/back-to-home";
import { Switch } from "antd";
import { useState } from "react";

const SwitchShowcasePage = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <BackToHome />

      <div>
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
