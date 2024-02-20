import {
  BellFilled,
  CarOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
  FrownOutlined,
  NotificationOutlined,
  ProfileOutlined,
  UserOutlined,
  UnorderedListOutlined,
  GroupOutlined,
  CalendarOutlined
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Drawer,
  Dropdown,
  Layout,
  Menu,
  Modal,
  Select,
  Space,
  Switch,
  theme,
  Button
} from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import LOGO from "../../assets/images/logo.svg";
import LOGO from "../../assets/images/hawk_sense_logo.png";
import CustomLogout from "./CustomLogout";
//-----LOGO
import vietnam from "../../assets/images/co_viet_nam.jpg";
import english from "../../assets/images/co_nuoc_anh.jpg";

// Utils
import PATH from "../../constants/itemsContants";

// styles
import "./styles.css";
import styles from "./Layout.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation} from 'react-i18next';
import {
  selectSocketData,
} from "../../redux/slice/SocketSlice";
import TYPE_ACTION from "../../constants/TypeAction";
import { baseURL } from "../../services/ConfigService/ApiService";
import { formatDate } from "../../common/Functions/FomatDate";
import { selectIsDarkMode } from "../../redux/slice/DarkModeSlice";
import ViewEvent from "../pages/Event/components/ViewEvent/ViewEvent";
import iconEventA from "../../assets/images_new/eventA.png"
import iconEventB from "../../assets/images_new/eventB.png"
import iconlistA from "../../assets/images_new/profileA.png"
import iconlistB from "../../assets/images_new/profileB.png"
import iconPersonA from "../../assets/images_new/userA.png"
import iconPersonB from "../../assets/images_new/userB.png"
import iconVehicleA from "../../assets/images_new/carA.png"
import iconVehicleB from "../../assets/images_new/carB.png"
import iconGroupA from "../../assets/images_new/peopleA.png"
import iconGroupB from "../../assets/images_new/peopleB.png"
import CustomChangLanguage from "./CustomChangLanguage";
const { Header, Content, Sider } = Layout;

const LayoutWrapper = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [modal,setModal] = useState(false)
  const [open, setOpen] = useState(false);
  const [keys, setkeys] = useState(PATH.EVENT);
  const dispatch = useDispatch();
  const socketData = useSelector(selectSocketData);
  const isDarkMode = useSelector(selectIsDarkMode);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClick = (e) => {
    setkeys(e.key)
    navigate(e.key);
  };

  const pathSignIn = "/" + PATH.SIGNIN;
  if (pathSignIn.includes(location.pathname)) {
    return (
      <div style={{ minHeight: "100vh", width: "100%", display: "flex" }}>
          {children}
      </div>
    );
  }

  //-----Menu Items
  const { SubMenu } = Menu;
  const menuItems = [
    { key: PATH.EVENT, 
      title: t('event_management'),
      icon:keys === PATH.EVENT? <img src={iconEventA} width={25}></img>:<img src={iconEventB} width={25}></img>
    }, // Menu.Item đơn giản
    {
      key: PATH.LIST,
      title: t('identity_object_managements'),
      icon: keys === PATH.LIST || keys === PATH.PROFILE || keys === PATH.PLATE || keys === PATH.BLACK_LIST ? <img src={iconlistA} width={25}></img>: <img src={iconlistB} width={25}></img>,
      children: [
        { key: PATH.PROFILE, title: t('person'),icon: keys === PATH.PROFILE? <img src={iconPersonA} width={25}></img>: <img src={iconPersonB} width={25}></img> }, // Menu.Item con
        { key: PATH.PLATE, title: t('vehicle'), icon: keys ===PATH.PLATE ?<img src={iconVehicleA} width={25}/>:<img src={iconVehicleB} width={25}/>}, // Menu.Item con
        { key: PATH.BLACK_LIST, title: t('group'), icon: keys ===PATH.BLACK_LIST ?<img src={iconGroupA} width={25}/>:<img src={iconGroupB} width={25}/>, }, // Menu.Item con
      ],
    },
  ];


  const closeDrawer = () => {
    setOpen(false);
    dispatch({
      type: TYPE_ACTION.SOCKET.DELETE_SOCKET,
    });
  };

  return (
    <Layout>
      <Header className="header" style={{
        width:"100%",
        position:"fixed",
        zIndex:"999"
      }}>          
          <div className={styles.header}>
              <CustomChangLanguage/>
              <CustomLogout/>
          </div>
        <div className={styles.logoWrapper}>
            <div style={{display:"flex"}}>
              <img src={LOGO} alt="logo" className={styles.logo}></img>
            </div>
        </div>
      </Header>

        <Sider
          width={320}
          style={{
            marginTop:"65px",
            position:"sticky",
            background: colorBgContainer,
            overflow: "scroll-y",
            boxShadow:
              "rgb(0 0 0 / 10%) 9px 12px 8px 0px, rgb(0 0 0 / 19%) 0px 6px 1px 0px",
          }}
          collapsible
          collapsed={collapsed}
          trigger={
            <div>{collapsed ? 'Expanded' : 'Collapsed'}</div>
          }
          onCollapse={(value) => setCollapsed(value)}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={location.pathname.slice(1)}
            style={{
              height: "100%",
              width:`${collapsed?'80px':'320px'}`,
              position:"fixed",
              borderRight: 0,
            }}
            onClick={(e) => onClick(e)}
            theme={isDarkMode ? "dark" : "light"}
          >
              {menuItems.map(item => (
                item.children ? (
                  <SubMenu key={item.key} title={
                    <div className={styles.nav}>
                      {item.title}
                      {/* {collapsed ? <img src={iconExpand} width={12} /> : <img src={iconExpand} width={12} />} */}
                    </div>} 
                     icon={item.icon} style={{color:"#B5122E"}}>
                    {item.children.map(childItem => (
                      <Menu.Item key={childItem.key} icon={childItem.icon}>
                        <div className={styles.nav}>{childItem.title}</div>
                      </Menu.Item>
                    ))}
                  </SubMenu>
                ) : (
                  <Menu.Item key={item.key} icon={item.icon}>
                    <div className={styles.nav}>{item.title}</div>
                  </Menu.Item>
                )
              ))}
          </Menu>
        </Sider>
          <Content
            style={{
              overflow: "hidden",
              padding: 10,
              paddingTop:"60px",
              margin: 0,
              minHeight: "95vh",
              backgroundColor: isDarkMode ? "#222" : "#fff",
              color: isDarkMode ? "white" : "black",
              // transition: "background-color 1s ease-in-out",
            }}
          >
            {children}
          </Content>
          <ViewEvent></ViewEvent>
    </Layout>
  );
};
export default LayoutWrapper;