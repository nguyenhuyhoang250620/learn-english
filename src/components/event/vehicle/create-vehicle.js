import CustomButtonCommon from "@common/button/custom-button";
import CustomInput from "@common/input/custom-input";
import CustomSelect from "@common/select/custom-select";
import colors from "@constants/colors";
const CreateVehicle = ({
  onClose, 
  width="230px", 
  widthText="100px" 
}) => {
  return (
    <>
    <div className='p-4'>
        <div>
        <CustomInput title="BSX" width={width} widthText={widthText} backgroundColor={colors.backgroundSide}/>
        <CustomSelect title='Nhóm' width={width} widthText={widthText}/>
        <CustomSelect title='Nhãn hiệu' width={width} widthText={widthText}/>
        <CustomSelect title='Màu sắc' width={width} widthText={widthText}/>
        <CustomSelect title='Loại' width={width} widthText={widthText}/>
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
};
export default CreateVehicle;
