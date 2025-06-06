import React from "react";
import { Button, Form, Input, Radio, Select, Space } from "antd";
import BackToHome from "@/components/back-to-home";

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
    <div className="flex flex-col gap-2">
      <BackToHome />

      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="note"
          label="Note"
          rules={[{ required: true }]}
          initialValue="This is note"
        >
          <Input placeholder="Enter note" size="large" />
        </Form.Item>

        <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
          <Select placeholder="Select gender" allowClear options={GENDERS} />
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
    </div>
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
