import { useCallback, useEffect, useRef, useState } from "react";
import styles from "@style/search.module.scss";
import colors from "@constants/colors";
import { imagesGrid } from "@common/images/image";
import { VideoSeekSlider } from "react-video-seek-slider";
import "./slider_style.css";
import TYPE_ACTION from "@constants/action";
import { getListCameraPreview, selectListCameraPreview, selectListCameraStream, selectSizeGrid } from "@redux/slice/live-slice";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider, useDrop } from "react-dnd";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Dropdown } from "antd";

const GridPlayBack = () => {
  const listCameraStream = useSelector(selectListCameraStream);
  const dispatch=useDispatch()
  const numberCamera = 1;
  const initData = Array(numberCamera).fill(null);
  const previewImage = useRef("");
  const interval = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [maxTime, setMaxTime] = useState(0);
  
  const player = useRef(null);
  const [isPlay, setIsPlay] = useState(false);
  const playPause = () => {
      if (isPlay) {
          player.current.pause();
      } else {
          player.current.play();
      }
      setIsPlay(!isPlay);
  };

  const handleChangeGrid = (grid) => {
    dispatch({
      type: TYPE_ACTION.LIVE.CHANGE_GRID,
      payload: {grid:grid,listCameraStream:listCameraStream},
    });
  };
  const items = [
    {
      label: (
        <div
          className="flex items-center space-x-2"
          onClick={() => handleChangeGrid(1)}
          style={{ color: colors.textBase }}
        >
          <img alt="1" src={imagesGrid.grid_1} />
          <p>1x1</p>
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <div
          className="flex items-center space-x-2"
          onClick={() => handleChangeGrid(4)}
          style={{ color: colors.textBase }}
        >
          <img alt="2" src={imagesGrid.grid_4} />
          <p>2x2</p>
        </div>
      ),
      key: "2",
    },
    {
      label: (
        <div
          className="flex items-center space-x-2"
          onClick={() => handleChangeGrid(9)}
          style={{ color: colors.textBase }}
        >
          <img alt="3" src={imagesGrid.grid_9} />
          <p>3x3</p>
        </div>
      ),
      key: "3",
    },
    {
      label: (
        <div
          className="flex items-center space-x-2"
          onClick={() => handleChangeGrid(16)}
          style={{ color: colors.textBase }}
        >
          <img alt="4" src={imagesGrid.grid_16} />
          <p>4x4</p>
        </div>
      ),
      key: "4",
    },
    {
      label: (
        <div
          className="flex items-center space-x-2"
          onClick={() => handleChangeGrid(25)}
          style={{ color: colors.textBase }}
        >
          <img alt="5" src={imagesGrid.grid_25} />
          <p>5x5</p>
        </div>
      ),
      key: "5",
    },
  ];
  const handleTimeChange = useCallback((time, offsetTime) => {
    if (!player.current?.currentTime) {
      return;
    }

    player.current.currentTime = time / 1000;
    setCurrentTime(time);

    console.log({ time, offsetTime });
  }, []);

  const handlePlay = () => {
    interval.current = setInterval(() => {
      setCurrentTime((player.current?.currentTime || 0) * 1000);
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(interval.current);
  };

  const handleDataLoaded = () => {
    setMaxTime((player.current?.duration || 0) * 1000);
  };

  const handleProgress = () => {
    const buffer = player?.current?.buffered;

    if (((buffer?.length > 0 && player.current?.duration) || 0) > 0) {
      let currentBuffer = 0;
      const inSeconds = player.current?.currentTime || 0;

      for (let i = 0; i < buffer.length; i++) {
        if (buffer.start(i) <= inSeconds && inSeconds <= buffer.end(i)) {
          currentBuffer = i;
          break;
        }
      }

      setProgress(buffer.end(currentBuffer) * 1000 || 0);
    }
  };

  const updatePreviewImage = (hoverTime) => {
    const url = `https://via.placeholder.com/140x60?text=${hoverTime}`;
    const image = document.createElement("img");
    image.src = url;

    image.onload = () => {
      previewImage.current = url;
    };
  };

  const handleGettingPreview = useCallback(
    (hoverTime) => {
      console.log({ hoverTime, maxTime });
      updatePreviewImage(hoverTime, maxTime);

      return previewImage.current;
    },
    [maxTime]
  );

  useEffect(() => {
    if (!player) {
      return;
    }
    player.current?.addEventListener("play", handlePlay);
    player.current?.addEventListener("pause", handlePause);
    player.current?.addEventListener("loadeddata", handleDataLoaded);
    player.current?.addEventListener("progress", handleProgress);
  }, [player]);

  const CustomListGrid = ({player, onClick}) => {
    const numberCamera = useSelector(selectSizeGrid);
    const listCameraPreview = useSelector(selectListCameraPreview);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const updateScreenHeight = () => {
      setScreenHeight(window.innerHeight);
    };
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    useEffect(() => {
      setScreenHeight(window.innerHeight);
      setScreenWidth(window.innerWidth);
      window.addEventListener("resize", updateScreenHeight);
      window.addEventListener("resize", updateScreenWidth);
      return () => {
        window.removeEventListener("resize", updateScreenHeight);
        window.removeEventListener("resize", updateScreenWidth);
      };
    }, []);
    const [scale] = useState(1);
    const dispatch = useDispatch();
    const getAllCameraStreaming = () => {
      const callBack = (data) => {
        data.map((item, index) => {
          dispatch(
            getListCameraPreview({
              index,
              status: "Connect",
              id: item.id,
              url: item.urlRestream,
            })
          );
        });
      };
      dispatch({
        type: TYPE_ACTION.LIVE.GET_ALL_CAMERA_STREAM,
        payload: { body: {}, callBack },
      });
    };
  
    useEffect(() => {
      getAllCameraStreaming();
    }, []);
    return (
      <>
        {numberCamera && (
          <div
            className={"grid justify-center place-items-center overflow-auto"}
            style={{
              width: screenWidth - 530,
              height: screenHeight - 150,
              gridTemplateColumns: `repeat(${Math.sqrt(numberCamera)},1fr)`,
              gridTemplateRows: `repeat(${Math.sqrt(numberCamera)},1fr)`,
            }}
          >
            {listCameraPreview.map((item, index) => {
              return (
                <CustomViewVideo scale={scale} player={player} onClick={onClick} />
              );
            })}
          </div>
        )}
      </>
    );
  };

  const CustomViewVideo = ({
    index,
    scale,
    onClick
  }) => {
    const videoRef = useRef(null);
  
    const dispatch = useDispatch();
    const [setIsdrop] = useState(false);
    const [setStatus] = useState(true);
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

    const player = useRef(null);
    const [isPlay, setIsPlay] = useState(true);
    const playPause = () => {
        if (isPlay) {
            player.current.pause();
        } else {
            player.current.play();
        }
        setIsPlay(!isPlay);
    };
  
    const addListPreview = (url, type) => {
      if (type === "group") {
        for (let i = 0; i < url.length; i++) {
          const callBack = (data) => {
            if (data) {
              dispatch({
                type: TYPE_ACTION.LIVE.GET_LIST_CAMERA_PREVIEW,
                payload: {
                  index: index,
                  //   url: `${baseURL_stream}${data.url}`,
                  status: "Connect",
                },
              });
            }
          };
          const errorBack = (data) => {
            if (data?.response.status === 400) {
              setStatus(false);
            }
          };
          dispatch({
            type: TYPE_ACTION.LIVE.GET_PREVIEW_WITH_ID,
            payload: { url: url[i].urlMainstream, callBack, errorBack },
          });
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
            if (data.results.length > 0 && data.results.length <= 4) {
              level = 4;
            } else if (data.results.length > 4 && data.results.length <= 9) {
              level = 9;
            } else if (data.results.length > 9 && data.results.length <= 16) {
              level = 16;
            }
            dispatch({
              type: TYPE_ACTION.LIVE.CHANGE_GRID,
              payload: level,
            });
            setIsdrop(true);
            addListPreview(data.results, item.type);
          };
          camRef.current.province_ids = item.id;
          dispatch({
            type: TYPE_ACTION.LIVE.GET_DATA_CAMERA_WITH_PROVINCE,
            payload: { body: camRef.current, callBack },
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
        className={"w-full h-full flex justify-center cursor-pointer overflow-hidden items-center border border-solid border-[#ffffff66] bg-[#00000033]"}
        style={{borderColor: isOver.isOver ? colors.redGlobal : colors.textPlaceholder}}
        onDoubleClick={handle.enter}
      >
        <FullScreen
        handle={handle}
        >
        <video 
          className="w-full h-full"
          ref={player}
          onClick={playPause}
        >
          <source src="/assets/video/video-1.mp4" type="video/mp4" />
        </video>
        </FullScreen>
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col justify-center items-center m-[5px]">
        <div
          className={styles.grid_container}
        >
          {initData.map((item, index) => {
            return (
              <div className="w-full h-full overflow-hidden"
                key={index}
                style={{border: `1px solid ${colors.borderColor}`}}
              >
                {/* <FullScreen
                  handle={() => handleFullScreen()}
                  isFullScreen={isFullScreen}
                  onChange={(isFull) => {
                    setFullScreen(isFull);
                  }}
                > */}
                  <CustomListGrid player={player} onClick={playPause} />
                  {/* <video className="w-full h-full"
                    ref={player}
                    onClick={playPause}
                  >
                    <source src="/assets/video/video-1.mp4" type="video/mp4" />
                  </video> */}
                {/* </FullScreen> */}
              </div>
            );
          })}
        </div>
        <div className="flex justify-between w-full pt-3">
          <div className={styles.space} style={{ width: "150px" }}>
            <img
              src={imagesGrid.rewind}
              alt="#"
              onClick={() => {
                player.current.currentTime -= 10;
              }}
            />
            <img
              onClick={playPause}
              src={imagesGrid.play}
              alt="#"
              style={{ cursor: "pointer" }}
            />
            <img
              onClick={() => {
                player.current.currentTime += 10;
              }}
              src={imagesGrid.tassel}
              alt="#"
            />
            <img src={imagesGrid.volume} alt="#" />
          </div>
          <div className={styles.space} style={{ width: "300px" }}>
            <img src={imagesGrid.exit} alt="#" />
            <Dropdown
              placement="top"
              menu={{items}}
              trigger={["click"]}
            >
              <img
                className="cursor-pointer"
                alt="#"
                src={imagesGrid.grid_all}
                onClick={(e) => e.preventDefault()}
              />
            </Dropdown>
            <img src={imagesGrid.download} alt="#" />
            <img src={imagesGrid.capture} alt="#" />
            <img src={imagesGrid.trim_video} alt="#" />
            <img src={imagesGrid.share} alt="#" />
            <img src={imagesGrid.speed} alt="#" />
            <img src={imagesGrid.full_screen} alt="#" />
          </div>
        </div>
        <div
          className="w-full h-[140px] flex items-center mt-[10px] px-2"
          style={{ background: colors.borderColor }}
        >
          <div className="w-full">
            <VideoSeekSlider
              max={maxTime}
              currentTime={currentTime}
              bufferTime={progress}
              onChange={handleTimeChange}
              limitTimeTooltipBySides={true}
              hideThumbTooltip
              secondsPrefix="00:"
              minutesPrefix="0:"
              getPreviewScreenUrl={handleGettingPreview}
              timeCodes={[
                {
                  fromMs: 0,
                  description:
                    "This is a very logn first part label you could use",
                },
                {
                  fromMs: 100000,
                  description:
                    "This is a very logn first part label you could use",
                },
                {
                  fromMs: 130000,
                  description: "This is the second part",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};
export default GridPlayBack;

