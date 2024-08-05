import colors from "@constants/colors";
import { ConfigProvider, Drawer } from "antd";
const CustomDrawer = ({ open, onClose,children }) => {
  return (
    <ConfigProvider
        theme={{
            token:{
                colorIcon:colors.textBase,
                colorBgBase: colors.background,
                borderRadius: 0,
                controlItemBgHover: colors.background,
                colorText: colors.textBase,
                colorPrimary: colors.redGlobal,
                colorLink: colors.redGlobal,
                colorPrimaryBorder: colors.redGlobal,
                padding: 10,
                paddingContentHorizontal: 0,
                paddingContentHorizontalLG: 0,
                paddingContentHorizontalSM: 0,
                paddingContentVertical: 0,
                paddingContentVerticalLG: 0,
                paddingContentVerticalSM: 0,
                margin: 0,
                marginContentHorizontal: 0,
                marginContentHorizontalLG: 0,
                marginContentHorizontalSM: 0,
                marginContentVertical: 0,
                marginContentVerticalLG: 0,
                paddingLG: 0,
                paddingMD: 0,
                paddingSM: 12,
                paddingXS: 0,
                marginLG: 0,
                marginMD: 0,
                marginSM: 0,
            }
        }}
    >
      <Drawer
        title={<div style={{color:colors.textBase}}>Tạo mới</div>}
        onClose={onClose}
        closable={false}
        open={open}
        maskStyle={{background:'transparent'}}
        style={{background: colors.backgroundSide,border:`1px solid ${colors.borderColor}`,position:"absolute",height:"90%",top:45}}
      >
        {children}
      </Drawer>
    </ConfigProvider>
  );
};
export default CustomDrawer;
