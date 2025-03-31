import colors from "@constants/colors";
import { RiLiveFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { handleAddTabs } from "@redux/slice/tabs-slice";
import { FaEarthAmericas } from "react-icons/fa6";
import { GiBrain } from "react-icons/gi";
import { RiAlarmWarningFill } from "react-icons/ri";
import { GiFilmProjector } from "react-icons/gi";
import { BsCalendar2EventFill } from "react-icons/bs";
import { useNavigate } from "react-router";
const HomeScreen = () => {
  const listTabs = [
    {
      key: "vocabulary",
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
      key: "event/dashboard",
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
  const dispatch = useDispatch();
  const handleSelectTabs = (item) => {
    dispatch(
      handleAddTabs({
        key: item.key,
        path: item.key,
        label: item.title,
        icon: item.iconTab,
      })
    );
  };
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="grid grid-cols-3 grid-rows-2 gap-4">
        {listTabs.map((item, index) => {
          return (
            <div
              key={index}
              className=" min-h-[200px] min-w-[500px] cursor-pointer  flex items-center space-x-5 pl-[50px] hover:border border-[#B5122E]"
              onClick={() => handleSelectTabs(item)}
            >
              {item.icon}
              <div>
                <p
                  className="uppercase font-bold text-xl"
                  style={{ color: colors.textBase }}
                >
                  {item.title}
                </p>
                <p style={{ color: colors.textBase }}>{item.sub}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default HomeScreen;
