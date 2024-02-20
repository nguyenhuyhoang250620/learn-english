import { Button, Form, Image, Input, Select, Tag,Row,Col } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useEffect,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import TYPE_ACTION from "../../../../constants/TypeAction";
import { selectBlackListDetail } from "../../../../redux/slice/BlackListSlice";
import { selectIdCardData } from "../../../../redux/slice/IDCardSlice";
import { baseURL } from "../../../../services/ConfigService/ApiService";
import styles from "./BlackListUpdate.module.scss";
import _ from "lodash";
import ButtonGoBack from "../../../../components/ButtonGoBack/ButtonGoBack";
import {selectProfileData} from "../../../../redux/slice/ProfileSlice"
import { SERVICE_PATHS } from "../../../../constants/paths";
import { useTranslation} from 'react-i18next';
import axios from "axios";
import { useNavigate } from "react-router";
import ImageComponent from "../../../../components/ImageError";
import PATH from "../../../../constants/itemsContants";
import CustomButtonCancel from "../../../../components/CustomButton/CustomButtonCancel";
import CustomButtonSave from "../../../../components/CustomButton/CustomButtonSave";
import Label from "../../../../common/component/Label";
import image_not from "../../../../assets/images/image_not_found.png"
import { selectPlateNoOwner } from "../../../../redux/slice/PlateSlice";
import iconExpand from "../../../../assets/images_new/expand.png"



const DefaultProfile = {
  name: null,
  description: null,
  users:[],
  vehicles: [],
};
const BlackListUpdate = () => {
  //---- useEState
  const [listPerson, setListPerson] = useState([]);
  const [listCar, setListCar] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [eventDataLicense, setEventDataLicense] = useState([]);
  const [eventDataUserVehicle, setEventDataUserVehicle] = useState([]);
  const [eventDataUser, setEventDataUser] = useState([]);
  const [eventDataAll, setEventDataAll] = useState([]);
  const [selectedDataType, setSelectedDataType] = useState([]);
  const [selectedDataTypeKey, setSelectedDataTypekey] = useState([]);
  const [feature, setFeature] = useState("");
  const [dataGet, setDataget] = useState();
  const [idGroup,setIdGroup] = useState()
  const dataLicenseNoOwner = useSelector(selectPlateNoOwner)
  //---- Constants
  const [form] = Form.useForm();
  const empty = <span className={styles.empty}>-</span>;
  const personList = [];
  const vehicleList = []
  const userHaveVehicle = []
  const options = []
  const defaultValueSelect = [];
  const defaultValueSelectCar = [];
  const location = useLocation();
  const {t} = useTranslation()
  const { id } = useParams();
  const navigate = useNavigate();
  //---- Selectors
  const blackListDetail = useSelector(selectBlackListDetail);
  const idCardData = useSelector(selectIdCardData);
  const formRef = useRef(null);
  




  //---- useEffect
  useEffect(() => {
    checkFeature();
    loadDataLicenseNoOwner()
    loadDataUserHaveVehicle()
    loadDataUserNoVehicle()
  }, []);

  useEffect(() => {
    if(location.pathname.includes("view")){
      setFieldValues(location.state.editData)
    }
    if(location.pathname.includes("update")){
      setFieldValues(location.state.editData)
    }
    // location.pathname.includes("view") && setFieldValuesCar();
  }, [blackListDetail]);

  const loadDataLicenseNoOwner = async () => {
        await dispatch({
          type: TYPE_ACTION.PLATE.GET_PLATE_NO_OWNER,
          payload: {},
        });
      };
  const loadDataUserHaveVehicle = async () => {
    try {
        const response = await axios.get(`${baseURL}${SERVICE_PATHS.PROFILE.GET_PROFILE_HAVE_VEHICLE}`); 
          setEventDataUserVehicle(response.data);
        
      } catch (error) {
        console.error(error);
      }
  };
  const loadDataUserNoVehicle = async () => {
    try {
        const response = await axios.get(`${baseURL}${SERVICE_PATHS.PROFILE.GET_PROFILE_NO_VEHICLE}`); 
        setEventDataUser(response.data);

      } catch (error) {
        console.error(error);
      }
  };


  const dispatch = useDispatch();

  //---- Functions
  const checkFeature = () => {
    if (location.pathname.includes("update")) {
      setDisabled(false);
      setFeature("UPDATE");
    }
    if (location.pathname.includes("new")) {
      setFeature("CREATE");
      setDisabled(false);
    }
    if (location.pathname.includes("view")) {
      setFeature("VIEW");
      setDisabled(true);
    }
  };
  const onClose = (value) => {
    const arr = [...listPerson];
    const removeArr = _.remove(arr, (n) => {
      return n.id !== value;
    });
    setListPerson(removeArr);
  };

  const onDeselect = (value,type) => {
      const arr = [...eventDataAll];
      const removeArr = _.remove(arr, (n) => {
        if (n.soCmt) {
          return n.soCmt !== value;
        } else if (n.number_plate) {
          return n.number_plate !== value;
        }
      });
      setEventDataAll(removeArr)
  };

  const onSelect = async (value,type) => {
    let dataGet;
      if(type.type === 'HUMAN&VEHICLE'){
        const response = await axios.get(`${baseURL}${SERVICE_PATHS.PROFILE.GET_PROFILE_HAVE_VEHICLE}?soCmts=${value}`);
        dataGet=response.data
      } 
      else if(type.type === 'HUMAN'){
        const response = await axios.get(`${baseURL}${SERVICE_PATHS.PROFILE.GET_PROFILE_NO_VEHICLE}?soCmts=${value}`);  
        dataGet=response.data
      } 
      else if(type.type === 'ANPR'){
        const response = await axios.get(`${baseURL}${SERVICE_PATHS.PLATE.GET_PLATE_NO_OWNER}?number_plate=${value}`); 
        dataGet=response.data
      }
      if(dataGet !== undefined){
        setEventDataAll(prevData => [...prevData, ...dataGet]);
        setSelectedDataType(prevData => [...prevData, ...dataGet])
      }
  };

  const handleChange =(value)=>{
    if(value.length===0){ 
      setEventDataAll([])
    }
  }
  

  const onFinish = () => {
    form.validateFields().then(async values => {
      const listuser = []
      const listvehicle = []
      const obj = {...values};
      selectedDataType.map((index)=>{
        obj.users.map((element)=>{
          if("number_plate" in index){
            if(index.number_plate === element){
              listvehicle.push(index.id)
            }
          }
          else{
            if(index.soCmt === element){
              listuser.push(index.id)
            }
          }
        })
      })
      const formData = new FormData();
        idGroup && formData.append("id", idGroup);
        obj.name && formData.append("name", obj.name);
        formData.append("description", obj.description);
        listuser.length && 
        listuser.map((e)=>{  
          formData.append("users", e);
        })
        listvehicle.length && 
        listvehicle.map((e)=>{
          formData.append("vehicles", e);
        })

          // for (const [key, value] of formData.entries()) {
          //   console.log(key + ": " + value);
          // }
        if(feature === "UPDATE"){
          await dispatch({
            type: TYPE_ACTION.BLACKLIST.UPDATE_DETAIL,
            payload: formData,
          });
          navigate('/'+PATH.BLACK_LIST)
        }
        else if(feature === "CREATE"){
          await dispatch({
            type: TYPE_ACTION.BLACKLIST.CREATE,
            payload: formData,
          });
          navigate('/'+PATH.BLACK_LIST)
        }
        })
  };

  const tagRender = (props) => {
    const { label, value, closable } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={"blue"}
        onMouseDown={onPreventMouseDown}
        onClose={() => onClose(value)}
        style={{
          marginRight: 3,
        }}
      >
        {label}
      </Tag>
    );
  };


  const mergedList = [];
  eventDataUserVehicle?.map((index)=>{
    mergedList.push({
      label:`${index.soCmt}  (${index.vehicle.number_plate})`,
      value:index.soCmt,
      type:"HUMAN&VEHICLE"
    })
  })
  eventDataUser?.map((index) => {
    mergedList.push({
      label: index.soCmt,
      value: index.soCmt,
      type:"HUMAN"
    });
  });

  {
    Array.isArray(dataLicenseNoOwner) && dataLicenseNoOwner?.map((index) => {
      mergedList.push({
        label: index.number_plate,
        value: index.number_plate,
        type:"ANPR"
      });
    });
  }
  
 
  // console.log("listCard",listCard)




  const setFieldValues = (data) => {
    const option = []
    const merge = []
    const idVehicle = [];
    const vehiclesold= [];
    const dataTypekey = []
    if(data){
      setIdGroup(data.id)
      data.users.map((index)=>{
        option.push(index.soCmt)
        merge.push(index)
        if(index.vehicle){
          idVehicle.push(index.vehicle)
          dataTypekey.push({
            label: index.soCmt,
            value: index.soCmt,
            type:"HUMAN&VEHICLE"
          })
        }
        else{
          dataTypekey.push({
            label: index.soCmt,
            value: index.soCmt,
            type:"HUMAN"
          })
        }
      })
      data.vehicles.map((index)=>{
        vehiclesold.push(index)
      })
      const listvehicle =vehiclesold.filter(itemB => !idVehicle.some(itemA => itemA.id === itemB.id));
      listvehicle.map((index)=>{
        option.push(index.number_plate)
        merge.push(index)
        dataTypekey.push({
          label: index.number_plate,
          value: index.number_plate,
          type:"ANPR"
        })
      })
      form.setFieldsValue({
        name: data.name,
        description: data.description,
        users: option,
      });
      setSelectedDataType(merge)
      setEventDataAll(merge)
      setSelectedDataTypekey(dataTypekey)
    }
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.form}>
          <Form form={form} ref={formRef} initialValues={DefaultProfile}>
            <Col>
                <Label title ={t('group_name')}/>
                <Form.Item name="name">
                  <Input
                    placeholder={t('group_name')}
                    className={styles.item}
                    readOnly = {disabled}
                  ></Input>
                </Form.Item>

                <Label title ={t('description')}/>
                <Form.Item name="description">
                  <Input placeholder={t('description')} readOnly = {disabled}></Input>
                </Form.Item>               
                <Label title ={t('identity_object_list')}/>
                <Form.Item name="users">
                  <Select
                    mode="multiple"
                    showArrow
                    allowClear
                    suffixIcon={<img src={iconExpand} width={12}/>}
                    tagRender={tagRender}
                    options={mergedList}
                    className={disabled ? `${styles.read_only_select}` : ""}
                    placeholder={t('identity_object_list')}
                    onSelect={(value,type) => onSelect(value,type)}
                    onDeselect={(value,type) => onDeselect(value,type)}
                    onChange={(value)=>handleChange(value)}
                    filterOption={(input, option) =>
                      option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  ></Select>
                </Form.Item>
              
              <Row justify="end">
                {feature == "VIEW" && (
                    <CustomButtonCancel title={t('cancel')} onClick={() => navigate(-1)}/>
                    
                )}
                {feature == "UPDATE" && (
                      <div style={{display:"flex",alignItems:"center"}}>
                      <CustomButtonCancel title={t('cancel')} onClick={() => navigate(-1)}/>
                      <CustomButtonSave title={t('update')} onClick={() => onFinish()}/>
                  </div>
                )}
                {feature == "CREATE" && (
                    <>
                        <div style={{display:"flex",alignItems:"center"}}>
                            <CustomButtonCancel title={t('cancel')} onClick={() => navigate(-1)}/>
                            <CustomButtonSave title={t('save')} onClick={() => onFinish()}/>
                        </div>
                    </>
                )}
            </Row>           

            </Col>
          </Form>
        </div>
        <div className={styles.session2}>
                {eventDataAll?.slice().reverse().map((user) => {
                  return ( 
                    ("soCmt" in user)?
                    <div className={styles.card}>
                      <div className={styles.cardHeader}>
                        <div style={{height:"150px",width:"150px",border:"1px solid #ccc",overflow:"hidden",display:"flex",justifyContent:"center",alignItems:"center"}}>
                        {
                         user.image? <Image
                              style={{ width: "auto", height: "auto",maxWidth:"150px",maxHeight:"150px" }}
                              src={`${baseURL}${user.image}`}
                              onLoad={(e) => {
                                e.target.style.display = 'block';
                              }}
                              onError={(e)=>{
                                e.target.src = image_not
                              }}
                            ></Image>:<Image src={image_not}></Image>
                        }
                        </div>
                        <div className={styles.info}>
                          <span>ID: {user.id}</span>
                          <span>{t('username')}: {user.soCmt}</span>
                          <span>
                            {t('name')}: {user.hoVaTen ? user.hoVaTen : empty}
                          </span>
                          <span>
                            {t('gander')}: {user.gioiTinh ? user.gioiTinh : empty}
                          </span>
                        </div>
                      </div>
                      <div className={styles.info}>
                        <span>{t('date_of_birth')}: {user.namSinh ? user.namSinh : empty}</span>
                        <span>{t('place_of_origin')}: {user.queQuan ? user.queQuan : empty}</span>
                        <span>
                          {t('nationality')}: {user.quocTich ? user.quocTich : empty}
                        </span>
                        <span>
                          {t('misshapen')}:{" "}
                          {user.dacDiemNhanDang ? user.dacDiemNhanDang : empty}
                        </span>
                        <span>{t('permanent_resident')}: {user.noiTru ? user.noiTru : empty}</span>
                        <span>{t('license_plate')}: {user.vehicle?.number_plate ? user.vehicle?.number_plate : empty}</span>
                        <span>Card code: {user.ngayCap ? user.ngayCap : empty}</span>
                      </div>
                    </div>:<div className={styles.card} style={{height:"max-content"}}>
                      <div className={styles.cardHeader}>
                        <div style={{height:"150px",width:"150px",border:"1px solid #ccc",overflow:"hidden",display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <Image src={image_not}></Image>
                          </div>
                        <div className={styles.info}>
                          <span>ID: {user.id}</span>
                          <span>{t('license_plate')}: {user.number_plate}</span>
                          <span>
                          {t('color')}: {user.color ? user.color : empty}
                          </span>
                          <span>
                          {t('brand')}: {user.brand ? user.brand : empty}
                          </span>
                          <span>
                          {t('type')}: {user.body_style ? user.body_style : empty}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
        </div>
      </div>
    </>
  );
};

export default BlackListUpdate;
