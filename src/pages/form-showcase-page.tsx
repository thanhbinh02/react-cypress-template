import React from "react";
import { Button, Form, Input, Radio, Select, Space } from "antd";

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const FormShowcasePage: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({ note: "Hello world!", gender: 1, age: "a" });
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="note" label="Note" rules={[{ required: true }]}>
        <Input placeholder="Enter note" />
      </Form.Item>

      <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          allowClear
          options={GENDERS}
        />
      </Form.Item>

      <Form.Item name="age" label="age">
        <Radio.Group>
          <Radio value="a">Gen Z</Radio>
          <Radio value="b">Gen Y</Radio>
          <Radio value="c">Gen X</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
          <Button type="link" htmlType="button" onClick={onFill}>
            Fill form
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default FormShowcasePage;

const GENDERS = [
  {
    value: 1,
    label: "Male",
  },
  {
    value: 2,
    label: "Female",
  },
  {
    value: 3,
    label: "Female",
  },
];
