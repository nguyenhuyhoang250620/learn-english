import React, { useState } from "react";
import { Checkbox, ConfigProvider, Divider } from "antd";
import colors from "@constants/colors";
import CustomFooter from "@common/footer/custom-footer";
const CheckboxGroup = Checkbox.Group;
const plainOptions = [
  "Mất hình video",
  "Giả mạo video",
  "Báo cháy",
  "Báo động điểm nóng",
  "Phát hiện hút thuốc",
  "Báo động nhiệt độ",
  "Báo động cháy",
  "Báo động xâm nhập",
  "Báo động điểm lạnh",
  "Ngoại tuyến",
];
const RegisterWarning = () => {
  const [checkedList, setCheckedList] = useState([]);
  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptions.length;
  const onChange = (list) => {
    setCheckedList(list);
  };
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };
  return (
    <div className="h-[90vh]">
      <div className="px-2 h-[87vh] flex-col flex">
        <span
          style={{ fontWeight: "bold", color: colors.textBase }}
          className="py-3"
        >
          Loại cảnh báo
        </span>
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
          <Checkbox
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
          >
            Tất cả
          </Checkbox>
          <Divider className="bg-white" />
          <div className="flex h-[120px]">
            <CheckboxGroup
              options={plainOptions}
              value={checkedList}
              onChange={onChange}
            />
          </div>
        </ConfigProvider>
      </div>
      <CustomFooter />
    </div>
  );
};
export default RegisterWarning;
