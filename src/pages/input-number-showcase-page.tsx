import { InputNumber, Space } from 'antd';

const InputNumberShowcasePage = () => {
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

      {/* Read-only  */}
      <InputNumber data-testid='readonly' value={42} readOnly />

      <InputNumber autoFocus data-testid='focus' placeholder='Auto Focus' />

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

      {/* Size variations */}
      <InputNumber data-testid='small' size='small' defaultValue={3} />
      <InputNumber data-testid='middle' size='middle' defaultValue={5} />
      <InputNumber data-testid='large' size='large' defaultValue={7} />

      <InputNumber
        data-testid='addon-input'
        addonBefore='kg'
        addonAfter='grams'
      />

      <InputNumber
        prefix='$'
        suffix='USD'
        data-testid='prefix-suffix'
        placeholder='Enter price'
      />

      <InputNumber status='error' data-testid='error' />
      <InputNumber status='warning' data-testid='warning' />

      <InputNumber
        data-testid='outlined'
        variant='outlined'
        placeholder='Enter amount'
      />

      <InputNumber
        data-testid='filled'
        variant='filled'
        placeholder='Enter amount'
      />

      <InputNumber
        data-testid='borderless'
        variant='borderless'
        placeholder='Enter amount'
      />
    </Space>
  );
};

export default InputNumberShowcasePage;
