import Search from "@common/search/custom-search";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CustomTreeLoad from "@common/tree/tree-loader";
import { useEffect, useMemo, useRef, useState } from "react";
import TYPE_ACTION from "@constants/action";
import colors from "@constants/colors";
import { imagesGroup } from "@common/images/image";
import { useDispatch, useSelector } from "react-redux";
import {
  handleCameraById,
  selectCameraById,
  selectListCameraHaveStream,
  selectListCameraPreview,
  selectListCameraStream,
  selectListProvince,
} from "@redux/slice/live-slice";
const TreeCamera = () => {
  const onChangeAutoComplete = (value) => {};
  const [dataTree, setDataTree] = useState();
  const dataListTree = useSelector(selectListProvince);
  const indexCameraStream = useSelector(selectCameraById);
  const listCameraPreview = useSelector(selectListCameraPreview);

  const listCameraHaveStream = useRef([])

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

  const dispatch = useDispatch();

  const handleFillCamera = () => {
    let sizeGrid = listCameraPreview.length;
    if (indexCameraStream >= sizeGrid - 1) {
      for (let index = 0; index <listCameraPreview.length; index++) {
          if (!listCameraHaveStream.current.includes(index)) {
            dispatch(handleCameraById(index));
            break
          }
      }
    } else {
      for (let index = 0; index <listCameraPreview.length; index++) {
          if ((!listCameraHaveStream.current.includes(index))&&listCameraHaveStream.current.includes(listCameraPreview.length-1)) {
            dispatch(handleCameraById(index));
            break
          }
          else{
            dispatch(handleCameraById(indexCameraStream + 1));
          }
      }
    }
  };

  const onSelect = (selectedKeys, info) => {
    if (!("children" in info.node)) {
      if (!listCameraHaveStream.current.includes(indexCameraStream)) {
        listCameraHaveStream.current.push(indexCameraStream);
      }
      dispatch({
        type: TYPE_ACTION.LIVE.GET_LIST_CAMERA_PREVIEW,
        payload: {
          index: indexCameraStream,
          url: "",
          status: "Loading",
          id: info.node.id,
        },
      });
      handleFillCamera();
      const callBack = (data) => {
        if (data) {
          data.map((item, i) => {
            if (item.urlRestream) {
              dispatch({
                type: TYPE_ACTION.LIVE.GET_LIST_CAMERA_PREVIEW,
                payload: {
                  index: indexCameraStream,
                  url: `${item.urlRestream}`,
                  id: item.id,
                  status: "Connect",
                },
              });
            } else {
              dispatch({
                type: TYPE_ACTION.LIVE.GET_LIST_CAMERA_PREVIEW,
                payload: {
                  index: indexCameraStream,
                  url: `${item.urlRestream}`,
                  id: item.id,
                  status: "Disconnect",
                },
              });
            }
          });
        }
      };
      const errorBack = (data,info) => {
        dispatch({
          type: TYPE_ACTION.LIVE.GET_LIST_CAMERA_PREVIEW,
          payload: {
            index: indexCameraStream,
            url: '',
            id: '',
            status: "Disconnect",
          },
        });
        if (data?.response.status === 400) {
        }
      };
      dispatch({
        type: TYPE_ACTION.LIVE.GET_PREVIEW_WITH_ID,
        payload: { url: info.node.id, callBack, errorBack },
      });
    }
  };

  const CameraSingle = ({ node }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "GET",
      item: { type: "single", url: node.id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));
    return (
      <div
        className="flex justify-center items-center"
        key={node.key}
        ref={drag}
        style={{ color: colors.text }}
      >
        <img
          style={{ marginRight: "5px" }}
          src={
            node.camera
              ? node.status
                ? imagesGroup.camera_connected
                : imagesGroup.camera_disconnected
              : null
          }
          alt=""
        />
        <span
          className="truncate max-w-[140px]"
          style={{
            color: `${
              node.show
                ? node.status
                  ? colors.color_camera_connected
                  : colors.redGlobal
                : colors.textPlaceholder
            }`,
          }}
        >
          {node.title}
        </span>
      </div>
    );
  };

  const CameraGroup = ({ node }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "GET",
      item: { type: "group", id: node.id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));
    return (
      <div
        key={node.key}
        ref={drag}
        className="truncate flex justify-center items-center"
        style={{ color: colors.textBase }}
      >
        <img
          style={{ marginRight: "5px" }}
          src={imagesGroup.folder_default}
          alt=""
        />
        <div className="truncate max-w-[180px]">{node.title}</div>
      </div>
    );
  };

  const memoizedTitleRender = useMemo(() => {
    return (node) => {
      // Kiểm tra xem mục có con hay không
      const hasChildren = node.children && node.children.length >= 0;
      if (hasChildren) {
        return <CameraGroup key={node.key} node={node} />;
      } else {
        return <CameraSingle key={node.key} node={node} />;
      }
    };
  }, []);

  useEffect(() => {
    mapData(dataListTree);
  }, [dataListTree]);

  const mapData = (data) => {
    const arr = [];
    data?.map((item, index) => {
      const key = item.id;
      if (item.id === 1) {
        // console.log(item)
      }
      // const treeNode ={
      //   title: `Cam ${index}`,
      //   key: index,
      //   camera: true,
      //   isLeaf: true,
      //   url: item.url,
      //   status: true,
      //   id:item.id
      // };

      const treeNode = {
        title: item.name,
        key,
        id: item.id,
        isLeaf: false,
        children: [],
      };
      arr.push(treeNode);
    });
    setDataTree(arr);
  };
  useEffect(() => {
    const callBack = () => {};
    dispatch({
      type: TYPE_ACTION.LIVE.GET_DATA_CAMERA_WITH_PROVINCE,
      payload: { body: camRef.current, callBack },
    });
  }, []);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-full w-[248px]">
        <Search
          placeholder={"Tìm kiếm"}
          onChangeAutoComplete={(value) => onChangeAutoComplete(value)}
        />
        <div className="h-[90vh] overflow-auto scroll_default">
          <CustomTreeLoad
            initTreeData={dataTree}
            onSelect={onSelect}
            data={dataListTree}
            titleRender={memoizedTitleRender}
          />
        </div>
      </div>
    </DndProvider>
  );
};
export default TreeCamera;
