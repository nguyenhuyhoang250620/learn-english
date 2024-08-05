import { BsCaretRightFill } from "react-icons/bs";
import { ConfigProvider, Layout, Menu } from "antd";
import UserManagement from "@pages/user/user-management";
import GroupManagement from "@pages/user/group-management";
import "./tab-style.css";
import colors from "@constants/colors";
import { useState } from "react";
const { Content, Sider } = Layout;
const UserLayout = () => {
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const [activeKey,setActiveKey] = useState('1')
  const items = [
    getItem("NGƯỜI DÙNG", "1", activeKey==='1' &&<BsCaretRightFill />),
    getItem("NHÓM NGƯỜI DÙNG", "2", activeKey==='2' &&<BsCaretRightFill />),
  ];
  
  const handleSelectMenu = (key)=>{
    setActiveKey(key.key)
  }
  const renderContent = (contentKey) => {
    switch (contentKey) {
      case '1':
        return <UserManagement/>;
      case '2':
        return <GroupManagement/>;
      default:
        return <div style={{ padding: "12px", height: "95vh", background: colors.background }}>Default Content</div>;
    }
  };
  return (
    <Layout
      style={{
        minHeight: "95vh",
      }}
    >
      <Sider>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: colors.redGlobal,
            },
          }}
        >
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
            onClick={(key) => handleSelectMenu(key)}
          />
        </ConfigProvider>
      </Sider>
      <Content>
        <div
          style={{
            padding: "12px",
            height:"95vh",
            background: colors.background,
          }}
        >
          {renderContent(activeKey)}
        </div>
      </Content>
    </Layout>
  );
};
export default UserLayout;
