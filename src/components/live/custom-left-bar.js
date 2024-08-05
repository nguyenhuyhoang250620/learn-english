import CustomSelect from "@common/select/custom-select";
import { ConfigProvider, Slider } from "antd";
import { useState } from "react";
import colors from "@constants/colors";
import { imagesPTZ } from "@common/images/image";
import CustomSwitch from "@common/switch/custom-switch";


const Onvif = () => {
    const listMove = [
      { image: imagesPTZ.top_left },
      { image: imagesPTZ.top },
      { image: imagesPTZ.top_right },
      { image: imagesPTZ.left },
      { image: imagesPTZ.around },
      { image: imagesPTZ.right },
      { image: imagesPTZ.bottom_left },
      { image: imagesPTZ.bottom },
      { image: imagesPTZ.bottom_right },
    ];
    const listRightAction = [
      { image: imagesPTZ.zoom_in },
      { image: imagesPTZ.zoom_out },
      { image: imagesPTZ.irs_in },
      { image: imagesPTZ.irs_out },
      { image: imagesPTZ.focus_in },
      { image: imagesPTZ.focus_out },
    ];
    const listRightBottom = [
      { image: imagesPTZ.sun_a },
      { image: imagesPTZ.sun_b },
      { image: imagesPTZ.sun_c },
      { image: imagesPTZ.sun_d },
      { image: imagesPTZ.sun_e },
    ];
    const listAdjustment = ["Brightness", "Sharpness", "Contrast", "Saturation"];
    const listPreset = Array(20).fill(null);
    return (
      <div className="py-2">
        <span style={{ fontWeight: "bold", color: colors.textBase }}>PTZ</span>
        <div className="flex justify-between pt-2">
          <div className={'flex flex-wrap w-[122px] sm: min-w-[122px]'}>
            {listMove.map((item, index) => {
              return <img key={index} src={item.image} alt=""/>;
            })}
          </div>
          <div className={'grid grid-rows-3 grid-cols-2 w-[122px] sm: min-w-[122px] h-max pl-3'}>
            {listRightAction.map((item, index) => {
              return <img key={index} src={item.image} alt=""/>;
            })}
          </div>
        </div>
        <div className={'h-[60px] flex items-center justify-between pr-[6px]'}>
          {listRightBottom.map((item, index) => {
            return <img key={index} src={item.image} alt=""/>;
          })}
        </div>
        <div className="py-2">
            <span style={{ fontWeight: "bold", color: colors.textBase }}>Image Adjustment</span>
            <div className={'h-[140px]'}>
            {listAdjustment.map((item, index) => {
                return (
                    <div className="min-w-[240px] flex items-center px-2"
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
        </div>
        <div>
            <span style={{ fontWeight: "bold", color: colors.textBase }}>Preset & Patrol</span>
            <div className={'h-[40px] flex my-2'}>
            <div
              className={'min-h-[40px] flex justify-center items-center w-[49%] rounded-[6px]'}
              style={{ background: colors.redGlobal, color: colors.textBase}}
            >
              Preset
              <img alt=""/>
            </div>
            <div
              className={'min-h-[40px] flex justify-center items-center w-[49%] ml-2 rounded-[6px]'}
              style={{ background: colors.background_disable, color: colors.textBase }}
            >
              Preset
              <img alt=""/>
            </div>
            </div>
            <div className={'max-h-[360px] overflow-auto rounded-[6px] scroll_default'}>
            {listPreset.map((item, index) => {
                return (
                <div className="flex items-center pl-[20px]"
                    key={index}
                    style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "20px",
                    height: "35px",
                    color:colors.textBase,
                    background: colors.background_form,
                    }}
                >
                    {index <= 8 ? `Preset 0${index + 1}` : `Preset ${index + 1}`}
                </div>
                );
            })}
            </div>
        </div>
      </div>
    );
  };
const Metrics = () => {
    return (
      <div className="min-h-[852px] max-w-[272px]">
        <span style={{ fontWeight: "bold" ,color:colors.textBase, paddingBottom:8}}>Main Stream</span>
        <div>
          <CustomSelect widthText="80px" width="180px" title="Resolution" placeholder="Resolution" background={colors.background}/>
          <CustomSelect widthText="80px" width="180px" title="FPS" placeholder="FPS" background={colors.background}/>
        </div>
        <span style={{ fontWeight: "bold" ,color:colors.textBase, paddingBottom:8}}>Sub Stream</span>
        <div>
          <CustomSelect widthText="80px" width="180px" title="Resolution" placeholder="Resolution" background={colors.background}/>
          <CustomSelect widthText="80px" width="180px" title="FPS" placeholder="FPS" background={colors.background}/>
        </div>
        <div className="flex my-3">
          <span style={{ fontWeight: "bold" ,color:colors.textBase, paddingBottom:8}}>Record Setting</span>
          <div className="ml-[20px]">
            <CustomSwitch />
          </div>
        </div>
        <div>
          <CustomSelect widthText="80px" width="180px" title="Resolution" placeholder="Resolution" background={colors.background}/>
          <CustomSelect widthText="80px" width="180px" title="Record Quality" placeholder="Record Quality" background={colors.background}/>
          <CustomSelect widthText="80px" width="180px" title="Timelapse Speed" placeholder="Timelapse Speed" background={colors.background}/>
          <CustomSelect widthText="80px" width="180px" title="Record Segment Interval" placeholder="Record Segment Interval" background={colors.background}/>
        </div>
      </div>
    );
  };
const LeftBar = () => {
    const [buttonSwitch, setButtonSwitch] = useState(true);
    return ( 
        <div
        className={'h-full w-full px-2'}
        style={{ background: colors.background }}
      >
        <div className={'flex justify-between'}>
          <div
            onClick={() => setButtonSwitch(true)}
            className={'min-h-[35px] mt-[5px] min-w-[124px] rounded-[6px] flex justify-center items-center cursor-pointer'}
            style={{
              background: buttonSwitch
                ? colors.redGlobal
                : colors.background_disable,
                color:colors.textBase
            }}
          >
            Onvif
          </div>
          <div
            onClick={() => setButtonSwitch(false)}
            className={'min-h-[35px] mt-[5px] w-[124px] rounded-[6px] flex justify-center items-center cursor-pointer ml-2'}
            style={{
              background: buttonSwitch
                ? colors.background_disable
                : colors.redGlobal,
              color:colors.textBase
            }}
          >
            Metrics
          </div>
        </div>
        <div className={'h-max'}>
          {buttonSwitch ? <Onvif /> : <Metrics />}
        </div>
      </div>
     );
}
 
export default LeftBar;




