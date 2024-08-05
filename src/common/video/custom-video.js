/* eslint-disable array-callback-return */
import { LoadingOutlined } from "@ant-design/icons";
import { images, imagesHeader } from "@common/images/image";
import HlsPlayer from "@components/live/hls-player";
import TYPE_ACTION from "@constants/action";
import colors from "@constants/colors";
import {
  getListCameraPreview,
  resetgetListCameraPreview,
  selectCameraById,
  selectListCameraStream,
} from "@redux/slice/live-slice";
import { useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useDispatch, useSelector } from "react-redux";
const CustomViewVideo = ({
  height = "100%",
  width = "100%",
  url,
  index,
  scale,
  getAllCameraStreaming,
  idCamera,
  actionCamera,
  listCameraPreview,
  onClick,
}) => {
  const videoRef = useRef(null);
  const dispatch = useDispatch();
  const [isDrop,setIsdrop] = useState(false);
  const [status,setStatus] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(false);
  const listCameraStream = useSelector(selectListCameraStream);
  const selectedCamera = useSelector(selectCameraById);

  const handleMouseEnter = () => {
    setHoveredItem(true);
  };
  const handleMouseLeave = () => {
    setHoveredItem(false);
  };
  const camRef = useRef({
    address_ids: null,
    district_ids: null,
    ids: null,
    ips: null,
    page_index: 1,
    page_size: 12,
    province_ids: null,
    status: true,
  });

  const addListPreview = async (url, type) => {
    if (type === "group") {
      let listCameraMax;
      if(url.length<25){
        listCameraMax = url.length;
      }
      else{
        listCameraMax = 25;
      }
      for (let i = 0; i < listCameraMax; i++) {
        dispatch(
          getListCameraPreview({
            index: i,
            status: "Loading",
            id: url[i].id,
            url: '',
          })
        );
        const callBack = (data) => {
          if (data) {
            dispatch(
              getListCameraPreview({
                index: i,
                status: "Connect",
                id: data[0].id,
                url: data[0].urlRestream,
              })
            );
          }
        };
        const errorBack = (data) => {
          dispatch({
            type: TYPE_ACTION.LIVE.GET_LIST_CAMERA_PREVIEW,
            payload: {
              index: i,
              url: "",
              id: "",
              status: "Disconnect",
            },
          });
          // if (data?.response.status === 400) {
          //   setStatus(false);
          // }
        };
        try {
          const response = await dispatch({
            type: TYPE_ACTION.LIVE.GET_PREVIEW_WITH_ID,
            payload: { url: url[i].id, callBack, errorBack },
          });

          // Xử lý response nếu cần
        } catch (error) {
          // Xử lý lỗi nếu cần
        }
      }
    } else {
      const callBack = (data) => {
        if (data) {
          data.map((item, i) => {
            if (item.urlRestream) {
              dispatch({
                type: TYPE_ACTION.LIVE.GET_LIST_CAMERA_PREVIEW,
                payload: {
                  index: index,
                  url: `${item.urlRestream}`,
                  id: item.id,
                  status: "Connect",
                },
              });
            } else {
              dispatch({
                type: TYPE_ACTION.LIVE.GET_LIST_CAMERA_PREVIEW,
                payload: {
                  index: index,
                  url: `${item.urlRestream}`,
                  id: item.id,
                  status: "Disconnect",
                },
              });
            }
          });
        }
      };
      const errorBack = (data) => {
        dispatch({
          type: TYPE_ACTION.LIVE.GET_LIST_CAMERA_PREVIEW,
          payload: {
            index: index,
            url: "",
            id: "",
            status: "Disconnect",
          },
        });
        if (data?.response.status === 400) {
          setStatus(false);
        }
      };
      dispatch({
        type: TYPE_ACTION.LIVE.GET_PREVIEW_WITH_ID,
        payload: { url: url, callBack, errorBack },
      });
    }
  };
  const [isOver, drop] = useDrop(() => ({
    accept: "GET",
    drop: (item, monitor) => {
      if (item.type === "single") {
        dispatch({
          type: TYPE_ACTION.LIVE.GET_LIST_CAMERA_PREVIEW,
          payload: { index: index, url: "", status: "Loading", id: item.url },
        });
        addListPreview(item.url, item.type);
      } else {
        const callBack = (data) => {
          let level = 1;
          if (data.length > 0 && data.length <= 4) {
            level = 4;
          } else if (data.length > 4 && data.length <= 9) {
            level = 9;
          } else if (data.length > 9 && data.length <= 16) {
            level = 16;
          } else if (data.length > 16) {
            level = 25;
          }
          dispatch({
            type: TYPE_ACTION.LIVE.CHANGE_GRID,
            payload: { grid: level, listCameraStream: [] },
          });
          addListPreview(data, item.type);
          setIsdrop(true);
        };
        camRef.current.province_ids = item.id;
        dispatch({
          type: TYPE_ACTION.LIVE.GET_WARD_LIVE,
          payload: { body: item.id, callBack },
        });
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handle = useFullScreenHandle();

  return (
    <div
      ref={drop}
      className={
        "flex justify-center cursor-pointer overflow-hidden items-center border border-solid border-[#ffffff66] bg-[#00000033]"
      }
      onDoubleClick={actionCamera === "Connect" ? handle.enter : () => {}}
      onClick={onClick}
      style={{
        height: height,
        width: width,
        borderColor:
          isOver.isOver || selectedCamera === index
            ? colors.redGlobal
            : colors.textPlaceholder,
        position: "relative",
      }}
      onMouseEnter={() => {
        handleMouseEnter();
      }}
      onMouseLeave={handleMouseLeave}
    >
      
        {actionCamera === "Connect" && hoveredItem ? (
          <div
            className="h-[14%] bg-[#000000a8] flex items-center justify-end p-[5px] absolute"
            style={{
              width: width,
              top: 0,
              zIndex: 999,
            }}
          >
            <img
              className=""
              alt=""
              onClick={() => {
                const callBack = (data) => {
                  handle.exit();
                  dispatch(
                    resetgetListCameraPreview({
                      index: index,
                      listCameraStream: listCameraStream,
                    })
                  );
                };
                dispatch({
                  type: TYPE_ACTION.LIVE.STOP_STREAM,
                  payload: { id: idCamera, callBack },
                });
              }}
              src={imagesHeader.exit_active}
            />
          </div>
        ) : null}
      <FullScreen handle={handle}>
        {(() => {
          switch (actionCamera) {
            case "Loading":
              return (
                <div className="flex justify-center items-center flex-col">
                  <LoadingOutlined
                    style={{
                      fontSize: 40,
                      color: colors.redGlobal,
                    }}
                  />
                  <span style={{ color: colors.textBase }}>Loading</span>
                </div>
              );
            case "Connect":
              return url && <HlsPlayer playerRef={videoRef} playingSrc={url} />;
            case "Disconnect":
              return (
                <div className="flex justify-center items-center flex-col cursor-pointer">
                  <img
                    className="w-[48px] h-[48px]"
                    src={imagesHeader.exit_active}
                    alt="#"
                    onClick={() => {
                      const callBack = (data) => {
                        dispatch(
                          resetgetListCameraPreview({
                            index: index,
                            listCameraStream: listCameraStream,
                          })
                        );
                      };
                      dispatch({
                        type: TYPE_ACTION.LIVE.STOP_STREAM,
                        payload: { id: idCamera, callBack },
                      });
                    }}
                  />
                  <span style={{ color: colors.redGlobal }}>Disconnected</span>
                </div>
              );
            default:
              return (
                <img alt="#" src={images.logo} style={{ height: "20%" }} />
              );
          }
        })()}
      </FullScreen>
    </div>
  );
};

export default CustomViewVideo;
