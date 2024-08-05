import { selectListCameraGroup } from "@redux/slice/map-slice";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomViewStream from "./view-stream";
import { ConfigProvider, Popconfirm, Tree } from "antd";
import colors from "@constants/colors";
import { imagesGroup, imagesOther } from "@common/images/image";
import TYPE_ACTION from "@constants/action";
import { CloseCircleOutlined, DownOutlined } from "@ant-design/icons";

const DataGroupCamera = () => {
    const listDataCamera = useSelector(selectListCameraGroup);
  
    const dispatch = useDispatch()
    const onSelect = (selectedKeys, info) => {
      console.log("selected", selectedKeys, info);
    };
    const [treeData, setTreeData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [urls, setUrls] = useState();
    const showModal = (url) => {
      setUrls(url)
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
  
    const CreateTree = () => {
      const camerasWithoutRecorder = [];
      const recorders = [];
      listDataCamera?.camerasWithoutRecorder.map((item, index) => {
        camerasWithoutRecorder.push({
          title: item.name,
          key: `0-${index}`,
          isLeaf: true,
          camera: true,
          url: item.id,
          status: item.status,
        });
      });
      const arr = [];
      listDataCamera?.recorders.map((item, index) => {
        const childrenArr = [];
        item?.cameraDTOS.map((e, p) => {
          childrenArr.push({
            title: e.name,
            key: `1-${index}-${p}`,
            isLeaf: true,
            camera: true,
            url: e.id,
            status: e.status,
          });
        });
          recorders.push({
              title: item.name,
              key: `1-${index}`,
              id: item.id,
              children: childrenArr,
            });
   
      });
      let combinedArray = [...camerasWithoutRecorder, ...recorders];
      setTreeData(combinedArray);
    };
  
    useEffect(() => {
      CreateTree();
    }, [listDataCamera]);
    const CameraSingle = ({ node }) => {
      const handleCancelPopup = () => {
        // Xử lý sự kiện khi Popconfirm bị tắt
        console.log('Popconfirm đã bị tắt');
      };
      return (
        <Popconfirm
          placement="right"
          description={
          <div
            key={node.id}
            style={{
              width:"240px",
              height:"135px"
            }}
          >
            <CustomViewStream key={node.id} url={node.url}/>
          </div>
            
          }
          cancelButtonProps={null}
          onCancel={handleCancelPopup}
          showCancel={null}
          okButtonProps={null}
          icon={false}
        >
          <div
          key={node.key}
          style={{
            color: colors.text,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
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
        </Popconfirm>
        
      );
    };
  
    const CameraGroup = ({ node }) => {
      return (
        <div
          key={node.key}
          style={{
            color: colors.text,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img style={{ marginRight: "5px" }} src={imagesOther.NVR} alt="" />
          {node.title}
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
    return (
      <div
          style={{
              position:"relative"
          }}
      >
      <div
          style={{
              position:"absolute",
              top:0,
              right:0,
              zIndex:999
              
          }}
          onClick={()=>{
              dispatch({
                  type:TYPE_ACTION.MAP.CLOSE_GROUP,
                  payload:{}
              })
          }}
      >
      <CloseCircleOutlined 
      style={{
          fontSize:"20px",
          color:colors.redGlobal,
          cursor:"pointer"
      }}/>
      <ConfigProvider
          theme={{
              token:{
                  colorText: colors.text,
                      paddingContentHorizontalLG: 0,
                      paddingMD: 0,
                      lineHeightHeading5: 3,
                      borderRadiusLG: 0
              }
          }}
      >
      </ConfigProvider>
      
      </div>
        {treeData.length > 0 ? (
          <ConfigProvider
            theme={{
              token: {
                colorBgContainer: "rgba(16, 16, 22, 0)",
                controlItemBgActive: colors.transparent,
                lineHeight: 2,
                colorText: colors.text,
                colorPrimary: colors.redGlobal,
                colorBorder: colors.textPlaceholder,
                paddingXS: 35,
              },
            }}
          >
            <Tree
              showLine
              switcherIcon={<DownOutlined />}
              // defaultExpandedKeys={['0-0-0']}
              // onSelect={onSelect}
              treeData={treeData}
              titleRender={memoizedTitleRender}
            />
          </ConfigProvider>
        ) : (
          <div
              style={{
                  color:colors.text,
                  height:"100%",
                  width:"100%",
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"center"
              }}
          >Please select a group/device</div>
        )}
      </div>
    );
  };
  export default DataGroupCamera;