import CustomButtonCommon from "@common/button/custom-button";
import CustomCheckBoxGroup from "@common/checkbox/custom-check-box-group";
import CustomInput from "@common/input/custom-input";
import CustomSelect from "@common/select/custom-select";
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
const listPassword = [
    {
        key: '1',
        value: '30 ngày'
    },
    {
        key: '2',
        value: '60 ngày'
    },
    {
        key: '3',
        value: '90 ngày'
    },
    {
        key: '4',
        value: '180 ngày'
    },
    {
        key: '5',
        value: 'Không bao giờ'
    },
    {
        key: '6',
        value: 'tùy chỉnh'
    },
]
const group = [
    {
        key: '1',
        value: 'Admin'
    },
    {
        key: '2',
        value: 'User'
    }
]
const CustomContentModalUser = ()=>{
    return(
        <div className="w-[515Zpx] justify-center items-center p-5 max-h-[600px] overflow-auto scroll_default">
            <CustomInput
            title="Tên đăng nhập"
            width="300px"
            />
            <CustomInput
            title="Mật khẩu"
            width="300px"
            />
            <CustomInput
            title="Xác nhận mật khẩu"
            width="300px"
            />
            <CustomSelect 
            title="Mật khẩu hết hạn sau" 
            background={colors.background} 
            option={listPassword} 
            defaultValue={'Không bao giờ'}/>

            <CustomSelect 
            title="Nhóm" 
            mode={'multiple'}
            background={colors.background} 
            option={group} 
            defaultValue={'Admin'}/>

            <CustomInput
            title="MAC người dùng"
            width="300px"
            />
            <CustomInput
            title="Bộ nhớ"
            width="300px"
            />
            <div className="flex flex-row mb-[25px] item-center">
            <div className="flex w-[150px] mb-[10px]">
                <span className="flex items-center font-[600]"style={{color: colors.text}}>
                    Thời gian
                </span>
            </div>
            <div className="flex w-[300px] items-center">
                <CustomButtonCommon text={"Cài đặt"} width={100} backgroundColor={colors.redGlobal}/>
            </div>
            </div>
            <div>
                <span className="flex items-center font-[600]"style={{color: colors.text}}>
                    Quyền
                </span>
                <div className="max-w-[480px] min-h-[180px] px-[5px] py-[10px] border border-[#4b515c]">
                    <CustomCheckBoxGroup height={'120px'} plainOptions={plainOptions}/>
                </div>
            </div>
        </div>
    )
}
export default CustomContentModalUser;