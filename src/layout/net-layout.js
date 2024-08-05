import { BsCaretRightFill } from "react-icons/bs";
import { ConfigProvider, Layout, Menu } from "antd";
import GroupManagement from "@pages/user/group-management";
import "./tab-style.css";
import colors from "@constants/colors";
import { useState } from "react";
import NetSetting from "@pages/network/net-setting";
import NetOptions from "@pages/network/net-options";
import Gate from "@pages/network/net-gate";
const { Content, Sider } = Layout;
const NetLayout = () => {
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
    getItem("TCP / IP", "1", activeKey==='1' &&<BsCaretRightFill />),
    getItem("Bảng Định Tuyến", "2", activeKey==='2' &&<BsCaretRightFill />),
    getItem("Cổng", "3", activeKey==='3' &&<BsCaretRightFill />),
  ];
  
  const handleSelectMenu = (key)=>{
    setActiveKey(key.key)
  }
  const renderContent = (contentKey) => {
    switch (contentKey) {
      case '1':
        return <NetSetting/>;
      case '2':
        return <NetOptions/>;
      case '3':
        return <Gate />;
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
export default NetLayout;
