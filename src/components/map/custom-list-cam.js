import { imagesGroup } from "@common/images/image";
import colors from "@constants/colors";
import {
  selectDataLocationCam,
  selectTotalCamAll,
} from "@redux/slice/map-slice";
import { ConfigProvider, Pagination, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Item from "@common/item/item";
import { RiLiveFill } from "react-icons/ri";
import { FaMapMarkerAlt } from "react-icons/fa";
import CustomViewStream from "./view-stream";
import TYPE_ACTION from "@constants/action";
import { useEffect, useRef, useState } from "react";
import CustomEmpty from "@common/empty/custom-empty";
const CustomListCamera = ({
  mapRef,
  loadDataCame,
  filterLocationCameraRef,
}) => {
  const dataCamLocation = useSelector(selectDataLocationCam);
  const total = useSelector(selectTotalCamAll);
  const dispatch = useDispatch();
  const [keyLive,setKeyLive] = useState(0)
  const CustomButtonDetail = ({ title, icon, onClick }) => {
    return (
      <div
        className="flex space-x-1 items-center p-2 cursor-pointer"
        style={{ background: colors.background }}
        onClick={onClick}
      >
        {icon}
        <span>{title}</span>
      </div>
    );
  };
  const handleShowCameraMap = (location) => {
    mapRef.current.flyTo([location.latitude, location.longitude], 15, {
      duration: 1,
    });
  };
  const handleOnChang = (page, size) => {
    filterLocationCameraRef.current.page_index = page;
    loadDataCame();
  };
  const handleStopStream = (id) => {
    const callBack = (data) => {

    };
    dispatch({
      type: TYPE_ACTION.LIVE.STOP_STREAM,
      payload: { id: id, callBack },
    });
  };
  return (
    <div className="flex flex-col items-center space-y-2">
      <div>
        <ConfigProvider
          theme={{
            token: {
              borderRadius: 0,
              colorBorder: colors.redGlobal,
              colorPrimary: colors.redGlobal,
              controlOutline: 0,
              controlOutlineWidth: 0,
              padding: 0,
              margin: 0,
              marginXL: 0,
              marginXS: 0,
              marginXXL: 0,
              marginXXS: 0,
            },
          }}
        >
          <Pagination
            defaultCurrent={"1"}
            total={total}
            showSizeChanger={false}
            responsive
            onChange={(page, size) => handleOnChang(page, size)}
          />
        </ConfigProvider>
      </div>
      <div
        className="w-full h-[0.5px]"
        style={{ background: colors.borderColor }}
      ></div>
      <div
        className="max-h-[82.5vh] w-full overflow-auto scroll_default"
        style={{ background: colors.backgroundSide, color: colors.textBase }}
      >
        {dataCamLocation ?
          dataCamLocation.map((item, index) => {
            return (
              <div
                key={index}
                className="h-[260px] flex space-x-2 p-3 w-full"
                style={{ borderBottom: `1px solid ${colors.borderColor}` }}
              >
                <div className="w-[10%] h-full">
                  <img
                    alt="camera"
                    src={imagesGroup.camera_connected}
                    className="w-[40px] h-auto"
                  />
                </div>
                <div className="w-[90%] space-y-2">
                  <Item title="Tên cam" content={item.name} minWidth={80} />
                  <Item
                    title="Địa chỉ IP"
                    content={item.ipAddress}
                    minWidth={80}
                  />
                  <div>
                    <p>Ảnh chụp camera:</p>
                    <img
                      alt="screenshot"
                      src="https://cdn1.tuoitre.vn/zoom/600_315/2020/1/20/tac-duong-ha-noi1-15795177528991668906725-crop-1579517876976623096785.jpg"
                      className="h-[100px] w-auto flex-shrink-0"
                    />
                  </div>
                  <div className="flex space-x-2 w-full">
                    <ConfigProvider
                      theme={{
                        token: {
                          borderRadius: 0,
                          paddingXXS: 0,
                          marginXL: 0,
                          marginXS: 0,
                          marginXXL: 0,
                          marginXXS: 0,
                          colorBgBase: colors.background,
                        },
                      }}
                    >
                      <Popconfirm
                        placement="right"
                        title={null}
                        description={
                          <div className="h-[135px] w-[240px]">
                            <CustomViewStream
                              key={keyLive}
                              url={item.id}
                              id={item.id}
                            />
                          </div>
                        }
                        okText="Yes"
                        cancelText="No"
                        icon={null}
                        onVisibleChange={(open)=>{
                          if(!open){
                            handleStopStream(item.id);
                          }
                          else{
                            setKeyLive(pre=>pre+1)
                          }
                        }}
                      >
                        <CustomButtonDetail
                          title="Xem trực tiếp"
                          icon={<RiLiveFill />}
                        />
                      </Popconfirm>
                    </ConfigProvider>

                    <CustomButtonDetail
                      title="Vị trí trên bản đồ"
                      icon={<FaMapMarkerAlt />}
                      onClick={() => handleShowCameraMap(item.addressDTO)}
                    />
                  </div>
                </div>
              </div>
            );
          }):<CustomEmpty/>
        }
      </div>
    </div>
  );
};
export default CustomListCamera;
