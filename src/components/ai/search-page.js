import HeaderClose from "@common/headerclose/header-close";
import { images } from "@common/images/image";
import CustomTable from "@common/table/custom-table";
import colors from "@constants/colors";
import dataFake from "../../pages/event/dataface.json";
import { convertISOToDateTime } from "@utils/format-date";
import { IoEyeSharp } from "react-icons/io5";
import { RiEditBoxFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { toDate } from "date-fns";
import moment from "moment";

const data = [];
const columns = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    width: 20,
  },
  {
    title: "ĐỐI TƯỢNG",
    dataIndex: "ioId",
    key: "ioId",
    width: 60,
  },
  {
    title: "TƯƠNG ĐỒNG",
    dataIndex: "cameraLocation",
    width: 60,
    key: "cameraLocation",
    sorter: (a, b) => a.cameraLocation - b.cameraLocation
  },
  {
    title: "THỜI GIAN",
    width: 60,
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

const today = moment().format('YYYY-MM-DD HH:mm');
// eslint-disable-next-line no-lone-blocks
{
  Array.isArray(dataFake) &&
    dataFake.map((dataIndex, index) => {
      data.push({
        stt: index,
        ioId: `Nguyễn Văn A ${index}`,
        cameraLocation: dataIndex.cameraLocation,
        time: today,
        action: (
          <div className="flex items-center justify-center space-x-3">
            <IoEyeSharp className="text-[22px] cursor-pointer" />
            <RiEditBoxFill className="text-[22px] cursor-pointer" />
            <MdDelete className="text-[22px] cursor-pointer" />
          </div>
        ),
      });
    });
}
const PageSearch = ({title}) => {
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
          <HeaderClose title={title} />
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
                      <Item label="Tuổi" value="CHƯA BIẾT"/>
                      <Item label="Giới Tính" value="CHƯA BIẾT"/>
                      <Item label="Kính" value="CHƯA BIẾT"/>
                      <Item label="Biểu hiện" value="CHƯA BIẾT"/>
                      <Item label="Râu" value="CHƯA BIẾT"/>
                      <Item label="Khẩu trang" value="CHƯA BIẾT"/>
                    </div>
                </div>
                {/* <div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold" style={{color:colors.textBase}}>Thông tin</span>
                      <div className="bg-black w-[80%] h-[2px]"></div>
                    </div>
                    <div className="px-4 py-1">
                    <Item label="Khẩu trang" value="CHƯA BIẾT"/>

                      <div className="flex justify-between w-[300px] h-[25px]">
                        <span style={{color:colors.textBase}}>Tên</span>
                        <span style={{color:colors.textBase}}>CHƯA BIẾT</span>
                      </div>
                      <div className="flex justify-between w-[300px] h-[25px]">
                        <span style={{color:colors.textBase}}>Sinh nhật</span>
                        <span style={{color:colors.textBase}}>CHƯA BIẾT</span>
                      </div>
                      <div className="flex justify-between w-[300px] h-[25px]">
                        <span style={{color:colors.textBase}}>Giới Tính</span>
                        <span style={{color:colors.textBase}}>CHƯA BIẾT</span>
                      </div>
                      <div className="flex justify-between w-[300px] h-[25px]">
                        <span style={{color:colors.textBase}}>Loại thông tin xác thực</span>
                        <span style={{color:colors.textBase}}>CHƯA BIẾT</span>
                      </div>
                      <div className="flex justify-between w-[300px] h-[25px]">
                        <span style={{color:colors.textBase}}>Thông tin số</span>
                        <span style={{color:colors.textBase}}>CHƯA BIẾT</span>
                      </div>
                      <div className="flex justify-between w-[300px] h-[25px]">
                        <span style={{color:colors.textBase}}>Khu vực</span>
                        <span style={{color:colors.textBase}}>CHƯA BIẾT</span>
                      </div>
                    </div>
                </div> */}
            </div>
        </div>
      </div>
     );
}
 
export default PageSearch;