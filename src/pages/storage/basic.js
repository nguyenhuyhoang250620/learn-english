import RadioCheck from "@common/checkbox/custom-radio-check";
import CustomFooter from "@common/footer/custom-footer";
import CustomInput from "@common/input/custom-input";
import CustomSelect from "@common/select/custom-select";
import colors from "@constants/colors";
import { useState } from "react";
const options=[
  {
    value: 'Ghi đè',
    label: 'Ghi đè'
  },
  {
    value: 'Dừng ghi',
    label: 'Dừng ghi'
  },
]
const optionsBox=[
  {
    value: 'Chiều dài thời gian',
    label: 'Chiều dài thời gian'
  },
  {
    value: 'Độ dài tập tin',
    label: 'Độ dài tập tin'
  },
]
const optionsDelete=[
  {
    value: 'Không bao giờ',
    label: 'Không bao giờ'
  },
  {
    value: 'Tùy chỉnh',
    label: 'Tùy chỉnh'
  },
]
const Basic = () => {
    const [value, setValue] = useState(1);
    const onChange = (e) => {
      setValue(e.target.value);
    };
    return ( 
      <div className="h-[90vh]">
        <div className="w-full h-[87vh] p-6 overflow-auto scroll_default">
            <CustomSelect title='HDD đã đầy' option={options} defaultValue='Ghi đè' />
            <div className="flex">
            <CustomSelect title='Chuẩn gói' option={optionsBox} defaultValue='Độ dài tập tin'/>
            <CustomInput defaultValue='60' widthText="10px" />
            <span className="pt-[10px] px-2" style={{color:colors.textBase}}>phút</span>
            </div>
            <CustomSelect title='Tự xóa các tập tin cũ' option={optionsDelete} defaultValue='Không bao giờ'/>
            <RadioCheck onChange={onChange} value={value} title='Chiến lược giấc ngủ' width="500px" valueFirst='Tự động' valueSecond='Không bao giờ' space="580px"/>
        </div>
        <CustomFooter />
      </div>
     );
}
 
export default Basic;