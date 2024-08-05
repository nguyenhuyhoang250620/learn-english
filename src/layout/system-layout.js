import { BsCaretRightFill } from "react-icons/bs";
import { ConfigProvider, Layout, Menu } from "antd";
import ImageSetting from "@pages/device/image-setting";
import EnCodeSetting from "@pages/device/encode";
import "./tab-style.css";
import colors from "@constants/colors";
import { useState } from "react";
import ChanelName from "@pages/device/chanel-name";
import Basic from "@pages/storage/basic";
import DiskManager from "@pages/storage/disk-manager";
import SystemBasic from "@pages/system/system-basic";
import HoliDay from "@pages/system/holi-day";
import DaySetting from "@pages/system/day-setting";
import SystemGate from "@pages/system/system-gate";
const { Content, Sider} = Layout;
const SystemLayout = () => {
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
    getItem("CẤU HÌNH CƠ BẢN", "1", activeKey==='1' &&<BsCaretRightFill />),
    getItem("NGÀY & GIỜ", "2", activeKey==='2' &&<BsCaretRightFill />),
    getItem("NGÀY NGHỈ", "3", activeKey==='3' &&<BsCaretRightFill />),
    getItem("CỔNG NỐI TIẾP", "4", activeKey==='4' &&<BsCaretRightFill />),
  ];
  
  const handleSelectMenu = (key)=>{
    setActiveKey(key.key)
  }
  const renderContent = (contentKey) => {
    switch (contentKey) {
      case '1':
        return <SystemBasic/>;
      case '2':
        return <DaySetting/>;
      case '3':
        return <HoliDay/>;
      case '4':
        return <SystemGate/>;
      default:
        return <div style={{height: "95vh", background: colors.background, overflow:'auto' }}>Default Content</div>;
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
              height:"95vh",
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
export default SystemLayout;
