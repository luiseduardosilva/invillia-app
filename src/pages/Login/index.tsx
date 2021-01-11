import React, { useCallback } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { Container } from './style';

import { useAuth } from '../../hooks/AuthContext';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {

  const { signIn } = useAuth();

  const [form] = Form.useForm();

  const handleSubmit = useCallback(() => {
    try {
      const { email, password } = form.getFieldsValue();
      signIn({email, password});
    } catch (e){
      console.log(e);
    }

  },[signIn, form]);

  return (
    <Container>
      <Card title="Login" >
      <Form
        onFinish={handleSubmit}
        name="login_form"
        form={form}
      >
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
      <Form.Item>
        <a href="http//localhost:3000">
          Esqueceu a senha?
        </a>
      </Form.Item>

      <Form.Item>
        <Button  style={{ width: '100%' }} type="primary" htmlType="submit" className="login-form-button" >
          Entrar
        </Button>
        <Link to='/register'>
          <Button  style={{ width: '100%', marginTop: 10 }} type="primary" htmlType="submit" className="login-form-button">
            Registrar-se
          </Button>
        </Link>
      </Form.Item>
    </Form>
      </Card>
    </Container>
  );

};

export default Login;
