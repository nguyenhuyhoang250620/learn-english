import { ConfigProvider, Layout, Menu, Tooltip } from "antd";
import "./tab-style.css";
import colors from "@constants/colors";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Outlet, useLocation } from "react-router";
import { handleOnChangeKey } from "@redux/slice/tabs-slice";
import { useDispatch } from "react-redux";
import { IoIosPerson } from "react-icons/io";
import { FaEarthAmericas } from "react-icons/fa6";
import { MdDeviceHub } from "react-icons/md";
const { Content, Sider } = Layout;
const MapLayout = () => {
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
      <Tooltip title="BẢN ĐỒ CHI TIẾT">BẢN ĐỒ CHI TIẾT</Tooltip>,
      "map-detail",
      <FaEarthAmericas/>
    ),
    getItem(
      <Tooltip title="QUẢN LÝ VÙNG">QUẢN LÝ VÙNG</Tooltip>,
      "device-group",
      <MdDeviceHub />
    ),
  ];

  const location = useLocation();
  const parts = location.pathname.split("/")[3] || "map-detail";
  const handleSelectMenu = (key) => {
    dispatch(handleOnChangeKey(`map/${key.key}`));
    setActiveKey(key.key);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleOnChangeKey(`map/${parts}`));
    setActiveKey(parts);
  }, [parts]);

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
              defaultSelectedKeys={["map-detail"]}
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
export default MapLayout;
