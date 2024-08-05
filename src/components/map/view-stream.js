import { LoadingOutlined } from "@ant-design/icons";
import { imagesHeader } from "@common/images/image";
import TYPE_ACTION from "@constants/action";
import colors from "@constants/colors";
import { selectChangKey } from "@redux/slice/map-slice";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const CustomViewStream = ({ url, id,keyChange }) => {
  const dispatch = useDispatch();
  const [urls, setUrls] = useState();
  const [status, setStatus] = useState(true);
  const divRef = useRef(null);
  const changeKey = useSelector(selectChangKey);
  const navigate = useNavigate();

  useEffect(() => {
    startStream();
  }, [url]);

  const startStream = () => {
    setUrls()
    const callBack = (data) => {
      if (data) {
        setUrls(`${data[0].urlRestream}`);
        dispatch({
          type: TYPE_ACTION.MAP.CHANGE_KEY,
          payload: 1,
        });
      }
    };
    const errorBack = (data) => {
      if (data?.response.status === 400) {
        console.log(data?.response.status);
        setStatus(false);
      }
    };
    dispatch({
      type: TYPE_ACTION.MAP.GET_PREVIEW,
      payload: { url, callBack, errorBack },
    });
  };
  const stopStream = (url) => {
    if (url) {
      const callBack = (data) => { 
      };
      dispatch({
        type: TYPE_ACTION.LIVE.STOP_STREAM,
        payload: { id: url, callBack },
      });
     
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setUrls();
        stopStream(url);
      }
    };

    document.addEventListener("click", handleOutsideClick, { capture: true });

    return () => {
      document.removeEventListener("click", handleOutsideClick, {
        capture: true,
      });
    };
  }, []);
  return (
    <>
      {
        <div className="w-full h-full relative flex justify-center items-center"
          style={{ background: colors.background}}
        >
          {urls!==undefined ? (
            <ReactPlayer
              key={changeKey} 
              url={urls}
              width="240px"
              height="135px"
              playing={true}
              controls
              onReady={(player) => {
                console.log("player", player);
              }}
              onError={(e, data, ins, global) => {
                console.log("e", e);
                console.log("data", data);
                console.log("ins", ins);
                console.log("global", global);
              }}
            />
          ) : status ? (
            <div className="flex flex-col justify-center items-center">
              <LoadingOutlined
                style={{
                  fontSize: 40,
                  color: colors.textBase,
                }}
              />
              <span style={{ color: colors.textBase }}>
                Loading
              </span>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <img
                src={imagesHeader.exit_active}
                className="h-[18px]"
                alt="#"
              />
              <span style={{ color: colors.redGlobal }}>Disconnected</span>
            </div>
          )}
        </div>
      }
    </>
  );
};
export default CustomViewStream;
