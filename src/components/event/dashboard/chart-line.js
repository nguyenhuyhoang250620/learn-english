import { Column } from "@ant-design/plots";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { format } from "date-fns";
import { useRef } from "react";
import TYPE_ACTION from "@constants/action";
import "moment/locale/vi";
moment.locale("vi");
const ChartLine = () => {
  const dispatch = useDispatch();
  const [dataColumnOut, setDataColumnOut] = useState(
    Array.from({ length: 25 }, (_, index) => ({
      hour: index,
      value: 0,
      type: 'ra',
    }))
  );
  const [dataColumnIn, setDataColumnIn] = useState(
    Array.from({ length: 25 }, (_, index) => ({
      hour: index,
      value: 0,
      type: 'vao',
    }))
  );
  function getCurrentDate() {
    const today = new Date();
    return format(today, "yyyy-MM-dd");
  }
  const filterRefDashboard = useRef({
    camera_ids: null,
    start_time: null,
    end_time: null,
  });

  function getHourFromDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const hour = dateTime.getHours();
    return hour;
  }

  useEffect(() => {
  }, []);

  const config = {
    data: dataColumnOut.concat(dataColumnIn),
    xAxis: {
      nice: true,
      label: {
        rotate: Math.PI / 6,
        offset: 10,
        style: {
          fill: "#aaa",
          fontSize: 12,
        },
        formatter: (value) => (value % 2 === 0 ? value.toString() : ""),
      },
      title: {
        text: "Thời gian (h)",
        style: {
          fontSize: 16,
        },
      },
    },
    yAxis: {
      nice: true,
      title: {
        text: "Số lượng (người)",
        style: {
          fontSize: 16,
        },
      },
    },
    xField: "hour",
    yField: "value",
    seriesField: "type",
    isGroup: true,
    columnStyle: {
      radius: [0, 0, 0, 0],
    },
    color: ["#3B80D9", "#58BFC1"],
  };

  return <Column {...config} />;
};

export default ChartLine;
