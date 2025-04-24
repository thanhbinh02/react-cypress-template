import { useState } from 'react';
import { Checkbox, Divider } from 'antd';
import type { CheckboxChangeEvent } from 'antd';

const plainOptions = ['Apple', 'Orange', 'Banana'];

export default function CheckboxShowcasePage() {
  const [groupValue, setGroupValue] = useState<string[]>([]);
  const [checkedAll, setCheckedAll] = useState(false);

  const handleGroupChange = (list: string[]) => {
    setGroupValue(list);
    setCheckedAll(list.length === plainOptions.length);
  };

  const handleCheckAllChange = (e: CheckboxChangeEvent) => {
    const checked = e.target.checked;
    setGroupValue(checked ? plainOptions : []);
    setCheckedAll(checked);
  };

  return (
    <div style={{ padding: 24, color: 'black' }}>
      <h2>1. Basic Checkbox</h2>
      <Checkbox data-testid='basic-checkbox'>Basic</Checkbox>

      <Divider />

      <h2>2. Disabled Checkbox</h2>
      <Checkbox data-testid='disabled-checkbox' disabled>
        Disabled
      </Checkbox>

      <Divider />

      <h2>3. Checkbox Group</h2>
      <Checkbox.Group
        options={plainOptions}
        value={groupValue}
        onChange={handleGroupChange}
        data-testid='checkbox-group'
      />

      <Divider />

      <h2>4. Select All</h2>
      <Checkbox
        data-testid='select-all'
        indeterminate={
          groupValue.length > 0 && groupValue.length < plainOptions.length
        }
        checked={checkedAll}
        onChange={handleCheckAllChange}
      >
        Select All
      </Checkbox>

      <h2>5. Select All disabled</h2>
      <Checkbox
        data-testid='select-all-disabled'
        indeterminate={
          groupValue.length > 0 && groupValue.length < plainOptions.length
        }
        disabled
        checked={checkedAll}
        onChange={handleCheckAllChange}
      >
        Select All
      </Checkbox>
    </div>
  );
}
