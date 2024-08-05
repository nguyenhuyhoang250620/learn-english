import { ConfigProvider, Layout, Menu } from "antd";
import { FaChartBar } from "react-icons/fa";
import { BsCalendar2EventFill } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { FaCarAlt } from "react-icons/fa";
import Event from "@pages/event/event";
import Person from "@pages/event/person";
import Vehicle from "@pages/event/vehicel";
import DashBoard from "@pages/event/dashboard";
import "./tab-style.css";
import colors from "@constants/colors";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import PATH from "@constants/path";
import { useDispatch } from "react-redux";
import { handleOnChangeKey } from "@redux/slice/tabs-slice";
import { HiUserGroup } from "react-icons/hi";
import CustomViewEvent from "@components/event/view-event/model-event";
const { Content, Sider } = Layout;
const EventLayout = ({children}) => {
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const [activeKey, setActiveKey] = useState("dashboard");
  const items = [
    getItem("THỐNG KÊ SỐ LIỆU", "dashboard", <FaChartBar />),
    getItem("QL SỰ KIỆN", "event-management", <BsCalendar2EventFill />),
    getItem("QL ĐỐI TƯỢNG", "3", <FaList />, [
      getItem("NGƯỜI", "person", <IoPersonSharp />),
      getItem("PHƯƠNG TIỆN", "vehicle", <FaCarAlt />),
      getItem("NHÓM", "group-event", <HiUserGroup />),
    ]),
  ];
  const location = useLocation();
  const parts = location.pathname.split("/")[3] || 'dashboard';
  const handleSelectMenu = (key) => {
    dispatch(handleOnChangeKey(`event/${key.key}`));
    setActiveKey(key.key);
  };
  const dispatch = useDispatch()
  useEffect(()=>{
    // dispatch(handleOnChangeKey(`event/${parts}`));
    // setActiveKey(parts)
  },[parts])
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
              defaultSelectedKeys={['dashboard']}
              selectedKeys={activeKey}
              defaultOpenKeys={['3']}
              mode="inline"
              items={items}
              onClick={(key) => handleSelectMenu(key)}
            />
          </ConfigProvider>
        </Sider>
        <Content style={{background: colors.background,}}>
          <Outlet />
        </Content>
        <CustomViewEvent/>
      </Layout>
    </Layout>
  );
};
export default EventLayout;
