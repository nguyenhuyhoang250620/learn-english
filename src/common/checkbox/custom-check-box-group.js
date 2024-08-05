import { useState } from "react";
import { Checkbox, ConfigProvider } from "antd";
import colors from "@constants/colors";
import "@style/checkbox-group.scss"
const CheckboxGroup = Checkbox.Group;
const CustomCheckBoxGroup = ({
  plainOptions, 
  height,
  isCheckedAll=true
}) => {
  const [checkedList, setCheckedList] = useState(plainOptions);
  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;
  const onChange = (list) => {
    setCheckedList(list);
  };
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };
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
          {isCheckedAll?
          <>
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
            >
              <span className="ml-[5px]">
                  Tất cả
              </span>
            </Checkbox>
          </>
          :
          <></>}
          <div className='flex custom-checkbox' style={{height:height}}>
            <CheckboxGroup
              options={plainOptions}
              value={checkedList}
              onChange={onChange}
            />
          </div>
        </ConfigProvider>
  );
};
export default CustomCheckBoxGroup;