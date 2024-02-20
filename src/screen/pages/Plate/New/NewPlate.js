import { Button, Form, Input, Select ,Checkbox,Row,Col,Tag,message} from "antd";
import axios from "axios";
import { useState,useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import ButtonGoBack from "../../../../components/ButtonGoBack/ButtonGoBack";
import TYPE_ACTION from "../../../../constants/TypeAction";
import { selectPlateDetail } from "../../../../redux/slice/PlateSlice";
import styles from "./NewPlate.module.scss";
import CustomSelect from "../CustomSelect/CustomSelect";
import { selectBlackList } from "../../../../redux/slice/BlackListSlice";
import bike from "../../../../assets/images_new/bike.png"
import motor from "../../../../assets/images_new/motorcycle.png"
import car from "../../../../assets/images_new/carB.png"
import trucks from "../../../../assets/images_new/truck.png"
import bus from "../../../../assets/images_new/bus.png"
import { useTranslation} from 'react-i18next';
import { useNavigate } from "react-router";
import PATH from "../../../../constants/itemsContants";
import CustomButtonSave from "../../../../components/CustomButton/CustomButtonSave";
import CustomButtonCancel from "../../../../components/CustomButton/CustomButtonCancel";
import Label from "../../../../common/component/Label";
import { selectProfileData } from "../../../../redux/slice/ProfileSlice";
import { baseURL } from "../../../../services/ConfigService/ApiService";
import { SERVICE_PATHS } from "../../../../constants/paths";
import { CarOutlined } from "@ant-design/icons";
import iconExpand from "../../../../assets/images_new/expand.png"


const DefaultProfile = {
  color: null,
  brand: null,
  owner:null,
  number_plate: null,
  body_style: null,
  group:[]
};
const NewPlate = () => {
  //---- Constants
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const formRef = useRef(null);

  //--- State
  const fake = '';
  const [feature, setFeature] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [disabledLicense, setDisabledLicense] = useState(false);
  const [isInfo, setInfo] = useState(false);
  const [isCheckGroup, setIsCheckGroup] = useState(false);
  const [isCheckGroupInfo, setIsCheckGroupInfo] = useState(false);
  const [idPlate, setIdPlate] = useState();
  const [ownerOld, setOwnerOld] = useState();
  const [dataValue, setDataValue] = useState();
  const [listGroupOld,SetListGroupOld] = useState([])
  const blackListData = useSelector(selectBlackList);
  const {t} = useTranslation()
  const profileData = useSelector(selectProfileData);
  const profileTypes = fake;

  const listDataOwner =[];
  //---- Dispatchs
  const dispatch = useDispatch();

  //---- Selectors
  const plateDetail = useSelector(selectPlateDetail);

  const filterRef = useRef({
    soCmts: null,
    ids: null,
    statuses: null,
    page_idx: null,
    page_size: null,
  });

  //---- Functions
  

  useEffect(()=>{
    checkFeature()
  },[])

  const checkFeature = () => {
    location.pathname.includes("new") && setFeature("CREATE");
    if(location.pathname.includes("update")){
      setFieldValues(location.state.viewData)
      setFeature("UPDATE")
      setIsCheckGroup(false)
      setDisabledLicense(true)
      setIsCheckGroupInfo(false)
    };
    if(location.pathname.includes("view")){
      setFieldValues(location.state.viewData)
      setFeature("VIEW")
      setDisabled(true)
      setIsCheckGroup(false)
      setIsCheckGroupInfo(true)
      setDisabledLicense(true)
    };
  };

  const setFieldValues = (data) => {
    setIdPlate(data.id)
    SetListGroupOld(data.group)
    data.owner&&setOwnerOld(data.owner)
    data.owner&&setIsCheckGroup(true)
    form.setFieldsValue({
      color: data.color? data.color.toLowerCase():[],
      brand: data.brand === 'Vehicle' ?[]:data.brand,
      number_plate: data.plateNumber,
      body_style:data.bodyStyle ? data.bodyStyle.split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "):[],
      owner:data.owner?data.owner:[],
      group:data.group?data.group:[]
    });
  };
  const getColorList = () => {
    return [
      {
        color:"Red",
        code:"red"
      },
      {
        color:"Green",
        code:"green"
      },
      {
        color:"Blue",
        code:"blue"
      },
      {
        color:"Dark",
        code:"black"
      },
      {
        color:"Orange",
        code:"orange"
      },
      {
        color:"Yellow",
        code:"yellow"
      },
      {
        color:"Light",
        code:"white"
      },
    ].map(option => ({
      value:option.code,
      label: <CustomOption option={option} />,
    }));
  };

  const CustomOption = ({ option }) => (
    <div style={{display:"flex"}}>
      <div style={{height:"10px",width:"10px",padding:"10px",background:`${option.code}`,border:"1px solid grey",borderRadius:"50%"}}></div>
      <span style={{paddingLeft:"10px",fontWeight:"lighter"}}>{t(`${option.code}`)}</span>
      {/* Thêm các thành phần khác và truyền dữ liệu vào đây */}
    </div>
  );


  const getTypeList = () => {
    return [
      {
        vehical:"bike",
        code:bike
      },
      {
        vehical:"motor",
        code:motor
      },
      {
        vehical:"car",
        code:car
      },
      {
        vehical:"truck",
        code:trucks
      },
      {
        vehical:"bus",
        code:bus
      },
    ].map(option => ({
      value:option.vehical,
      label: <CustomOptionType option={option} />,
    }));
  };

  const CustomOptionType = ({ option }) => (
    <div style={{display:"flex"}}>
      <img style={{height:"25px",width:"25px"}} src={option.code} alt="Image" />
      <span style={{paddingLeft:"10px",fontWeight:"lighter"}}>{t(`${option.vehical}`)}</span>
      {/* Thêm các thành phần khác và truyền dữ liệu vào đây */}
    </div>
  );

  const getBrandList = () => {
    return [
      {
        vehical:"Toyota",
        code:1
      },
      {
        vehical:"Honda",
        code:2
      },
      {
        vehical:"Hyundai",
        code:3
      },
      {
        vehical:"Audi",
        code:4
      },
      {
        vehical:"BMW",
        code:5
      },
      {
        vehical:"Ford",
        code:6
      },
      {
        vehical:"Kia",
        code:7
      },
      {
        vehical:"Lexus",
        code:8
      },
      {
        vehical:"Nissan",
        code:9
      },
      {
        vehical:"Vinfast",
        code:10
      },
      {
        vehical:"Mitsubishi",
        code:11
      },
      {
        vehical:"Mercedes",
        code:12
      },
      {
        vehical:"Suzuki",
        code:13
      },
      {
        vehical:"Mazda",
        code:14
      },
      {
        vehical:"Peugeot",
        code:15
      },
    ].map(option => ({
      value:option.vehical,
      label: <CustomOptionBrand option={option.vehical} />,
    }));
  };

  const CustomOptionBrand = ({ option }) => (
    <div style={{display:"flex",alignItems:"center"}}>
      <CarOutlined style={{color:"#B5122E"}}/>
      <span style={{paddingLeft:"10px",fontWeight:"lighter"}}>{option}</span>
      {/* Thêm các thành phần khác và truyền dữ liệu vào đây */}
    </div>
  );

  const getBlackList = () => {
    const options = [];
    blackListData?.map((item) => {
        options.push({
            label: item.name,
            value: item.id,
        });
    })
    return options;
};


{
  Array.isArray(profileData) && profileData?.map((item) => {
    if(!item.vehicle){
      listDataOwner.push({
        label: item.soCmt,
        value: item.id,
    });
    }
  })
}

const tagRender = (props) => {
  const { label, value, closable } = props;

  if (listGroupOld.includes(value)) {
      return <Tag>{label}</Tag>;
    }
  return (
    <Tag
      color={"blue"}
      // onMouseDown={onPreventMouseDown}
      // onClose={() => onClose(value)}
      // closable={closable}
      style={{
        marginRight: 3,
      }}
    >
      {label}
    </Tag>
  );
};

const tagRenders = (props) => {
  const { label, value, closable } = props;

  return (
    <Tag
      color={"blue"}
      // onMouseDown={onPreventMouseDown}
      // onClose={() => onClose(value)}
      closable={closable}
      style={{
        marginRight: 3,
      }}
    >
      {label}
    </Tag>
  );
};
const getGroupToOwner =(value)=>{
    const option =[]
      blackListData?.map((index) => {
        index.users?.map((element) => {
          if (element.id === value) {
            option.push(index.id)
            form.setFieldsValue({
              group: option,
            });
          }
        });
    });
    return option

}
const changeOwner = (value) => {
  if(value){
    const check = getGroupToOwner(value)
    if(check.length>0){
      setIsCheckGroup(true)
    }
    else{
      form.setFieldsValue({
        group: [],
      });
      setIsCheckGroup(true)
    }
  }else{
    setIsCheckGroup(false);
    form.setFieldsValue({
      group:[]
    });
  }
};


const onFinish = () => {
  formRef.current.validateFields()
        .then((values) => {
          form.validateFields().then(async values => {
            const obj = {...values};
              if (feature === "CREATE") {
                const callBack = (data)=>{
                  if(obj.owner){
                    const formData = new FormData();
                    formData.append("id",obj.owner)
                    formData.append("vehicle",data.id)
                    dispatch({type: TYPE_ACTION.PROFILE.UPDATE_PROFILE, payload: formData })
                  }else{
                    if (obj.group.length >0) {
                      obj.group.map((element)=>{
                          const list = blackListData.find(item => item.id == element);
                          const formData = new FormData();
                          list.id && formData.append("id", list.id);
                          list.description && formData.append("description", list.description);
                          list.users.length &&
                          list.users.map((user) => {
                              formData.append("users", user.id);
                          });
                          list.vehicles.length &&
                          list.vehicles.map((vehicle) => {
                              formData.append("vehicles", vehicle.id);
                          });
                          formData.append("vehicles", data.id);
                          dispatch({type: TYPE_ACTION.BLACKLIST.UPDATE_DETAIL, payload: formData })
                      })
                    }
                  }
                navigate('/'+PATH.PLATE)
              }
              dispatch({
                type: TYPE_ACTION.PLATE.NEW_PLATE,
                payload: {obj,callBack},
              });              
            }    
            if (feature === "UPDATE") {
              let idOwnerOld;
              obj.id = idPlate
              obj.number_plate = null
              const trackingListNew = new Set(listGroupOld);
              const trackingListOld = new Set(obj.group);
              const differenceSet = new Set([...trackingListOld].filter((item) => !trackingListNew.has(item)));
              const trackingListDifference = Array.from(differenceSet);
              const callBack = async (data)=>{
                if(typeof obj.owner !== "string"){
                  const response = await axios.get(`${baseURL}${SERVICE_PATHS.PROFILE.GET_PROFILE}?soCmts=${ownerOld}`); 
                  response.data?.map((index)=>{
                    console.log(index)
                    idOwnerOld = index.id
                  })
                  const formData = new FormData();
                  const formDataNew = new FormData();
                  console.log("idOwnerOld",idOwnerOld)
                  formDataNew.append("id",idOwnerOld)
                  formData.append("id",obj.owner)
                  formData.append("vehicle",data.id)
                  dispatch({type: TYPE_ACTION.PROFILE.UPDATE_PROFILE, payload: formData })
                  dispatch({type: TYPE_ACTION.PROFILE.UPDATE_PROFILE, payload: formDataNew })
                }
                if (trackingListDifference.length >0) {
                  trackingListDifference.map((element)=>{
                      const list = blackListData.find(item => item.id == element);
                      const formData = new FormData();
                      list.id && formData.append("id", list.id);
                      list.description && formData.append("description", list.description);
                      list.users.length &&
                      list.users.map((user) => {
                          formData.append("users", user.id);
                      });
                      list.vehicles.length &&
                      list.vehicles.map((vehicle) => {
                          formData.append("vehicles", vehicle.id);
                      });
                      formData.append("vehicles", idPlate);
                      dispatch({type: TYPE_ACTION.BLACKLIST.UPDATE_DETAIL, payload: formData })
                  })
                }
              navigate('/'+PATH.PLATE)
            }
            dispatch({
              type: TYPE_ACTION.PLATE.UPDATE_PLATE,
              payload: {obj,callBack},
            });              
          }   
          });
          // const formData = new FormData();          
          // if (plateDetail) {
          //   plateDetail.number_plate != values.number_plate &&
          //     formData.append("number_plate", values.number_plate);
          // }
          
          // formData.append("id", plateDetail.id);
        
        
        
          // if (feature === "UPDATE") {
          //   navigate('/'+PATH.PLATE)
          //   dispatch({
          //     type: TYPE_ACTION.PLATE.UPDATE_PLATE,
          //     payload: formData,
          //   });
          // }

        })
        .catch((error) => {
          console.log('Failed:', error);
          // Xử lý khi validate không thành công
          message.error('Form validation failed!');
      });
};




  return (
    <div className={styles.container} style={{display:"flex",justifyContent:"center",marginTop:"100px"}}>
      <div className={styles.form} style={{width:"30%"}}>
        <Form form={form} ref={formRef} initialValues={DefaultProfile}>
          <Col >
              <Label
                  title={t('license_plate')}
              />
              <Form.Item
                name="number_plate"
                required
                rules={[
                  { required: true, message: "This field is required!" },
                ]}
              >
                <Input
                  placeholder={t('license_plate')}
                  readOnly={disabledLicense}
                  style={{height:"35px"}}
                ></Input>
              </Form.Item>


              <Label
                  title={t('owner')}
              />
              <Form.Item
                name="owner"
                // rules={[
                //   { required: true, message: "This field is required!" },
                // ]}
              >
               <Select
                  className={disabled ? `${styles.read_only_select}` :styles.select}
                  showSearch
                  showArrow
                  allowClear
                  suffixIcon ={<img src={iconExpand} width={12}/>}
                  placeholder={t('owner')}
                  tagRender={tagRenders}
                  options={listDataOwner}
                  onChange={(value)=>changeOwner(value)}
                    filterOption={(input, option) =>
                      option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
              </Select>
              </Form.Item>
              <Label
                  title={t('group')}
              />
              <Form.Item
                name="group"
                // rules={[
                //   { required: true, message: "This field is required!" },
                // ]}
              >
                  <Select
                      className={isCheckGroupInfo ? `${styles.read_only_select}`: styles.select }
                      disabled={isCheckGroup}
                      showArrow
                      autoFocus
                      suffixIcon ={<img src={iconExpand} width={12}/>}
                      tagRender={tagRender}
                      value={listGroupOld}
                      placeholder={t('group_name')} 
                      mode="multiple"
                      options={getBlackList().map((option) =>
                        listGroupOld.includes(option.value)
                          ? { ...option, disabled: true }
                          : option
                      )}
                    >
                  </Select>
              </Form.Item>


              <Label
                  title={t('color')}
              />
              <Form.Item
                name="color"
              >
               <Select
                  className={disabled ? `${styles.read_only_select}` : styles.select}
                  autoFocus
                  suffixIcon ={<img src={iconExpand} width={12}/>}
                  placeholder={t('color')} 
                  allowClear
                  options={getColorList()}
                >
              </Select>
              </Form.Item>


              <Label
                  title={t('brand')}
              />
              <Form.Item
                name="brand"
              >
                <Select
                  className={disabled ? `${styles.read_only_select}` : styles.select}
                  autoFocus
                  suffixIcon ={<img src={iconExpand} width={12}/>}
                  placeholder={t('brand')}
                  options={getBrandList()}
                  allowClear
                >
              </Select>
              </Form.Item>
              <Label
                  title={t('type')}
              />
              <Form.Item
                name="body_style"
              >
                <Select
                  autoFocus
                  suffixIcon ={<img src={iconExpand} width={12}/>}
                  placeholder={t('type')}
                  className={disabled ? `${styles.read_only_select}` : styles.select}
                  options={getTypeList()}
                  allowClear
                >
                  {/* {_.map(profileTypes, item => (
                      <Option
                          key={item.trackingList}
                          value={item.trackingList}
                      >
                          {item.identity}
                      </Option>
                  ))} */}
              </Select>
              </Form.Item>
          </Col>
        </Form>
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
      </div>
    </div>
  );
};
export default NewPlate;
