import { Layout } from "antd";
import "./tab-style.css";
import colors from "@constants/colors";
import { Outlet } from "react-router-dom";
const { Content, Sider } = Layout;
const LoginLayout = ({ children }) => {
  return (
    <Layout
      style={{
        minHeight: "95vh",
      }}
    >
      <Content style={{ background: colors.background }}>
        <Outlet />
      </Content>
    </Layout>
  );
};
export default LoginLayout;
