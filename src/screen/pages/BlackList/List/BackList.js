import styles from "./BlackList.module.scss";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  FilterOutlined,
  ArrowRightOutlined
} from "@ant-design/icons";
import { Button, Collapse, Table, Tooltip, Form, Tag, Popconfirm,AutoComplete, Select,Modal,Input,Space } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TYPE_ACTION from "../../../../constants/TypeAction";
import { selectBlackList } from "../../../../redux/slice/BlackListSlice";
import SearchComponent from "../components/SearchComponent";
import PATH from "../../../../constants/itemsContants";
import { useNavigate } from "react-router-dom";
import { useTranslation} from 'react-i18next';
import CustomButtonSave from "../../../../components/CustomButton/CustomButtonSave";
import CustomButtonCancel from "../../../../components/CustomButton/CustomButtonCancel";
import iconSearch from "../../../../assets/images_new/search.png"
import iconInfo from "../../../../assets/images_new/info.png"
import iconEdit from "../../../../assets/images_new/editing.png"
import iconTrash from "../../../../assets/images_new/trash.png"

const BlackList = () => {
  //----- State
  const [collapsed, setCollapsed] = useState(0);
  const [pages,setPages] = useState(1)
  //---- Dispatch
  const dispatch = useDispatch();

  //---- Selector
  const blackListData = useSelector(selectBlackList);
  const [rotate, setRotate] = useState(0);
  const [keySearch, setKeySearch] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [idDelete, setIdDeleter] = useState();
  const {t} = useTranslation()
  //--- Constants
  const navigate = useNavigate();
  const filterRef = useRef({
    id: null,
    name: null,
    users: null,
  });
  const { Panel } = Collapse;
  const [form] = Form.useForm();
  const data = [];
  const divItem = (value) => {
    return <div className={styles.plateItem}>{value}</div>;
  };
  const divUsers = (valueUser,valueVehicle) => {
    const idVehicle = [];
    valueUser.map((index)=>{
      index.vehicle && idVehicle.push(index.vehicle)
    })
    const listvehicle =valueVehicle.filter(itemB => !idVehicle.some(itemA => itemA.id === itemB.id));
    return (
      <div  style={{maxWidth:"600px",overflow:"auto",display:"flex",justifyContent:"center",height:"70px",alignItems:"center"}}>
        {valueUser.length>0 &&valueUser.map((index) => {
          return <Tag key={index.id} style={{height:"max-content"}}  color="blue">{index.soCmt}{index.vehicle?.number_plate&&<div style={{display:"flex",justifyContent:"end"}} color="blue">{index.vehicle?.number_plate}</div>}</Tag>;
        })}
        {listvehicle.length >0 && listvehicle.map((index) => {
          return <Tag key={index.id} style={{height:"max-content"}} color="blue">{index.number_plate}</Tag>;
        }
        )}
      </div>
    );
  };


  const columns = [
    {
      title: <div className={styles.tableHeader}>STT</div>,
      dataIndex: "id",
    },
    // {
    //   title: <div className={styles.tableHeader}>Group Type</div>,
    //   dataIndex: "profile_type",
    // },
    {
      title: <div className={styles.tableHeader}>{t('group')}</div>,
      dataIndex: "name",
    },
    {
      title: <div className={styles.tableHeader}>{t('identity_object_list')}</div>,
      dataIndex: "lists",
      width:600
    },
    {
      title: <div className={styles.tableHeader}>{t('description')}</div>,
      dataIndex: "description",
    },
    {
      title: <div className={styles.tableHeader}>{t('action')}</div>,
      dataIndex: "functions",
    },
  ];

  // ---- Functions
  const loadBlackListData = () => {
    dispatch({
      type: TYPE_ACTION.BLACKLIST.GET_BLACKLIST,
      payload: filterRef.current,
    });
  };

  const onConfirm = async (id) => {
    await dispatch({
      type: TYPE_ACTION.BLACKLIST.DELETE,
      payload: id,
    });
    setIsModalVisible(false);
    loadBlackListData()
  };

  const loadIdCardData = () => {
    dispatch({
      type: TYPE_ACTION.ID_CARD.GET_ID_CARD,
    });
  };
  const handleCollapse = () => {
    setCollapsed(collapsed ? 0 : 1);
    setRotate(rotate == 0 ? 90 : 0);
    form.resetFields();
    dispatch({
      type: TYPE_ACTION.BLACKLIST.GET_BLACKLIST,
      payload: {},
    });
  };

  const handleDelete = () => {
    setIsModalVisible(true);
  };

  // Hàm xử lý khi xác nhận xoá
  const handleConfirmDelete = () => {
    // Thực hiện logic xoá ở đây
    // ...
     // Đóng modal sau khi xoá thành công
  };

  // Hàm xử lý khi hủy xoá
  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };


  const handleClickEdit = (data) => {
    navigate(`/black_list/update/${data.id}`,{ state: { editData: data }});
  };

  const handleClickView = (data) => {
    navigate(`/black_list/view/${data.id}`,{ state: { editData: data }});
  };



  {
    Array.isArray(blackListData) &&blackListData?.map((item,index) => {
      data.push({
        key: item.id,
        id: blackListData.length  && divItem(blackListData.length - index),
        name: divItem(item.name),
        description: (item.description === '' || item.description ==='null')  ? <div style={{display:"flex",justifyContent:"center"}}>-</div>:divItem(item.description),
        profile_type: divItem(item.profile_type),
        lists:  divUsers(item.users,item.vehicles),
        functions: (
          <Space className={styles.functions}>
            <Tooltip placement="top" title={"Profile information"}>
              <img
                width={25}
                src={iconInfo}
                className={styles.item}
                onClick={() => handleClickView(item)}
              />
            </Tooltip>
            <Tooltip placement="top" title={"Edit Profile"}>
              <img
              width={25}
              src={iconEdit}
                className={styles.item}
                onClick={() => handleClickEdit(item)}
              />
            </Tooltip>
            <Tooltip placement="top" title={"Delete profile"}>
                <img  width={25}
                src={iconTrash}
                onClick={()=>{
                  setIsModalVisible(true)
                  setIdDeleter(item.id)
                }} className={styles.item} />
              {/* <Popconfirm
                placement="top"
                title={"Agree to delete this list"}
                onConfirm={() => onConfirm(item.id)}
                okText="Oke"
                cancelText="Cancel"
              >
                <DeleteOutlined className={styles.item} />
              </Popconfirm> */}
            </Tooltip>
          </Space>
        ),
      });
    });
  }
  const getListSearch = () =>{
    const option =[]
    blackListData?.map((index)=>{
      option.push({
        label:index.name,
        value:index.name
      })
    })
    return option
  }

  const handleSearch = (value) => {
    if(value){
      setKeySearch(value)
    }
    else{
      filterRef.current.name = value
      loadBlackListData()
    }
    // setEventDataSearch(value)
    // const number_plates = [];
    // number_plates.push(value);
    // filterRef.current.number_plate = number_plates;
    // loadData()
    // if(!value){
    //   filterRef.current.number_plate = value
    //   loadPlateData()
    // }
  };
  const onEnterSearch= (event) => {
    if (event.key === 'Enter') {
      filterRef.current.name = keySearch
      loadBlackListData()
    }
  };
  //---- useEffect
  useEffect(() => {
    loadBlackListData();
  }, []);

  return (
    <div className={styles.container}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2 className={styles.header}>
            {`${t('group_list')}`}
            {/* (<span style={{color:"red"}}>{`${blackListData.length}`}</span>) */}
            {/* <FilterOutlined
              onClick={() => handleCollapse()}
              className={styles.collapsed}
              style={{fontSize:"18px",color:"black"}}
            /> */}
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
                style={{
                    width: "100%",
                    margin: "10px"
                  }}
                showSearch
                autoFocus
                allowClear
                onKeyDown={(event) =>onEnterSearch(event)}
                placeholder={t('search')}
                options={getListSearch()}
                onChange={(value) => handleSearch(value)}
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
                <CustomButtonSave title={t('add')} onClick={() => navigate(PATH.NEW_BLACKLIST)}/>
              </div>
          </div>
      </div>
      {/* <Collapse style={{ padding: "0" }} ghost activeKey={[collapsed]}>
        <Panel showArrow={false} key={1}>
          <SearchComponent
            form={form}
            filterRef={filterRef}
            loadBlackListData={loadBlackListData}
          ></SearchComponent>
        </Panel>
      </Collapse> */}
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          position: ["bottomCenter"],
          pageSize: 12,
          showSizeChanger: false,
          total: blackListData.length,
          showQuickJumper: true,
          defaultCurrent: 1,
        }}
      ></Table>
    </div>
  );
};
export default BlackList;
