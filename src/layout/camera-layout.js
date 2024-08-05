import { BsCaretRightFill } from "react-icons/bs";
import { ConfigProvider, Layout, Menu } from "antd";
import DeviceScreen from "@pages/device/device";
import ImageSetting from "@pages/device/image-setting";
import EnCodeSetting from "@pages/device/encode";
import "./tab-style.css";
import colors from "@constants/colors";
import { useState } from "react";
import ChanelName from "@pages/device/chanel-name";
const { Content, Sider} = Layout;
const CameraLayout = () => {
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
    getItem("THIẾT BỊ TỪ XA", "1", activeKey==='1' &&<BsCaretRightFill />),
    getItem("HÌNH ẢNH", "2", activeKey==='2' &&<BsCaretRightFill />),
    getItem("MÃ HOÁ", "3", activeKey==='3' &&<BsCaretRightFill />),
    getItem("TÊN KÊNH", "4", activeKey==='4' &&<BsCaretRightFill />),
    getItem("PAN/TILT/ZOOM", "5", activeKey==='5' &&<BsCaretRightFill />),
  ];
  
  const handleSelectMenu = (key)=>{
    setActiveKey(key.key)
  }
  const renderContent = (contentKey) => {
    switch (contentKey) {
      case '1':
        return <DeviceScreen/>;
      case '2':
        return <ImageSetting/>;
      case '3':
        return <EnCodeSetting/>;
      case '4':
        return <ChanelName/>;
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
export default CameraLayout;
