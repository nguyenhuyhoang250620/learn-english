import { BsCaretRightFill } from "react-icons/bs";
import { ConfigProvider, Layout, Menu } from "antd";
import Warning from "@pages/warning/waning";
import WarningInfo from "@pages/warning/warning-info";
import RegisterWarning from "@pages/warning/register-warning";
import "./tab-style.css";
import colors from "@constants/colors";
import { useState } from "react";
import { Footer } from "antd/es/layout/layout";
const { Content, Sider } = Layout;
const WarningLayout = () => {
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const [activeKey, setActiveKey] = useState("1");
  const items = [
    getItem("SỰ KIỆN CẢNH BÁO", "1", activeKey === "1" && <BsCaretRightFill />),
    getItem(
      "THÔNG TIN CẢNH BÁO",
      "2",
      activeKey === "2" && <BsCaretRightFill />
    ),
    getItem("ĐĂNG KÝ CẢNH BÁO", "3", activeKey === "3" && <BsCaretRightFill />),
  ];

  const handleSelectMenu = (key) => {
    setActiveKey(key.key);
  };
  const renderContent = (contentKey) => {
    switch (contentKey) {
      case "1":
        return <Warning />;
      case "2":
        return <WarningInfo />;
      case "3":
        return <RegisterWarning />;
      default:
        return (
          <div style={{ height: "95vh", background: colors.background }}>
            Default Content
          </div>
        );
    }
  };
  return (
    <Layout>
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
              height: "95vh",
              background: colors.background,
            }}
          >
            {renderContent(activeKey)}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default WarningLayout;
