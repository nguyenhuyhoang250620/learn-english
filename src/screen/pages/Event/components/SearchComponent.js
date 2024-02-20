import { CloseOutlined, EyeOutlined, PlusOutlined,LoadingOutlined } from "@ant-design/icons";
import {
  AutoComplete,
  Button,
  Checkbox,
  DatePicker,
  Form,
  message,
  Select,
  Tag,
} from "antd";
import { useEffect, useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCameraData } from "../../../../redux/slice/CameraSlice";
import { selectIdCardData } from "../../../../redux/slice/IDCardSlice";
import styles from "./SearchComponent.module.scss";
import AddImg from "../../../../assets/images_new/userAdd.png";
import iconExpand from "../../../../assets/images_new/expand.png";
import iconCalendar from "../../../../assets/images_new/calendar.png";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { baseURL } from "../../../../services/ConfigService/ApiService";
import { selectIsDarkMode } from "../../../../redux/slice/DarkModeSlice";
import FilterAI from "./Filter_AI/Custom_filter_AI"
import { useTranslation} from 'react-i18next';
import TYPE_ACTION from "../../../../constants/TypeAction";
import { selectBlackList } from "../../../../redux/slice/BlackListSlice";

const SearchComponent = ({ form, loadData, filterRef,close,actionFilter,pickAvatar }) => {

  const [imgLocalAvatar, setImgLocalAvatar] = useState(AddImg);
  const [isInfo, setInfo] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [aiFlow,setAiFlow] = useState('')
  const [eventTime,setEventTime] = useState()
  const [cameraSelect,setCameraSelect] = useState('')
  const [groupSelect,setgroupSelect] = useState([])
  const [showDialog,setShowDialog] = useState(false)
  const [data,setData] = useState()
  const {t} = useTranslation()
  const optionsAI = [];
  const optionsCamera = [];
  const optionsGroup = [];
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState({
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
  });



  

  const AiFlow = [
    // {
    //   value:"ANPR&event_type=HUMAN&event_type=CROWD",
    //   label:`${t('all')}`
    // },
    {
      value:"HUMAN",
      label:`${t('face_recognition')}`
    },
    {
      value:"ANPR",
      label:`${t('vehicle_recognition')}`
    },
    {
      value:"ACCESS_CONTROL",
      label:`${t('face_vehicle_access')}`
    },
    {
      value:"CROWD",
      label:`${t('crowd_detection')}`
    }
  ]

  //-- Functions
  const onChangeEventType = (value) => {
    setAiFlow(value)
  };


  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        500,
        500,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });
  const onChange = async (event) => {
    console.log("vaodaynha")
    try {
      if (event.target.files[0].size > 10000000) {
        message.warning("Dung lượng tối đa");
      } else {
        const file = event.target.files[0];
        const image = await resizeFile(file);
          setAvatar(image);
          const reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = (e) => {
            setImgLocalAvatar(e.target.result);
          };
          event.target.value = null; 
      }
    } catch (err) {
      console.log(err);
    }
  };


  const tagRender = (props) => {
    const { label, closable } = props;
    return (
      <Tag
        color={"blue"}
        style={{
          marginRight: 3,
        }}
      >
        {label}
      </Tag>
    );
  };

  const tagRenderAI = (props) => {
    const { label, closable } = props;
    return (
      <div style={{display:"flex",flexDirection:"row"}}>
        <Checkbox style={{height:"10px",width:"10px"}}/>
        <Tag
          color={"blue"}
          style={{
            marginRight: 3,
          }}
        >
          {label}
        </Tag>
      </div>
    );
  };



  const { Option } = Select;
  const { RangePicker } = DatePicker;

  //----Selectors
  const cameraData = useSelector(selectCameraData);
  const idCardData = useSelector(selectIdCardData);
  const isDarkMode = useSelector(selectIsDarkMode);
  const blackListData = useSelector(selectBlackList);

  //-----Dispatchs
  const dispatch = useDispatch();

 
  useEffect(() => {
    dispatch({
        type: TYPE_ACTION.CAMERA.GET,
        payload: {},
    });
}, []);



  const addFilterCameraIds = (value, event) => {
    setCameraSelect(value)
  };

  const addFilterGroup = (value, event) => {
    const data = []
    value.map((elemet)=>{
      blackListData?.map((index)=>{
        if(index.id === elemet){
          index.users.map((user)=>{
            data.push(user.soCmt)
          })
          index.vehicles.map((license)=>{
            data.push(license.number_plate)
          })
        }
      })
    })
    setgroupSelect(data)
  };

  const addFilterTimeEvent = (value, event) => {
    setEventTime(event)
  };

  const citizenTracking = async () => {
    try {
      const formData = new FormData();
      formData.append("portrait", avatar);
      setShowDialog(true)
      const response = await axios.post(
        `${baseURL}/api/ocr/citizen_tracking/`,
        formData
      );
      setShowDialog(false)
      const soCmt = response.data.data.soCmt;
      filterRef.current.soCmts = soCmt;
      filterRef.current.camera_ids = null;
      filterRef.current.start_time = null;
      filterRef.current.end_time = null;
      form.resetFields();
      if (soCmt) {
        form.setFieldsValue({
          soCmt: soCmt,
        });
        loadData();
        close()
        pickAvatar()
        onCloseUpload()
        actionFilter()
      } else {
        message.error("No matching profiles found.");
        close()
        onCloseUpload()
      }
    } catch (error) {
      setShowDialog(false)
      message.error("Error");
      console.log(error.response);
    }
  };

  const filterData = async () => {
    aiFlow && (filterRef.current.event_type = aiFlow);
    cameraSelect && (filterRef.current.camera_ids = cameraSelect.join(","))
    groupSelect && (filterRef.current.soCmts = groupSelect.join(","))
    if(eventTime){
      filterRef.current.start_time = eventTime[0];
      filterRef.current.end_time = eventTime[1];
    }
    if(avatar){
      citizenTracking()
    }else{
      close()
      loadData()
      actionFilter()
      onCloseUpload()
    }
  };

  const onCloseUpload = () => {
      setAvatar(null);
      setImgLocalAvatar(AddImg);
      setCameraSelect('')
      setEventTime()
      setAiFlow('')
      setgroupSelect([])
      form.resetFields();

  };

  // idCardData?.map((index) => {
  //   options.push({
  //     value: index.soCmt,
  //   });
  // });
  useEffect(() => {}, []);
  const color = isDarkMode ? "#DADADA" : "black";

  AiFlow?.map((index) => {
    optionsAI.push({
      label: index.label,
      value: index.value,
    });
  });

  cameraData?.map((index) => {
    optionsCamera.push({
      label: index.camera_name,
      value: index.id,
    });
  });
  blackListData?.map((index) => {
    optionsGroup.push({
      label: index.name,
      value: index.id,
    });
  });



  return (
    <div className={styles.container}>
      <>
      {showDialog && (
        <div 
          style={{
            height:"200px",
            width:"400px",
            position:"fixed",
            background:"white",
            border:"1px solid #ccc",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex:9999,
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            borderRadius:"10px"
          }}
        >
           <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              flexDirection:"column"
            }}
          >
            <LoadingOutlined style={{ fontSize: "40px",color:"black",padding:"10px" }} />
            <span>Processing please wait</span>
          </div>
        </div>
      )}
    </>
      <Form form={form}>
        <div className={styles.selectsWrapper}>
          <div className={styles.upload}>
            <div className={styles.uploadAvatar}>
              <div className={styles.uploadImage} style={{ width: "100%" }}>
                {imgLocalAvatar && (
                  <div
                    className={styles[`close-img-upload`]}
                    style={{ position: "absolute", right: 20 }}
                  >
                    <CloseOutlined
                      onClick={() => {
                        setAvatar(null)
                        setImgLocalAvatar(AddImg)
                      }}
                      style={{ color: "#B5122E", fontSize: 20 }}
                    />
                  </div>
                )}
                <label
                  style={{ width: "100%", height: "100%" }}
                  htmlFor="file_avatar"
                >
                  <div
                    className={styles.cropped}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <img src={imgLocalAvatar} />
                  </div>
                </label>
                <input
                  style={{ display: "none" }}
                  id="file_avatar"
                  type="file"
                  name="file"
                  accept=".jpg, .jpeg, .png, .jfif"
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
          <div className={styles.selectsAndButton}>
            <div className={styles.selects}>
              <div className={styles.select}>
                <h4 className={styles.name} style={{ color: `${color}` }}>
                  {t('camera')} :
                </h4>
                <Form.Item name="select_camera">
                  <Select
                    mode="multiple"
                    placeholder= {t('camera')}
                    allowClear
                    suffixIcon={<img src={iconExpand} width={12}/>}
                    options={optionsCamera}
                    onChange={addFilterCameraIds}
                    tagRender={tagRender}
                    filterOption={(input, option) =>
                      option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                  </Select>
                </Form.Item>

                <h4 className={styles.name} style={{ color: `${color}` }}>
                  {t('ai_flows')} :
                </h4>
                <Form.Item name="eventType">
                    <Select
                      mode="single"
                      suffixIcon={<img src={iconExpand} width={12}/>}
                      tagRender={tagRenderAI}
                      options={optionsAI}
                      onChange={onChangeEventType}
                      placeholder="AI Flows"
                      style={{ width: '100%' }}
                    ></Select>
                </Form.Item>
              </div>
              <div className={styles.select}>
              <h4 className={styles.name} style={{ color: `${color}` }}>
                  {t('group')} :
                </h4>
                <Form.Item name="group">
                  <Select
                    mode="multiple"
                    placeholder= {t('group')}
                    allowClear
                    suffixIcon={<img src={iconExpand} width={12}/>}
                    options={optionsGroup}
                    onChange={addFilterGroup}
                    tagRender={tagRender}
                    filterOption={(input, option) =>
                      option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                  </Select>
                </Form.Item>
                <h4 className={styles.name} style={{ color: `${color}` }}>
                    {t('time')} :
                  </h4>
                <Form.Item name="ranger_picker">
                  <RangePicker
                    suffixIcon={<img src={iconCalendar} width={12}/>}
                    showTime={{ format: 'HH:mm' }}
                    className={styles.custom_picker}
                    placeholder={[`${t('from')}`, `${t('to')}`]}
                    onChange={(values, event) =>
                      addFilterTimeEvent(values, event)
                    }
                  />
                </Form.Item>
              </div>
            </div>
            <div className={styles.button}>
              {/* <div className={styles.checkbox}>
              </div> */}
              <Button style={{backgroundColor:"#B5122E"}} onClick={() => filterData()} type="primary">
                {t('search')}
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default SearchComponent;
