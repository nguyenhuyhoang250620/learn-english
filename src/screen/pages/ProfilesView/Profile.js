import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TYPE_ACTION from "../../../constants/TypeAction";
import { Image, Table, Tooltip, Space, Tag, AutoComplete, Modal, Input } from "antd";
import styles from "./Profile.module.scss";
import {
  selectProfileData,
  selectTotalProfileData,
} from "../../../redux/slice/ProfileSlice";
import { baseURL } from "../../../services/ConfigService/ApiService";
import { selectIdCardData } from "../../../redux/slice/IDCardSlice";
import { useNavigate } from "react-router-dom";
import PATH from "../../../constants/itemsContants";
import { useTranslation } from 'react-i18next';
import "./table.css";
import { selectBlackList } from "../../../redux/slice/BlackListSlice";
import CustomButtonSave from "../../../components/CustomButton/CustomButtonSave";
import image_not from "../../../assets/images/image_not_found.png";
import CustomButtonCancel from "../../../components/CustomButton/CustomButtonCancel";
import iconInfo from "../../../assets/images_new/info.png";
import iconEdit from "../../../assets/images_new/editing.png";
import iconTrash from "../../../assets/images_new/trash.png";
import iconSearch from "../../../assets/images_new/search.png";


const Profile = () => {
  //---- Dispatch
  const dispatch = useDispatch();

  const navigate = useNavigate();

  //--Selectors
  const profileData = useSelector(selectProfileData);
  const idCardData = useSelector(selectIdCardData);
  const totalProfileData = useSelector(selectTotalProfileData);
  const blackListData = useSelector(selectBlackList);

  //----State
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pages,setPages] = useState(1)
  const [collapsed, setCollapsed] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [idDelete, setIdDeleter] = useState();
  const [keySearch,setKeySearch] = useState()
  const{t} = useTranslation()

  //---- Ref
  const filterRef = useRef({
    soCmts: null,
    ids: null,
    statuses: null,
    page_idx: 1,
    page_size: 12,
  });

  const filterRefBlackList = useRef({
    id: null,
    name: null,
    users: null,
  });

  const data = [];
  const columns = [
    {
      title: <div style={{ textAlign: "center", }}>STT</div>,
      dataIndex: "id",
    },
    {
      title: <div style={{ textAlign: "center" }}>{t('image')}</div>,
      dataIndex: "image",
    },
    {
      title: <div style={{ textAlign: "center" }}>{t('name')}</div>,
      dataIndex: "hoVaTen",
    },
    {
      title: <div style={{ textAlign: "center" }}>{t('username')}</div>,
      dataIndex: "soCmt",
    },
    {
      title: <div style={{ textAlign: "center" }}>{t('vehicle')}</div>,
      dataIndex: "vehicle",
    },
    {
      title: <div style={{ textAlign: "center" }}>{t('group')}</div>,
      dataIndex: "group",
    },

    // {
    //   title: <div style={{ textAlign: "center" }}>Trạng thái</div>,
    //   dataIndex: "status",
    // },
    {
      title: <div style={{ textAlign: "center" }}>{t('action')}</div>,
      dataIndex: "function",
    },
  ];
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleEdit = (peopleId, data) => {
    navigate(`/profile/edit/${peopleId}`, { state: { editData: data }});
  };

  const handleInfo = (peopleId, data) => {
    navigate(`/profile/info/${peopleId}`, { state: { infoData: data }});
  };

  const loadData = async () => {
    setLoading(true);
    await dispatch({
      type: TYPE_ACTION.PROFILE.GET_PROFILE,
      payload: filterRef.current,
    });
    dispatch({
      type: TYPE_ACTION.ID_CARD.GET_ID_CARD,
    });
    dispatch({
      type: TYPE_ACTION.BLACKLIST.GET_BLACKLIST,
      payload: filterRefBlackList.current,
    });
    setLoading(false);
  };

  const getProfile = (value) => {
    const profile = [];
    blackListData.forEach((index) => {
      index.users?.forEach((element)=>{
        if (element.soCmt === value) {
          {profile.push(index.name)}
        }
      })
    });
    return profile;
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };

  const onConfirm = async (id) => {
    await dispatch({
      type: TYPE_ACTION.PROFILE.DELETE,
      payload: id,
    });
    setIsModalVisible(false);
    loadData()
  };

    {Array.isArray(profileData) && profileData.map((dataIndex,index) => {
      const profiles = getProfile(dataIndex.soCmt)
      const profileElements = profiles.map((profile, profileIndex) => (
        <Tag key={profileIndex} color="blue" style={{margin:"3px",padding:"5px"}} className={styles.wrapper}>
          {profile}
        </Tag>
      ));
      data.push({
        key: dataIndex.id,
        group: <div className={styles.wrapper}>
          {profiles.length===0?<div>-</div>:<div style={{display:"flex",maxWidth:"300px",overflow:"auto"}}>{profileElements}</div>}
        </div>,
        id: totalProfileData && <div className={styles.wrapper}>{(totalProfileData - (index+(pages-1)*12))>0 &&(totalProfileData - (index+(pages-1)*12))}</div>,
        hoVaTen: <div className={styles.wrapper}>{
          dataIndex.hoVaTen?dataIndex.hoVaTen:"-"
        }</div>,
        image: <div style={{display:"flex",justifyContent:"center"}}>
                  {
                    dataIndex.image? <div className={styles.wrapper} style={{height:"50px",width:"50px",borderRadius:"50%",overflow:"hidden",border:"1px solid #ccc"}}>
                        <Image
                          style={{ width: "auto", height: "auto",maxWidth:"50px",maxHeight:"50px" }}
                          src={`${baseURL}${dataIndex.image}`}
                          onLoad={(e) => {
                            e.target.style.display = 'block';
                          }}
                          onError={(e)=>{
                            e.target.src = image_not
                          }}
                        ></Image>
                    </div>:<div>-</div>
                  }
        </div>,
        soCmt:  <div className={styles.wrapper}>{dataIndex.soCmt}</div>,
        vehicle:<div className={styles.wrapper}>{
          dataIndex.vehicle?.number_plate?dataIndex.vehicle?.number_plate:"-"
        }</div>,
        function: (
          <Space className={styles.wrapper}>
            <Tooltip placement="top" title={t('info')}>
              <img src={iconInfo} width={25}  onClick={() => handleInfo(dataIndex.id, dataIndex)} className={styles.icon} />
            </Tooltip>
            <Tooltip placement="top" title={t('edit')}>
              <img src={iconEdit} width={25} onClick={() => handleEdit(dataIndex.id, dataIndex)} className={styles.icon} />
            </Tooltip>
            <Tooltip placement="top" title={t('delete_profile')}>
                <img src={iconTrash} width={25} onClick={()=>{
                  setIsModalVisible(true)
                  setIdDeleter(dataIndex.id)
                }} className={styles.icon} />
            </Tooltip>
          </Space>
        ),
      });
    });}
  
  

  const handleAdd = () => {
    navigate(PATH.ADD_PROFILE);
  };

  useEffect(() => {
    loadData();
  }, []);

  const addFilterCmts = (value) => {
    if(value){
      setKeySearch(value)
    }
    else{
      filterRef.current.soCmts = value;
      loadData()
    }
  };
  const getListSearch =()=>{
    const option = []
    idCardData?.map((index) => {
      option.push({
        label:index.soCmt,
        value:index.soCmt
      })
    })
    return option
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      filterRef.current.soCmts = keySearch;
      loadData()
    }
  };

 

  return (
    <div className={styles.container}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2 className={styles.header}>
            {t('person_list')}
            {/* (<span style={{ color: "red" }}>{`${totalProfileData}`}</span>) */}
          </h2>
          <Modal
                  title={t('confirm_delete')}
                  open={isModalVisible}
                  onCancel={handleCancelDelete}
                  okText={t('ok')}
                  cancelText={t('cancel')}
                  footer = {[
                    <CustomButtonCancel title={t('cancel')} onClick={() => handleCancelDelete()}/>,
                    <CustomButtonSave title={t('ok')} onClick={() => onConfirm(idDelete)}/>
                  ]}
                >
                  <p>{t('agree_to_delete_this_list')}</p>
                </Modal>
        <div style={{display:"flex",width:"25%"}}>
          <AutoComplete
              mode="multiple"
              placeholder={t('search')}
              defaultValue={[]}
              onKeyDown={(event)=>handleKeyPress(event)}
              options={getListSearch()}
              onChange={(value)=>addFilterCmts(value)}
              style={{
                width: "100%",
                margin: "10px"
              }}
              filterOption={(input, option) =>
                option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
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
            <CustomButtonSave title={t('add')} onClick={handleAdd}/>
          </div>
        </div>
      </div>
      <Table
        pagination={{
          style:{padding:"10px"},
          position: ["bottomCenter"],
          pageSize: filterRef.current.page_size,
          total: totalProfileData,
          showSizeChanger: false,
          showQuickJumper: true,
          defaultCurrent: 1
        }}
        columns={columns}
        dataSource={data}
        loading={loading}
        onChange={(e) => {
          setPages(e.current)
          filterRef.current.page_idx = e.current;
          filterRef.current.page_size = e.pageSize;
          loadData();
        }}
      ></Table>
    </div>
  );
};

export default Profile;
