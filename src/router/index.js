import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import * as React from "react";

import i18n from "../locales/locales";
import Login from "@pages/login/signin";
import Management from "src/layout/management";
import CameraLayout from "src/layout/camera-layout";
import WarningLayout from "src/layout/warning-layout";
import AiLayout from "src/layout/ai-layout";
import EventLayout from "src/layout/event-layout";
import PATH from "@constants/path";
import UserLayout from "src/layout/user-layout";
import PlayBack from "@pages/playback/playback";
import MapCustom from "@pages/map/map";
import HomeScreen from "@pages/home/home";
import LiveScreen from "@pages/live/live";
import NetLayout from "src/layout/net-layout";
import ViewPerson from "@components/event/person/view-person";
import PageSearch from "@components/ai/search-page";
import DashBoard from "@pages/event/dashboard";
import Event from "@pages/event/event";
import Person from "@pages/event/person";
import Vehicle from "@pages/event/vehicel";
import CreateVehicle from "@components/event/vehicle/create-vehicle";
import SearchFace from "@pages/ai/search-ai";
import CheckFace from "@pages/ai/search-face";
import HumanDetection from "@pages/ai/human";
import VehicleDetection from "@pages/ai/vehicle";
import CheckSearch from "@components/ai/search-check";
import HumanDetectionSearch from "@components/ai/search-human-detection";
import VehicleDetectionSearch from "@components/ai/search-vehicle-detection";
import ViewVehicle from "@components/event/vehicle/view-vehicle";
import VideoSearch from "@pages/ai/search-video";
import StorageLayout from "src/layout/storage-layout";
import MapLayout from "src/layout/map-layout";
import DeviceGroup from "@pages/map/device-group";
import SystemLayout from "src/layout/system-layout";
import GroupEvent from "@pages/event/group";
import LoginLayout from "src/layout/auth";
// const HomeScreen = React.lazy(
//   () =>
//     new Promise((resolve) => {
//       setTimeout(
//         () => resolve(import("@pages/home/home")),
//         100
//       );
//     })
// );
// const LiveScreen = React.lazy(
//   () =>
//     new Promise((resolve) => {
//       setTimeout(
//         () => resolve(import("@pages/live/live")),
//         100
//       );
//     })
// );
// const MapScreen = React.lazy(
//   () =>
//     new Promise((resolve) => {
//       setTimeout(
//         () => resolve(import("@pages/map/map")),
//         100
//       );
//     })
// );

const Router = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const getLanguage = () => {
    i18n.changeLanguage(localStorage.getItem("language"));
  };

  const handleOnline = () => {
    window.location.reload();
  };

  const handleOffline = () => {
    // Window.location.reload();
  };

  React.useEffect(() => {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  const [initialRedirect, setInitialRedirect] = React.useState(true);

  React.useEffect(() => {
    if (initialRedirect) {
      if (location.pathname === "/login" || location.pathname === "/") {
        navigate(PATH.LOGIN);
        setInitialRedirect(false);
      }
    }
  }, [initialRedirect, navigate]);

  React.useEffect(() => {
    // Redirect();
    // getLanguage();
  }, []);

  return (
    <>
      <Routes>
        <Route path="" element={<LoginLayout />}>
          <Route path={PATH.LOGIN} element={<Login />}></Route>
        </Route>
        <Route path={PATH.MANAGERMENT} element={<Management />}>
          <Route path={PATH.CAMERA} element={<CameraLayout />}></Route>
          <Route path={PATH.USER} element={<UserLayout />}></Route>
          <Route path={PATH.NET} element={<NetLayout />}></Route>
          <Route path={PATH.STORAGE} element={<StorageLayout />}></Route>
          <Route path={PATH.SYSTEM} element={<SystemLayout />}></Route>
          <Route path={PATH.WARNING} element={<WarningLayout />}></Route>
          <Route path={PATH.EVENT} element={<EventLayout />}>
            <Route path={PATH.VIEW_PERSON} element={<ViewPerson />}></Route>
            <Route path={PATH.VIEW_VEHICLE} element={<ViewVehicle />}></Route>
            <Route path={PATH.DASHBOARD} element={<DashBoard />}></Route>
            <Route path={PATH.EVENT_MANAGEMENT} element={<Event />}></Route>
            <Route path={PATH.PERSON} element={<Person />}></Route>
            <Route path={PATH.VEHICLE} element={<Vehicle />}></Route>
            <Route path={PATH.CREATE_VEHICLE} element={<CreateVehicle />}></Route>
            <Route path={PATH.GROUP_EVENT} element={<GroupEvent />}></Route>
          </Route>
          <Route path={PATH.AI} element={<AiLayout />}>
            <Route path={PATH.SEARCH_AI} element={<SearchFace />}></Route>
            <Route path={PATH.SEARCH} element={<PageSearch />}></Route>
            <Route path={PATH.SEARCH_CHECK} element={<CheckSearch />}></Route>
            <Route path={PATH.VIDEO_SEARCH} element={<VideoSearch />}></Route>
            <Route path={PATH.SEARCH_HUMAN_DETECTION} element={<HumanDetectionSearch />}></Route>
            <Route path={PATH.SEARCH_VEHICLE_DETECTION} element={<VehicleDetectionSearch />}></Route>
            <Route path={PATH.FACE_CHECK} element={<CheckFace />}></Route>
            <Route path={PATH.HUMAN_DETECTION} element={<HumanDetection />}></Route>
            <Route path={PATH.VEHICLE_DETECTION} element={<VehicleDetection />}></Route>
          </Route>
          <Route path={PATH.MAP} element={<MapLayout />}>
            <Route path={PATH.MAP_DETAIL} element={<MapCustom />}></Route>
            <Route path={PATH.DEVICE_GROUP} element={<DeviceGroup />}></Route>
          </Route>
          <Route path={PATH.PLAYBACK} element={<PlayBack />}></Route>
          <Route path={PATH.HOME} element={<HomeScreen />}></Route>
          <Route path={PATH.LIVE} element={<LiveScreen />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default Router;
