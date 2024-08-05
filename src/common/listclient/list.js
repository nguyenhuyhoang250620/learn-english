import colors from "@constants/colors";
import { handleAddTabs } from "@redux/slice/tabs-slice";
import { AiFillSetting } from "react-icons/ai";
import { FaCamera } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { GrStorage } from "react-icons/gr";
import { ImSphere } from "react-icons/im";
import { useDispatch } from "react-redux";

const ListRender = () => {
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
    return ( 
        [
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
          ]
     );
}
 
export default ListRender;