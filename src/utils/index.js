import colors from "@constants/colors";
import { handleAddTabs } from "@redux/slice/tabs-slice";
import { AiFillSetting } from "react-icons/ai";
import { BsCalendar2EventFill } from "react-icons/bs";
import { FaCamera } from "react-icons/fa";
import { FaEarthAmericas, FaUserGear } from "react-icons/fa6";
import { GiBrain, GiFilmProjector } from "react-icons/gi";
import { GrStorage } from "react-icons/gr";
import { ImSphere } from "react-icons/im";
import { RiAlarmWarningFill, RiLiveFill } from "react-icons/ri";
import { useDispatch } from "react-redux";

export function convertStringToArrayNumber(inputString) {
  const stringArray = inputString.split(",");
  return stringArray.map((str) => parseFloat(str));
}

export function convertStringToArrayString(inputString) {
  const stringArray = inputString.split(",");
  return stringArray.map((str) => str);
}

export const noData = <center>-</center>;

export function urlKeyPoint(filter) {
  let urlstring = "";
  for (const key in filter) {
    if (
      // key === keyPoint
      key === "distinct" ||
      key === "detail_less" ||
      key === "exact" ||
      key === "ids"
    ) {
      // console.log("khong filter")
    } else {
      const value = filter[key];
      if (value === null || (Array.isArray(value) && value.length === 0)) {
        // console.log("value is null or an empty array", key);
      } else {
        urlstring += `${key}=${value}&`;
      }
    }
  }
  return urlstring;
}

const CustomItem = ({ children, label,id }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex space-x-3" onClick={()=>{
      dispatch(handleAddTabs({
        key:id,
        path:id,
        label:label,
        icon:children
      }))
    }}>
      {children}
      <p style={{
        color:colors.textBase
      }}>{label}</p>
    </div>
  );
};

export   const listTabs = [
  {
    key: "live",
    icon: (
      <RiLiveFill
        className="text-[100px]"
        style={{ color: colors.textBase }}
      />
    ),
    iconTab: (
      <RiLiveFill
        className="text-[22px]"
        style={{ color: colors.textBase }}
      />
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
    title: "BẢN ĐỒ",
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
  {
    label: (
      <CustomItem label="Camera" id='camera'>
        <FaCamera className="text-[20px] " style={{
        color:colors.textBase
      }}/>
      </CustomItem>
    ),
    title: "camera",
    key: "camera",
    iconTab: (
      <FaCamera
        className="text-[22px]"
        style={{ color: colors.textBase }}
      />
    ),
  },
  {
    label: (
      <CustomItem label="Tài Khoản" id='user'>
        <FaUserGear className="text-[20px]" style={{
        color:colors.textBase
      }}/>
      </CustomItem>
    ),
    key: "user",
    iconTab: (
      <FaUserGear
        className="text-[22px]"
        style={{ color: colors.textBase }}
      />
    ),
    title: "user",
  },
  {
    label: (
      <CustomItem label="Mạng Lưới" id='net'>
        <ImSphere className="text-[20px]" style={{
        color:colors.textBase
      }}/>
      </CustomItem>
    ),
    key: "net",
    iconTab: (
      <ImSphere
        className="text-[22px]"
        style={{ color: colors.textBase }}
      />
    ),
    title: "net",
  },
  {
    label: (
      <CustomItem label="Lưu Trữ" id='storage'>
        <GrStorage className="text-[20px]" style={{
        color:colors.textBase
      }}/>
      </CustomItem>
    ),
    key: "storage",
    iconTab: (
      <GrStorage
        className="text-[22px]"
        style={{ color: colors.textBase }}
      />
    ),
    title: "storage",
  },
  {
    label: (
      <CustomItem label="Hệ thống" id='system'>
        <AiFillSetting className="text-[20px]" style={{
        color:colors.textBase
      }}/>
      </CustomItem>
    ),
    key: "system",
    iconTab: (
      <AiFillSetting
        className="text-[22px]"
        style={{ color: colors.textBase }}
      />
    ),
    title: "system",
  },
];