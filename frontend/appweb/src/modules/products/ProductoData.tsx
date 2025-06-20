import React from 'react';
import { Form, Input, Button, InputNumber } from 'antd';

export default function ProductoData() {
  const [form] = Form.useForm();

  const handleSubmit = (values: unknown) => {
    console.log('Datos del producto:', values);
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
      <h2>Registro de Producto</h2>
      <p style={{ color: '#888' }}>Ingresa los datos del nuevo producto</p>

      <Form
        form={form}
        name="productForm"
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Nombre del producto"
          name="nombre"
          rules={[{ required: true, message: 'Por favor ingresa el nombre del producto' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Descripción"
          name="descripcion"
          rules={[{ required: true, message: 'Por favor ingresa una descripcion' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Precio"
          name="precio"
          rules={[{ required: true, message: 'Ingresa un precio válido' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            min={0}
            placeholder="0.00"
            formatter={value => `$ ${value}`}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Guardar Producto
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
