// Util
import PATH from "./itemsContants";

// Styles
import styles from "../screen/layouts/Layout.module.scss";
import {
  DashboardOutlined,
  EyeOutlined,
  FileSearchOutlined,
  MehOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { t } = useTranslation();

const menuItems = [
  {
    key: PATH.EVENT,
    label: <div className={styles.nav}>{t("event")}</div>,
    icon: <UserOutlined />,
  },
  {
    key: PATH.DASHBOARD,
    label: <div className={styles.nav}>{t("dashboard")}</div>,
    icon: <DashboardOutlined />,
  },
  {
    key: PATH.SEEK,
    label: <div className={styles.nav}>Tìm kiếm</div>,
    icon: <FileSearchOutlined />,
    children: [
      {
        key: PATH.FACE,
        label: <div className={styles.nav}>Khuôn mặt</div>,
        icon: <MehOutlined />,
      },
      {
        key: PATH.LICENSE_PLATE,
        label: <div className={styles.nav}>Biển số</div>,
        icon: <EyeOutlined />,
      },
    ],
  },
];

export default menuItems;
