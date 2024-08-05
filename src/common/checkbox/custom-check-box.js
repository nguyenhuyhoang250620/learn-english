import colors from "@constants/colors";
import { Checkbox, ConfigProvider } from "antd";

const CustomCheckBox = ({
    title , 
    checked = false,
    font='font-semibold',
    widthText='150px',
    isChecked = false,
}) => {
    return ( 
        <ConfigProvider
        theme={{
            token: {
            colorPrimary: colors.redGlobal,
            colorPrimaryHover: colors.redGlobal,
            colorPrimaryBorder: colors.redGlobal,
            colorPrimaryActive: colors.redGlobal,
            borderRadius: 0,
            colorBgBase: colors.background,
            colorText: colors.textBase,
            colorBorder: colors.textBase,
            controlInteractiveSize:24
            },
            components: {
            Checkbox: {
                checkedBg: colors.background_header,
                checkedColor: colors.textBase,
            },
            CheckboxGroup: {
                checkedBg: colors.background_header,
                checkedColor: colors.textBase,
            },
            },
        }}
        >
            {
                isChecked?
                <Checkbox>
                    <span className="ml-[5px]">
                        {title}
                    </span>
                </Checkbox>:
                <div className="flex py-2">
                <div className={`flex my-[10px]`} style={{width:widthText}}>
                    <span className={`flex items-center ${font}`} style={{color: colors.textBase}}>
                        {title}
                    </span>
                </div>
                <Checkbox />
                </div>
            }
        </ConfigProvider>
     );
}
 
export default CustomCheckBox;