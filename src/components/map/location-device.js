
import { imagesOther } from "@common/images/image";
import TYPE_ACTION from "@constants/action";
import L from "leaflet";
import { Marker } from "react-leaflet";
import { useDispatch } from "react-redux";
const LocationDevice = ({ mapRef, dataCamLocation }) => {
  const dispatch = useDispatch()

  var iconCamConnected = L.icon({
    iconUrl: imagesOther.NVR,
    iconSize: [40, 40],
  });
  const handleShowDataGroup=(e)=>{
    const position = e.latlng
      const arr = {
        center: {
          latitude: position.lat,
          longitude: position.lng
        },
        radius: 0.01
      }
      dispatch({
        type: TYPE_ACTION.MAP.GET_DATA_CAMERA_GROUP,
        payload: arr
      })
  }
  return (
    <div>
      {dataCamLocation?.map((item, index) => {
        return (
          <Marker
            key={item.id}
            icon={iconCamConnected}
            position={[item.addressDTO.latitude, item.addressDTO.longitude]}
            eventHandlers={{
              click:(e)=>handleShowDataGroup(e)
            }}
          >
          </Marker>
        );
      })}
    </div>
  );
};

export default LocationDevice;
