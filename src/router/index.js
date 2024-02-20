import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import * as React from "react";

//component
import PageLoader from "../common/component/PageLoader";

// Util
import PATH from "../constants/itemsContants";
import SignIn from "../screen/pages/Signin/SignIn";
import Profile from "../screen/pages/ProfilesView/Profile";
import i18n from "../locales/locales";

// Routes
const Timeout = 300;

const Error = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(import("../screen/pages/Error/Error")),
      Timeout
    );
  });
});

const Dashboard = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(import("../screen/pages/Dashboard/Dashboard.js")),
      Timeout
    );
  });
});

const Event = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(import("../screen/pages/Event/Event.js")),
      Timeout
    );
  });
});

const FaceSearch = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(import("../screen/pages/FaceSearch/FaceSearch.js")),
      Timeout
    );
  });
});

const LicensePlateSearch = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve(
          import("../screen/pages/LicensePlateSearch/LicensePlateSearch.js")
        ),
      Timeout
    );
  });
});

const Signin = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("../screen/pages/Signin/SignIn")), Timeout);
  });
});

const AddProfile = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(import("../screen/pages/Profile/AddProfile.js")),
      Timeout
    );
  });
});

const ProfileView = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(import("../screen/pages/ProfilesView/Profile.js")),
      Timeout
    );
  });
});

const Notification = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(import("../screen/pages/Notification/index")),
      Timeout
    );
  });
});

const Plate = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("../screen/pages/Plate/List/Plate"), Timeout));
  });
});

const NewPlate = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("../screen/pages/Plate/New/NewPlate"), Timeout));
  });
});

const BlackList = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() =>
      resolve(import("../screen/pages/BlackList/List/BackList"), Timeout)
    );
  });
});

const BlackListUpdate = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() =>
      resolve(
        import("../screen/pages/BlackList/Update/BlackListUpdate"),
        Timeout
      )
    );
  });
});




const Camera = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() =>
      resolve(
        import("../screen/pages/Camera/Camera"),
        Timeout
      )
    );
  });
});
const Router = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathSignIn = `/${PATH.SIGNIN}`;
  const token = localStorage.getItem("token");


  const Redirect = () => {

    // console.log("token",token);
    // if (
    //   (pathSignIn.includes(location.pathname) ||
    //     location.pathname == "/" ||
    //     location.pathname == " " || !location.pathname) &&
    //   !token
    // ) {
    //   console.log("Chuyển hướng về trang event")
    //   navigate(PATH.EVENT);
    // }
    if ((pathSignIn.includes(location.pathname) || location.pathname == "/" || location.pathname == " ")) {
      navigate(PATH.SIGNIN);
    } else if (token) {
      navigate(PATH.EVENT);
    }
  };

  const getLanguage=()=>{
      i18n.changeLanguage(localStorage.getItem("language"));
  }

  const handleOnline = () => {
    window.location.reload();
  }
  
  const handleOffline = () => {
    navigate('/error');
    // window.location.reload();
  }
  React.useEffect(() => {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  React.useEffect(() => {
    Redirect();
    getLanguage()
  }, []);

  return (
    <Routes>
      <Route
        path={PATH.DASHBOARD}
        element={
          <React.Suspense fallback={<PageLoader />}>
            <Dashboard />
          </React.Suspense>
        }
      />
      <Route
        path={PATH.EVENT}
        element={
          <React.Suspense>
            <Event />
          </React.Suspense>
        }
      />
      <Route
        path={PATH.FACE}
        element={
          <React.Suspense fallback={<PageLoader />}>
            <FaceSearch />
          </React.Suspense>
        }
      />
      <Route
        path={PATH.LICENSE_PLATE}
        element={
          <React.Suspense fallback={<PageLoader />}>
            <LicensePlateSearch />
          </React.Suspense>
        }
      />
      <Route
        path={PATH.SIGNIN}
        element={
          <React.Suspense fallback={<PageLoader />}>
            <SignIn />
          </React.Suspense>
        }
      />
      <Route
        path={PATH.ADD_PROFILE}
        element={
          <React.Suspense fallback={<PageLoader />}>
            <AddProfile/>
          </React.Suspense>
        }
      />
      <Route
        path={PATH.PROFILE}
        element={
          <React.Suspense fallback={<PageLoader />}>
            <ProfileView />
          </React.Suspense>
        }
      />
      <Route
        path={PATH.PROFILE_INFO}
        element={
          <React.Suspense fallback={<PageLoader />}>
            <AddProfile />
          </React.Suspense>
        }
      />
      <Route
        path={PATH.PROFILE_EDIT}
        element={
          <React.Suspense fallback={<PageLoader />}>
            <AddProfile />
          </React.Suspense>
        }
      />
      <Route
        path={PATH.NOTIFICATION}
        element={
          <React.Suspense fallback={<PageLoader />}>
            <Notification />
          </React.Suspense>
        }
      />
      <Route
        path={PATH.NOTIFICATION_DETAIL}
        element={
          <React.Suspense fallback={<PageLoader />}>
            <Notification />
          </React.Suspense>
        }
      />
      <Route
        path={PATH.PLATE}
        element={
          <React.Suspense fallback={<PageLoader />}>
            <Plate />
          </React.Suspense>
        }
      />
      <Route
        path={PATH.BLACK_LIST}
        element={
          <React.Suspense fallback={<PageLoader />}>
            <BlackList />
          </React.Suspense>
        }
      />
      <Route
        path={PATH.BLACK_LIST_UPDATE}
        element={
          <React.Suspense fallback={<PageLoader />}>
            <BlackListUpdate />
          </React.Suspense>
        }
      />
      <Route
        path={PATH.BLACK_LIST_VIEW}
        element={
          <React.Suspense fallback={<PageLoader />}>
            <BlackListUpdate />
          </React.Suspense>
        }
      />
      <Route
        path={PATH.NEW_BLACKLIST}
        element={
          <React.Suspense fallback={<PageLoader />}>
            <BlackListUpdate />
          </React.Suspense>
        }
      />
      <Route
        path={PATH.NEW_PLATE}
        element={
          <React.Suspense fallback={<PageLoader />}>
            <NewPlate />
          </React.Suspense>
        }
      />
      <Route
        path={PATH.PLATE_DETAIL}
        element={
          <React.Suspense fallback={<PageLoader />}>
            <NewPlate />
          </React.Suspense>
        }
      />
      <Route
        path={PATH.PLATE_UPDATE}
        element={
          <React.Suspense fallback={<PageLoader />}>
            <NewPlate />
          </React.Suspense>
        }
      />
      <Route
        path={PATH.CAMERA}
        element={
          <React.Suspense fallback={<PageLoader />}>
            <Camera />
          </React.Suspense>
        }
      />
       <Route
        path={PATH.ERROR}
        element={
          <React.Suspense fallback={<PageLoader />}>
            <Error />
          </React.Suspense>
        }
      />
    </Routes>
  );
};
export default Router;
