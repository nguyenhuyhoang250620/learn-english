import TYPE_ACTION from "@constants/action";
import colors from "@constants/colors";
import {
  getListCameraPreview,
  handleCameraById,
  selectListCameraPreview,
  selectListCameraStream,
  selectSizeGrid
} from "@redux/slice/live-slice";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import { imagesGrid } from "@common/images/image";
import { Dropdown } from "antd";
import CustomViewVideo from "@common/video/custom-video";
const CustomListGrid = ({fullScreen}) => {
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
              <CustomViewVideo
                key={index}
                index={index}
                scale={scale}
                url={item?.url}
                idCamera={item?.id}
                actionCamera={item?.status}
                listCameraPreview={listCameraPreview}
                getAllCameraStreaming={() => getAllCameraStreaming()}
                onClick={() => {dispatch(handleCameraById(index))}}
                fullScreen={fullScreen}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

const VideoView = ({ fullScreen }) => {
  const listCameraStream = useSelector(selectListCameraStream);
  const [isFullScreen, setFullScreen] = useState(false);
  const numberCamera = useSelector(selectSizeGrid);
  const dispatch=useDispatch()
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
          style={{ 
            color: numberCamera === 1 ? colors.redGlobal  : colors.textBase
          }}
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
          style={{ color: numberCamera === 4 ? colors.redGlobal  : colors.textBase }}
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
          style={{ color: numberCamera === 9 ? colors.redGlobal  : colors.textBase }}
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
          style={{ color: numberCamera === 16 ? colors.redGlobal  : colors.textBase }}
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
          style={{ color: numberCamera === 25 ? colors.redGlobal  : colors.textBase }}
        >
          <img alt="5" src={imagesGrid.grid_25} />
          <p>5x5</p>
        </div>
      ),
      key: "5",
    },
  ];
  const handleFullScreen = () => {
    setFullScreen(!isFullScreen);
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col w-full overflow-hidden">
        <div className="h-full flex items-center justify-center overflow-hidden">
          {/* <FullScreen
            handle={() => handleFullScreen()}
            isFullScreen={isFullScreen}
            onChange={(isFull) => { setFullScreen(isFull)}}
          > */}
            <CustomListGrid />
          {/* </FullScreen> */}
        </div>
        <div className="w-full h-[78px] flex justify-start items-center">
          <img
            className="h-1/2 px-1 cursor-pointer"
            alt="#"
            src={imagesGrid.full_screen}
            onClick={() =>handleFullScreen}
          />
          <img
            className="h-1/2 px-1 cursor-pointer"
            alt="#"
            src={imagesGrid.download}
          />
          <img
            className="h-1/2 px-1 cursor-pointer"
            alt="#"
            src={imagesGrid.capture}
          />
          <img
            className="h-1/2 px-1 cursor-pointer"
            alt="#"
            src={imagesGrid.exit}
          />
          <Dropdown
            placement="top"
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <img
              className="h-1/2 px-1 cursor-pointer"
              alt="#"
              src={imagesGrid.grid_all}
              onClick={(e) => e.preventDefault()}
            />
          </Dropdown>
        </div>
      </div>
    </DndProvider>
  );
};

export default VideoView;
