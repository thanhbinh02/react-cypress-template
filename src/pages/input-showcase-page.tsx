import {
  EyeInvisibleOutlined,
  EyeOutlined,
  EyeTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import { Input } from "antd";

const InputShowcasePage = () => {
  return (
    <div
      style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}
    >
      {/* Basic Input */}
      <Input id="basicInput" placeholder="Basic Input" />

      {/* Disabled Input */}
      <Input id="disabledInput" placeholder="Disabled Input" disabled />

      {/* Read Only Input */}
      <Input id="readOnlyInput" defaultValue="Read only" readOnly />

      {/* Sizes */}
      <Input
        id="largeInput"
        size="large"
        placeholder="Large Input"
        className="ant-input-lg"
      />
      <Input id="mediumInput" placeholder="Medium Input" />
      <Input
        id="smallInput"
        size="small"
        placeholder="Small Input"
        className="ant-input-sm"
      />

      {/* Input Types */}
      <Input.Password
        id="passwordInput"
        placeholder="Password"
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
      />
      <Input type="number" id="numberInput" placeholder="Number" />
      <Input type="email" id="emailInput" placeholder="Email" />

      {/* Prefix / Suffix */}
      <Input id="prefixInput" placeholder="Prefix" prefix={<UserOutlined />} />
      <Input
        id="suffixInput"
        placeholder="Suffix Input"
        suffix={<EyeOutlined />}
      />

      {/* Addon Before / After */}
      <Input
        addonBefore="https://"
        id="addonBeforeInput"
        placeholder="mysite.com"
      />
      <Input addonAfter=".com" id="addonAfterInput" />

      {/* Status */}
      <Input
        id="errorInput"
        status="error"
        placeholder="Error Input"
        className="ant-input-status-error"
      />
      <Input
        id="warningInput"
        status="warning"
        placeholder="Warning Input"
        className="ant-input-status-warning"
      />

      {/* Clearable Input */}
      <Input id="clearableInput" allowClear placeholder="Clearable Input" />
    </div>
  );
};

export default InputShowcasePage;
