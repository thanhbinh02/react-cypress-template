import React, { useState } from 'react';
import { Spin, Button, Divider } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const SpinShowcasePage = () => {
  const [loading, setLoading] = useState(false);

  const toggleLoading = () => {
    setLoading(!loading);
  };

  return (
    <div style={{ color: 'black' }}>
      <div>
        <h2 className='text-xl font-bold mb-4'>1. Basic Spin</h2>
        <Spin spinning={loading} data-testid='toggle-spin-loading'>
          <div style={{ height: '100px', backgroundColor: '#f0f0f0' }}>
            Content here
          </div>
        </Spin>
        <Button
          onClick={toggleLoading}
          data-testid='toggle-spin-btn'
          className='mt-4'
        >
          Toggle Loading
        </Button>
      </div>

      <Divider />

      <div>
        <h2 className='text-xl font-bold mb-4'>3. Custom Indicator Spin</h2>
        <Spin
          tip='Tip Loading ...'
          indicator={<LoadingOutlined />}
          data-testid='spin-tip'
        >
          <div style={{ height: '100px', backgroundColor: '#f0f0f0' }}>
            Spin with tip
          </div>
        </Spin>
      </div>

      <Divider />

      <div>
        <h2 className='text-xl font-bold mb-4'>2. Custom Spin Size</h2>
        <Spin size='small' data-testid='small-spin'>
          <div style={{ height: '100px', backgroundColor: '#f0f0f0' }}>
            Small Spin
          </div>
        </Spin>
        <Spin size='large' data-testid='large-spin'>
          <div style={{ height: '100px', backgroundColor: '#f0f0f0' }}>
            Large Spin
          </div>
        </Spin>
      </div>

      <Divider />

      <div>
        <h2 className='text-xl font-bold mb-4'>3. Custom Indicator Spin</h2>
        <Spin
          indicator={<LoadingOutlined />}
          data-testid='custom-indicator-spin'
        >
          <div style={{ height: '100px', backgroundColor: '#f0f0f0' }}>
            Custom Indicator
          </div>
        </Spin>
      </div>
    </div>
  );
};

export default SpinShowcasePage;
