import colors from "@constants/colors";
import ChartColumn from "@components/event/dashboard/chart-column";
import ChartLine from "@components/event/dashboard/chart-line";
import CharPie from "@components/event/dashboard/chart-pie";
import ChartBar from "@components/event/dashboard/chart-bar";
import moment from "moment";
import ListWidget from "@components/event/dashboard/list-widget";
import EventWarning from "@components/event/dashboard/event-warning";
import { format } from "date-fns";
import { MdFilterList } from "react-icons/md";
import vi from "date-fns/locale/vi";
import { FaDownload } from "react-icons/fa";
import "moment/locale/vi";
moment.locale("vi");

const DashBoard = () => {
  const today = new Date();
  const formattedDate = format(today, "EEEE, dd-MM-yyyy", { locale: vi });
  return (
    <div className="w-full h-[100vh] space-y-2 overflow-auto scroll_default">
      <div
        className="flex w-full h-[60px] items-center justify-end px-2"
        style={{ background: colors.background }}
      >
        <div className="flex items-center space-x-3">
          <div
            className="flex items-center space-x-2 py-[10px] px-4 cursor-pointer"
            style={{
              border: `1px solid ${colors.borderColor}`,
            }}
          >
            <MdFilterList
              style={{ color: colors.textBase, fontSize: "22px" }}
            />
            <p className="text-base" style={{ color: colors.textBase }}>
              Bộ lọc
            </p>
          </div>
          <div
            className="flex items-center space-x-2 py-[10px] px-4 cursor-pointer"
            style={{
              border: `1px solid ${colors.borderColor}`,
            }}
          >
            <FaDownload style={{ color: colors.textBase, fontSize: "22px" }} />
            <p className="text-base" style={{ color: colors.textBase }}>
              Xuất tệp
            </p>
          </div>
        </div>
      </div>
      <div className="h-[55%] min-h-[300px] w-full grid lg:grid-cols-3 grid-cols-2 overflow-auto scroll_default gap-2 px-2">
        <div className="col-span-2 h-full">
          <div className="h-[20%]">
            <ListWidget />
          </div>
          <div
            className="rounded-md p-2 h-[80%]"
            style={{ background: colors.backgroundSide }}
          >
            <ChartLine />
          </div>
        </div>
        <div
          className="col-span-1  rounded-md"
          style={{ background: colors.backgroundSide }}
        >
          <EventWarning />
        </div>
      </div>
      <div className="h-[50%] min-h-[300px] w-full grid grid-cols-3 gap-2 px-2">
        <div
          className="rounded-md p-2 "
          style={{ background: colors.backgroundSide }}
        >
          <ChartColumn />
        </div>
        <div
          className="rounded-md p-2 "
          style={{ background: colors.backgroundSide }}
        >
          <CharPie />
        </div>
        <div
          className="rounded-md p-2 "
          style={{ background: colors.backgroundSide }}
        >
          <ChartBar />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
