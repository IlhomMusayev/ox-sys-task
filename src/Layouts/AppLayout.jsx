import React, { useState } from "react";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "utils/auth-provider";
import Icon from "utils/Icon";
import { NavigationConfig } from "configs/NavigationConfig";

const { Header, Sider, Content } = Layout;

const AppLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const history = useNavigate();
  const location = useLocation();
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          width: "100%",
        }}
      >
        <div className="logo">
          <svg
            id="\u0421\u043B\u043E\u0439_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 150 60"
            // width="100px"
            // height="70px"
            fill="#fff"
          >
            <style type="text/css"></style>
            <path
              className="st0"
              d="M46,17.7c-2.2-2.5-7-3.7-14.5-3.7c-0.7,0-1.4,0-2.1,0c-0.6,0-1.2,0-1.9,0c-8.5,0-13.8,1.3-15.9,3.8 c-1.4,1.6-2.3,4.7-2.8,9.2h11.8c0.2-2.2,0.5-3.6,1-4.2c0.8-1.2,3.2-1.8,7.3-2c3.9,0.1,6.3,0.8,7.1,1.9c0.9,1.3,1.4,5.4,1.4,12.3 c0,6.9-0.5,11.1-1.5,12.4c-0.8,1.2-3.1,1.9-6.9,2c-3.9-0.2-6.3-0.7-7.2-1.8c-1-1.2-1.6-4.8-1.6-10.7c0-1.1,0-3.9,0-4.8H8.4 c0,0.8,0,3.5,0,4.4c0,8.3,1.1,13.7,3.3,16.1c2.2,2.4,7.1,3.7,14.6,3.7c0.7,0,1.4,0,2.1,0c0.6,0,1.2,0,1.9,0c8.4,0,13.6-1.2,15.8-3.7 c2.2-2.5,3.3-8.4,3.3-17.9C49.3,25.8,48.2,20.2,46,17.7z"
            ></path>
            <polygon
              className="st1"
              points="67.4,20 63.6,14.4 47.5,14.4 59.2,31.7 "
            ></polygon>
            <polygon
              className="st0"
              points="77.8,35.4 92,14.4 76,14.4 70.9,21.8 60.2,37.7 48,55.6 64.1,55.6 69.8,47.2 75.5,55.6 91.5,55.6 "
            ></polygon>
          </svg>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          onSelect={(e) => history(e.key)}
        >
          {NavigationConfig.map((item) => (
            <Menu.Item
              key={item.key}
              icon={item.icon ? <Icon type={item?.icon} /> : null}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: collapsed ? 80 : 200,
          transition: "margin-left 0.3s",
        }}
      >
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginRight: 20,
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <Button
            onClick={() => {
              logout();
              window.location.reload();
            }}
          >
            <LogoutOutlined />
            Logout
          </Button>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
