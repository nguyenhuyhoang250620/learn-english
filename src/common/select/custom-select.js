import { Select, ConfigProvider, Tag, Form } from "antd";
import colors, { sizes } from "@constants/colors";
import { useState } from "react";
const CustomSelect = ({
  title,
  mode,
  placeholder,
  option,
  onSelect,
  onClear,
  value,
  onSearch,
  isfilterOption = true,
  background,
  width= "300px",
  defaultValue,
  isVertical=false,
  font ='font-semibold',
  widthText='150px',
  lineHeight='5px',
  showSearch = false,
  disabled=false,
  name,
  onDeselect
}) => {
  const tagRender = (props) => {
    const { label } = props;
    return (
      <Tag
        color={colors.redGlobal}
        style={{
          marginRight: 3,
          height: "30px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {label}
      </Tag>
    );
  };

  const [checkedList, setCheckedList] = useState(option);
  const onChange = (list) => {
    setCheckedList(list);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <>
      {!isVertical?
        (<div className={`flex flex-col sm:flex-row item-center`} style={{marginBottom:lineHeight}}>
        <div className={`flex mb-[10px]`} style={{width:widthText}}>
            <span className={`flex items-center text-balance ${font}`} style={{color: colors.textBase}}>
                {title}
            </span>
        </div>
        <div className={`flex items-center`} style={{width:width}}>
          <ConfigProvider
            theme={{
              token: {
                colorBgContainer: background,
                colorBgElevated: colors.background_form,
                controlHeight: sizes.heightInput,
                colorTextPlaceholder: colors.textPlaceholder,
                colorBorder: colors.textBase,
                controlItemBgActive: background,
                colorText: colors.textBase,
                controlOutlineWidth: 0,
                colorPrimary: colors.redGlobal,
                colorFillSecondary: colors.background_form,
                colorTextBase: colors.text,
                borderRadius:0,
                colorTextQuaternary: colors.textBase,
                paddingSM:12,
                controlItemBgHover: colors.background,
              },
              components:{
                multipleItemBg:colors.background_form,
                optionActiveBg: colors.background_form,
                colorBgContainerDisabled: colors.background_form,
                colorFillTertiary: colors.background_form
              }
            }}
          >
            <Form.Item name={name}>
              <Select
                mode={mode}
                allowClear
                showSearch={showSearch}
                onClear={onClear}
                // placeholder={placeholder}
                maxTagCount={'responsive'}
                style={{
                  width: "100%",
                  height: "40px",
                }}
                value={value}
                tagRender={tagRender}
                onChange={onChange}
                onSearch={onSearch}
                removeIcon={null}
                onSelect={onSelect}
                filterOption={isfilterOption ? filterOption : false}
                options={option}
                defaultValue={defaultValue}
                disabled={disabled}
                onDeselect={onDeselect}
              ></Select>
            </Form.Item>
          </ConfigProvider>
        </div>
      </div>)
      :
      (<div className={`flex flex-col item-center`} style={{marginBottom:lineHeight}}>
      <div className={`flex mb-[10px]`} style={{width:widthText}}>
          <span className={`flex items-center ${font}`} style={{color: colors.textBase}}>
              {title}
          </span>
      </div>
      <div className={`flex items-center`} style={{width:width}}>
        <ConfigProvider
          theme={{
            token: {
              colorBgContainer: background,
              colorBgElevated: colors.background_form,
              controlHeight: sizes.heightInput,
              colorTextPlaceholder: colors.textPlaceholder,
              colorBorder: colors.textBase,
              controlItemBgActive: background,
              colorText: colors.textBase,
              controlOutlineWidth: 0,
              colorPrimary: colors.redGlobal,
              colorFillSecondary: colors.background,
              colorTextBase: colors.text,
              borderRadius:0,
              colorTextQuaternary: colors.textBase,
              paddingSM:12
            },
          }}
        >
          <Form.Item name={name}>
            <Select
              mode={mode}
              allowClear
              showSearch = {showSearch}
              onClear={onClear}
              // placeholder={placeholder}
              maxTagCount={'responsive'}
              style={{
                width: "100%",
                height: "40px",
              }}
              value={checkedList}
              tagRender={tagRender}
              onChange={onChange}
              onSearch={onSearch}
              removeIcon={null}
              onSelect={onSelect}
              filterOption={isfilterOption ? filterOption : false}
              options={option}
              defaultValue={defaultValue}
              disabled={disabled}
              onDeselect={onDeselect}
            ></Select>
          </Form.Item>
        </ConfigProvider>
      </div>
    </div>)
    }
    </>
  );
};
export default CustomSelect;
