// RadioShowcasePage.tsx
import BackToHome from "@/components/back-to-home";
import { Radio } from "antd";
import { useState } from "react";

const RadioShowcasePage = () => {
  const [value, setValue] = useState("option1");

  return (
    <div className="flex flex-col gap-2">
      <BackToHome />

      <Radio.Group
        id="exampleRadioGroup"
        data-testid="radio-group"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      >
        <Radio value="option1" data-testid="radio-option1">
          Option 1
        </Radio>
        <Radio value="option2" data-testid="radio-option2">
          Option 2
        </Radio>
        <Radio value="option3" disabled data-testid="radio-option3">
          Option 3 (Disabled)
        </Radio>
      </Radio.Group>
    </div>
  );
};

export default RadioShowcasePage;
