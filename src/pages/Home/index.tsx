import React, { useCallback, useState } from 'react';
import { Layout, Menu } from 'antd';

import {
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

import XmlUpload from '../Xml/XmlUpload';
import { useAuth } from '../../hooks/AuthContext';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Home: React.FC = () => {


  const { signOut } = useAuth();

  const [collapsed, setCollapsed] = useState(false);
  const [menu, setMenu] = useState('UPLOAD')

  const handleCollapse = useCallback(() => {
    setCollapsed(!collapsed);
  },[collapsed]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
    <Sider collapsible collapsed={collapsed} onCollapse={handleCollapse}>
      <div
        style={{
          height: "32px",
          margin: "16px",
          background: "rgba(255, 255, 255, 0.3)"
          }}
      />
      <Menu theme="dark" defaultOpenKeys={['sub1']} defaultSelectedKeys={['1']} mode="inline">
        <SubMenu key="sub1" icon={<UserOutlined />} title="XML">
          <Menu.Item key="1" onClick={() => setMenu('UPLOAD')} >Upload</Menu.Item>
        </SubMenu>
        <Menu.Item key="40" icon={<LogoutOutlined />} onClick={signOut}>
          Sair
        </Menu.Item>
        
      </Menu>
    </Sider>
    <Layout className="site-layout">
      <Header style={{ padding: 0, background: "#fff;" }} />
      <Content style={{ margin: '0 16px' }}>
        <div style={{ padding: 24, minHeight: 360,  background: "#fff;" }}>

          {(() => {
            if(menu === 'UPLOAD'){
              return (<XmlUpload />)
            }
          })()}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>By <a href="https://github.com/luiseduardosilva/" >LuisSilva</a></Footer>
    </Layout>
  </Layout>
  );
}
export default Home;