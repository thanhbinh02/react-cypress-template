// SelectComponent.tsx
import React from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";

const options: SelectProps["options"] = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
];

const SelectShowcasePage: React.FC = () => {
  return (
    <div style={{ width: 300 }}>
      <h3>Single Select</h3>
      <Select
        id="single-select"
        placeholder="Chọn mục..."
        style={{ width: "100%" }}
        options={options}
        defaultValue={"1"}
      />

      <h3 style={{ marginTop: 24 }}>Multiple Select</h3>
      <Select
        id="multiple-select"
        mode="multiple"
        placeholder="Chọn nhiều mục..."
        style={{ width: "100%" }}
        options={options}
        defaultValue={["1", "2"]}
      />

      <h3 style={{ marginTop: 24 }}>Tags Select</h3>
      <Select
        id="tags-select"
        mode="tags"
        placeholder="Chọn hoặc nhập tags..."
        style={{ width: "100%" }}
        options={options}
        defaultValue={["1", "3"]}
      />
    </div>
  );
};

export default SelectShowcasePage;
