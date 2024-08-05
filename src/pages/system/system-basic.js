import CustomCheckBox from "@common/checkbox/custom-check-box";
import CustomFooter from "@common/footer/custom-footer";
import CustomInput from "@common/input/custom-input";
import CustomSelect from "@common/select/custom-select";
import colors from "@constants/colors";

const SystemBasic = ({ widthText="200px"}) => {
    return ( 
        <div className="h-[90vh] ">
          <div className="h-[87vh] w-full p-6 overflow-auto scroll_default">
            <CustomInput width="300px" widthText={widthText}  title='Tên thiết bị' defaultValue='camera công an thị xã Phú Lộc' />
            <CustomInput width="300px" widthText={widthText} title='Thiết bị số' defaultValue='8' />
            <CustomSelect widthText={widthText} title='Ngôn ngữ' defaultValue='Tiếng Việt' />
            <CustomSelect widthText={widthText} title='Video tiêu chuẩn' defaultValue='PAL' />
            <div className="flex">
                <CustomCheckBox widthText={widthText} title='Động bộ hóa thiết bị từ xa' />
                <span className="pl-2 py-4" style={{color:colors.textBase}}>(Bao gồm ngôn ngữ, định dạng và múi giờ)</span>
            </div>
            <div className="flex">
                <CustomInput width="300px" widthText={widthText} title='Đăng xuất tự động' defaultValue='10' />
                <span className="pl-2 py-2" style={{color:colors.textBase}}>phút</span>
                <span className="pl-2 py-2" style={{color:colors.textBase}}>(0-60)</span>
            </div>
            <CustomCheckBox widthText={widthText} title='Thanh điều hướng' />
            <CustomCheckBox widthText={widthText} title='Đồng bộ hóa thời gian IPC' />
            <div className="flex">
                <CustomInput width="300px" widthText={widthText} title='Khoảng cách' defaultValue='24' />
                <span className="pl-2 py-2" style={{color:colors.textBase}}>hr</span>
                <span className="pl-2 py-2" style={{color:colors.textBase}}>(1-168)</span>
            </div>
          </div>
          <CustomFooter />
        </div>
     );
}
 
export default SystemBasic;