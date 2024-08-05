import CustomCheckBox from "@common/checkbox/custom-check-box";
import CustomInput from "@common/input/custom-input";
import colors from "@constants/colors";

const Gate = () => {
    return ( 
        <div className="p-4">
            <CustomInput title={'Kết nối tối đa'} defaultValue={'128'} />
            <CustomInput title={'Cổng TCP'} defaultValue={'37777'} />
            <CustomInput title={'Cổng UDP'} defaultValue={'37778'} />
            <CustomInput title={'Cổng HTTP'} defaultValue={'80'} />
            <CustomInput title={'Cổng HTTPS'} defaultValue={'443'} />
            <CustomInput title={'Cổng RTSP'} defaultValue={'554'} />
            <CustomInput title={'Cổng máy chủ NTP'} defaultValue={'123'} />
            <CustomInput title={'Cổng POS'} defaultValue={'38800'} />
            <div className="flex">
            <CustomInput title={'Cổng Active Registration'} defaultValue={'7000'} />
                <div className="p-2">
                    <CustomCheckBox isChecked title={'Bật'}/>
                </div>
            </div>
            <div className="flex items-center mb-6">
                <span className="mr-[54px]" style={{color:colors.textBase}}>Định dạng RTSP</span>
                <span style={{color:colors.textBase}} className="w-[800px]">{`rtsp://<Tên đăng nhập>:<Mật khẩu>@<Địa chỉ IP>:<Cổng>/cam/realmonitor?channel=1&subtype=0
channel: Kênh, 1-64; subtype: Loại luồng, Luồng chính 0, Luồng phụ 1. `}</span>
              </div>
        </div>
     );
}
 
export default Gate;