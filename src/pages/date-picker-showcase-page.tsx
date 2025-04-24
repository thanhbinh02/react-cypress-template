import { DatePicker, Space, Button } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

const disabledPastDate = (current: dayjs.Dayjs) => {
  return current && current < dayjs().startOf('day');
};

export default function DatePickerShowcasePage() {
  const [value, setValue] = useState<dayjs.Dayjs | null>(null);

  return (
    <div style={{ marginTop: 100 }}>
      <h2 className='text-xl font-semibold'>Date Picker Showcase</h2>
      <Space direction='vertical' size={16}>
        <DatePicker
          data-testid='datepicker'
          onChange={(date) => setValue(date)}
          value={value}
          disabledDate={disabledPastDate}
          allowClear
          open
        />
        <Button data-testid='clear-btn' onClick={() => setValue(null)}>
          Clear Date
        </Button>
      </Space>
      <DatePicker picker='week' data-testid='datepicker-week' />
      <DatePicker picker='month' data-testid='datepicker-month' />
      <DatePicker picker='quarter' data-testid='datepicker-quarter' />
      <DatePicker picker='year' data-testid='datepicker-year' />

      <DatePicker size='small' data-testid='datepicker-small' />
      <DatePicker size='large' data-testid='datepicker-large' />
    </div>
  );
}
