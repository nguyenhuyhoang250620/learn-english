import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { AutoComplete, ConfigProvider, Input } from "antd";
import colors from "@constants/colors";
const options = [];
const Search = () => (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 0,
          colorBgBase: colors.bg_input,
          colorBorder: colors.borderColor,
          controlHeight: 35,
          controlOutlineWidth: 0,
          colorPrimary: colors.bg_input,
          colorBorderBg: "red",
          colorBorderSecondary: "red",
          colorPrimaryBorder: "red",
          colorBgElevated: colors.redGlobal,
          colorText: colors.text_color,
        },
      }}
    >
      <AutoComplete
        popupClassName="certain-category-search-dropdown"
        popupMatchSelectWidth={500}
        placeholder="Tìm tiếm"
        style={{
          width: "100%",
        }}
        options={options}
        size="large"
      ></AutoComplete>
    </ConfigProvider>
);
export default Search;
