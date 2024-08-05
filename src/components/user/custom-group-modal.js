import CustomCheckBoxGroup from "@common/checkbox/custom-check-box-group";
import CustomInput from "@common/input/custom-input";
import colors from "@constants/colors";

const plainOptions = [
    'Tài khoản', 
    'Điều khiển thủ công', 
    'Mạng lưới', 
    'Sao Lưu', 
    'Hệ thống', 
    'Lưu trữ', 
    'Camera', 
    'Bảo trì', 
    'Thông tin hệ thống', 
    'Sự kiện', 
    'Bảo vệ'
];
const CustomModalUserGroup = ()=>{
    return(
        <div className="w-[515Zpx] justify-center items-center p-5 max-h-[600px] overflow-auto scroll_default">
            <CustomInput
            width="300px"
            title="Tên nhóm"
            />
            <CustomInput
            width="300px"
            title="Bộ nhớ"
            />
            <div>
                <span className="flex items-center font-[600]"style={{color: colors.text}}>
                    Quyền
                </span>
                <div className="max-w-[480px] min-h-[180px] px-[5px] py-[10px] border border-[#4b515c]">
                    <CustomCheckBoxGroup plainOptions={plainOptions} height={'120px'}/>
                </div>
            </div>
        </div>
    )
}
export default CustomModalUserGroup;