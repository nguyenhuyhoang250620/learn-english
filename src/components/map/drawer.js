import { useState, useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDataDistrict,
  selectDataProvince,
  selectDataWard,
} from "@redux/slice/map-slice";
import CustomSelect from "@common/select/custom-select";
import colors from "@constants/colors";
import TYPE_ACTION from "@constants/action";
import CustomButtonCommon from "@common/button/custom-button";
import CustomInput from "@common/input/custom-input";
import CustomCheckBoxGroup from "@common/checkbox/custom-check-box-group";

const listDeviceType = ["Camera", "Recorder"];
const listStatus = ["Connected", "Disconnected"];
const listMethod = ["Manual", "Automatic"];

const SelectValue = ({ mapRef }) => {
  const filterLocationCameraRef = useRef({
    iaddress_ids: null,
    district_ids: null,
    ids: null,
    ips: null,
    page_index: 0,
    page_size: 100,
    province_ids: null,
    status: null,
  });
  const filterRecorderRef = useRef({
    iaddress_ids: null,
    district_ids: null,
    ids: null,
    ips: null,
    page_index: 0,
    page_size: 500,
    province_ids: null,
    status: null,
  });
  const filterProvinceRef = useRef({
    code_names: null,
    ids: null,
    province_ids: null,
  });
  const filterDistrictRef = useRef({
    code_names: null,
    ids: null,
  });
  const filterWardRef = useRef({
    code_names: null,
    district_ids: null,
    ids: null,
    page_index: 0,
    page_size: 12,
    province_ids: null,
    q: null,
  });

  //save data
  const [provinceID, setProvinceID] = useState();
  const [districtID, setDistrictID] = useState();
  const [wardSearch, setWardSearch] = useState([]);

  const [districtCenter, setDistrictCenter] = useState();
  const [provinceCenter, setProvinceCenter] = useState();

  const [deviceType, setDeviceType] = useState(listDeviceType);
  const [status, setStatus] = useState(listStatus);

  const dispatch = useDispatch();
  const dataProvince = useSelector(selectDataProvince);
  const dataDistrict = useSelector(selectDataDistrict);
  const dataWard = useSelector(selectDataWard);

  const loadDataProvince = () => {
    dispatch({
      type: TYPE_ACTION.MAP.GET_PROVINCE,
      payload: filterProvinceRef.current,
    });
  };
  const loadDataDistrict = () => {
    dispatch({
      type: TYPE_ACTION.MAP.GET_DISTRICT,
      payload: filterDistrictRef.current,
    });
  };

  const loadDataWard = () => {
    const callBack = (data) => {
      const arr = [];
      data.map((item) => {
        arr.push({
          value: item.id,
          label: item.name,
        });
      });
      setWardSearch(arr);
    };
    dispatch({
      type: TYPE_ACTION.MAP.GET_WARD,
      payload: { body: filterWardRef.current, callBack },
    });
  };

  useEffect(() => {
    loadDataProvince();
    loadDataDistrict();
    loadDataWard();
  }, []);

  const arrProvince = dataProvince.map((item) => ({
    value: item.id,
    label: item.name,
    center: item.center,
  }));

  const arrDistrict = dataDistrict.map((item) => ({
    value: item.id,
    label: item.name,
    provinId: item.provinceId,
    center: item.center,
  }));

  const loadDataLocationCamera = () => {
    dispatch({
      type: TYPE_ACTION.MAP.GET_LOCATION_CAMERA,
      payload: filterLocationCameraRef.current,
    });
  };
  const loadDataRecorder = () => {
    dispatch({
      type: TYPE_ACTION.MAP.GET_RECORDER,
      payload: filterRecorderRef.current,
    });
  };
  const onSelectProvince = (e, info) => {
    const latitude = JSON.parse(info.center).latitude;
    const longitude = JSON.parse(info.center).longitude;
    filterDistrictRef.current.ids = e;
    setProvinceID(e);
    setProvinceCenter([latitude, longitude]);
    loadDataDistrict();
  };
  const onSelectDistric = (e, info) => {
    if (info) {
      const latitude = JSON.parse(info?.center)?.latitude;
      const longitude = JSON.parse(info?.center)?.longitude;
      filterProvinceRef.current.ids = info.provinId;
      setDistrictID(e);
      setDistrictCenter([latitude, longitude]);
      loadDataProvince();
    }
  };
  const updateStatusFilter = (statusValue) => {
    if (statusValue === "Connected") {
      filterRecorderRef.current.status = true;
    } else if (statusValue === "Disconnected") {
      filterRecorderRef.current.status = false;
    } else {
      filterRecorderRef.current.status = null;
    }
  };

  const handleScan = () => {
    filterLocationCameraRef.current.province_ids = provinceID;
    filterLocationCameraRef.current.district_ids = districtID;
    filterRecorderRef.current.province_ids = provinceID;
    filterRecorderRef.current.district_ids = districtID;
    if (provinceCenter) {
      mapRef.current.flyTo(provinceCenter, 10);
    }
    if (districtCenter) {
      mapRef.current.flyTo(districtCenter, 10);
    }
    if (provinceCenter) {
      mapRef.current.flyTo(provinceCenter, 10);
    }
    if (districtCenter) {
      mapRef.current.flyTo(districtCenter, 10);
    }
    // if (deviceType === 'All') {
    //   loadDataLocationCamera();
    //   loadDataRecorder();
    // } else
    if (deviceType === "Recorder") {
      updateStatusFilter(status);
      loadDataRecorder();
    } else if (deviceType === "Camera") {
      updateStatusFilter(status);
      loadDataLocationCamera();
    }
  };

  const ClearProvince = () => {
    filterProvinceRef.current.code_names = null;
    filterProvinceRef.current.ids = null;
    filterProvinceRef.current.province_ids = null;
    loadDataProvince();
  };
  const ClearDistrict = () => {
    filterDistrictRef.current.code_names = null;
    filterDistrictRef.current.ids = null;
    loadDataDistrict();
  };

  const SelectDeviceType = (arr) => {
    arr.map((item) => {
      setDeviceType(item);
    });
  };
  const SelectStatus = (arr) => {
    arr.map((item) => {
      setStatus(item);
    });
  };

  const handleSearchWard = (value) => {
    filterWardRef.current.q = value;
    loadDataWard();
  };
  return (
    <div>
      <div className="my-[10px]">
        <span className="font-bold" style={{ color: colors.textBase }}>
          IP Range
        </span>
      </div>
      <CustomInput
        lineHeight="0px"
        width="200px"
        backgroundColor={colors.background_tag}
        font="font-normal"
        title="Start IP"
        placeholder="-"
      />
      <CustomInput
        lineHeight="0px"
        width="200px"
        backgroundColor={colors.background_tag}
        font="font-normal"
        title="End IP"
        placeholder="-"
      />
      <div className="my-[10px]">
        <span className="font-bold" style={{ color: colors.textBase }}>
          Location
        </span>
      </div>
      <CustomSelect
        lineHeight="0px"
        font="font-normal"
        width="300px"
        title="Region"
      />
      <CustomSelect
        lineHeight="0px"
        font="font-normal"
        width="300px"
        title="Province"
        onSelect={onSelectProvince}
        option={arrProvince}
        onClear={() => ClearProvince()}
      />
      <CustomSelect
        lineHeight="0px"
        font="font-normal"
        width="300px"
        title="District"
        onSelect={onSelectDistric}
        option={arrDistrict}
        onClear={() => ClearDistrict()}
      />
      <CustomSelect
        lineHeight="0px"
        font="font-normal"
        width="300px"
        title="Ward"
        option={wardSearch}
        onSearch={handleSearchWard}
        isfilterOption={false}
      />
      <CustomSelect
        lineHeight="0px"
        font="font-normal"
        width="300px"
        title="Street"
      />
      <div className={"flex flex-col justify-center items-start mt-[15px]"}>
        <div className="mb-[10px]">
          <span className="font-[700] my-1" style={{ color: colors.textBase }}>
            Device Type
          </span>
          <CustomCheckBoxGroup
            height={"10px"}
            onChange={(e) => SelectDeviceType(e)}
            value={deviceType}
            defaultValue={listDeviceType}
            isCheckedAll={false}
            plainOptions={listDeviceType}
          />
        </div>
      </div>
      <div className={"flex flex-col justify-center items-start mt-[15px]"}>
        <div className="my-[10px]">
          <span className="font-[700] my-1" style={{ color: colors.textBase }}>
            Status
          </span>
          <CustomCheckBoxGroup
            height={"10px"}
            isCheckedAll={false}
            plainOptions={listStatus}
            onChange={(e) => SelectStatus(e)}
            value={status}
            defaultValue={[listStatus]}
          />
        </div>
      </div>
      <div className={"flex flex-col justify-center items-start mt-[15px]"}>
        <div className="my-[10px]">
          <span className="font-[700] my-1" style={{ color: colors.textBase }}>
            Addition Method
          </span>
          <CustomCheckBoxGroup
            height={"10px"}
            isCheckedAll={false}
            plainOptions={listMethod}
          />
        </div>
      </div>
      <div className="flex justify-center items-center mt-[40px]">
        <div className="w-[200px] justify-between flex">
          <CustomButtonCommon
            width="89px"
            height="29px"
            onClick={() => handleScan()}
            backgroundColor={colors.redGlobal}
            text={"Scan"}
          />

          <CustomButtonCommon
            width="89px"
            height="29px"
            onClick={() => {}}
            text={"Cancel"}
          />
        </div>
      </div>
    </div>
  );
};

const DrawOnMap = ({ drawRef, handleRemoveLayer, getActionDraw }) => {
  const dispatch = useDispatch();
  const [dataCircle, setDataCircle] = useState([]);
  const [polygon, setPolygon] = useState();
  const feature = new L.FeatureGroup();
  const map = drawRef.current;

  const filterLocationCameraRef = useRef({
    address_ids: null,
    district_ids: null,
    ids: null,
    ips: null,
    page_index: 0,
    page_size: 100,
    province_ids: null,
    status: null,
  });

  const drawControl = new L.Control.Draw({
    draw: {
      circle: {
        shapeOptions: {
          color: colors.textBase,
          fillColor: colors.textBase,
          fillOpacity: 0.2,
          weight: 1,
        },
      },
      circlemarker: false,
      marker: false,
      polygon: {
        shapeOptions: {
          color: colors.textBase,
          fillColor: colors.textBase,
          fillOpacity: 0.2,
          weight: 1,
        },
        allowIntersection: false,
        maxPoints: 3,
      },
      polyline: false,
      rectangle: {
        shapeOptions: {
          color: colors.textBase,
          fillColor: colors.textBase,
          fillOpacity: 0.2,
          weight: 1,
        },
      },
    },
    edit: {
      featureGroup: feature,
      remove: true,
      edit: true,
    },
  });
  map.addLayer(feature);
  map.addControl(drawControl);
  map.on(L.Draw.Event.DRAWVERTEX, function (e) {});
  const handleDrawCircle = (action) => {
    if (action === "circle") {
      drawControl._toolbars.draw._modes.circle.handler.enable();
    } else if (action === "trigle") {
      drawControl._toolbars.draw._modes.polygon.handler.enable();
    } else if (action === "rangle") {
      drawControl._toolbars.draw._modes.rectangle.handler.enable();
    }

    map.on(L.Draw.Event.DRAWVERTEX, function (e) {
      console.log("e", e);
    });
    map.on("draw:created", (e) => {
      const layer = e.layer;
      getActionDraw(true);
      if (layer instanceof L.Circle) {
        const radiusMeters = layer._mRadius / 1000;
        const position = layer._latlng;
        setDataCircle({
          lat: position.lat,
          lng: position.lng,
          radius: radiusMeters,
        });
      } else if (layer instanceof L.Polygon) {
        setTimeout(() => {
          setPolygon(layer._latlngs);
        }, 200);
      }
      feature.addLayer(layer);
      setTimeout(() => {
        drawControl._toolbars.edit._modes.edit.handler.enable();
      }, 100);

      layer.on("move", (e) => {
        console.log("Layer moved", e);
        if (layer instanceof L.Circle) {
          const newPos = e.target.getLatLng();
          console.log("New position:", newPos);
        }
      });
  
      layer.on("edit", (e) => {
        console.log("Layer edited", e);
        if (layer instanceof L.Circle) {
          const newPos = e.target.getLatLng();
          const newRadius = e.target.getRadius();
          console.log("New position:", newPos);
          console.log("New radius:", newRadius);
        } else if (layer instanceof L.Rectangle || layer instanceof L.Polygon) {
          const newLatLngs = e.target.getLatLngs();
          console.log("New LatLngs:", newLatLngs);
        }
      });
      
      layer.on("click", (e) => {
        layer.setStyle({
          color: colors.redGlobal,
          fillColor: colors.redGlobal,
          fillOpacity: 0.2,
        });
        handleRemoveLayer(feature, e.sourceTarget);
        document.addEventListener("keydown", (event) => {
          if (event.keyCode === 46 || event.key === "Delete") {
            feature.removeLayer(e.sourceTarget);
          }
        });
      });
      document.addEventListener("keydown", (event) => {
        if (event.keyCode === 13 || event.key === "Enter") {
          drawControl._toolbars.edit._modes.edit.handler.disable();
        }
      });
    });
  };
  const handleCancel = () => {
    // drawControlRef.current._toolbars.edit._modes.remove.handler.removeAllLayers();
    drawControl._toolbars.draw._modes.circle.handler.disable();
  };

  const handleScan = () => {
    if (polygon) {
      const arr = [];
      polygon.map((item) => {
        for (let i = 0; i < item.length; i++) {
          arr.push({
            latitude: item[i].lat,
            longitude: item[i].lng,
          });
        }
      });
      arr.push(arr[0]);
      const callBack = (data) => {
        const arrId = [];
        data.data.map((item) => {
          arrId.push(item.id);
        });
        console.log(arrId);
        filterLocationCameraRef.current.address_ids = arrId;
        dispatch({
          type: TYPE_ACTION.MAP.GET_LOCATION_CAMERA,
          payload: filterLocationCameraRef.current,
        });
      };
      dispatch({
        type: TYPE_ACTION.MAP.GET_ADDRESS_DRAW_POLYGON,
        payload: { arr, callBack },
      });
    }
    if (dataCircle) {
      const arr = {
        center: {
          latitude: dataCircle.lat,
          longitude: dataCircle.lng,
        },
        radius: dataCircle.radius,
      };
      const callBack = (data) => {
        const arrId = [];
        data.data.map((item) => {
          arrId.push(item.id);
        });
        console.log(arrId);
        filterLocationCameraRef.current.address_ids = arrId;
        dispatch({
          type: TYPE_ACTION.MAP.GET_LOCATION_CAMERA,
          payload: filterLocationCameraRef.current,
        });
      };
      dispatch({
        type: TYPE_ACTION.MAP.GET_ADDRESS_DRAW_CIRCLE,
        payload: { arr, callBack },
      });
    }
  };
  return (
    <div>
      <span className="font-[700]" style={{ color: colors.textBase }}>
        Shape Type
      </span>
      <div className="flex justify-between items-center mt-[15px]">
        <div
          className="w-[50px] h-[50px] rounded-full cursor-pointer"
          onClick={() => handleDrawCircle("circle")}
          style={{ background: colors.bgShape }}
        ></div>
        <div
          onClick={() => handleDrawCircle("trigle")}
          style={{
            borderLeft: `30px solid transparent`,
            borderRight: `30px solid transparent`,
            borderBottom: `50px solid ${colors.bgShape} `,
            cursor: "pointer",
          }}
        ></div>
        <div
          className="w-[50px] h-[50px] cursor-pointer"
          onClick={() => handleDrawCircle("rangle")}
          style={{ background: colors.bgShape }}
        ></div>
      </div>
      <div className={"flex flex-col justify-center items-start mt-[15px]"}>
        <span className="font-[700] my-2" style={{ color: colors.textBase }}>
          Device Type
        </span>
        <CustomCheckBoxGroup
          height={"10px"}
          isCheckedAll={false}
          plainOptions={listDeviceType}
        />
      </div>
      <div className={"flex flex-col justify-center items-start mt-[15px]"}>
        <span className="font-[700] my-2" style={{ color: colors.textBase }}>
          Status
        </span>
        <CustomCheckBoxGroup
          height={"10px"}
          isCheckedAll={false}
          plainOptions={listStatus}
        />
      </div>
      <div className={"flex flex-col justify-center items-start mt-[15px]"}>
        <span className="font-[700] my-2" style={{ color: colors.textBase }}>
          Addition Method
        </span>
        <CustomCheckBoxGroup
          height={"10px"}
          isCheckedAll={false}
          plainOptions={listMethod}
        />
      </div>
      <div className="h-[412px]"></div>
      <div className="flex justify-center items-center mt-[25px] w-full">
        <div className="w-[200px] justify-between flex">
          <CustomButtonCommon
            width="89px"
            height="29px"
            onClick={() => handleScan()}
            backgroundColor={colors.redGlobal}
            text={"Scan"}
          />

          <CustomButtonCommon
            width="89px"
            height="29px"
            onClick={() => handleCancel()}
            text={"Cancel"}
          />
        </div>
      </div>
    </div>
  );
};

const CustomDrawe = ({ drawRef, mapRef, handleRemoveLayer, getActionDraw }) => {
  const [swichs, setSwichs] = useState(true);
  return (
    <div
      className="h-full w-[320px] px-[10px] ml-[10px]"
      style={{ background: colors.background_sider }}
    >
      <div className="flex w-full justify-around">
        <div
          onClick={() => setSwichs(true)}
          className="h-[35px] mt-[5px] w-[144px] m-[3px] rounded-[6px] flex justify-center items-center cursor-pointer"
          style={{
            background: swichs ? colors.redGlobal : colors.background_disable,
            color: colors.textBase,
          }}
        >
          Select values
        </div>
        <div
          onClick={() => setSwichs(false)}
          className="h-[35px] mt-[5px] w-[144px] m-[3px] rounded-[6px] flex justify-center items-center cursor-pointer"
          style={{
            background: swichs ? colors.background_disable : colors.redGlobal,
            color: colors.textBase,
          }}
        >
          Draw on map
        </div>
      </div>
      <div className="content-sidebar">
        {swichs ? (
          <SelectValue mapRef={mapRef} />
        ) : (
          <DrawOnMap
            drawRef={drawRef}
            handleRemoveLayer={handleRemoveLayer}
            getActionDraw={getActionDraw}
          />
        )}
      </div>
    </div>
  );
};
export default CustomDrawe;
