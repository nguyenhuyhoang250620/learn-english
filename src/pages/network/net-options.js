import CustomCheckBox from "@common/checkbox/custom-check-box";
import CustomFooter from "@common/footer/custom-footer";
import CustomInput from "@common/input/custom-input";
import CustomSelect from "@common/select/custom-select";
import CustomTable from "@common/table/custom-table";
import colors from "@constants/colors";
import { MdDelete } from "react-icons/md";

const NetOptions = () => {
    const data = [];
    const listDataFake = Array(20).fill({
      stt: 'Mạng ',
      name: "192.166.1",
      group: "NIC đơn",
      status: "",
      edit: "24-04-2024",
    });
    listDataFake.map((user, index) => {
      data.push({
        stt: `${user.stt}${index}`,
        name: `${user.name}.${index}`,
        group: `${user.group}`,
        status: index,
        action: <div className="flex items-center justify-center space-x-3">
          <MdDelete className="text-[22px]"/>
        </div>,
      });
    });
    const columns = [
      {
        title: "Địa chỉ đích",
        dataIndex: "stt",
        key: "stt",
      },
      {
        title: "Netmask",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Gateway",
        dataIndex: "group",
        key: "group",
      },
      {
        title: "Giao diện",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "Xóa",
        dataIndex: "action",
        key: "action",
      },
    ];
    return ( 
        <div>
          <div className="h-[86vh]">
            <div className="mt-4">
              <div className="flex items-center">
                <CustomCheckBox title='Tự động thêm'/>
              </div>
              <div className="flex items-center py-3">
                <span className="font-bold" style={{color:colors.textBase}}>Nhập thủ công</span>
                <div className="bg-black h-[1px] w-[80%] ml-2"></div>
              </div>
              <CustomInput title={'Địa chỉ đích'} defaultValue={'8 . 8 . 8 . 8'} width="300px"/>
              <CustomInput title={'Netmask'} defaultValue={'8 . 8 . 8 . 8'} width="300px"/>
              <CustomInput title={'Gateway'} defaultValue={'8 . 8 . 4 . 4'} width="300px"/>
              <CustomSelect title={'Giao diện'} />
            </div>
            <div className="flex items-center py-3">
                <span className="font-bold" style={{color:colors.textBase}}>Thông tin bảng định tuyến tùy chỉnh (0/8)</span>
                <div className="bg-black h-[1px] w-[80%] ml-2"></div>
              </div>
            <div className="w-[1600px]">
              <CustomTable
                columns={columns}
                data={data}
                showCheckBox={false}
                showTotal={false}
                bordered={false}
                heightPart={800}
                onRowClick={() => {}}
              />
            </div>
          </div>
            <CustomFooter />
        </div>
     );
}
 
export default NetOptions;