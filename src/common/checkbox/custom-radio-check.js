import colors from "@constants/colors";
import { ConfigProvider, Radio } from "antd";

const RadioCheck = ({
    onChange,
    value,
    valueFirst,
    valueSecond,
    title, 
    width='300px',
    space = '240px',
    widthTitle="50%"
}) => {
    return ( 
        <div className="flex" style={{width:width}}>
        <div className="flex items-center font-[600] py-1"style={{color: colors.textBase, width:{widthTitle}}}>{title}</div>
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
              <Radio.Group onChange={onChange} value={value} className="flex items-center justify-between" style={{width:space}}>
                  <Radio value={1} style={{color: colors.textBase}}>{valueFirst}</Radio>
                  <Radio value={2} style={{color: colors.textBase}}>{valueSecond}</Radio>
              </Radio.Group>
      </ConfigProvider>
      </div>
     );
}
 
export default RadioCheck;