import CustomHeaderSearch from "@components/map/custom-header-search";
import { imagesCamera, imagesOther } from "@common/images/image";
import CustomModal from "@components/map/custom-modal";
import CustomDrawe from "@components/map/drawer";
import DrawerSearch from "@components/map/drawer-search";
import CustomMap from "@components/map/map-custom";
import TYPE_ACTION from "@constants/action";
import colors from "@constants/colors";
import { selectToggle } from "@redux/slice/action-slice";
import {
  selectTotalCamAll
} from "@redux/slice/map-slice";
import { ConfigProvider, Dropdown } from "antd";
import axios from "axios";
import L from "leaflet";
import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import "./custom-marker.css";
import CustomListCamera from "@components/map/custom-list-cam";

const MapCustom = () => {
  const isShowDraw = useSelector(selectToggle);
  const total = useSelector(selectTotalCamAll);
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const [options, setOptions] = useState();
  const [visiable, setVisiable] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showmaker, setShowMaker] = useState();

  const [attribution, setAttribution] = useState(
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  );
  const [urlMap, setUrlMap] = useState(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
  );
  const [heatMap, setHeatMap] = useState(false);

  const [feature, setFeature] = useState();
  const [layers, setLayers] = useState([]);
  const [deleteLayer, setDeleteLayer] = useState();
  const [isScan,setIsScan] = useState(false);
  const filterLocationCameraRef = useRef({
    iaddress_ids: null,
    district_ids: null,
    ids: null,
    ips: null,
    hasCamera: true,
    hasRecorder: true,
    names: null,
    province_ids: null,
    status: true,
    page_size: 100,
    page_index: 0,
  });
  const loadDataCame = ()=>{
    dispatch({
      type: TYPE_ACTION.MAP.GET_LOCATION_CAMERA,
      payload: filterLocationCameraRef.current,
    });
  }
  useEffect(() => {
    loadDataCame()
  }, []);

  useEffect(() => {
    dispatch({
      type: TYPE_ACTION.MAP.GET_TOTAL,
      payload: {},
    });
  }, []);
  const handleSearch = async (value) => {
    setLoading(true);
    const arr = [];
    try {
      const response = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: value,
            format: "json",
          },
        }
      );

      const data = response.data;
      data.map((item) => {
        arr.push({
          label: item.display_name,
          value: [item.lat, item.lon],
        });
      });
      setOptions(arr);
      setOpen(true);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm:", error);
    }
  };

  const items = [
    {
      label: <span style={{ color: colors.textBase }}>Group</span>,
      key: "0",
      onClick: () =>
        handleChangeMap(
          '<a href="https://www.jawg.io" target="_blank">&copy; Jawg</a> - <a href="https://www.openstreetmap.org" target="_blank">&copy; OpenStreetMap</a>&nbsp;contributors',
          "https://tile.jawg.io/a8f95f9c-5194-4833-b099-30f037f1fab4/{z}/{x}/{y}{r}.png?access-token=2cwdRZ4yhbAEEj7oMGVX8GpdiNwVoRNC30UwFEdFGlL189NDF1mfvwkbvKpswbIV",
          false
        ),
    },
    {
      label: <span style={{ color: colors.textBase }}>Satellite</span>,
      key: "1",
      onClick: () =>
        handleChangeMap(
          "google",
          "http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}",
          false
        ),
    },
  ];

  const handleDataReceived = (data) => {
    setShowMaker(data);
    // Xử lý dữ liệu tại đây
  };
  const handleChangeMap = (attribution, url, heatmap) => {
    setAttribution(attribution);
    setUrlMap(url);
    setHeatMap(heatmap);
  };

  var iconCamDisconnected = L.icon({
    iconUrl: imagesCamera.camera_connected,
    iconSize: [20, 20],
  });

  const getHandleRemoveLayer = (feature, layer) => {
    setFeature(feature);
    setLayers((prevLayers) => {
      if (!prevLayers.some((existingLayer) => existingLayer === layer)) {
        return [...prevLayers, layer];
      } else {
        return prevLayers;
      }
    });
  };

  const getActionDraw = (data) => {
    setDeleteLayer(data);
  };
  const createClusterCustomIconRecoder = function (cluster) {
    return new L.DivIcon({
      html: `<div class="custom-marker">
                <div class="outer-circle">
                  <div class="middle-circle">
                    <div class="inner-circle">
                      <div class="innermost-circle"></div>
                    </div>
                  </div>
                </div>
              </div>`,
      // html:`<div class="clockwise-rotate">
      //   <div class="circle-custom-a"></div>
      //   <div class="circle-custom-b"></div>
      //   <div class="circle-custom-c"></div>
      //   <div class="circle-custom-d"></div>
      //   <div class="circle-custom-e"></div>
      // </div>`,
      className: "custom-marker-cluster",
      iconSize: L.point(250, 250, true),
    });
  };

  // Tạo marker với icon
  const markerIcon = createClusterCustomIconRecoder();
  return (
    <div className="w-full h-full overflow-auto px-[5px] flex">
      <div className="h-max px-2 w-[26%]">
        <CustomHeaderSearch
          handleScan={() => {
            setVisiable(!visiable);
          }}
        />
        <div className="min-h-[87vh] w-full mt-2">
          <CustomListCamera mapRef={mapRef} filterLocationCameraRef={filterLocationCameraRef} loadDataCame={()=>loadDataCame()}/>
        </div>
      </div>
      <CustomModal open={visiable} onCancel={() => setVisiable(false)} onScan={()=>{
        setOpen(true)
        setVisiable(false)
        setIsScan(true)
      }}/>
      <DrawerSearch
        open={open}
        onClose={() => setOpen(false)}
        dataSearch={options}
        mapRef={mapRef}
        handleDataReceived={handleDataReceived}
      />

      <div className="w-full flex flex-1 mt-[5px] overflow-auto h-[93vh] relative">
        <MapContainer
          zoom={5}
          minZoom={4}
          touchZoom={(e) => {
            console.log(e);
          }}
          center={[21.028511, 105.804817]}
          scrollWheelZoom={true}
          // style={{ position: "relative" }}
          ref={mapRef}
          maxZoom={20}
          maxBounds={[
            [-30, 0],
            [30, 200],
          ]}
          zoomControl={false}
        >
          {/* {
            isScan && (<Marker position={[21.028511, 105.804817]} icon={markerIcon}></Marker>)    
          } */}
         {
            isScan && (<Marker position={[17.5300242760001, 106.686584998]} icon={markerIcon}></Marker>)
          }
          {/* {
            isScan && (<Marker position={[11.159677189, 107.013237776]} icon={markerIcon}></Marker>)
          }  */}
          {showmaker && (
            <Marker position={showmaker} icon={iconCamDisconnected}></Marker>
          )}

          <div className="relative w-full h-[93vh] flex overflow-hidden">
            <CustomMap
              mapRef={mapRef}
              attribution={attribution}
              urlMap={urlMap}
              heatMap={heatMap}
            />
            <ConfigProvider
              theme={{
                token: {
                  controlItemBgActive: colors.redGlobal,
                },
              }}
            >
              <Dropdown
                menu={{
                  items,
                  selectable: true,
                  defaultSelectedKeys: ["0"],
                }}
                trigger={["click"]}
              >
                <div className="absolute top-[75px] right-[12px] z-[999] w-[30px] h-[30px] bg-white cursor-pointer flex justify-center items-center">
                  <img src={imagesOther.change_map} color="black" alt="" />
                </div>
              </Dropdown>
            </ConfigProvider>
            {deleteLayer && (
              <div
                onClick={() => {
                  if (layers) {
                    layers.map((item) => {
                      feature.removeLayer(item);
                    });
                  }
                }}
                className="absolute top-[100px] right-[12px] z-[999] w-[30px] h-[30px] bg-black cursor-pointer flex justify-center items-center"
              >
                <img src={imagesCamera.delete_default} alt="" />
              </div>
            )}
            <div
              className="absolute top-[10px] left-[10px] z-[999] w-[189px] h-[36px] bg-black/[0.6] cursor-pointer flex justify-center items-center"
              style={{
                color: colors.textBase,
              }}
            >
              Total: {total} cameras
            </div>
          </div>
        </MapContainer>
        {isShowDraw && (
          <div className="h-full w-max">
            <CustomDrawe
              drawRef={mapRef}
              handleRemoveLayer={getHandleRemoveLayer}
              getActionDraw={getActionDraw}
              mapRef={mapRef}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MapCustom;
