import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import {
  TileLayer,
  MapContainer,
  LayersControl,
  useMap,
  Marker,
  Popup
} from "react-leaflet";
import "leaflet-routing-machine";

import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import styled from "styled-components";

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

const maps = {
  base: "https://tile.jawg.io/a8f95f9c-5194-4833-b099-30f037f1fab4/{z}/{x}/{y}{r}.png?access-token=2cwdRZ4yhbAEEj7oMGVX8GpdiNwVoRNC30UwFEdFGlL189NDF1mfvwkbvKpswbIV",
};

const MapComponent = ({ waypoints }) => {
  const map = useMap();
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (routingControlRef.current) {
      routingControlRef.current.setWaypoints(waypoints);
    } else {
      routingControlRef.current = L.Routing.control({
        position: "topright",
        lineOptions: {
          styles: [
            {
              color: "#0099FF",
            },
          ],
        },
        waypoints,
        show: false,
        useZoomParameter:true,
        collapsible:true,
        fitSelectedRoutes:"smart",
        createMarker: function () {
          // Tạo marker rỗng để ngăn chặn hiển thị icon mặc định
          return L.marker([0, 0], { icon: L.divIcon({ className: "" }) });
        },
      });

      routingControlRef.current.addTo(map);
    }
  }, [map, waypoints]);

  return null;
};

const Map = () => {
  const CustomMarker = ({ position, stt, show }) => {
    const customIcon = new L.icon({
      iconUrl: "/camera_connected.svg",
      iconSize: [24, 24],
      iconAnchor: [16, 32], // Điểm neo của icon, có thể điều chỉnh tùy ý
      popupAnchor: [0, -32], // Điểm neo của popup, có thể điều chỉnh tùy ý
    });

    const customIcon2 = new L.DivIcon({
      // iconUrl: '/camera_connected.svg',
      html: `<div style="position: relative">
      <div style="height: 20px; width: 35px; background:  red; display: flex;justify-content: center;align-items: center;">
          <p style="font-weight: 600;color:white">${stt + 1}</p>
      </div>
      <div style="height: 20px; width: 2px; background: red;"></div>
      <img src="/camera_connected.svg"/>
    </div>`,
      className: "custom-marker-cluster",
      iconSize: L.point(33, 33, true),
    });

    return (
      <Marker position={position} icon={show ? customIcon2 : customIcon}>
        {show && <StyledPop>
          <div
            style={{
              height: "135px",
              width: "240px",
              overflow: "hidden",
              cursor: "pointer",
              border: "1px solid white",
            }}
          >
            hello
          </div>
        </StyledPop>}
      </Marker>
    );
  };

  const [waypoints, setWaypoints] = useState();
  const [locations, setLocations] = useState([
    { name: 1, coordinates: [21.0341, 105.8142], show: false },
    { name: 2, coordinates: [21.0866, 105.7058], show: false },
    { name: 3, coordinates: [21.0369, 105.3215], show: false },
    { name: 4, coordinates: [21.0122, 105.827], show: false },
    { name: 5, coordinates: [21.026, 105.9682], show: false },
    { name: 6, coordinates: [20.9711, 105.7754], show: false },
    { name: 7, coordinates: [21.0075, 105.8554], show: false },
    { name: 8, coordinates: [20.9383, 105.3945], show: false },
    { name: 9, coordinates: [21.0285, 105.8542], show: false },
    { name: 10, coordinates: [20.972, 105.8575], show: false },
    { name: 11, coordinates: [21.036, 105.9033], show: false },
    { name: 12, coordinates: [21.2058, 105.735], show: false },
    { name: 13, coordinates: [20.7194, 105.7762], show: false },
    { name: 14, coordinates: [21.0299, 105.7703], show: false },
    { name: 15, coordinates: [20.7092, 105.905], show: false },
    { name: 16, coordinates: [21.115, 105.5224], show: false },
    { name: 17, coordinates: [20.9631, 105.5872], show: false },
    { name: 18, coordinates: [21.2669, 105.9567], show: false },
    { name: 19, coordinates: [21.0806, 105.8333], show: false },
    { name: 20, coordinates: [21.0292, 105.5389], show: false },
    { name: 21, coordinates: [21.309, 105.5968], show: false },
    { name: 22, coordinates: [21.186, 106.0586], show: false },
    { name: 23, coordinates: [20.9374, 106.3245], show: false },
    { name: 24, coordinates: [20.8194, 105.3383], show: false },
    { name: 25, coordinates: [21.5882, 105.844], show: false },
    { name: 26, coordinates: [20.6467, 106.0511], show: false },
    { name: 27, coordinates: [21.276, 106.1946], show: false },
    { name: 28, coordinates: [22.1333, 105.8333], show: false },
    { name: 29, coordinates: [21.4249, 105.22], show: false },
    { name: 30, coordinates: [20.4444, 106.3428], show: false },
    { name: 31, coordinates: [20.4267, 106.1683], show: false },
    { name: 32, coordinates: [20.25, 105.9744], show: false },
    { name: 33, coordinates: [21.3019, 105.5653], show: false },
    { name: 34, coordinates: [21.186, 106.0586], show: false },
    { name: 35, coordinates: [20.9374, 106.3245], show: false },
    { name: 36, coordinates: [20.8194, 105.3383], show: false },
    { name: 37, coordinates: [21.8536, 106.7617], show: false },
    { name: 38, coordinates: [21.4249, 105.22], show: false },
    { name: 39, coordinates: [20.4444, 106.3428], show: false },
    { name: 40, coordinates: [20.4267, 106.1683], show: false },
  ]);
  const locations1 = [1, 2, 3];

  const customSort = (a, b) => {
    const indexA = locations1.indexOf(a.name);
    const indexB = locations1.indexOf(b.name);
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    if (indexA !== -1) {
      return -1;
    }
    if (indexB !== -1) {
      return 1;
    }
    return a.name - b.name;
  };
  useEffect(() => {
    const wai = locations
      .filter((item) => locations1.includes(item.name))
      .map((item) => item.coordinates);
    setWaypoints(wai);
    const updatedLocations = locations.map((item) => ({
      ...item,
      show: locations1.includes(item.name),
    }));
    const sortedLocations = [...updatedLocations].sort(customSort);
    // Cập nhật state với mảng mới
    setLocations(sortedLocations);
  }, []);
  return (
    <>
      <MapContainer
        center={[21.035509, 105.809377]}
        zoom={8}
        zoomControl={false}
        style={{ height: "960px", width: "100%", padding: 0 }}
      >
        <LayersControl position="bottomright" >
          <LayersControl.BaseLayer checked name="Map" >
            <TileLayer
              attribution='<a href="https://www.jawg.io" target="_blank">&copy; Jawg</a> - <a href="https://www.openstreetmap.org" target="_blank">&copy; OpenStreetMap</a>&nbsp;contributors'
              url={maps.base}
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        {waypoints && <MapComponent waypoints={waypoints} />}
        {locations.map((coordinates, index) => (
          <CustomMarker
            key={index}
            position={coordinates.coordinates}
            stt={index}
            show={coordinates.show}
          />
        ))}
      </MapContainer>
    </>
  );
};

export default Map;
