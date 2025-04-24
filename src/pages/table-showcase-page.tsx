import React from 'react';
import { Table, Space } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const dataSource: DataType[] = [
  { key: '1', name: 'John', age: 32, address: 'New York' },
  { key: '2', name: 'Jane', age: 28, address: 'London' },
  { key: '3', name: 'Mike', age: 25, address: 'Paris' },
];

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a: DataType, b: DataType) => a.name.localeCompare(b.name),
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    sorter: (a: DataType, b: DataType) => a.age - b.age,
    render: (age: number) => <span data-testid='age-cell'>{age} years</span>,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

// Row expansion
const expandedRowRender = (record: DataType) => (
  <p style={{ margin: 0 }}>Expanded content for {record.name}</p>
);

// Row selection
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[]) => {
    console.log('Selected Row Keys:', selectedRowKeys);
  },
};

const expandedRowRenderNested = () => {
  const nestedColumns = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Value', dataIndex: 'value', key: 'value' },
  ];
  const nestedData = [
    { key: '1', date: '2024-01-01', value: 100 },
    { key: '2', date: '2024-01-02', value: 200 },
  ];

  return (
    <Table
      dataSource={nestedData}
      columns={nestedColumns}
      pagination={false}
      data-testid='nested-table'
      rowKey='key'
    />
  );
};

export default function TableShowcasePage() {
  return (
    <div style={{ marginTop: 100 }}>
      <h2 className='text-xl font-semibold'>Table Showcase</h2>
      <Space direction='vertical' size={48}>
        {' '}
        {/* Tăng size để cách đều hơn giữa các table */}
        <div>
          <p className='font-medium'>Table with pagination, selection, expansion</p>
          <Table
            dataSource={dataSource}
            columns={columns}
            rowSelection={rowSelection}
            expandedRowRender={expandedRowRender}
            pagination={{ pageSize: 2 }}
            size='middle'
            data-testid='antd-table'
            rowKey='key'
          />
        </div>
        <div>
          <p className='font-medium'>Small size table</p>
          <Table
            dataSource={dataSource}
            columns={columns}
            size='small'
            pagination={false}
            data-testid='small-table'
            rowKey='key'
          />
        </div>
        <div>
          <p className='font-medium'>Middle size table</p>
          <Table
            dataSource={dataSource}
            columns={columns}
            size='middle'
            pagination={false}
            data-testid='middle-table'
            rowKey='key'
          />
        </div>
        <div>
          <p className='font-medium'>Table with expandable rows</p>
          <Table
            dataSource={dataSource}
            columns={columns}
            expandedRowRender={expandedRowRender}
            pagination={false}
            data-testid='expandable-table'
            rowKey='key'
          />
        </div>
        <div>
          <p className='font-medium'>Table with row selection</p>
          <Table
            dataSource={dataSource}
            columns={columns}
            rowSelection={rowSelection}
            pagination={false}
            data-testid='selection-table'
            rowKey='key'
          />
        </div>
        <div>
          <p className='font-medium'>Expandable table with nested Table</p>
          <Table
            dataSource={dataSource}
            columns={columns}
            expandedRowRender={expandedRowRenderNested}
            pagination={false}
            data-testid='expandable-nested-table'
            rowKey='key'
          />
        </div>
      </Space>
    </div>
  );
}
