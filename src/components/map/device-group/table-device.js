import CustomTable from "@common/table/custom-table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectListDevice } from "@redux/slice/device-slice";
import TYPE_ACTION from "@constants/action";
import { convertISOToDateTime } from "@utils/format-date";
import CustomHeaderDevice from "@components/device/custom-header-device";
const TableDevice = () => {
  const dispatch = useDispatch();
  const listDevice = useSelector(selectListDevice);
  const data = [];
  const getListDevice = () => {
    const callBack = (data) => {};
    dispatch({
      type: TYPE_ACTION.CAMERA.GET_LIST_DEVICE,
      payload: { body: "", callBack: callBack },
    });
  };
  useEffect(() => {
    getListDevice();
  }, []);
  const columns = [
    {
      title: "Kênh",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "IP",
      dataIndex: "camera_ip",
      key: "camera_ip",
    },
    {
      title: "Tên thiết bị",
      dataIndex: "camera_name",
      key: "camera_name",
    },
    {
      title: "Địa chỉ",
      dataIndex: "camera_url",
      key: "camera_url",
    },
    {
      title: "Thời gian tạo",
      dataIndex: "camera_created_at",
      key: "camera_created_at",
    },
    {
      title: "Lần cập nhật cuối",
      dataIndex: "camera_updated_at",
      key: "camera_updated_at",
    },
  ];
  // eslint-disable-next-line no-lone-blocks
  {
    Array.isArray(listDevice) &&
      listDevice.map((dataIndex, index) => {
        data.push({
          id: dataIndex.id,
          camera_ip: dataIndex.camera_ip,
          camera_name: dataIndex.camera_name,
          camera_url: <p className="max-w-[200px] truncate">{dataIndex.camera_url}</p>,
          camera_created_at: convertISOToDateTime(dataIndex.camera_created_at),
          camera_updated_at: convertISOToDateTime(dataIndex.camera_updated_at),
        });
      });
  }
  return (
    <div className="px-2">
      <CustomHeaderDevice isShowSearch={false}/>
      <CustomTable
        data={data}
        columns={columns}
        showTotal={false}
        pagination={true}
        showCheckBox={true}
        bordered={false}
        handleRowClick={()=>{}}
      />
    </div>
  );
};
export default TableDevice;
