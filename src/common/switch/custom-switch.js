import colors from "@constants/colors";
import { ConfigProvider, Switch } from "antd";

const CustomSwitch = () => {
    return ( 
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary:colors.redGlobal,
                    colorPrimaryHover:colors.redGlobal,
                    colorTextQuaternary:colors.background,
                    colorTextTertiary:colors.background
                },
                components: {
                    handleBg:colors.redGlobal
                }
            }}
        >
            <Switch defaultChecked />
        </ConfigProvider>
     );
}
 
export default CustomSwitch;