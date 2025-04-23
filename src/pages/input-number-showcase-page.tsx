import { InputNumber, Space } from 'antd';
import { useState } from 'react';

const InputNumberShowcasePage = () => {
  const [value, setValue] = useState<number | null>(null);

  return (
    <Space
      direction='vertical'
      size='large'
      style={{ width: 300 }}
      data-testid='input-number-showcase'
    >
      {/* Basic usage */}
      <InputNumber data-testid='basic' defaultValue={10} />

      {/* Disabled */}
      <InputNumber data-testid='disabled' defaultValue={10} disabled />

      {/* Controlled value */}
      <InputNumber data-testid='controlled' value={value} onChange={setValue} />

      {/* Min/Max range */}
      <InputNumber data-testid='range' min={1} max={10} defaultValue={5} />

      {/* Step size */}
      <InputNumber data-testid='step' step={0.1} defaultValue={1} />

      {/* Formatter/Parser */}
      <InputNumber
        data-testid='currency'
        defaultValue={1000}
        formatter={(value) =>
          `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        }
      />

      {/* Read-only style (not native readonly attr) */}
      <InputNumber data-testid='readonly' value={42} readOnly />

      {/* Size variations */}
      <InputNumber data-testid='small' size='small' defaultValue={3} />
      <InputNumber data-testid='middle' size='middle' defaultValue={5} />
      <InputNumber data-testid='large' size='large' defaultValue={7} />

      <InputNumber
        data-testid='addon-input'
        addonBefore='kg'
        addonAfter='grams'
      />
    </Space>
  );
};

export default InputNumberShowcasePage;
