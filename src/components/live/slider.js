import colors from "@constants/colors";
import { ConfigProvider, Slider } from "antd";

const SliderCamera = () => {
    return ( 
        <ConfigProvider
        theme={{
          token: {
            colorPrimary: colors.text,
            colorBgElevated: colors.redGlobal,
          },
          components: {
            Slider: {
              handleColor: colors.redGlobal,
              railBg: colors.text,
              railHoverBg: colors.text,
            },
          },
        }}
      >
        <div className="py-4">
            <Slider defaultValue={50} />    
        </div>
      </ConfigProvider>
     );
}
 
export default SliderCamera;