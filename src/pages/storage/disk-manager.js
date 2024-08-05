import CustomFooter from "@common/footer/custom-footer";
import CustomTable from "@common/table/custom-table";

const DiskManager = () => {
    const data = [];
    const listDataFake = Array(20).fill({
        stt: '',
        name: "SSD",
        location: "Chủ_",
        status: "Đọc/Ghi",
        edit: "24-04-2024",
        action: "Bình thường",
        storage: " GB/5.4GB",
      });
      listDataFake.map((user, index) => {
        data.push({
          stt: `${index}`,
          name: `${user.name}.${index}`,
          location: `${user.location}${index}`,
          status: `${user.status}`,
          action: `${user.action}`,
          storage:`${index}${user.storage}`,
        });
      });
    const columns = [
    {
        title: "Số",
        dataIndex: "stt",
        key: "stt",
        width: 40,
    },
    {
        title: "Tên thiết bị",
        dataIndex: "name",
        key: "name",
        width: 80,
    },
    {
        title: "Vị trí vật lý",
        dataIndex: "location",
        width: 80,
        key: "location",
    },
    {
        title: "Thuộc tính",
        width: 100,
        dataIndex: "status",
        key: "status",
    },
    {
        title: "Tình trạng sức khỏe",
        width: 100,
        dataIndex: "action",
        key: "action",
    },
    {
        title: "Dung lượng còn lại/Tổng dung lượng",
        width: 100,
        dataIndex: "storage",
        key: "storage",
    },
    ];
    return ( 
        <div className="h-[90vh]">
          <div className="w-full h-[87vh] p-6 overflow-auto scroll_default">
                <CustomTable
                    width="80vw"
                    data={data}
                    columns={columns}
                    showTotal={false}
                    pagination={true}
                    showCheckBox={true}
                    bordered={false}
                    heightPart={0}
                    onRowClick={() => {}}
                 />
          </div>
          <CustomFooter />
        </div>
     );
}
 
export default DiskManager;