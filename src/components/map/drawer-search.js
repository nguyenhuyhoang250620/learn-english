import { imagesCamera, imagesGroup } from "@common/images/image";
import colors from "@constants/colors";
import { Drawer, ConfigProvider } from "antd";
import { useEffect, useState } from "react";

const DrawerSearch = ({
  onClose,
  open,
  dataSearch = [],
  mapRef,
  handleDataReceived,
}) => {
  // const getLocation = (position)=>{
  //     mapRef.current.flyTo(position,15);
  //     handleDataReceived(position)
  // }
  const [dataArray, setDataArray] = useState([]);
  const [count, setCount] = useState(0); // Biến đếm số lượng phần tử trong mảng
  let interval; // Định nghĩa biến interval ở ngoài phạm vi của useEffect

  useEffect(() => {
    if(open){
        if (count === 20) {
            clearInterval(interval); // Dừng interval nếu đạt đến giới hạn 20
          } else {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            interval = setInterval(() => {
              setDataArray((prevArray) => [
                ...prevArray,
                {
                  /* Thêm dữ liệu mới vào đây */
                },
              ]);
              setCount((prevCount) => prevCount + 1);
            }, 1000);
      
            return () => {
              clearInterval(interval);
            };
          }
    }
  }, [count,open]);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorText: colors.text,
          colorIcon: colors.text,
          paddingLG: 0,
          colorBgMask: "transparent",
        },
      }}
    >
      <Drawer
        title={<p style={{color:colors.textBase}}>Link rtsp</p>}
        placement="right"
        onClose={onClose}
        open={open}
        className="scroll_default"
      >
        {dataArray.map((item, index) => {
          return (
            <div
              style={{
                color: colors.textBase,
              }}
              className="flex items-center space-x-2 p-2"
            >
              <img src={imagesGroup.camera_connected} alt="#" />
              <p>rtsp//192.168.1.112:123/channel{index}</p>
            </div>
          );
        })}
        {/* <div>
                {
                    dataSearch.map((item,index)=>{
                        return(
                            <div
                                key={index}
                                onClick={()=>getLocation(item.value)}
                                className="flex justify-start items-center h-[60px] overflow-hidden cursor-pointer hover:bg-[#464852]"
                                style={{borderBottom:`1px solid ${colors.textPlaceholder}`,}}
                            >
                                <span 
                                className="whitespace-nowrap overflow-hidden text-ellipsis"
                                style={{color:colors.text}}>
                                    {item.label}
                                </span>
                            </div>
                        )
                    })
                }
            </div> */}
      </Drawer>
    </ConfigProvider>
  );
};
export default DrawerSearch;
