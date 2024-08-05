import { ConfigProvider, Layout, Menu, Tooltip } from "antd";
import "./tab-style.css";
import colors from "@constants/colors";
import { useEffect, useState } from "react";
import SearchFace from "@pages/ai/search-ai";
import HumanDetection from "@pages/ai/human";
import { FaSearch } from "react-icons/fa";
import VehicleDetection from "@pages/ai/vehicle";
import CheckFace from "@pages/ai/search-face";
import { Outlet, useLocation } from "react-router";
import { handleOnChangeKey } from "@redux/slice/tabs-slice";
import { useDispatch } from "react-redux";
import { IoIosPerson } from "react-icons/io";
import { FaPersonRays } from "react-icons/fa6";
import { FaCarOn } from "react-icons/fa6";
import { FiAirplay } from "react-icons/fi";
const { Content, Sider } = Layout;
const AiLayout = () => {
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const [activeKey, setActiveKey] = useState("2");
  const items = [
    getItem(
      <Tooltip title="TÌM KHUÔN MẶT">TÌM KHUÔN MẶT</Tooltip>,
      "ai-search",
      <FaSearch/>
    ),
    getItem(
      <Tooltip title="NHẬN DIỆN MẶT">NHẬN DIỆN MẶT</Tooltip>,
      "face-check",
      <IoIosPerson />
    ),
    getItem(
      <Tooltip title="PHÁT HIỆN NGƯỜI">PHÁT HIỆN NGƯỜI</Tooltip>,
      "human-detection",
      <FaPersonRays />
    ),
    getItem(
      <Tooltip title="PHÁT HIỆN XE">PHÁT HIỆN XE</Tooltip>,
      "vehicle-detection",
      <FaCarOn />
    ),
    getItem(
      <Tooltip title="HỒ SƠ THÔNG MINH">HỒ SƠ THÔNG MINH</Tooltip>,
      "video-search",
      <FiAirplay />
    ),
  ];

  const location = useLocation();
  const parts = location.pathname.split("/")[3] || "ai-search";
  const handleSelectMenu = (key) => {
    dispatch(handleOnChangeKey(`ai/${key.key}`));
    setActiveKey(key.key);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleOnChangeKey(`ai/${parts}`));
    setActiveKey(parts);
  }, [parts]);

  const renderContent = (contentKey) => {
    switch (contentKey) {
      case "2":
        return <SearchFace />;
      case "3":
        return <CheckFace />;
      case "4":
        return <HumanDetection />;
      case "5":
        return <VehicleDetection />;
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
              defaultSelectedKeys={["ai-search"]}
              defaultOpenKeys={["1"]}
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
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default AiLayout;
