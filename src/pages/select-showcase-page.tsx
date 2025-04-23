// SelectComponent.tsx
import React from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";

const options: SelectProps["options"] = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const SelectShowcasePage: React.FC = () => {
  return (
    <div style={{ width: 300 }}>
      <h3>Single Select</h3>
      <Select
        placeholder="Chọn mục..."
        style={{ width: "100%" }}
        options={options}
      />

      <h3 style={{ marginTop: 24 }}>Multiple Select</h3>
      <Select
        mode="multiple"
        placeholder="Chọn nhiều mục..."
        style={{ width: "100%" }}
        options={options}
      />

      <h3 style={{ marginTop: 24 }}>Tags Select</h3>
      <Select
        mode="tags"
        placeholder="Nhập hoặc chọn tag..."
        style={{ width: "100%" }}
        options={options}
      />
    </div>
  );
};

export default SelectShowcasePage;
