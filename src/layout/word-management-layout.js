import React, { useEffect } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
const items = [
  {
    key: "vocabulary",
    icon: React.createElement(UserOutlined),
    label:"Vocabulary"
  },
//   {
//     key: "vocabulary1",
//     icon: React.createElement(VideoCameraOutlined),
//     label:"Vocabulary"
//   },
//   {
//     key: "vocabulary2",
//     icon: UploadOutlined,
//     label:"Vocabulary"
//   },
//   {
//     key: "vocabulary3",
//     icon: UserOutlined,
//     label:"Vocabulary"
//   },
];
const WordManagementLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname.split("/")[2];
  const handleSelectMenu = (key) => {
    navigate(`/word-management/${key}`);
  };
  useEffect(()=>{
    if(pathName){
        handleSelectMenu(pathName)
    }
    else{
        handleSelectMenu('vocabulary')
    }
  },[pathName])
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{
          height: "100vh",
        }}
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["vocabulary"]}
          items={items}
          onClick={(item) => handleSelectMenu(item.key)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "24px 16px 0",height:"80vh",overflow:"hidden" }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default WordManagementLayout;
