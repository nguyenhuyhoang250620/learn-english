import CustomFooter from "@common/footer/custom-footer";
import CustomTable from "@common/table/custom-table";
import dataFake from "../event/dataface.json";
import { Tag } from "antd";
import colors from "@constants/colors";
import { convertISOToDateTime } from "@utils/format-date";
import { RiEditBoxFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

const data = [];
const columns = [
  {
    title: "số",
    dataIndex: "stt",
    key: "stt",
    width: 40,
  },
  {
    title: "Tình trạng",
    dataIndex: "status",
    key: "status",
    width: 80,
  },
  {
    title: "Tên",
    dataIndex: "name",
    width: 80,
    key: "name",
  },
  {
    title: "Ngày",
    width: 100,
    dataIndex: "day",
    key: "day",
  },
  {
    title: "Thời hạn",
    width: 100,
    dataIndex: "time",
    key: "time",
  },
  {
    title: "Chế độ lặp lại",
    width: 100,
    dataIndex: "loop",
    key: "loop",
  },
  {
    title: "Sửa đổi",
    width: 100,
    dataIndex: "edit",
    key: "edit",
  },
  {
    title: "Xóa",
    width: 100,
    dataIndex: "delete",
    key: "delete",
  },
];

const HoliDay = () => {
      // eslint-disable-next-line no-lone-blocks
  {
    Array.isArray(dataFake) &&
      dataFake.map((dataIndex, index) => {
        data.push({
          stt: index,
          name: `Nguyễn Văn A ${index}`,
          day: index+1,
          status: <Tag style={{ background:colors.redGlobal, color: colors.textBase }}>Nghỉ Lễ</Tag>,
          time: convertISOToDateTime(dataIndex.createdTime),
          edit: (
            <div className="flex items-center justify-center space-x-3">
              <RiEditBoxFill className="text-[22px]" />
            </div>
          ),
          delete: (
            <div className="flex items-center justify-center space-x-3">
              <MdDelete className="text-[22px]" />
            </div>
          ),
        });
      });
  }
    return ( 
        <div className="h-[90vh] ">
            <div className="w-full h-[87vh] px-2 pt-3 overflow-auto scroll_default">
                <CustomTable
                    width="100%"
                    data={data}
                    columns={columns}
                    showTotal={false}
                    pagination={true}
                    showCheckBox={true}
                    bordered={false}
                    heightPart={500}
                    onRowClick={() => {}} 
                    />
            </div>
            <CustomFooter />
        </div>
     );
}
 
export default HoliDay;