import colors from "@constants/colors";
import styles from "@style/search.module.scss";
import { useState } from "react";
import { Calendar, ConfigProvider, Select, TimePicker } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import CustomButtonCommon from "@common/button/custom-button";

const TimeFilter = () => {
  const [value, setValue] = useState("12:00:00");
  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  const onChangeHandle = (e) => {
    console.log(e);
  };
  return (
    <div className={styles.time_filter}>
      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: colors.transparent,
            colorPrimary: colors.redGlobal,
            colorText: colors.textBase,
            controlItemBgActive: colors.redGlobal,
            colorBorder: colors.textBase,
            colorTextDisabled: colors.textPlaceholder,
            colorTextQuaternary: colors.redGlobal,
            colorLink: colors.redGlobal,
            controlOutlineWidth:0
          },
        }}
      >
        <Calendar
          fullscreen={false}
          headerRender={({ value, onChange }) => {
            const start = 0;
            const end = 12;
            const monthOptions = [];
            let current = value.clone();
            const localeData = value.localeData();
            const months = [];
            for (let i = 0; i < 12; i++) {
              current = current.month(i);
              months.push(localeData.monthsShort(current));
            }
            for (let i = start; i < end; i++) {
              monthOptions.push(
                <Select.Option key={i} value={i}>
                  {months[i]}
                </Select.Option>
              );
            }
            const year = value.year();
            const month = value.month();
            const options = [];
            for (let i = year - 10; i < year + 10; i += 1) {
              options.push(
                <Select.Option key={i} value={i}>
                  {i}
                </Select.Option>
              );
            }
            return (
              <div
                style={{
                  padding: 8,
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <Select
                  value={year}
                  onChange={(newYear) => {
                    const now = value.clone().year(newYear);
                    onChange(now);
                  }}
                >
                  {options}
                </Select>
                <Select
                  value={month}
                  onChange={(newMonth) => {
                    console.log(newMonth);
                    const now = value.clone().month(newMonth);
                    console.log(now);
                    onChange(now);
                  }}
                >
                  {monthOptions}
                </Select>
                <LeftOutlined
                  onClick={() => {
                    const newMonth = month - 1;
                    const newDate = value.clone().month(newMonth);
                    onChange(newDate);
                  }}
                />
                <RightOutlined
                  onClick={() => {
                    const newMonth = month + 1;
                    const newDate = value.clone().month(newMonth);
                    onChange(newDate);
                  }}
                />
              </div>
            );
          }}
          onPanelChange={onPanelChange}
        />
        <div className="space-y-2">
          <div className="flex items-center">
            <span style={{ color: colors.redGlobal }} className="w-[80px]">Start time</span>
            <TimePicker
              defaultValue={dayjs("12:08:23", "HH:mm:ss")}
              size="large"
            />
          </div>
          <div className="flex items-center">
            <span style={{ color: colors.redGlobal }} className="w-[80px]">End time</span>
            <TimePicker
              defaultValue={dayjs("12:08:23", "HH:mm:ss")}
              size="large"
            />
          </div>
        </div>

        <div
          style={{
            marginTop: "15px",
            display: "flex",
          }}
          className="flex justify-center"
        >
          <CustomButtonCommon text="Tìm kiếm" witdh="100%" />
        </div>
      </ConfigProvider>
    </div>
  );
};
export default TimeFilter;
