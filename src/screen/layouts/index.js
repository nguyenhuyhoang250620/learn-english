import { Layout, Menu, theme } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
import { selectIsDarkMode } from "../../redux/slice/DarkModeSlice";
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
      title: "Từ vựng",
    }, // Menu.Item đơn giản
  ];

  return (
    <Layout>
      <Header className="header" style={{
        width:"100%",
        position:"fixed",
        zIndex:"999"
      }}>          
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
          // trigger={
          //   <div>{collapsed ? 'Expanded' : 'Collapsed'}</div>
          // }
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
    </Layout>
  );
};
export default LayoutWrapper;
