import CustomTable from "@common/table/custom-table";
import colors from "@constants/colors";
import dataFake from "@pages/event/data.json";
import { Tag } from "antd";
import { convertISOToDateTime } from "@utils/format-date";
import { useRef } from "react";
import { random } from "lodash";
const data = [];
const columns = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    width: 60,
  },
  {
    title: "ĐỐI TƯỢNG",
    dataIndex: "ioId",
    key: "ioId",
    width: 120,
  },
  {
    title: "TRẠNG THÁI",
    dataIndex: "status",
    key: "status",
    width: 120,
  },
  {
    title: "KHU VỰC",
    dataIndex: "cameraLocation",
    width: 120,
    key: "cameraLocation",
  },
  {
    title: "THỜI GIAN",
    width: 120,
    dataIndex: "time",
    key: "time",
  },
  {
    title: "CẢNH BÁO",
    width: 120,
    dataIndex: "action",
    key: "action",
  },
];
const EventWarning = () => {
  const filterRefEvent = useRef({
    stt: null,
    ioId: null,
    type: null,
    image: null,
    cameraLocation: null,
    status: null,
    time: null,
    action: null,
    page_idx: 1,
    page_size: 8,
  });
  // eslint-disable-next-line no-lone-blocks
  {
    Array.isArray(dataFake) &&
      dataFake.map((dataIndex, index) => {
        data.push({
          key:Math.random(),
          stt: index+1,
          ioId: dataIndex.ioId,
          type: 'PHƯƠNG TIỆN',
          image:<div className="h-[100px] w-full">
            <img src={dataIndex.imageUrl} style={{width:"auto",height:100}} alt="img"/>
          </div>,
          cameraLocation: <p style={{ color: colors.textBase }}>At camera 01</p>,
          status:<p style={{ color: "#1CD1A1", fontWeight: "600" }}>Checkin</p>,
          time:convertISOToDateTime(dataIndex.createdAt),
          action:<Tag style={{color:colors.textBase, padding:4, background:colors.redGlobal}}>Xâm nhập</Tag>,
        });
      });
  }

  return (
        <div className="p-2 bg-[#2B2F33]" style={{
          borderRadius: "6px",
          background:colors.backgroundSide
        }}>
      <CustomTable
        data={data}
        columns={columns}
        showTotal={false}
        pagination={false}
        showCheckBox={false}
        bordered={false}
        heightPart={500}
        onRowClick={() => {}}
      />
    </div>
  );
};
export default EventWarning;
