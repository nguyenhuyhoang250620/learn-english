import { WindowsFilled } from "@ant-design/icons";
import { FaCamera, FaGolfBall } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { ConfigProvider, Dropdown } from "antd";
import colors from "@constants/colors";
import { useDispatch } from "react-redux";
import { handleAddTabs } from "@redux/slice/tabs-slice";
import { ImSphere } from "react-icons/im";
import { GrStorage } from "react-icons/gr";
import { AiFillSetting } from "react-icons/ai";
const ActionLeft = () => {

const dispatch = useDispatch()

  const CustomItem = ({ children, label,id }) => {
    return (
      <div className="flex space-x-3" onClick={()=>{
        dispatch(handleAddTabs({
          key:id,
          path:id,
          label:label,
          icon:children
        }))
      }}>
        {children}
        <p style={{
          color:colors.textBase
        }}>{label}</p>
      </div>
    );
  };
  const items = [
    {
      label: (
        <CustomItem label="Camera" id='camera'>
          <FaCamera className="text-[20px] " style={{
          color:colors.textBase
        }}/>
        </CustomItem>
      ),
      key: "camera",
    },
    {
      label: (
        <CustomItem label="Tài Khoản" id='user'>
          <FaUserGear className="text-[20px]" style={{
          color:colors.textBase
        }}/>
        </CustomItem>
      ),
      key: "user",
    },
    {
      label: (
        <CustomItem label="Mạng Lưới" id='net'>
          <ImSphere className="text-[20px]" style={{
          color:colors.textBase
        }}/>
        </CustomItem>
      ),
      key: "net",
    },
    {
      label: (
        <CustomItem label="Lưu Trữ" id='storage'>
          <GrStorage className="text-[20px]" style={{
          color:colors.textBase
        }}/>
        </CustomItem>
      ),
      key: "storage",
    },
    {
      label: (
        <CustomItem label="Hệ thống" id='system'>
          <AiFillSetting className="text-[20px]" style={{
          color:colors.textBase
        }}/>
        </CustomItem>
      ),
      key: "system",
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgBase: colors.background_event,
        },
      }}
    >
      <Dropdown
        menu={{
          items,
        }}
        trigger={["click"]}
      >
        <div className="h-full w-[150px] flex items-center justify-around cursor-pointer">
          <WindowsFilled className="text-[24px]" />
          <p onClick={(e) => e.preventDefault()} className="font-bold">
            Thiết lập
          </p>
        </div>
      </Dropdown>
    </ConfigProvider>
  );
};
export default ActionLeft;
