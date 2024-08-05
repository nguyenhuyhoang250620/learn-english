import CustomButtonCommon from "@common/button/custom-button";
import CustomCheckBox from "@common/checkbox/custom-check-box";
import RadioCheck from "@common/checkbox/custom-radio-check";
import CustomFooter from "@common/footer/custom-footer";
import CustomInput from "@common/input/custom-input";
import CustomSelect from "@common/select/custom-select";
import DateTime from "@components/datetime/date-time";
import colors from "@constants/colors";
import dayjs from "dayjs";
import moment from "moment";
import { useState } from "react";
const optionMonth = []
const listMonth = Array(12).fill({
    value: "",
    label: "",
  });
  listMonth.map((user, index) => {
    optionMonth.push({
        value: index+1,
        label: `T${index+1}`,
    });
  });
const optionDay = []
const listDay = Array(31).fill({
    value: '',
    label: "",
  });
  listDay.map((user, index) => {
    optionDay.push({
        value: index+1,
        label: index+1,
    });
  });
const DaySetting = () => {
    let time = new Date().toLocaleTimeString();
    const [ctime, setTime] = useState(time);
    const UpdateTime = () => {
      time = new Date().toLocaleTimeString();
      setTime(time);
    };
    setInterval(UpdateTime);
    const today = moment().format('YYYY-MM-DD 23:59:59');

const [value, setValue] = useState(1);
const onChange = (e) => {
    setValue(e.target.value);
};
    return ( 
        <div className="h-[90vh]">
            <div className="h-[87vh] w-full p-6 overflow-auto scroll_default">
                <div className="flex">
                <DateTime isRange={false} title='Ngày giờ' width="120px" 
                defaultValue={dayjs(today, 'YYYY/MM/DD')}
                format={'YYYY/MM/DD'}/>
                <CustomInput widthText="0px" width="180px" defaultValue={ctime} />
                <div className="w-[10px]"></div>
                <CustomButtonCommon backgroundColor={colors.redGlobal} text='Đồng bộ hóa PC'/>
                </div>
                <div className="flex">
                <CustomSelect title='Múi giờ'/>
                <div className="w-[10px]"></div>
                <CustomButtonCommon backgroundColor={colors.redGlobal} text='Lưu'/>
                </div>
                <CustomSelect title='Định dạng ngày'/>
                <CustomSelect title='Data Separator'/>
                <CustomSelect title='Định dạng thời gian'/>
                <CustomCheckBox title='DST' />
                <div className="pb-2">
                <RadioCheck title='Loại' width="460px" space="500px" valueFirst='Ngày' valueSecond='Tuần' value={value} onChange={onChange} /> 
                </div>
                <div className="flex">
                    <CustomSelect width="100px" title='Thời gian' option={optionMonth} defaultValue='T1' />
                    <CustomSelect width="100px" widthText="0px" option={optionDay} defaultValue='1' />
                    <CustomInput width="100px" widthText="0px" defaultValue='00:00' />
                </div>
                <div className="flex">
                    <CustomSelect width="100px" title='Thời gian kết thúc' option={optionMonth} defaultValue='T1' />
                    <CustomSelect width="100px" widthText="0px" option={optionDay} defaultValue='1' />
                    <CustomInput width="100px" widthText="0px" defaultValue='00:00' />
                </div>
                <CustomCheckBox title='NTP'/>
                <div className="flex">
                <CustomInput width="300px" title='Địa chỉ máy chủ' defaultValue='time.windows.com' />
                <div className="w-[10px]"></div>
                <CustomButtonCommon backgroundColor={colors.redGlobal} text='Cập nhật thủ công'/>
                </div>
                <div className="flex">
                    <CustomInput width="300px" title='Cổng' defaultValue='123' />
                    <span className="px-2 py-2" style={{color:colors.textBase}}>(1-65535)</span>
                </div>
                <div className="flex">
                    <CustomInput width="300px" title='Khoảng' defaultValue='60' />
                    <div className="py-2">
                        <span className="px-2" style={{color:colors.textBase}}>Phút</span>
                        <span style={{color:colors.textBase}}>(0-65535)</span>
                    </div>
                </div>
            </div>
            <CustomFooter />
        </div>
     );
}
 
export default DaySetting;