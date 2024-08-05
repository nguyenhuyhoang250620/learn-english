import { Modal } from "antd";
import ConfigProvider from "antd/es/config-provider";
import colors from "@constants/colors";
import { IoClose } from "react-icons/io5";
import FooterModal from "./footer-modal";

const CustomModal = ({ open, handleOk, handleCancel, content, title,footer=true,width=500 }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgBase: colors.background,
          borderRadius: 0,
          controlItemBgHover: colors.background,
          colorText: colors.textBase,
          colorPrimary: colors.redGlobal,
          colorLink: colors.redGlobal,
          colorPrimaryBorder: colors.redGlobal,
          padding: 0,
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
        },
      }}
    >
      <Modal
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        width={width}
        footer={footer && <FooterModal onOK={handleOk} onCancel={handleCancel}/>}
      >
        <div style={{ border: `1px solid ${colors.textBase}`, borderBottom:'none'}}>
          <div
            className="flex justify-between items-center h-[40px] px-2"
            style={{ borderBottom: `1px solid ${colors.textBase}`,background:colors.redGlobal }}
          >
            <p className="font-bold text-[16px]">{title}</p>
            <IoClose
              onClick={handleCancel}
              className="cursor-pointer text-[22px]"
            />
          </div>
          {content}
        </div>
      </Modal>
    </ConfigProvider>
  );
};
export default CustomModal;
