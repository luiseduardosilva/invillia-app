import React, { useState,  } from 'react';
import { Card, Form, Upload, Button, Space, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import api from '../../../services/api';

const XmlUpload: React.FC = () => {

    const [form] = Form.useForm();

    const [file, setFile] = useState<Blob | string >("");

    const handleChangeFile = (e: any) => {
        setFile(e.file);
    }

    const handleSubmit = () => {

        const data = new FormData();
        data.append('file', file);

        const token = localStorage.getItem('@invillia:token');

        api.post('/api/v1/xml', data,{headers: { Authorization: `Bearer ${token}`}}).then(result => {
            message.success(result?.data?.message);
        }).catch(err => {
            if(err.response.data.errors){
                const errors = err.response.data.errors;
                errors.forEach((element:any) => {
                    message.error(element);
                });
            }
        })
    }


    return (
    <>
    <Card title="Enviar XML">
        <Form form={form} onFinish={handleSubmit} >

            <Form.Item
                label="Arquivo"
                name="arquivo"
                rules={[{required: true, message: 'Arquivo é obrigatorio!'}]}
              >
                <Space direction="vertical" style={{ width: '100%' }} size="large">
                    
                    <Upload
                        accept=".xml"
                        maxCount={1}
                        onChange={(e) => handleChangeFile(e)}
                        beforeUpload={() => false} 
                        
                    >
                        <Button icon={<UploadOutlined />}>Escolher XML</Button>
                    </Upload>
                </Space>
            </Form.Item>
            <Form.Item label="Async" name="tipo" valuePropName="checked" >
                <Checkbox defaultChecked={false} >Sim</Checkbox>
            </Form.Item>
            <Form.Item >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
        
    </Card>
        
    </>)
}


export default XmlUpload;