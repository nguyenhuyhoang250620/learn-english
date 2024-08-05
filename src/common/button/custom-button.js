import { Button, ConfigProvider } from "antd";
import CustomText from "@common/text/custom-text";
import colors from "@constants/colors";
const CustomButtonCommon = ({ 
      title, 
      onClick, 
      disabled = false,
      background , 
      color, 
      backgroundColor, 
      border,
      htmlType,
      icon,
      onChange,
      ref,
      style,
      text,
      height ='35px',
      width='max-content',
}) => (
  
  <ConfigProvider
	theme={{
    token:{
      controlOutlineWidth:0,
      colorBorder:disabled?colors.background_disable:colors.redGlobal,
      colorPrimary:colors.redGlobal,
      colorBgContainerDisabled:colors.background_disable,
      primaryShadow:colors.default_shadow,
      borderRadius:0
		},
	}}
  >
    <Button
      ref={ref}
      htmlType={htmlType}
      disabled={disabled}
      icon={icon}
      style={{
        ...style,
        background: disabled?colors.background_disable:colors.redGlobal,
        color: color,
        height:height,
        width:width,
        border: border,  
        backgroundColor: backgroundColor,
        margin:0
      }}
      onClick={onClick}
      onChange={onChange}
      >
      <CustomText text={text} color={colors.textBase}/>
    </Button>
  </ConfigProvider>
);

export default CustomButtonCommon;
