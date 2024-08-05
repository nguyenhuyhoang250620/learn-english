import CustomButtonCommon from "@common/button/custom-button";
import CustomInput from "@common/input/custom-input";
import CustomSelect from "@common/select/custom-select";
import CustomUpLoad from "@common/upload/upload";
import DateTime from "@components/datetime/date-time";
import colors from "@constants/colors";
import { ConfigProvider, Radio } from "antd";
import { useState } from "react";

const CreatePerson = ({
  onClose,  
  width="230px", 
  widthText="100px" 
}) => {
    const [value, setValue] = useState(1);
    const onChange = (e) => {
      setValue(e.target.value);
    };
    return ( 
        <>
        <div className='p-4'>
          <div className="flex justify-center items-center mb-2">
            <CustomUpLoad />
          </div>
          <div className="max-w-[500px]">
            <CustomInput title="Tên đầy đủ" backgroundColor={colors.backgroundSide} width={width} widthText={widthText}/>
            <CustomInput title="Mã định danh" backgroundColor={colors.backgroundSide} width={width} widthText={widthText}/>
            <CustomSelect title="Tên nhóm" width={width} widthText={widthText}/>
            <CustomInput title="Tên nhóm" backgroundColor={colors.backgroundSide} width={width} widthText={widthText}/>
            <CustomInput title="Số điện thoại" backgroundColor={colors.backgroundSide} width={width} widthText={widthText}/>
            <CustomInput title="Thư điện tử" backgroundColor={colors.backgroundSide} width={width} widthText={widthText}/>
            <CustomInput title="BSX" backgroundColor={colors.backgroundSide} width={width} widthText={widthText}/>
            <DateTime title={'Ngày sinh'} widthText={widthText} width={width} isRange={false} placeholder='Chọn Ngày sinh'/>
          </div>
          <div className="w-[300px] flex">
            <div className="flex items-center font-[600] w-[50%] py-1"style={{color: colors.textBase}}>Giới tính</div>
            <ConfigProvider
              theme={{
                  token: {
                      colorPrimary: colors.redGlobal,
                      colorPrimaryHover: colors.redGlobal,
                      colorPrimaryBorder: colors.redGlobal,
                      colorPrimaryActive:colors.redGlobal,
                      colorBgContainer:colors.textBase,
                    },
                  components:{
                    colorBorder:colors.textBase,
                  }
              }}
              >
                  <Radio.Group onChange={onChange} value={value} className="flex items-center justify-between w-[240px]">
                      <Radio value={1} style={{color: colors.textBase}}>Nam</Radio>
                      <Radio value={2} style={{color: colors.textBase}}>Nữ</Radio>
                  </Radio.Group>
          </ConfigProvider>
          </div>
            <div className="flex items-center justify-center mt-4">
            <div className="mr-2">
                <CustomButtonCommon width="84px" text={'Lưu'} backgroundColor={colors.redGlobal} />
            </div>
            <CustomButtonCommon width="68px" text={'Hủy'} onClick={onClose}/>
            </div>
          </div>
        </>
     );
}
 
export default CreatePerson;