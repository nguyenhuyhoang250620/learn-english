import { imagesCamera } from "@common/images/image";
import { Marker, Popup } from "react-leaflet";
import styled from "styled-components";
import L from "leaflet";
import CustomViewStream from "./view-stream";
import { useDispatch } from "react-redux";
import { baseURL } from "@redux/services/api-service-map";
import { useState } from "react";
import TYPE_ACTION from "@constants/action";


const StyledPop = styled(Popup)`
  border-radius: 0;
  .leaflet-popup-content-wrapper {
    border-radius: 0;
    width:240px;
    height:135px;
    display: flex;
    align-items: center;
    justify-content: center;
    border:1px solid white
  }

  .leaflet-popup-tip-container {
    visibility: hidden;
  }
`;
const LocationCamera = ({ mapRef, dataCamLocation }) => {
  const [urls,setUrls] = useState()

  var iconCamConnected = L.icon({
    iconUrl: imagesCamera.camera_connected,
    iconSize: [20, 20],
  });

  var iconCamDisconnected = L.icon({
    iconUrl: imagesCamera.camera_disconnected,
    iconSize: [20, 20],
  });

  const dispatch = useDispatch()

  const startStream = (url)=>{
    console.log("start",url)
    const callBack =(data)=>{
      if(data){
          console.log("startStream")
          console.log(`${baseURL}${data.url}`)
          setUrls(`${baseURL}${data.url}`)  
      }
    }
    const errorBack = (data)=>{
      if(data?.response.status===400){
        console.log(data?.response.status)
      }
    }
    dispatch({
      type:TYPE_ACTION.MAP.GET_PREVIEW,
      payload:{url,callBack,errorBack}
    })
  
  }

  return (
    <div>
      {dataCamLocation?.map((item, index) => {
        return (
          <Marker
            key={item.id}
            icon={item.status ? iconCamConnected : iconCamDisconnected}
            position={[item.addressDTO.latitude, item.addressDTO.longitude]}
          >
            <StyledPop>
              <div className="h-[135px] w-[240px] overflow-hidden cursor-pointer border border-solid border-white">
                <CustomViewStream key={item.id} url={item.id} id={item.id}/>
              </div>
            </StyledPop>
          </Marker>
        );
      })}
    </div>
  );
};

export default LocationCamera;
