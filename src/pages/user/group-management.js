import CustomTable from "@common/table/custom-table";
import { useState } from "react";
import colors from "@constants/colors";
import CustomHeaderUser from "@components/user/custom-header-user";
import { IoEyeSharp } from "react-icons/io5";
import { RiEditBoxFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import CustomModal from "@common/modal/modal";
import CustomModalUserGroup from "@components/user/custom-group-modal";
const GroupManagement = () => {
  const data = [];
  const listDataFake = Array(20).fill({
    stt: 1,
    name: "admin",
    role: ["Thêm", "Sửa", "Xoá"],
    status: "hoạt động",
    created_at: "24-04-2024",
  });
  listDataFake.map((user, index) => {
    data.push({
      stt: index,
      name: `${user.name} ${index}`,
      role: (
        <div className="flex space-x-2 justify-center">
          {user.role.map((role) => {
            return (
              <div
                className="flex items-center space-x-2 py-1 px-2 cursor-pointer"
                style={{
                  border: `1px solid ${colors.borderColor}`,
                }}
              >
                {role}
              </div>
            );
          })}
        </div>
      ),
      status: user.status,
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
  const [isShowModal,setIsShowModal] = useState(false)
  const handleOk = () => {
    setIsShowModal(false)
  }
  const handleCancel = () => {
    setIsShowModal(false)
  }
  const handleCreateUser = () => {
    setIsShowModal(true)
  }
  const columns = [
    {
      title: "Stt",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tên nhóm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quyền",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Thời gian tạo",
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
    <div>
      <CustomHeaderUser onClick={()=>handleCreateUser()}/>
      <CustomTable
        data={data}
        columns={columns}
        showTotal={false}
        pagination={true}
        showCheckBox={true}
        bordered={false}
        onRowClick={() => {}}
      />
      <CustomModal open={isShowModal} handleOk={handleOk} handleCancel={handleCancel} title="Thêm mới" content={<CustomModalUserGroup/>}/>
    </div>
  );
};
export default GroupManagement;
