import React from 'react';
import { Form, Input, Button } from 'antd';

export default function UserForm() {
  const [form] = Form.useForm();

  const handleSubmit = (values: unknown) => {
    console.log('Datos del formulario:', values);
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
      <h2>Vite + React</h2>
      <p style={{ color: '#888' }}>Hello world!</p>

      <Form
        form={form}
        name="userForm"
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Por favor ingresa tu nombre de usuario' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: 'email', message: 'Correo no válido' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Enviar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
