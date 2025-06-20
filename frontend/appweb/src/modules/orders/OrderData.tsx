import React from 'react';
import { Button, Form, Input } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} es requerido',
  types: {
    email: '${label} no es un correo válido',
    number: '${label} no es un número válido',
  },
  number: {
    range: '${label} debe estar entre ${min} y ${max}',
  },
};

const OrderForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Datos de la orden:', values);
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: '2rem' }}>
      <h2>Formulario de Orden</h2>
      <p style={{ color: '#888' }}>Completa la información de tu orden</p>

      <Form
        {...layout}
        name="orderForm"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={['user', 'name']}
          label="Nombre"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={['user', 'email']}
          label="Correo"
          rules={[{ type: 'email' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name={['user', 'producto1']}label="Producto 1">
          <Input/>
        </Form.Item>

        <Form.Item name={['user', 'producto2']} label="Producto 2">
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Enviar Orden
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default OrderForm;
