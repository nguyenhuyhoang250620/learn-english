import CustomButtonCommon from "@common/button/custom-button";
import CustomCheckBox from "@common/checkbox/custom-check-box";
import CustomFooter from "@common/footer/custom-footer";
import CustomInput from "@common/input/custom-input";
import CustomSelect from "@common/select/custom-select";
import colors from "@constants/colors";

const optionCamera = [
    {
      value: '1',
      label:'1'
    },
    {
      value: '2',
      label:'2'
    },
    {
      value: '3',
      label:'3'
    },
    {
      value: '4',
      label:'4'
    },
    {
      value: '5',
      label:'5'
    },
    {
      value: '6',
      label:'6'
    },
    {
      value: '7',
      label:'7'
    },
    {
      value: '8',
      label:'8'
    },
  ];
const EnCodeSetting = ({
  widthText= '180px',
  width = '300px',
}) => {
    return ( 
        <div className="h-[90vh]">
          <div className="w-full h-[87vh] px-2 pt-3 overflow-auto scroll_default">
            <div className="px-5 overflow-auto items-center flex flex-row">
              <span style={{color:colors.textBase}} className="font-semibold mr-[-30px]">Kênh</span>
                <CustomSelect widthText="180px" lineHeight="10px" background={colors.background} width={width} option={optionCamera} defaultValue={'1'}/>
            </div>
            <div className="flex">
                <div className="h-max w-max border-[1px] border-zinc-900">
                    <div className="h-35px p-[9px] font-bold" style={{background:colors.background_form, color:colors.textBase}}>
                        Luồng chính
                    </div>
                    <div className="px-6" style={{background:colors.background}}>
                        <CustomCheckBox widthText={widthText} title='Smart code' />
                        <CustomSelect widthText={widthText} lineHeight="10px" title="Loại" background={colors.background} width={width} option={optionCamera} defaultValue={'1'}/>
                        <CustomSelect widthText={widthText} lineHeight="10px" title="Nén" background={colors.background} width={width} option={optionCamera} defaultValue={'1'}/>
                        <CustomSelect widthText={widthText} lineHeight="10px" title="Phân giải" background={colors.background} width={width} option={optionCamera} defaultValue={'1'}/>
                        <CustomSelect widthText={widthText} lineHeight="10px" title="Tốc độ khung hình(FPS)" background={colors.background} width={width} option={optionCamera} defaultValue={'1'}/>
                        <CustomSelect widthText={widthText} lineHeight="10px" title="Tốc độ truyền dữ liệu" background={colors.background} width={width} option={optionCamera} defaultValue={'1'}/>
                        <CustomSelect widthText={widthText} lineHeight="10px" title="Chất lượng" background={colors.background} width={width} option={optionCamera} defaultValue={'1'}/>
                        <CustomSelect widthText={widthText} lineHeight="10px" title="Thiết lập khung hình" background={colors.background} width={width} option={optionCamera} defaultValue={'1'}/>
                        <CustomSelect widthText={widthText} lineHeight="10px" title="Tốc độ(Kb/S)" background={colors.background} width={width} option={optionCamera} defaultValue={'1'}/>
                        <div className="flex">
                            <span className="w-[180px]" style={{color:colors.textBase}}>Reference Bit Rate</span>
                            <span style={{color:colors.textBase}}>1024-6144Kb/S</span>
                        </div>
                        <div className="ml-[180px] py-3">
                          <CustomButtonCommon backgroundColor={colors.redGlobal} width="100px" text={'Nhiều hơn'} />
                        </div>
                    </div>
                </div>
                <div className="h-max w-max border-[1px] border-zinc-900">
                    <div className="h-35px p-[9px] font-bold" style={{background:colors.background_form, color:colors.textBase}}>
                        Luồng phụ
                    </div>
                    <div className="px-6" style={{background:colors.background}}>
                        <CustomCheckBox widthText={widthText} title='Smart code' />
                        <CustomSelect widthText={widthText} lineHeight="10px" title="Loại" background={colors.background} width={width} option={optionCamera} defaultValue={'1'}/>
                        <CustomSelect widthText={widthText} lineHeight="10px" title="Nén" background={colors.background} width={width} option={optionCamera} defaultValue={'1'}/>
                        <CustomSelect widthText={widthText} lineHeight="10px" title="Phân giải" background={colors.background} width={width} option={optionCamera} defaultValue={'1'}/>
                        <CustomSelect widthText={widthText} lineHeight="10px" title="Tốc độ khung hình(FPS)" background={colors.background} width={width} option={optionCamera} defaultValue={'1'}/>
                        <CustomSelect widthText={widthText} lineHeight="10px" title="Tốc độ truyền dữ liệu" background={colors.background} width={width} option={optionCamera} defaultValue={'1'}/>
                        <CustomSelect widthText={widthText} lineHeight="10px" title="Chất lượng" background={colors.background} width={width} option={optionCamera} defaultValue={'1'}/>
                        <CustomSelect widthText={widthText} lineHeight="10px" title="Thiết lập khung hình" background={colors.background} width={width} option={optionCamera} defaultValue={'1'}/>
                        <CustomSelect widthText={widthText} lineHeight="10px" title="Tốc độ(Kb/S)" background={colors.background} width={width} option={optionCamera} defaultValue={'1'}/>
                        <div className="flex">
                            <span className="w-[180px]" style={{color:colors.textBase}}>Reference Bit Rate</span>
                            <span style={{color:colors.textBase}}>1024-6144Kb/S</span>
                        </div>
                        <div className="ml-[180px] py-3">
                          <CustomButtonCommon backgroundColor={colors.redGlobal} width="100px" text={'Nhiều hơn'} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex py-3 ml-6">
              <CustomCheckBox widthText={widthText} title='Bật mờ hình ảnh' />
            </div>
            <div className="ml-6">
              <CustomInput widthText={widthText} lineHeight="10px" width={width} title={'Hình mờ'} />
            </div>
          </div>
            <CustomFooter />
        </div>
     );
}
 
export default EnCodeSetting;