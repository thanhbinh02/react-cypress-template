import React, { useState } from 'react';
import { Popconfirm, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const PopConfirmShowcasePage = () => {
  const [loading, setLoading] = useState(false);

  const asyncConfirm = () => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        resolve('confirmed');
      }, 1500);
    });
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 24,
        color: 'black',
      }}
    >
      <div>
        <h2>1. Basic Usage</h2>
        <Popconfirm
          title='Are you sure to delete this item?'
          description='This action cannot be undone.'
          okText='Yes'
          cancelText='No'
        >
          <Button type='primary' data-testid='basic'>
            Delete
          </Button>
        </Popconfirm>
      </div>

      <div>
        <h2>2. Custom Icon</h2>
        <Popconfirm
          title='Delete the item?'
          icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
          okText='Yes'
          cancelText='No'
        >
          <Button danger data-testid='custom-icon'>
            Delete with Icon
          </Button>
        </Popconfirm>
      </div>

      <div>
        <h2>3. Custom Button Labels</h2>
        <Popconfirm
          title='Do you want to proceed?'
          okText='Proceed'
          cancelText='Cancel'
        >
          <Button data-testid='custom-buttons'>Proceed Action</Button>
        </Popconfirm>
      </div>

      <div>
        <h2>4. Async Confirm</h2>
        <Popconfirm
          title='Confirm async action?'
          onConfirm={asyncConfirm}
          okButtonProps={{ loading }}
          okText='Confirm'
          cancelText='Abort'
        >
          <Button data-testid='async-confirm'>Async Confirm</Button>
        </Popconfirm>
      </div>

      <div>
        <h2>5. No Icon</h2>
        <Popconfirm
          title='No icon here'
          icon={null}
          okText='OK'
          cancelText='Cancel'
        >
          <Button data-testid='no-icon'>Without Icon</Button>
        </Popconfirm>
      </div>

      <div>
        <h2>6. Disabled Pop Confirm</h2>
        <Popconfirm
          title='No icon here'
          icon={null}
          okText='OK'
          cancelText='Cancel'
          disabled
        >
          <Button data-testid='disabled-confirm'>Without Icon</Button>
        </Popconfirm>
      </div>

      <div>
        <h2>7. Top Placement</h2>
        <Popconfirm
          title='Are you sure?'
          placement='top'
          okText='Yes'
          cancelText='No'
        >
          <Button data-testid='top-placement'>Top Placement</Button>
        </Popconfirm>
      </div>

      <div>
        <h2>8. Bottom Placement</h2>
        <Popconfirm
          title='Are you sure?'
          placement='bottom'
          okText='Yes'
          cancelText='No'
        >
          <Button data-testid='bottom-placement'>Bottom Placement</Button>
        </Popconfirm>
      </div>

      <div>
        <h2>9. Left Placement</h2>
        <Popconfirm
          title='Are you sure?'
          placement='left'
          okText='Yes'
          cancelText='No'
        >
          <Button data-testid='left-placement'>Left Placement</Button>
        </Popconfirm>
      </div>

      <div>
        <h2>10. Right Placement</h2>
        <Popconfirm
          title='Are you sure?'
          placement='right'
          okText='Yes'
          cancelText='No'
        >
          <Button data-testid='right-placement'>Right Placement</Button>
        </Popconfirm>
      </div>
    </div>
  );
};

export default PopConfirmShowcasePage;
