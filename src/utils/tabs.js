import { RiLiveFill } from "react-icons/ri";
import { FaEarthAmericas } from "react-icons/fa6";
import { GiBrain } from "react-icons/gi";
import { RiAlarmWarningFill } from "react-icons/ri";
import { GiFilmProjector } from "react-icons/gi";
import { BsCalendar2EventFill } from "react-icons/bs";
import colors from "@constants/colors";
export const listTabsCommon = [
  {
    key: "live",
    icon: (
      <RiLiveFill className="text-[100px]" style={{ color: colors.textBase }} />
    ),
    iconTab: (
      <RiLiveFill className="text-[22px]" style={{ color: colors.textBase }} />
    ),
    title: "xem trước",
    sub: "Xem video trực tiếp",
  },
  {
    key: "map",
    icon: (
      <FaEarthAmericas
        className="text-[100px]"
        style={{ color: colors.textBase }}
      />
    ),
    iconTab: (
      <FaEarthAmericas
        className="text-[22px]"
        style={{ color: colors.textBase }}
      />
    ),
    title: "Map",
    sub: "Vị trí camera trên hệ thống bản đồ",
  },
  {
    key: "ai",
    icon: (
      <GiBrain className="text-[100px]" style={{ color: colors.textBase }} />
    ),
    iconTab: (
      <GiBrain className="text-[22px]" style={{ color: colors.textBase }} />
    ),
    title: "AI",
    sub: "Truy vấn video AI",
  },
  {
    key: "warning",
    icon: (
      <RiAlarmWarningFill
        className="text-[100px]"
        style={{ color: colors.textBase }}
      />
    ),
    iconTab: (
      <RiAlarmWarningFill
        className="text-[22px]"
        style={{ color: colors.textBase }}
      />
    ),
    title: "Cảnh báo",
    sub: "Tìm kiếm thông tin sự kiện,cấu hình cảnh báo",
  },
  {
    key: "playback",
    icon: (
      <GiFilmProjector
        className="text-[100px]"
        style={{ color: colors.textBase }}
      />
    ),
    iconTab: (
      <GiFilmProjector
        className="text-[22px]"
        style={{ color: colors.textBase }}
      />
    ),
    title: "Xem lại",
    sub: "Truy vấn video và phát lại",
  },
  {
    key: "event",
    icon: (
      <BsCalendar2EventFill
        className="text-[100px]"
        style={{ color: colors.textBase }}
      />
    ),
    iconTab: (
      <BsCalendar2EventFill
        className="text-[22px]"
        style={{ color: colors.textBase }}
      />
    ),
    title: "Sự kiện",
    sub: "Xem thông tin sự kiện và xuất báo cáo",
  },
];
