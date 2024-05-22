import { useState } from 'react';
import {

  Form,
  Input,
  InputNumber,
  Radio,
  Select,
} from 'antd';

type SizeType = Parameters<typeof Form>[0]['size'];

export const DogForm = () => {
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  return (
    <Form
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 20 }}
      layout="horizontal"
      initialValues={{ size: componentSize }}
      onValuesChange={onFormLayoutChange}
      size={componentSize as SizeType}
      style={{ maxWidth: 600 }}
    >
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="name" label="Name">
        <Input />
      </Form.Item>
      <Form.Item name='dtype' label="Type">
        <Select >
          <Select.Option value="demo">Demo</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="age" label="Age">
        <InputNumber />
      </Form.Item>
      <Form.Item   
        name="info"
        label="Info"
        rules={[{ required: true, message: 'Please input something about dog' }]}
      >
        <Input.TextArea showCount maxLength={300} />
      </Form.Item>
    </Form>
  );
};