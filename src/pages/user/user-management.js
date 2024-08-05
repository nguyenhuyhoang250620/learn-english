import CustomTable from "@common/table/custom-table";
import CustomHeaderUser from "@components/user/custom-header-user";
import { IoEyeSharp } from "react-icons/io5";
import { RiEditBoxFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import CustomModal from "@common/modal/modal";
import { useState } from "react";
import CustomContentModalUser from "@components/user/custom-content-modal-user";
const UserManagement = () => {
  const [isShowModal,setIsShowModal] = useState(false)
  const data = [];
  const listDataFake = Array(20).fill({
    stt: 1,
    name: "Nguyễn Văn",
    group: "admin",
    status: "hoạt động",
    created_at: "24-04-2024",
  });
  listDataFake.map((user, index) => {
    data.push({
      stt: index,
      name: `${user.name} ${index}`,
      group: `${user.group} ${index}`,
      status: user.status,
      created_at: user.created_at,
      action: <div className="flex items-center justify-center space-x-3">
        <IoEyeSharp className="text-[22px]"/>
        <RiEditBoxFill className="text-[22px]"/>
        <MdDelete className="text-[22px]"/>
      </div>,
    });
  });
  const columns = [
    {
      title: "Stt",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tên nhóm",
      dataIndex: "group",
      key: "group",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
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
  const handleOk = () => {
    setIsShowModal(false)
  }
  const handleCancel = () => {
    setIsShowModal(false)
  }
  const handleCreateUser = () => {
    setIsShowModal(true)
  }
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
      <CustomModal open={isShowModal} handleOk={handleOk} handleCancel={handleCancel} title="Thêm mới" content={<CustomContentModalUser/>}/>
    </div>
  );
};
export default UserManagement;
