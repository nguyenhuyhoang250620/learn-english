import HeaderClose from "@common/headerclose/header-close";
import { images } from "@common/images/image";
import CustomTable from "@common/table/custom-table";
import colors from "@constants/colors";

const data = [];
const columns = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    width: 40,
  },
  {
    title: "ĐỐI TƯỢNG",
    dataIndex: "ioId",
    key: "ioId",
    width: 80,
  },
  {
    title: "TƯƠNG ĐỒNG",
    dataIndex: "cameraLocation",
    width: 80,
    key: "cameraLocation",
    sorter: (a, b) => a.cameraLocation - b.cameraLocation
  },
  {
    title: "THỜI GIAN",
    width: 100,
    dataIndex: "time",
    key: "time",
    sorter: (a, b) => a.time - b.time
  },
  {
    title: "HÀNH ĐỘNG",
    width: 100,
    dataIndex: "action",
    key: "action",
  }
];

const VehicleDetectionSearch = () => {
  const Item = ({label,value})=>{
    return(
      <div className="flex justify-between w-[300px] h-[25px]">
        <span style={{color:colors.textBase}}>{label}</span>
        <span style={{color:colors.textBase}}>{value}</span>
      </div> 
    )
}
    return ( 
        <div className="h-[98vh] overflow-auto scroll_default" style={{background:colors.background}}>
          <HeaderClose title={'NHẬN DIỆN KHUÔN MẶT'} />
        <div className="flex h-[780px] px-2 pt-3 overflow-auto scroll_default">
            <div className="pr-6">
                <CustomTable
                width="60vw"
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
            <div style={{background:colors.background_form}} className="p-2 h-[760px] overflow-auto scroll_default">
                <div className="w-[480px] h-[300px] bg-black flex justify-center items-center">
                    <img src={images.logo} alt="logo"/>
                </div>
                <div className="mt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-bold" style={{color:colors.textBase}}>Thuộc tính</span>
                      <div className="bg-black w-[80%] h-[2px]"></div>
                    </div>
                    <div className="px-4 py-1">
                      <Item label="Tên" value="CHƯA BIẾT"/>
                      <Item label="Tuổi" value="CHƯA BIẾT"/>
                      <Item label="Giới Tính" value="CHƯA BIẾT"/>
                      <Item label="Kính" value="CHƯA BIẾT"/>
                      <Item label="Biểu hiện" value="CHƯA BIẾT"/>
                      <Item label="Râu" value="CHƯA BIẾT"/>
                      <Item label="Khẩu trang" value="CHƯA BIẾT"/>
                    </div>
                </div>
            </div>
        </div>
      </div>
     );
}
 
export default VehicleDetectionSearch;