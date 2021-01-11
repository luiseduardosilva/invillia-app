import React, { useCallback } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { Container } from './style';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const Register: React.FC = () => {

  const [form] = Form.useForm();

  const handleSubmit = useCallback(() => {
    const dataForm = form.getFieldsValue();

    api.post('/api/v1/auth/register', dataForm).then(result => {
      message.success('Cadastro realizado com sucesso');
    }).catch(err => {
      message.error('error ao cadastrar usuario');
    })

  },[form]);

  return (
    <Container>
      <Card title="Register" >
      <Form
        onFinish={handleSubmit}
        name="register_form"
        form={form}
      >
      <Form.Item
        name="name"
        rules={[{ required: true, message: 'Digite um nome' }]}
      >
        <Input type="text" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nome" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Digite um e-mail valido' }]}
      >
        <Input type="email" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="E-mail" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Digite sua senha' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Senha"
        />
      </Form.Item>
      <Form.Item
        name="password_confirmation"
        // rules={[{ required: true, message: 'Digite sua senha' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Confirmar Senha"
        />
      </Form.Item>
      
      <Form.Item>
        <Link to="/">Voltar</Link>
      </Form.Item>

      <Form.Item>
        <Button  style={{ width: '100%' }} type="primary" htmlType="submit" className="register-form-button" >
          Registrar
        </Button>
      </Form.Item>
    </Form>
      </Card>
    </Container>
  );

};

export default Register;
