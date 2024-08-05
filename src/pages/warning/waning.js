import CustomTable from "@common/table/custom-table";
import CustomHeaderWarning from "@components/warning/custom-header-warning";
import { IoEyeSharp } from "react-icons/io5";
import { RiEditBoxFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
const Warning = () => {
  const data = [];
  const listDataFake = Array(20).fill({
    stt: 1,
    object: "Nguyễn Văn",
    group: "admin",
    status: "hoạt động",
    created_at: "24-04-2024",
  });
  listDataFake.map((user, index) => {
    data.push({
      stt: index,
      object: `${user.object} ${index}`,
      type: `Cảnh báo xâm nhập`,
      created_at: user.created_at,
      action: (
        <div className="flex items-center justify-center space-x-3">
          <IoEyeSharp className="text-[22px]" />
          <RiEditBoxFill className="text-[22px]" />
          <MdDelete className="text-[22px]" />
        </div>
      ),
    });
  });
  const columns = [
    {
      title: "Stt",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Đối tượng",
      dataIndex: "object",
      key: "object",
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Thời gian",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
    },
  ];
  return (
    <div className="px-2">
      <CustomHeaderWarning />
      <CustomTable
        data={data}
        columns={columns}
        showTotal={false}
        pagination={true}
        showCheckBox={true}
        bordered={false}
        onRowClick={() => {}}
      />
    </div>
  );
};
export default Warning;
