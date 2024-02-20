import { Button, Form, Image, Input, Select, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useEffect,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import TYPE_ACTION from "../../../../../constants/TypeAction";
import { selectBlackListDetail } from "../../../../../redux/slice/BlackListSlice";
import { selectIdCardData } from "../../../../../redux/slice/IDCardSlice";
import { baseURL } from "../../../../../services/ConfigService/ApiService";
import styles from "./BlackListUpdate.module.scss";
import _ from "lodash";
import ButtonGoBack from "../../../../../components/ButtonGoBack/ButtonGoBack";
import {selectProfileData} from "../../../../../redux/slice/ProfileSlice"
import { SERVICE_PATHS } from "../../../../../constants/paths";
import { useTranslation} from 'react-i18next';
import axios from "axios";
import { useNavigate } from "react-router";
import ImageComponent from "../../../../../components/ImageError";
import PATH from "../../../../../constants/itemsContants";
const BlackListUpdate = () => {
  //---- useEState
  const [listPerson, setListPerson] = useState([]);
  const [listCar, setListCar] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [eventDataLicense, setEventDataLicense] = useState([]);
  const [eventDataUserVehicle, setEventDataUserVehicle] = useState([]);
  const [selectedDataType, setSelectedDataType] = useState([]);
  const [feature, setFeature] = useState("");
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
  




  //---- useEffect
  useEffect(() => {
    loadIdCardData();
    checkFeature();
    loadDataLicense()
    loadDataUserHaveVehicle()
  }, []);

  useEffect(() => {
    location.pathname.includes("view") && setFieldValues();
    location.pathname.includes("update") && setFieldValues();
    location.pathname.includes("view") && setFieldValuesCar();
    location.pathname.includes("update") && setFieldValuesCar();
  }, [blackListDetail]);

  const loadDataLicense = async () => {
    try {
        const response = await axios.get(`${baseURL}${SERVICE_PATHS.PLATE.GET_PLATE_NO_OWNER}`); 
        setEventDataLicense(response.data);
      } catch (error) {
        console.error(error);
      }
  };
  const loadDataUserHaveVehicle = async () => {
    try {
        const response = await axios.get(`${baseURL}${SERVICE_PATHS.PROFILE.GET_PROFILE_HAVE_VEHICLE}`); 
        setEventDataUserVehicle(response.data);
      } catch (error) {
        console.error(error);
      }
  };

  const loadIdCardData = () => {
    dispatch({
      type: TYPE_ACTION.ID_CARD.GET_ID_CARD,
    });
  };

// {id: 324, auxCmts: Array(0), vehicle: {…}, soCmt: 'hau.jina', hoVaTen: 'haudoan', …}
// {id: 36761, number_plate: '59Y3-19728', color: 'None', brand: 'Vehicle', body_style: 'motor'}"
//{id: 336, auxCmts: Array(0), vehicle: null, soCmt: 'person276', hoVaTen: '', …}

  const listAll = eventDataUserVehicle.concat(idCardData,eventDataLicense);
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
      const arr = [...listPerson];
      const car = [...listCar];
      const removeArr = _.remove(arr, (n) => {
        return n.id !== (type.id || value);
      });
      const removeCar = _.remove(car, (n) => {
        return n.id !== (type.id || value);
      });
      setSelectedDataType(prevData => prevData.filter(item => item.id !== (type.id || value)));
      setListPerson(removeArr);
      setListCar(removeCar)
  };

  const onSelect = (value,type) => {
    const data = [type]
    setSelectedDataType(prevData => [...prevData, ...data]);
    const a = [...listPerson];
    const b = [...listPerson];
    const c = [...listCar];
    listAll.map((index) => {
      if (index.id === type.id) {
        if(type.type === 'vehicles'){
          if(type.label === index.number_plate){
            c.push(index)
          }    
        }
        else if(type.type === 'users' && index.vehicle === null){
          const isIdExist = b.find((item) => item.id === index.id);
          if (!isIdExist) {
            b.push(index);
          }
        }
        else if(type.type === 'users' && index.vehicle !== null){
          const isIdExist = b.find((item) => item.id === index.id);
          if (!isIdExist) {
            b.push(index);
          }
        }
      }
    });
    setListPerson(b);
    setListCar(c)
  };

  

  const onFinish = (values) => {
    const formData = new FormData();
    values.id && formData.append("id", values.id);
    values.name && formData.append("name", values.name);
    values.description && formData.append("description", values.description);
    selectedDataType.length && 
      selectedDataType.map((e)=>{
        if(e.type == 'users'){     
          formData.append("users", e.id);
        }
        else if(e.type == 'vehicles'){
          formData.append("vehicles", e.id);
        }
      })

      // for (const [key, value] of formData.entries()) {
      //   console.log(key + ": " + value);
      // }
    feature == "UPDATE" &&
      dispatch({
        type: TYPE_ACTION.BLACKLIST.UPDATE_DETAIL,
        payload: formData,
      });
      navigate('/'+PATH.BLACK_LIST)
    feature == "CREATE" &&
    
      dispatch({
        type: TYPE_ACTION.BLACKLIST.CREATE,
        payload: formData,
      });
      navigate('/'+PATH.BLACK_LIST)
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
  const listAllUpdate = listPerson.concat(listCar)
  listAllUpdate?.map((user) => {
    if(user.soCmt){
      defaultValueSelect.push(user.id);
    }
    else{
      defaultValueSelect.push(user.id);
    }
  });
  idCardData?.map((index) => {
    personList.push({
      label: index.soCmt,
      value: `'${index.id}'`,
      id:index.id,
      type : 'users'
    });
  });

  eventDataLicense?.map((index) => {
    vehicleList.push({
      label: index.number_plate,
      value: index.id,
      id:index.id,
      type : 'vehicles'
    });
  });
  
  eventDataUserVehicle?.map((index)=>{
    userHaveVehicle.push({
      label:`${index.soCmt}  (${index.vehicle.number_plate})`,
      value:`${index.id}`,
      id:index.id,
      type : 'users'
    })
  })
  // console.log("listCard",listCard)

  const mergedList = userHaveVehicle.concat(personList, vehicleList);


  const setFieldValues = () => {
    blackListDetail?.users?.length && setListPerson(blackListDetail.users);
    blackListDetail &&
      form.setFieldsValue({
        id: blackListDetail.id,
        name: blackListDetail.name,
        description: blackListDetail.description,
        users: defaultValueSelect,
      });
  };

  const setFieldValuesCar = () => {
    blackListDetail?.vehicles?.length && setListCar(blackListDetail.vehicles);
    blackListDetail &&
      form.setFieldsValue({
        id: blackListDetail.id,
        name: blackListDetail.name,
        description: blackListDetail.description,
        users: defaultValueSelect,
      });
  };

  return (
    <>
      <div className={styles.container}>
        {/* <h4 className={styles.header}>
          {feature == "UPDATE" && `${t('edit')}`}
          {feature == "VIEW" && `${t('info')}`}
          {feature == "CREATE" && `${t('new_profile')}`}
        </h4> */}
        <div className={styles.form}>
          <Form form={form} onFinish={onFinish}>
            <div className={styles.session1}>
              {feature != "CREATE" && (
                <div className={styles.formItem}>
                  <h4>ID:</h4>
                  <Form.Item name="id">
                    <Input
                      placeholder="ID"
                      disabled
                      className={styles.item}
                    ></Input>
                  </Form.Item>
                </div>
              )}
              <div className={styles.formItem}>
                <h4>{t('group_name')}:</h4>
                <Form.Item name="name">
                  <Input
                    placeholder={t('group_name')}
                    className={styles.item}
                    disabled={disabled}
                  ></Input>
                </Form.Item>
              </div>
              <div className={styles.formItem}>
                <h4>{t('description')}:</h4>
                <Form.Item name="description">
                  <Input placeholder={t('description')} disabled={disabled}></Input>
                </Form.Item>
              </div>
            </div>
            <div className={styles.session2}>
              <h3 className={styles.sessionHeader}>
                <span style={{ color: "red" }}>
                  {feature != "CREATE" && blackListDetail?.users?.length}
                </span>
                {` ${t('identity_object_list')} :`}
              </h3>
              <Form.Item name="users">
                <Select
                  mode="multiple"
                  showArrow
                  tagRender={tagRender}
                  options={mergedList}
                  placeholder={t('identity_object_list')}
                  onSelect={(value,type) => onSelect(value,type)}
                  onDeselect={(value,type) => onDeselect(value,type)}
                  filterOption={(input, option) =>
                    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                ></Select>
              </Form.Item>
              {!disabled && (
                <div style={{ textAlign: "right" }}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" style={{background:"red"}}>
                    {t('save')}
                    </Button>
                  </Form.Item>
                </div>
              )}
              <div className={styles.user}>
                {listPerson?.map((user) => {
                  return (
                    <div className={styles.card}>
                      <div className={styles.cardHeader}>
                        <div style={{height:"150px",width:"150px",border:"1px solid #ccc",overflow:"hidden",display:"flex",justifyContent:"center",alignItems:"center"}}>
                          <ImageComponent
                            height={150}
                            url={user.image}
                          />
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
                    </div>
                  );
                })}
                {listCar?.map((vehicle) => {
                  return (
                    <div className={styles.card} style={{height:"max-content"}}>
                      <div className={styles.cardHeader}>
                        <div style={{height:"150px",width:"150px",border:"1px solid #ccc",overflow:"hidden",display:"flex",justifyContent:"center",alignItems:"center"}}>
                          <ImageComponent
                            height={150}
                            url={vehicle.image}
                          />
                          </div>
                        <div className={styles.info}>
                          <span>ID: {vehicle.id}</span>
                          <span>{t('license_plate')}: {vehicle.number_plate}</span>
                          <span>
                          {t('color')}: {vehicle.color ? vehicle.color : empty}
                          </span>
                          <span>
                          {t('brand')}: {vehicle.brand ? vehicle.brand : empty}
                          </span>
                          <span>
                          {t('type')}: {vehicle.body_style ? vehicle.body_style : empty}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Form>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default BlackListUpdate;
