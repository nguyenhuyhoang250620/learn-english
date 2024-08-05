import TYPE_ACTION from "@constants/action";
import {
  selectDataLocationCam,
  selectDataRecorder,
} from "@redux/slice/map-slice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import L from "leaflet";
import colors from "@constants/colors";
import { TileLayer, ZoomControl } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import LocationCamera from "./location-camera";
import LocationDevice from "./location-device";
import HoangSaMap from "./hoang-sa-map";

const CustomMap = ({ mapRef, attribution, urlMap, heatMap }) => {
  const [zoom, setZoom] = useState();
  const dataCamLocation = useSelector(selectDataLocationCam);
  const dataRecorder = useSelector(selectDataRecorder);
  const dispatch = useDispatch();
  const createClusterCustomIcon = function (cluster) {
    return new L.DivIcon({
      html: `
      <div 
        style="
          width: 50px; 
          height: 50px; 
          border-radius: 50%; 
          background: ${colors.redGlobal}; 
          border: 1px solid ${colors.background};
          display: flex; 
          align-items: center; 
          justify-content: center;">
          <div 
            style="color:${colors.textBase};
            height: 40px; 
            width: 40px;
            border-radius: 50%;
            background:  ${colors.background}; 
            border: 1px solid ${colors.background}; 
            display: flex; 
            align-items: center; 
            justify-content: center;">
              ${cluster.getChildCount()}
          </div>
        </div>`,
      className: "custom-marker-cluster",
      iconSize: L.point(33, 33, true),
    });
  };

  const createClusterCustomIconRecoder = function (cluster) {
    return new L.DivIcon({
      html: `
      <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center" 
      style="
        background: ${colors.redGlobal}; 
        border: 1px solid ${colors.backgroundSide};"
      >
        <div 
        className="w-[40px] h-[40px] rounded-full flex items-center justify-center"
        style="
        color:${colors.text};
        background:${colors.backgroundSide}; 
        border: 1px solid ${colors.backgroundSide};"
        >
          ${cluster.getChildCount()}
        </div>
      </div>
      `,
      className: "custom-marker-cluster",
      iconSize: L.point(33, 33, true),
    });
  };
  const handleSendDataCameraGroup = (e, i) => {
    const zoom = e.layer;
    if (17 <= zoom._zoom <= 20) {
      const position = e.latlng;
      const arr = {
        center: {
          latitude: position.lat,
          longitude: position.lng,
        },
        radius: 0.01,
      };
      const callback = (data)=>{
      }
      dispatch({
        type: TYPE_ACTION.MAP.GET_DATA_CAMERA_GROUP,
        payload: {body:arr,callback:callback},
      });
    }
  };
  return (
    <>
      <TileLayer attribution={attribution} url={urlMap} maxZoom={20} />
      <MarkerClusterGroup
        polygonOptions={{
          color: colors.textBase,
          fillColor: colors.textBase,
        }}
        spiderfyDistanceMultiplier={2}
        spiderLegPolylineOptions={{
          color: colors.textBase,
          fillColor: colors.textBase,
        }}
        iconCreateFunction={createClusterCustomIcon}
        spiderfyOnMaxZoom={true}
        maxClusterRadius={10}
        showCoverageOnHover={false}
        chunkedLoading
        animate={true}
        removeOutsideVisibleBounds={true}
        onClick={(e, i) => handleSendDataCameraGroup(e, i)}
      >
        {dataCamLocation !== null && (
          <LocationCamera mapRef={mapRef} dataCamLocation={dataCamLocation} />
        )}
        {dataCamLocation !== null && (
          <LocationDevice
            mapRef={mapRef}
            dataCamLocation={dataCamLocation.recorders}
          />
        )}
      </MarkerClusterGroup>
      <ZoomControl position="topright" />
      <HoangSaMap zoomShow={zoom} />
    </>
  );
};

export default CustomMap;
