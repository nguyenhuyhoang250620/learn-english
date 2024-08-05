import { ConfigProvider, Form, Slider } from 'antd';
import CustomSelect from "@common/select/custom-select";
import colors from "@constants/colors";
import { useState } from "react";
import RadioCheck from "@common/checkbox/custom-radio-check";
import CustomFooter from "@common/footer/custom-footer";
import { images } from "@common/images/image";
import CustomInput from '@common/input/custom-input';
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
const optionCV = [
  {
    value: ' 1',
    label:'Kênh 1'
  },  
  {
    value: ' 2',
    label:'Kênh 2'
  },  
  {
    value: ' 3',
    label:'Kênh 3'
  },  
  {
    value: ' 4',
    label:'Kênh 4'
  },
];
const optionImage = [
  {
    value: ' 1',
    label:'Bình Thường'
  },  
  {
    value: ' 2',
    label:'180°'
  },  
  {
    value: ' 3',
    label:'Theo chiều kim đồng hồ 90°'
  },  
  {
    value: ' 4',
    label:'270°'
  },
];
const optionBLC = [
  {
    value: ' 1',
    label:'Đóng'
  },
  {
    value: ' 2',
    label:'BLC'
  },
  {
    value: ' 3',
    label:'HLC'
  },
  {
    value: ' 4',
    label:'WDR'
  },
];
const optionWB = [
  {
    value: ' 1',
    label:'Kế hoạch'
  },
  {
    value: '2',
    label:'Ngoài trời'
  },
  {
    value: ' 3',
    label:'Tự nhiên'
  },
  {
    value: ' 4',
    label:'Đèn đường'
  },
  {
    value: ' 5',
    label:'Thủ công'
  },
  {
    value: ' 6',
    label:'Khu vực tùy chọn'
  },
];
const optionDayNight = [
  {
    value: ' 1',
    label:'Màu sắc'
  },
  {
    value: ' 2',
    label:'Đen trắng'
  },
]
const ImageSetting = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [value, setValue] = useState(1);
  const [valueMirror, setValueMirror] = useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onChangeMirror = (e) => {
    setValueMirror(e.target.value);
  };
  const listAdjustment = ["Độ sáng :", "Tương phản :", "Bão hòa :", "Sắc thái :", "Độ bão hòa màu :"];
  return (
    <div className="h-[90vh]">
      <div className="flex w-full h-[87vh] px-2 pt-3 overflow-auto scroll_default">
        <div>
          <div className="w-[640px] h-[360px] bg-black flex justify-center items-center">
            <img src={images.logo} alt="logo"/>
          </div>
        </div>
        <div className="w-full px-5">
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div>
              <CustomSelect title="Kênh" background={colors.background} width="300px" option={optionCamera} defaultValue={'1'}/>
            </div>
            <div>
              <CustomSelect title="Hồ Sơ" background={colors.background} width="300px" option={optionCV} defaultValue={'Kênh 1'}/>
            </div>
            <div className={'h-max my-4'}>
            {listAdjustment.map((item, index) => {
                return (
                    <div className="w-[450px] flex items-center py-1"
                        key={index}
                    >
                        <div style={{ width: "40%"}}>
                          <span className="flex items-center font-[600]" style={{color: colors.textBase}}>
                            {item}
                          </span>
                        </div>
                        <div style={{ width: "84%" }}>
                        <ConfigProvider
                            theme={{
                              token: {
                                /* here is your global tokens */
                              },
                              components:{
                                Slider: {
                                  railBg: colors.background_header,
                                  railHoverBg: colors.background_header,
                                  handleColor: colors.redGlobal,
                                  trackBg: colors.redGlobal,
                                  handleActiveColor:colors.redGlobal,
                                  colorPrimaryBorderHover:colors.redGlobal,
                                  
                              }
                            }
                            }}
                          >
                            <Slider defaultValue={50}/>
                          </ConfigProvider>
                        </div>
                    </div>
                );
            })}
            </div>
            <div className="flex w-[450px] my-4">
              <div className="flex items-center font-[600] w-[40%] py-1"style={{color: colors.textBase}}>Gương:</div>
              <div>
                <RadioCheck onChange={onChangeMirror} value={valueMirror} />
              </div>
            </div>
            <CustomSelect title="Lật hình ảnh" background={colors.background} width="300px" option={optionImage} defaultValue={'Bình thường'}/>
            <div className="flex w-[450px] my-4">
              <div className="flex items-center font-[600] w-[40%] py-1"style={{color: colors.textBase}}>Khử nhiễu 3D :</div>
              <div>
                <RadioCheck onChange={onChange} value={value} />
              </div>
            </div>
            <CustomSelect title="BLC" background={colors.background} width="300px" option={optionBLC} defaultValue={'Đóng'}/>

            <CustomSelect title="WB" background={colors.background} width="300px" option={optionWB} defaultValue={'Kế hoạch'}/>

            <CustomSelect title="Ngày & Đêm" background={colors.background} width="300px" option={optionDayNight} defaultValue={'Màu sắc'}/>

          </Form>
        </div>
      </div>
      <CustomFooter />
    </div>
  );
};
export default ImageSetting;
