import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import * as React from "react";

import i18n from "../locales/locales";
import MainLayout from "src/layout/main-layout";
import InstructPage from "@pages/instruct/instruct";
import WordManagementLayout from "src/layout/word-management-layout";
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
  return (
    <>
      <Routes>
        <Route path="" element={<MainLayout />}></Route>
        <Route path="word-management" element={<WordManagementLayout />}>
          <Route path="vocabulary" element={<InstructPage />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default Router;
