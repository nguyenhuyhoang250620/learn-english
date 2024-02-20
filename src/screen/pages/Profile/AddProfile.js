/* eslint-disable radix */
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import {
    Col,
    DatePicker,
    Form,
    Input,
    message,
    Modal,
    Radio,
    Row,
    Select,
    Spin, Tag,
    AutoComplete,
    Tabs
} from "antd";
import { EyeOutlined } from "@ant-design/icons";
import Resizer from "react-image-file-resizer";
import LTT from "list-to-tree";
import _ from "lodash";
import dayjs from "dayjs";
import { SERVICE_PATHS } from "../../../constants/paths";

// Component
import Label from "../../../common/component/Label/index";

import { useDispatch, useSelector } from "react-redux";

// Styles
import style from "./styles/index.module.scss";
import TYPE_ACTION from "../../../constants/TypeAction";
import { baseURL } from "../../../services/ConfigService/ApiService";
import PATH from "../../../constants/itemsContants";
import { selectIsDarkMode } from "../../../redux/slice/DarkModeSlice";
import { selectBlackList } from "../../../redux/slice/BlackListSlice";
import { useTranslation } from "react-i18next";
import CustomButtonSave from "../../../components/CustomButton/CustomButtonSave";
import CustomButtonCancel from "../../../components/CustomButton/CustomButtonCancel";
import iconExpand from "../../../assets/images_new/expand.png";
import iconAddUser from "../../../assets/images_new/userAdd.png";
import iconCalendar from "../../../assets/images_new/calendar.png";
import { selectEventDataWithPerson,selectisLoading } from "../../../redux/slice/EventSlice";
import iconRightarrow from "../../../assets/images_new/right-arrow.png"
import TabPane from "antd/es/tabs/TabPane";
import iconInforObject from "../../../assets/icons/warning.png"
import iconHistory from "../../../assets/icons/list.png"
import IdentityHistory from "./components/IdentityHistory/IdentityHistory";
const { Option } = Select;

// const key = "AddProfile";
const DefaultProfile = {
  hoVaTen: null,
  namSinh: null,
  gioiTinh: "male",
  identity: null,
  phone: null,
  address: null,
  email: "",
  code: null,
  tittle: null,
  status: 1,
  departmentId: null,
  positionId: null,
  description: "",
  soCmtList: null,
  trackingList: [],
  vehicle: null,
};

const GENDER = [
  {
    name: "male",
    value: "male",
  },
  {
    name: "female",
    value: "female",
  },
  {
    name: "other",
    value: "other",
  },
];

const AddProfilePage = () => {
  const [form] = Form.useForm();
  const [eventDataLicense, setEventDataLicense] = useState([]);
  const [listGroupOld, SetListGroupOld] = useState([]);
  const [idVehicleOld, setIdVehicleOld] = useState();
  const [licenseVehicleOld, setLicenseVehicleOld] = useState("");
  const blackListData = useSelector(selectBlackList);
  const eventAllUser = useSelector(selectEventDataWithPerson);
  const eventAllUserisLoading = useSelector(selectisLoading);
  const { t } = useTranslation();


  const [preview, setPreview] = useState({
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
  });

  const isDarkMode = useSelector(selectIsDarkMode);

  const [imgLocalAvatar, setImgLocalAvatar] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const [isInfo, setInfo] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [isNew, setNew] = useState(false);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const peopleId = id;
  const fake = "";
  const isLoadingCreate = fake;
  const isLoadingUpdate = fake;


  const defaultValueSelect = [];

  const peopleProfile = isInfo || isEdit || isNew;
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const filterRef = useRef({
    number_plate: null,
    color: null,
    brand: null,
    body_style: null,
    page_idx: 1,
    page_size: 12,
    exact: false,
  });
  const filterRefPerson = useRef({
    soCmts: null,
    camera_ids: null,
    start_time: null,
    end_time: null,
    distinct: null,
    event_type: null,
    page_idx: 1,
    page_size: 8,
    exact: false,
  });

  const tagRender = (props) => {
    const { label, value, closable } = props;

    if (listGroupOld.includes(value)) {
      return <Tag>{label}</Tag>;
    }
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
  const loadData = async () => {
    var filterString = "?";
    const body = filterRef.current;
    const arr = [];
    Object.keys(body).map((index) => {
      if (filterString != "?" && body[index] != null) {
        filterString += `&${index}=${body[index]}`;
      } else if (body[index] != null) {
        filterString += `${index}=${body[index]}`;
      }
    });
    const response = await axios
      .get(`${baseURL}${SERVICE_PATHS.PLATE.GET_PLATE_NO_OWNER}${filterString}`)
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
    setEventDataLicense(arr);
  };
  useEffect(() => {
    loadData();
  }, []);


  const getBlackList = () => {
    const options = [];
    blackListData?.map((item) => {
      options.push({
        label: item.name,
        value: item.id,
      });
    });
    return options;
  };

  useEffect(() => {
    setInfo((location.state && location.state.infoData) || false);
    setEdit((location.state && location.state.editData) || false);
    setNew((location.state && location.state.newData) || false);
    // filterRefPerson.current.soCmts = location.state.infoData.soCmt;
    // dispatch({
    //   type: TYPE_ACTION.EVENT.GET_PERSON,
    //   payload: filterRefPerson.current,
    // });
  }, [location]);

  useEffect(() => {
    dispatch({
      type: TYPE_ACTION.BLACKLIST.GET_BLACKLIST,
      payload: {},
    });
  }, []);

  useEffect(() => {
    const fetchImage = async (link) => {
      const result = await axios.get(link, { responseType: "blob" });
      setImage(result["data"]);
    };
    // peopleProfile && fetchImage(`${baseURL}${peopleProfile.image}`);
  }, [peopleProfile]);

  useEffect(() => {
    if (peopleProfile) {
      setInitialProfileInfo(peopleProfile);
      setImgLocalAvatar(`${baseURL}${peopleProfile.image}`);
      setAvatar(`${peopleProfile.image}`);
    }
  }, [peopleProfile, peopleId]);

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
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateAndNext = (next) => {
    formRef.current
      .validateFields()
      .then((values) => {
        form.validateFields().then(async (values) => {
          if (avatar) {
            const obj = { ...values };
            if (avatar) obj.image = avatar;
            if (isNew) obj.image = image;
            const filterString = `?number_plate=${obj.vehicle}`;
            if (obj.vehicle) {
              await axios
                .get(
                  `${baseURL}${SERVICE_PATHS.PLATE.GET_PLATE_NO_OWNER}${filterString}`
                )
                .then(function (response) {
                  obj.vehicle = response.data[0].id;
                })
                .catch(function (error) {
                  console.log(error);
                  message.error("Error !");
                });
            }
            // if (imgLocals.length > 0) obj.imgLocals = imgLocals;
            obj.active = values.active === 1;
            const callBack = (data) => {
              if (obj.trackingList.length > 0) {
                obj.trackingList.map((element) => {
                  const list = blackListData.find((item) => item.id == element);
                  const formData = new FormData();
                  list.id && formData.append("id", list.id);
                  list.description &&
                    formData.append("description", list.description);
                  list.users.length &&
                    list.users.map((user) => {
                      formData.append("users", user.id);
                    });
                  list.vehicles.length &&
                    list.vehicles.map((vehicle) => {
                      formData.append("vehicles", vehicle.id);
                    });
                  formData.append("users", data.id);
                  data.vehicle && formData.append("vehicles", data.id);
                  dispatch({
                    type: TYPE_ACTION.BLACKLIST.UPDATE_DETAIL,
                    payload: formData,
                  });
                });
              }
              navigate("/" + PATH.PROFILE);
            };
            dispatch({
              type: TYPE_ACTION.PROFILE.ADD_PROFILE,
              payload: { obj, callBack },
            });
          } else {
            message.warning("The picture is empty");
          }
        });
      })
      .catch((error) => {
        console.log("Failed:", error);
        // Xử lý khi validate không thành công
        message.error("Form validation failed!");
      });
  };

  const handleUpdate = () => {
    formRef.current
      .validateFields()
      .then((values) => {
        form.validateFields().then(async (values) => {
          if (avatar) {
            const obj = { ...values };
            const trackingListNew = new Set(listGroupOld);
            const trackingListOld = new Set(obj.trackingList);
            const differenceSet = new Set(
              [...trackingListOld].filter((item) => !trackingListNew.has(item))
            );
            const trackingListDifference = Array.from(differenceSet);
            if (avatar) obj.image = avatar;
            if (peopleId) obj.id = peopleId;
            _.forEach(Object.keys(obj), (item) => {
              if (!obj[item]) obj[item] = null;
            });
            obj.active = values.active === 1;
            const filterString = `?number_plate=${obj.vehicle}`;
            if (obj.vehicle) {
              if (obj.vehicle === licenseVehicleOld) {
                obj.vehicle = idVehicleOld;
              } else {
                await axios
                  .get(
                    `${baseURL}${SERVICE_PATHS.PLATE.GET_PLATE_NO_OWNER}${filterString}`
                  )
                  .then(function (response) {
                    obj.vehicle = response.data[0].id;
                  })
                  .catch(function (error) {
                    console.log(error);
                    message.error("Error !");
                  });
              }
            }
            const callBack = (data) => {
              if (trackingListDifference.length > 0) {
                trackingListDifference.map((element) => {
                  const list = blackListData.find((item) => item.id == element);
                  const formData = new FormData();
                  list.id && formData.append("id", list.id);
                  list.description &&
                    formData.append("description", list.description);
                  list.users.length &&
                    list.users.map((user) => {
                      formData.append("users", user.id);
                    });
                  list.vehicles.length &&
                    list.vehicles.map((vehicle) => {
                      formData.append("vehicles", vehicle.id);
                    });
                  formData.append("users", data.id);
                  data.vehicle && formData.append("vehicles", data.vehicle.id);
                  dispatch({
                    type: TYPE_ACTION.BLACKLIST.UPDATE_DETAIL,
                    payload: formData,
                  });
                });
              }
              navigate("/" + PATH.PROFILE);
            };
            dispatch({
              type: TYPE_ACTION.PROFILE.UPDATE_PROFILE,
              payload: { obj, callBack },
            });
          } else {
            message.warning("The picture is empty");
          }
        });
      })
      .catch((error) => {
        console.log("Failed:", error);
        // Xử lý khi validate không thành công
        message.error("Form validation failed!");
      });
  };

  function setInitialProfileInfo(profileInfo) {
    const temp = profileInfo;
    _.forEach(Object.keys(profileInfo), (item) => {
      if (profileInfo[item] == null) temp[item] = "";
    });
    for (const index of blackListData) {
      if (index.users) {
        for (const element of index.users) {
          if (element.id === temp.id) defaultValueSelect.push(index.id);
          setIdVehicleOld(temp.vehicle?.id);
          setLicenseVehicleOld(temp.vehicle?.number_plate);
          form.setFieldsValue({
            ...temp,
            active: temp.active ? 1 : 0,
            namSinh: temp.namSinh ? dayjs(temp.namSinh) : dayjs(0),
            vehicle: temp.vehicle?.number_plate,
            trackingList: defaultValueSelect,
            // descriptionObjectRecognize: temp.description,
          });
        }
      }
    }
    SetListGroupOld(defaultValueSelect);
  }

  const handlePreview = (url, name) => {
    setPreview({
      ...preview,
      previewImage: url,
      previewVisible: true,
      previewTitle: name,
    });
  };
  const color = isDarkMode ? "#DADADA" : "black";

  const handleSearch = (value) => {
    const number_plates = [];
    number_plates.push(value);
    filterRef.current.number_plate = number_plates;
    loadData();
  };
  
  const renderedItems = Array.isArray(eventAllUser)&& eventAllUser.map((item) => (
    <div
      key={item.id} // Đảm bảo có key unique cho mỗi phần tử trong map
      style={{
        height: "150px",
        width: "150px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        margin:"8px"
      }}
    >
      <img
        src={`${baseURL}${item.crop_image}`}
        style={{height:"150px",width:"auto",maxWidth:"150px"}}
      />
    </div>
  ));


  return (
    <Tabs>
      <TabPane 
        tab={<div style={{display:"flex",alignItems:"center",justifyContent:"space-around"}}><img style={{height:"20px",width:"20px",marginRight:"5px"}} src={iconInforObject}/><h4 style={{color:"#B5122E"}}>{t('object_information')}</h4></div>}
        key="1"

        >
        <div className={style.Wrapper}>
        <Spin spinning={isLoadingCreate || isLoadingUpdate}>
          <Form form={form} initialValues={DefaultProfile} ref={formRef}>
            <Row gutter={[20]}>
              <Col
                style={{
                  width: "100%",
                  flexDirection: "row",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    className={style.uploadAvatar}
                    style={{
                      borderRadius: "50%",
                      overflow: "hidden",
                      height: "150px",
                      width: "150px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <div>
                      <label
                        style={{ width: "100%", height: "100%" }}
                        htmlFor="file_avatar"
                      >
                        <div
                          style={{
                            borderRadius: "50%",
                            overflow: "hidden",
                            height: "150px",
                            width: "150px",
                            display: "flex",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                        >
                          <img
                            style={{
                              height: "auto",
                              width: "auto",
                              maxHeight: "150px",
                              maxWidth: "150px",
                            }}
                            src={imgLocalAvatar || iconAddUser}
                            onError={(e) => {
                              e.target.src = iconAddUser;
                            }}
                            // alt="Fallback"
                          />
                        </div>
                      </label>
                      <input
                        disabled={isInfo}
                        style={{ display: "none" }}
                        id="file_avatar"
                        type="file"
                        name="file"
                        accept=".jpg, .jpeg, .png, .jfif"
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                  </div>
                  <div style={{ marginLeft: "15px" }}>
                    <h1 style={{ display: "flex" }}>
                      {t("profile")}
                      {imgLocalAvatar && (
                        <div className={style[`close-img-upload`]}>
                          <EyeOutlined
                            style={{
                              color: "#fa127c",
                              fontSize: 20,
                              marginLeft: "5px",
                            }}
                            twoToneColor="#fa127c"
                            onClick={() => {
                              if (imgLocalAvatar)
                                handlePreview(
                                  imgLocalAvatar,
                                  imgLocalAvatar.split("/").slice(-1)[0]
                                );
                            }}
                          />
                        </div>
                      )}
                    </h1>
                    <p style={{ fontSize: "14px" }}>{t("update_your_photo")}</p>
                  </div>
                </div>
              </Col>
            </Row>

            <Row style={{ paddingTop: 20 }} gutter={[30]}>
              <Col span={24}>
                <Label
                  title={t("name")}
                  isRequired
                  style={{ color: `${color}` }}
                />
                <Form.Item
                  name="hoVaTen"
                  rules={[
                    {
                      required: true,
                      message: `${t("this_field_is_required")}`,
                    },
                  ]}
                >
                  <Input
                    className={style.text}
                    placeholder={t("name")}
                    readOnly={isInfo}
                  />
                </Form.Item>

                <Row gutter={[30]}>
                  <Col span={12}>
                    <Label
                      title={t("group_name")}
                      style={{ color: `${color}` }}
                    />

                    <Form.Item name="trackingList">
                      <Select
                        className={
                          isInfo ? `${style.read_only_select}` : style.container
                        }
                        tagRender={tagRender}
                        mode="multiple"
                        value={listGroupOld}
                        suffixIcon={<img src={iconExpand} width={12} />}
                        placeholder={t("group_name")}
                        readOnly={isInfo}
                        // options={getBlackList()}
                        options={getBlackList().map((option) =>
                          listGroupOld.includes(option.value)
                            ? { ...option, disabled: true }
                            : option
                        )}
                      >
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Label
                      title={t("username")}
                      isRequired
                      style={{ color: `${color}` }}
                    />
                    <Form.Item
                      name="soCmt"
                      rules={[
                        {
                          required: true,
                          message: `${t("this_field_is_required")}`,
                        },
                      ]}
                    >
                      <Input
                        className={style.text}
                        readOnly={isEdit || isInfo}
                        placeholder={t("username")}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[30]}>
                  <Col span={12}>
                    <Label
                      title={t("date_of_birth")}
                      style={{ color: `${color}` }}
                    />
                    <Form.Item name="namSinh">
                      <DatePicker
                        className={style.datePicker}
                        readOnly={isInfo}
                        placeholder={t("date_of_birth")}
                        suffixIcon={<img src={iconCalendar} width={25} />}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Label
                      title={t("gender")}
                      // isRequired
                      style={{ color: `${color}` }}
                    />
                    <Form.Item name="gioiTinh">
                      <Radio.Group>
                        {_.map(GENDER, (item) => (
                          <Radio
                            className={style.radio}
                            value={item.value}
                            key={item.value}
                            readOnly={isInfo}
                            style={{ color: `${color}` }}
                          >
                            {t(`${item.name}`)}
                          </Radio>
                        ))}
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[30]}>
                  <Col span={12}>
                    <Label title="Card Code" style={{ color: `${color}` }} />
                    <Form.Item name="identity">
                      <Input
                        className={style.text}
                        readOnly={isInfo}
                        placeholder="Card Code"
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Label
                      title={t("phone_number")}
                      style={{ color: `${color}` }}
                    />
                    <Form.Item name="phone">
                      <Input
                        className={style.text}
                        readOnly={isInfo}
                        placeholder={t("phone_number")}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Label title="Email" style={{ color: `${color}` }} />
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: `${t("email_format_is_not_correct")}`,
                    },
                  ]}
                >
                  <Input
                    className={style.text}
                    readOnly={isInfo}
                    placeholder="Email"
                  />
                </Form.Item>
                <Label
                  title={t("permanent_resident")}
                  style={{ color: `${color}` }}
                />
                <Form.Item name="address">
                  <Input
                    className={style.text}
                    readOnly={isInfo}
                    placeholder={t("permanent_resident")}
                  />
                </Form.Item>
                <Label title={t("license_plate")} style={{ color: `${color}` }} />

                <Form.Item name="vehicle">
                  <AutoComplete
                    className={
                      isInfo ? `${style.read_only_select}` : style.container
                    }
                    autoFocus
                    tagRender={tagRender}
                    placeholder={t("license_plate")}
                    options={eventDataLicense}
                    onChange={(value) => handleSearch(value)}
                  />
                </Form.Item>
                {
                  isInfo && <>
                    <div style={{display:"flex",alignItems:"center"}}>
                      <img src={iconExpand} style={{height:"15px",width:"15px",marginRight:"10px"}}/>
                      <Label title={t("identity_face_list")} style={{ color: `${color}` }} />
                    </div>
                    <div style={{display:"flex",alignItems:"center"}}>
                    {eventAllUserisLoading &&<div style={{display:"flex"}}>{renderedItems}</div>}
                    <a style={{marginLeft:"20px"}}>{t('view_all')}</a>
                    <img src={iconRightarrow} width={28}/>
                    </div>
                  </>
                }
              </Col>
            </Row>
            <Modal
              open={preview.previewVisible}
              title={preview.previewTitle}
              footer={null}
              onCancel={() => {
                setPreview({
                  previewVisible: false,
                  previewImage: "",
                  previewTitle: "",
                });
              }}
            >
              <img
                alt="example"
                style={{ width: "100%", maxHeight: 1100 }}
                src={preview.previewImage}
              />
            </Modal>
            {/* <UploadProfile /> */}
          </Form>
        </Spin>
        <Row justify="end">
          {isInfo && (
            <CustomButtonCancel
              title={t("cancel")}
              onClick={() => navigate(-1)}
            />
          )}
          {isEdit && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <CustomButtonCancel
                title={t("cancel")}
                onClick={() => navigate(-1)}
              />
              <CustomButtonSave
                title={t("update")}
                onClick={() => handleUpdate()}
              />
            </div>
          )}
          {!isEdit && !isInfo && (
            <>
              <div style={{ display: "flex", alignItems: "center" }}>
                <CustomButtonCancel
                  title={t("cancel")}
                  onClick={() => navigate(-1)}
                />
                <CustomButtonSave
                  title={t("save")}
                  onClick={() => handleCreateAndNext()}
                />
              </div>
            </>
          )}
        </Row>
      </div>
      </TabPane>
      <TabPane
          tab={<div style={{display:"flex",alignItems:"center",justifyContent:"space-around"}}><img style={{height:"15px",width:"15px",marginRight:"5px"}} src={iconHistory}/><h4 style={{color:"#B5122E"}}>{t('identity_history')}</h4></div>}
          key="2"
        >
          <span>Content Tab 2</span>
      </TabPane>
    </Tabs>
  );
};

export default AddProfilePage;
