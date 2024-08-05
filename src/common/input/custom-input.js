import colors, { sizes } from "@constants/colors";
import { ConfigProvider, Form, Input } from "antd";

const CustomInput = ({
    title,
    placeholder,
    type,
    name,
    font='font-semibold',
    width='100%',
    height='40px',
    widthText='150px',
    lineHeight='10px',
    backgroundColor = colors.background,
    defaultValue,
    isPassWord=false,
    onInputChange=()=>{},
    isVertical=false,
    disabled=false,
    required,
    rules,
    htmlType,
    feedback,
}) => {
    return ( <>
    {!isVertical?
        <div className={`flex flex-col sm:flex-row item-center`} style={{marginBottom:lineHeight}}>
        <div className={`flex mb-[10px]`} style={{width:widthText}}>
            <span className={`flex items-center text-balance ${font}`} style={{color: colors.textBase}}>
                {title}
            </span>
        </div>
        <div>
            <ConfigProvider
            theme={{
                token: {
                    colorBgBase: colors.background,
                    colorBgContainerDisabled: colors.background,
                    colorTextDisabled: colors.text,
                    colorPrimaryBg: colors.redGlobal,
                    colorBgContainer: backgroundColor,
                    colorBgElevated: colors.background_form,
                    controlHeight: sizes.heightInput,
                    colorTextPlaceholder: colors.textPlaceholder,
                    colorBorder: colors.textBase,
                    controlItemBgActive: colors.background,
                    colorText: colors.textBase,
                    controlOutlineWidth: 0,
                    colorPrimary: colors.redGlobal,
                    colorFillSecondary: colors.background,
                    colorTextBase: colors.text,
                    borderRadius:0,
                    colorIcon:colors.redGlobal,
                },
            }}
            >
            {isPassWord?
                <Form.Item
                name={name}
                required={required}
                rules={rules}
                htmlType={htmlType}
                hasFeedback={feedback}
                >
                    <Input.Password
                    style={{ width: width, height: height }}
                    placeholder={placeholder}
                    type={type}
                    defaultValue={defaultValue}
                    name={name}
                    onChange={(e)=>onInputChange(e.target.value)}
                    disabled={disabled}
                    />
                </Form.Item>:
                <Form.Item
                name={name}
                required={required}
                rules={rules}
                htmlType={htmlType}
                hasFeedback={feedback}
                >
                    <Input
                    style={{ width: width, height: height }}
                    placeholder={placeholder}
                    onChange={(e)=>onInputChange(e.target.value)}
                    type={type}
                    defaultValue={defaultValue}
                    disabled={disabled}
                    name={name}
                    />
                </Form.Item>
            }
            </ConfigProvider>
        </div>
      </div>
      :
      <div className={`flex flex-col item-center`} style={{marginBottom:lineHeight}}>
      <div className={`flex mb-[10px]`} style={{width:widthText}}>
          <span className={`flex items-center ${font}`} style={{color: colors.textBase}}>
              {title}
          </span>
      </div>
      <div>
        <ConfigProvider
        theme={{
            token: {
                colorBgBase: colors.background,
                colorBgContainerDisabled: colors.background,
                colorTextDisabled: colors.text,
                colorPrimaryBg: colors.redGlobal,
                colorBgContainer: backgroundColor,
                colorBgElevated: colors.background_form,
                controlHeight: sizes.heightInput,
                colorTextPlaceholder: colors.textPlaceholder,
                colorBorder: colors.textBase,
                controlItemBgActive: colors.background,
                colorText: colors.textBase,
                controlOutlineWidth: 0,
                colorPrimary: colors.redGlobal,
                colorFillSecondary: colors.background,
                colorTextBase: colors.text,
                borderRadius:0,
                colorIcon:colors.redGlobal,
            },
        }}
        >
        {isPassWord?
            <Form.Item
            name={name}
            required={required}
            rules={rules}
            htmlType={htmlType}
            hasFeedback={feedback}
            >
            <Input.Password
                style={{ width: width, height: height }}
                placeholder={placeholder}
                type={type}
                defaultValue={defaultValue}
                disabled={disabled}
                name={name}
                onChange={(e)=>onInputChange(e.target.value)}
                />
            </Form.Item>
            :
            <Form.Item
            name={name}
            required={required}
            rules={rules}
            htmlType={htmlType}
            hasFeedback={feedback}
            >
            <Input
            style={{ width: width, height: height }}
            placeholder={placeholder}
            onChange={()=>{}}
            type={type}
            defaultValue={defaultValue}
            disabled={disabled}
            name={name}
            />
            </Form.Item>
        }
        </ConfigProvider>
        </div>
    </div>}
    </>
);
}
 
export default CustomInput;