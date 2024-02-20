import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  FilterFilled,
  FilterOutlined,
  PlusOutlined,
  ArrowRightOutlined,
  SearchOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import { Button, Collapse, Table, Tooltip, Form, Select ,Tag, AutoComplete,Input,message,Modal,Space} from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TYPE_ACTION from "../../../../constants/TypeAction";
import {
  selectPlateData,
  selectPlateTotalRecord,
} from "../../../../redux/slice/PlateSlice";
import styles from "./Plate.module.scss";
import SearchComponent from "../SearchComponent/SearchComponent";
import { useNavigate } from "react-router";
import PATH from "../../../../constants/itemsContants";
import { colors } from "../../../../common/colors/colors";
import { useTranslation} from 'react-i18next';
import CustomButtonSave from "../../../../components/CustomButton/CustomButtonSave";
import { selectBlackList } from "../../../../redux/slice/BlackListSlice";
import { selectProfileData } from "../../../../redux/slice/ProfileSlice";
import { SERVICE_PATHS } from "../../../../constants/paths";
import { baseURL } from "../../../../services/ConfigService/ApiService";
import axios from "axios";
import CustomButtonCancel from "../../../../components/CustomButton/CustomButtonCancel";
import filter_normal from "../../../../assets/images/filter_normal.png"
import filter_active from "../../../../assets/images/filter_active_new.png"
import iconSearch from "../../../../assets/images_new/search.png"
import iconInfo from "../../../../assets/images_new/info.png"
import iconEdit from "../../../../assets/images_new/editing.png"
import iconTrash from "../../../../assets/images_new/trash.png"
const Plate = () => {
  //----- State
  const [collapsed, setCollapsed] = useState(0);

  const [pages,setPages] = useState(1)
  
  //---- Dispatchs
  const dispatch = useDispatch();

  //---- Selectors
  //   const plateData = useSelector(selectPlateData);
  const totalRecord = useSelector(selectPlateTotalRecord);
  const blackListData = useSelector(selectBlackList);
  const profileData = useSelector(selectProfileData);
  const plateData = useSelector(selectPlateData);
  const [rotate, setRotate] = useState(0);
  const [eventData, setEventData] = useState([]);
  const [eventDataSearch, setEventDataSearch] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [idDelete, setIdDeleter] = useState();
  const {t} = useTranslation()
  const [loading,setLoading] = useState(false)
  const [filter,setFilter] = useState(false)


  //---- Ref
  const filterRef = useRef({
    number_plate: null,
    color: null,
    brand: null,
    body_style: null,
    page_idx:1,
    page_size:12,
    exact:false
  });
  const filterRefBlackList = useRef({
    id: null,
    name: null,
    users: null,
  });

  // const filterRefProfile = useRef({
  //   soCmts: null,
  //   ids: null,
  //   statuses: null,
  //   page_idx: 1,
  //   page_size: 10,
  // });
  //--- Constants
  const navigate = useNavigate();
  const { Panel } = Collapse;
  const data = [];
  const dataInfo = [];
  const [form] = Form.useForm();
  const columns = [
    {
      title: <div className={styles.tableHeader}>STT</div>,
      dataIndex: "id",
    },
    {
      title: <div className={styles.tableHeader}>{t('license_plate')}</div>,
      dataIndex: "plateNumber",
    },
    {
      title: <div className={styles.tableHeader}>{t('owner')}</div>,
      dataIndex: "owner",
      width:150
    },
    {
      title: <div className={styles.tableHeader}>{t('color')}</div>,
      dataIndex: "color",
    },
    {
      title: <div className={styles.tableHeader}>{t('brand')}</div>,
      dataIndex: "brand",
    },
    {
      title: <div className={styles.tableHeader}>{t('type')}</div>,
      dataIndex: "bodyStyle",
    },
    {
      title: <div className={styles.tableHeader}>{t('group')}</div>,
      dataIndex: "group",
      width:320
    },
    {
      title: <div className={styles.tableHeader}>{t('action')}</div>,
      dataIndex: "functions",
    },
  ];

  //---- Functions
  const onChangePagination = (current,size) => {
    filterRef.current.page_size = size;
    filterRef.current.page_idx = current;
    loadPlateData();
  }
  
  const loadPlateData = () => {
    dispatch({
      type: TYPE_ACTION.PLATE.GET_PLATE,
      payload: filterRef.current,
    });
    dispatch({
      type: TYPE_ACTION.BLACKLIST.GET_BLACKLIST,
      payload: filterRefBlackList.current,
    });
    dispatch({
      type: TYPE_ACTION.PROFILE.GET_PROFILE,
      payload: {},
    });
    setCollapsed(false)
  };

  const loadData = async () => {
    const arr =[];
    var filterString = "?";
    const body = filterRef.current;
    Object.keys(body).map((index) => {
      if (filterString != "?" && body[index] != null) {
        filterString += `&${index}=${body[index]}`;
      } else if (body[index] != null) {
        filterString += `${index}=${body[index]}`;
      }
    });
    const response = await axios
      .get(`${baseURL}${SERVICE_PATHS.PLATE.GET_PLATE}${filterString}`)
      .then(function (response) {
        response.data.results.map((index) => {
          arr.push({
            label: index.number_plate,
            value: index.number_plate,
          });
        });
      })
      .catch(function (error) {
        console.log(error);
        message.error("Error !");
      });
      setEventData(arr)
      
  };
  
  

  
  const divItem = (value) => {
    return value? <div className={styles.plateItem} style={{height:"35px",display:"flex",justifyContent:"center",alignItems:"center"}}>{t(`${value}`)}</div>:<div className={styles.plateItem}>-</div>;
  };
  const divItemBrand = (value) => {
    return value!=="Vehicle"? <div className={styles.plateItem} style={{height:"35px",display:"flex",justifyContent:"center",alignItems:"center"}}>{value}</div>:<div className={styles.plateItem}>-</div>;
  };
  const divItemColor = (value) => {
    return value !== "none"? <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <div className={styles.plateItem} style={{height:"35px",width:"70px",display:"flex",alignItems:"center"}}><div style={{border:"1px solid #ccc",height:"15px",width:"15px",marginRight:"5px",background:`${value?value.toLowerCase():'-'}`}}></div>{t(`${value}`)}</div>
    </div>:<div className={styles.plateItem}>-</div>;
  };


  const handleCollapse = () => {
    setCollapsed(collapsed ? 0 : 1);
    setRotate(rotate == 0 ? 90 : 0);
    form.resetFields();
    // setTimeout(() => {
    //   dispatch({
    //     type: TYPE_ACTION.PLATE.GET_PLATE,
    //     payload: {},
    //   });
    // }, 200);
  };

  const getLicense = (value,name) => {
    const profile = [];
    blackListData.forEach((index) => {
      index.vehicles?.forEach((element)=>{
        if (element.id === value) {
          if(name === 'id'){
            {profile.push(index.id)}
          }
          else{
            {profile.push(index.name)}
          }
         
        }
      })
    });
    return profile;
  };


  const getOwner = (value) => {
    let owner = "";
    Array.isArray(profileData) && profileData?.forEach((index) => {
      if(value === index.vehicle?.id){
        owner = index.soCmt
      }
    });
    return owner
  };


  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };

  const onConfirm = async (id) => {
    await dispatch({
      type: TYPE_ACTION.PLATE.DELETE_PLATE,
      payload: id,
    });
    setIsModalVisible(false);
    loadPlateData()
  };
  {
    Array.isArray(plateData) &&plateData?.map((item,index) => {
      const owner =  getOwner(item.id)
      const licenses = getLicense(item.id,"name")
      const licensesId = getLicense(item.id,"id")
      const profileElements = licenses.map((profile, profileIndex) => (
        <Tag key={profileIndex} color="blue" style={{margin:"3px",padding:"5px"}} className={styles.wrapper}>
          {profile}
        </Tag>
      ));
      dataInfo.push({
        id:item.id,
        plateNumber:item.number_plate,
        brand:item.brand,
        group:licensesId,
        owner:owner,
        bodyStyle:item.body_style,
        color:item.color
      })
      data.push({
        ids : item.id,
        key: item.id,
        id:  totalRecord && divItem((totalRecord - (index+(pages-1)*12))>0 && (totalRecord - (index+(pages-1)*12))),
        plateNumber: divItem(item.number_plate),
        brand: divItemBrand(item.brand),
        group: <div className={styles.wrapper} style={{width:"300px",height:"40px"}}>
          {licenses.length===0?<div>-</div>:<div style={{display:"flex",maxWidth:"300px",overflow:"auto"}}>{profileElements}</div>}
        </div>,
        owner : <div className={styles.wrapper} style={{width:"150px",height:"40px"}}>
        {owner?<div>{owner}</div>:<div>-</div>}
        </div>,
        bodyStyle:item.body_style && divItem(item.body_style.toLowerCase()),
        color: item.color && divItemColor(item.color.toLowerCase()),
        functions: (
          <Space className={styles.functions}>
            <Tooltip placement="top" title={t('info')}>
              <img
                src={iconInfo}
                width={25}
                onClick={() => {
                  navigate(`/plate/view/${item.id}`,{ state: { viewData: getRowDataById(item.id) }})
                }}
                className={styles.item}
              />
            </Tooltip>
            <Tooltip placement="top" title={t('edit')}>
              <img 
               src={iconEdit}
               width={25}
              onClick={() => {
                navigate(`/plate/update/${item.id}`,{ state: { viewData: getRowDataById(item.id) }})
              }}
              className={styles.item} />
            </Tooltip>
            <Tooltip placement="top" title={t('delete')}>
                <img  src={iconTrash}
                width={25} onClick={()=>{
                  setIsModalVisible(true)
                  setIdDeleter(item.id)
                }} className={styles.item} />
                
            </Tooltip>
          </Space>
        ),
      });
    });
  }


  const getRowDataById = (id) => {
    const rowData = dataInfo.find((item) => item.id === id);
    return rowData || null;
  };


  //---- useEffect
  useEffect(() => {
    loadPlateData();
    loadData()
  }, []);

  const handleSearch = (value) => {
    setEventDataSearch(value)
    const number_plates = [];
    number_plates.push(value);
    filterRef.current.number_plate = number_plates;
    loadData()
    if(!value){
      filterRef.current.number_plate = value
      loadPlateData()
    }
  };
  const onEnterSearch= (value) => {
    if (value.key === 'Enter') {
      filterRef.current.number_plate = eventDataSearch
      loadPlateData()
    }
  };

  const reloadData = ()=>{
    setFilter(false)
    filterRef.current.color = null;
    filterRef.current.brand = null;
    filterRef.current.body_style = null;
    loadPlateData();
  }


  return (
    <div className={styles.container}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2 className={styles.header} style={{color:"#B5122E"}}>
              {`${t('vehicle_list')}`}
              <Modal
                  title={t('confirm_delete')}
                  open={isModalVisible}
                  onCancel={()=>handleCancelDelete()}
                  okText={t('ok')}
                  cancelText={t('cancel')}
                  footer={[
                    <CustomButtonCancel title={t('cancel')} onClick={() => handleCancelDelete()}/>,
                    <CustomButtonSave title={t('ok')} onClick={() => onConfirm(idDelete)}/>
                  ]}
                >
                  <p>{t('agree_to_delete_this_list')}</p>
                </Modal>
              {/* (<span style={{ color: "red" }}>{`${totalRecord}`}</span>) */}
            </h2>
            <div style={{display:"flex",width:"25%"}}>
              <div style={{display:"flex",alignItems:"center"}}>
                {
                  filter?<img
                  src={filter_active}
                  onClick={() => reloadData()}
                  style={{ height:"30px",width:"auto",color:"black",marginLeft:"-70px"}}
                />:<img
                    src={filter_normal}
                    onClick={() => handleCollapse()}
                    style={{ height:"30px",width:"auto",color:"black",marginLeft:"-70px"}}
                  />
                }
              </div>
                  <AutoComplete
                      style={{
                          width: "100%",
                          margin: "10px",
                        }}
                      
                      autoFocus
                      onKeyDown={(value) =>onEnterSearch(value)}
                      placeholder={t('search')}
                      options={eventData}
                      onChange={(value) => handleSearch(value)}
                    >
                      <Input
                          style={{marginLeft:"-40px",background:"white"}}
                          addonBefore={
                            <img
                              width={25}
                              src={iconSearch}
                            />
                          }
                        />
                    </AutoComplete>
              <div style={{ margin: "5px"}}>
                <CustomButtonSave title={t('add')} onClick={() => navigate(PATH.NEW_PLATE)}/>
              </div>
            </div>
      </div>
      <Collapse style={{ padding: "0" }} ghost activeKey={[collapsed]}>
        <Panel  showArrow={false} key={1}>
          <SearchComponent
            form={form}
            filterRef={filterRef}
            loadPlateData={loadPlateData}
            actionFilter={()=>setFilter(true)}
          ></SearchComponent>
        </Panel>
      </Collapse>
        <Table
        pagination={{
          style:{padding:"10px"},
          position: ["bottomCenter"],
          showSizeChanger: false,
          pageSize: filterRef.current.page_size,
          total: totalRecord,
          showQuickJumper: true,
          defaultCurrent: 1,
        }}
        columns={columns}
        dataSource={data}
        onChange={(e) => {
          setPages(e.current)
          filterRef.current.page_idx = e.current;
          filterRef.current.page_size = e.pageSize;
          loadPlateData();
        }}
      ></Table>

    </div>
  );
};

export default Plate;
