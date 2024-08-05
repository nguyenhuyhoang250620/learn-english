import { Column } from "@ant-design/plots";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");
const ChartColumn = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/antfincdn/PC3daFYjNw/column-data.json')
      .then((response) => response.json())
      .then((json) => {
        setData(json)
      })
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const config = {
    data,
    xField: 'city',
    yField: 'value',
    seriesField: 'type',
    isGroup: true,
    columnStyle: {
      radius: [0, 0, 0, 0],
    },
    color: [
      '#3B80D9',
      '#58BFC1',
      // 'r(1, 1, 1) 0:#30C0FA 1:#0C2970',
      // 'r(1, 1, 1) 0:#FB8538 1:#FA2432', 
      // 'r(1, 1, 1) 0:#EEA34C 1:#E2FE4E',
      // 'r(1, 1, 1) 0:#6C981D 1:#1B781B'
    ],
  };

  return <Column {...config} />;

  // const [dataMap, setDataMap] = useState([]);

  // const fetchData = async () => {
  //   const arr = [];
  //   const promises = listDate?.map(async (item) => {
  //     const dataIn = data.find((d) => {
  //       const formattedDate = moment(d.report_date).format("YYYY/MM/DD");
  //       return item === formattedDate && d.data_type === "1";
  //     });

  //     const dataOut = data.find((d) => {
  //       const formattedDate = moment(d.report_date).format("YYYY/MM/DD");
  //       return item === formattedDate && d.data_type === "2";
  //     });

  //     if (dataIn) {
  //       arr.push({
  //         date: item.slice(5),
  //         type: "vehicle_out",
  //         value: dataIn.total,
  //       });
  //     } else {
  //       arr.push({
  //         date: item.slice(5),
  //         type: "vehicle_out",
  //         value: 0,
  //       });
  //     }

  //     if (dataOut) {
  //       arr.push({
  //         date: item.slice(5),
  //         type: "vehicle_in",
  //         value: dataOut.total,
  //       });
  //     } else {
  //       arr.push({
  //         date: item.slice(5),
  //         type: "vehicle_in",
  //         value: 0,
  //       });
  //     }
  //   });

  //   await Promise.all(promises);
  //   setDataMap(arr);
  // };

  // useEffect(() => {
  //   console.log("vao day khong");
  //   fetchData();
  // }, [data]);

  // const config = {
  //   xField: "date",
  //   yField: "value",
  //   seriesField: "type",
  //   color: ["#FD7B38", "#009544"],
  //   maxColumnWidth: 10,
  //   marginRatio: -0.5,
  //   isGroup: true,
  //   legend: {
  //     position: "top",
  //     itemName: {
  //       formatter: (text) => t(text),
  //     },
  //   },
  //   columnStyle: {
  //     radius: [20, 20, 20, 20],
  //     width: 10,
  //   },
  // };
  // return (
  //   <div className="overflow-x-auto ">
  //     <h2 className="text-white text-base pb-2">{t("vehicle_in_out")}</h2>
  //     <Column {...config} data={dataMap} />
  //   </div>
  // );
};

export default ChartColumn;
