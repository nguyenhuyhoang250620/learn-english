import CustomCheckBox from "@common/checkbox/custom-check-box";
import CustomFooter from "@common/footer/custom-footer";
import CustomInput from "@common/input/custom-input";
import CustomSelect from "@common/select/custom-select";
import CustomTable from "@common/table/custom-table";
import colors from "@constants/colors";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { RiEditBoxFill } from "react-icons/ri";

const Item = ({title, value})=>{
  return(
    <div className="flex p-2 w-[400px]">
    <span className="mr-[10px]" style={{color:colors.textBase}}>{title}:</span>
    <span style={{color:colors.textBase}}>{value}</span>
  </div>
  )
}

const NetSetting = () => {
    const data = [];
    const listDataFake = Array(20).fill({
      stt: 'Mạng ',
      name: "192.166.1",
      group: "NIC đơn",
      status: "",
      edit: "24-04-2024",
      mac: "b4:4c:3b:ce:8c:1",
      mark: "255.255.255",
    });
    listDataFake.map((user, index) => {
      data.push({
        stt: `${user.stt}${index}`,
        name: `${user.name}.${index}`,
        mark: `${user.mark}.${index}`,
        mac: `${user.mac}${index}`,
        group: `${user.group}`,
        status: index,
        edit: <div className="flex items-center justify-center space-x-3">
        <RiEditBoxFill className="text-[22px]"/>
      </div>,
        action: <div className="flex items-center justify-center space-x-3">
          <MdDelete className="text-[22px]"/>
        </div>,
      });
    });
    const columns = [
      {
        title: "Thẻ Ethernet",
        dataIndex: "stt",
        key: "stt",
      },
      {
        title: "Địa chỉ IP",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Chế độ mạng lưới",
        dataIndex: "group",
        key: "group",
      },
      {
        title: "Thành viên NIC",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "Sửa đổi",
        dataIndex: "edit",
        key: "edit",
      },
      {
        title: "Mất kết nối",
        dataIndex: "action",
        key: "action",
      },
    ];
    const [rederNet, setRederNet] = useState({})
    return ( 
        <div>
          <div className="h-[86vh]">
            <div className="w-[1600px]">
              <CustomTable
                columns={columns}
                data={data}
                showCheckBox={false}
                showTotal={false}
                bordered={false}
                heightPart={800}
                handleRowClick={(e, index) => {setRederNet(e)}}
                getRowClassName = {(record, index) => {
                  return index === rederNet.status ? "red_row" : "";
                }}
                />
            </div>
            <div className="p-4 w-[1600px] h-[100px] border border-zinc-900" style={{background:colors.backgroundSide}}>
              <div className="flex flex-wrap max-w-[1200px] justify-around" >
                <Item title='Địa chỉ IP' value={rederNet.name} />
                <Item title='Chế độ mạng' value={rederNet.group} />
                <Item title='Thành viên' value={rederNet.status} />
                <Item title='Mawth nạ mạng' value={rederNet.mark} />
                <Item title='Địa chỉ MAC' value={rederNet.mac} />
                <Item title='Chế độ' value='Tĩnh' />
              </div>
            </div>
            <div className="mt-4">
              <CustomSelect title={'Phiên bản IP'} />
              <div className="flex items-center mb-6">
                <CustomCheckBox title='DHCP'/>
              </div>
              <CustomInput name={'ipAddress'} title={'DNS ưa thích'} defaultValue={'8 . 8 . 8 . 8'} width="300px"/>
              <CustomInput title={'DNS thay thế'} defaultValue={'8 . 8 . 4 . 4'} width="300px"/>
              <CustomSelect title={'Thẻ mặc định'} />
              <div className="flex items-center mb-6">
                <CustomCheckBox title='Máy chủ ảo'/>
              </div>
            </div>
          </div>
            <CustomFooter />
        </div>
     );
}
 
export default NetSetting;