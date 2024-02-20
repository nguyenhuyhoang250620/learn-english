import { useDispatch, useSelector } from "react-redux";
import TYPE_ACTION from "../../../../../constants/TypeAction";
import {
  selectCollapse,
  selectViewEvent,
} from "../../../../../redux/slice/ViewEventSlice";
import styles from "./ViewEvent.module.scss";
import { baseURL } from "../../../../../services/ConfigService/ApiService";
import { selectCameraData } from "../../../../../redux/slice/CameraSlice";
import { selectLocationData } from "../../../../../redux/slice/LocationSlice";
import { Button, Empty, Input, Modal, Tooltip } from "antd";
import { colors } from "../../../../../common/colors/colors";
import { formatDate } from "../../../../../common/Functions/FomatDate";
import { useEffect, useState,useRef } from "react";
import { vehicles } from "../../../../../common/vehicles/vehicles";
import { EditOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons/lib/icons";
import { useNavigate } from "react-router";
import PATH from "../../../../../constants/itemsContants";
import { selectIdCardData } from "../../../../../redux/slice/IDCardSlice";
import CustomListContent from "./custom_list_content";
import { CloseOutlined } from '@ant-design/icons';
import FaceView from "./FaceView";
import MotorView from "./MotorView";
import CarView from "./CarView";
import { useTranslation} from 'react-i18next';
import CrowdView from "./CrowdView";
import AccessControl from "./AccessControl";
import { selectBlackList } from "../../../../../redux/slice/BlackListSlice";
const ViewEvent = () => {
  const filterRef = useRef({
    soCmts: null,
    camera_ids: null,
    start_time: null,
    end_time: null,
    distinct: null,
    event_type:null,
    page_idx: 1,
    page_size: 12,
    exact:false
  });
  const navigate = useNavigate();
  //-- State
  const [modalMetaData, setModalMetaData] = useState({});
  const [position, setPosition] = useState({});
  const [positionHuman, setPositionHuman] = useState({});
  const [eventType, setEventType] = useState('');
  const [imageCrop, setImageCrop] = useState('');
  const canvasRef = useRef(null); 
  const [ischeckCropImage,setIscheckCropImage] = useState(false)

  const {t} = useTranslation();

  //-- Dispatch
  const dispatch = useDispatch();

  //-- Selectors
  const open = useSelector(selectCollapse);
  const data = useSelector(selectViewEvent);
  const cameraData = useSelector(selectCameraData);
  const locationData = useSelector(selectLocationData);
  const idCardData = useSelector(selectIdCardData);

  const blackListData = useSelector(selectBlackList);


  

  const loadData = async (value)=>{
    await dispatch({
      type: 'VALUE_SEARCH',
      payload: value,
    });
    handleCancel()
  }


  

  const handleCancel = () => {
    dispatch({
      type: TYPE_ACTION.VIEW_EVENT.GET_COLLAPSE,
      payload: false,
    });
  };

  const addNewProfile = () => {
    handleCancel();
    navigate(`/${PATH.ADD_PROFILE}`, { state: { newData: {
      soCmt:data.soCmt,
      image: data.crop_image
    }}});
  };

  const editProfile = () => {
    const id = idCardData.find((index) => index.soCmt === data.soCmt).id;
    const img = idCardData.find((index) => index.soCmt === data.soCmt).image;
    navigate(`/profile/edit/${id}`, { state: { editData: {
      soCmt:data.soCmt,
      image: data.crop_image
    }}});
    handleCancel();
  };
  
  useEffect(() => {
    setImageCrop('')
    
    if (data.event_type === "ANPR" && Object.keys(data).length) {
      setModalMetaData(data.metadata ? JSON.parse(data.metadata) : null);
  
      setTimeout(() => {
        if (data.metadata) {
          const { license_plate_x, license_plate_y, license_plate_w, license_plate_h } = JSON.parse(data.metadata);
          setEventType(data.event_type);
          handleCropImage(`${baseURL}${data.image}`, license_plate_x, license_plate_y, license_plate_w, license_plate_h);
        }
      }, 100);
    }
    else if (data.event_type === "ACCESS_CONTROL" && Object.keys(data).length) {
      setModalMetaData(data.metadata ? JSON.parse(data.metadata) : null);
  
      setTimeout(() => {
        if (data.metadata) {
          const { license_plate_x, license_plate_y, license_plate_w, license_plate_h } = JSON.parse(data.metadata);
          setEventType(data.event_type);
          handleCropImage(`${baseURL}${data.image}`, license_plate_x, license_plate_y, license_plate_w, license_plate_h);
        }
      }, 100);
    }
  }, [data]);
  



  const handleCropImage = async (imageURL, x, y, w, h) => {
    const cropX = x;
    const cropY = y;
    const cropWidth = w;
    const cropHeight = h;
  
    const croppedCanvas = document.createElement('canvas');
    const croppedCtx = croppedCanvas.getContext('2d');
    croppedCanvas.width = cropWidth;
    croppedCanvas.height = cropHeight;
  
    const image = new Image();
    image.crossOrigin = 'Anonymous';
  
    await new Promise((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = (error) => reject(error);
      image.src = imageURL;
    });
    croppedCtx.imageSmoothingEnabled = false;
    croppedCtx.drawImage(
      image,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    );
  
    const croppedImageURL = croppedCanvas.toDataURL('image/jpeg');
    setImageCrop(croppedImageURL);
  };



  function renderCase(event_type) {
    switch (event_type) {
      case 'HUMAN':
        return  <FaceView data={data} group ={blackListData}/>;
      case 'ANPR':
        if(vehicles[modalMetaData.vehicle_name] == 'Motor'){
          return <MotorView 
          data={data} 
          vehicle_name={modalMetaData.vehicle_name?vehicles[modalMetaData.vehicle_name]:"-"}
          image_crop={imageCrop}
          group ={blackListData}
          />;
        }
        else{
          return <CarView 
          data={data} 
          vehicle_name={modalMetaData.vehicle_name?vehicles[modalMetaData.vehicle_name]:"-"}
          vehicle_brand={modalMetaData.vehicle_brand?modalMetaData.vehicle_brand:"-"}
          vehicle_color={modalMetaData.vehicle_color?colors[modalMetaData.vehicle_color]:"-"}
          image_crop={imageCrop}
          group ={blackListData}
          filter={(value)=>loadData(value)}
          />;
        }
      case 'ACCESS_CONTROL':
        return  <AccessControl 
            data={data} 
            vehicle_name={modalMetaData.vehicle_name?vehicles[modalMetaData.vehicle_name]:"-"}
            vehicle_brand={modalMetaData.vehicle_brand?modalMetaData.vehicle_brand:"-"}
            vehicle_color={modalMetaData.vehicle_color?colors[modalMetaData.vehicle_color]:"-"}
            image_crop={imageCrop}
            group ={blackListData}
        />;
        case 'CROWD':
          return  <CrowdView data={data}/>;  
      default:
        return <div>Rendered default case</div>;
    }
  }



  return (
    <Modal  closeIcon={<CloseOutlined style={{ color: 'white', fontSize: '20px' }} />} open={open} onCancel={handleCancel} width={"50%"} footer={[
      <Button key="cancel" onClick={handleCancel} style={{color:"#B5122E",border:"1px solid #B5122E",marginTop:"30px"}}>{t('cancel')}</Button>,
    ]}>
        {renderCase(data.event_type)}
    </Modal>
  );
};

export default ViewEvent;
