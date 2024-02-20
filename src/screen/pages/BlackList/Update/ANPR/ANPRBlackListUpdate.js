import { Button, Form, Image, Input, Select, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import TYPE_ACTION from "../../../../../constants/TypeAction";
import { selectBlackListDetail } from "../../../../../redux/slice/BlackListSlice";
import { selectIdCardData } from "../../../../../redux/slice/IDCardSlice";
import { baseURL } from "../../../../../services/ConfigService/ApiService";
import styles from "./ANPRBlackListUpdate.module.scss";
import _ from "lodash";
import { selectPlateData } from "../../../../../redux/slice/PlateSlice";
import ButtonGoBack from "../../../../../components/ButtonGoBack/ButtonGoBack";

const ANPRBlackListUpdate = () => {
  //---- useEState
  const [listCard, setListCard] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [feature, setFeature] = useState("");
  //---- Constants
  const [form] = Form.useForm();
  const { id } = useParams();
  const empty = <span className={styles.empty}>Chưa có thông tin</span>;
  const options = [];
  const defaultValueSelect = [];
  const location = useLocation();
  //---- Selectors
  const blackListDetail = useSelector(selectBlackListDetail);
  const vehicles = useSelector(selectPlateData);

  

  //---- useEffect
  useEffect(() => {
    loadPlateData();
    checkFeature();
  }, []);

  useEffect(() => {
    feature == "UPDATE" && setFieldValues();
    feature == "VIEW" && setFieldValues();
  }, [blackListDetail]);

  // ---- Dispatchs
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
    const arr = [...listCard];
    const removeArr = _.remove(arr, (n) => {
      return n.id !== value;
    });
    setListCard(removeArr);
  };

  const onDeselect = (value) => {
    const arr = [...listCard];
    const removeArr = _.remove(arr, (n) => {
      return n.id !== value;
    });
    setListCard(removeArr);
  };

  const onSelect = (value) => {
    const b = [...listCard];
    vehicles.map((index) => {
      if (index.id === value) {
        b.push(index);
      }
    });
    setListCard(b);
  };

  const loadPlateData = () => {
    dispatch({
        type:TYPE_ACTION.PLATE.GET_PLATE,
        payload:{}
    })
  }

  const onFinish = (values) => {
    const formData = new FormData();
    values.id && formData.append("id", values.id);
    formData.append("profile_type","ANPR");
    values.name && formData.append("name", values.name);
    values.description && formData.append("description", values.description);
    values.users.length &&
      values.users.map((vehicle) => {
        formData.append("vehicles", vehicle);
      });

    feature == "UPDATE" &&
      dispatch({
        type: TYPE_ACTION.BLACKLIST.UPDATE_DETAIL,
        payload: formData,
      });
    feature == "CREATE" &&
      dispatch({
        type: TYPE_ACTION.BLACKLIST.CREATE,
        payload: formData,
      });
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

  listCard?.map((user) => {
    defaultValueSelect.push(user.id);
  });

  vehicles?.map((index) => {
    options.push({
      label: index.number_plate,
      value: index.id,
    });
  });


  const setFieldValues = () => {
    blackListDetail?.vehicles?.length && setListCard(blackListDetail.vehicles);
    blackListDetail &&
      form.setFieldsValue({
        id: id,
        name: blackListDetail.name,
        description: blackListDetail.description,
        users: defaultValueSelect,
      });
  };

  return (
    <>
      <div className={styles.container}>
        <h4 className={styles.header}>
          {feature == "UPDATE" && "Chỉnh sửa thông tin danh sách đen"}
          {feature == "VIEW" && "Xem thông tin danh sách đen"}
          {feature == "CREATE" && "New Group"}
        </h4>
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
                <h4>Name:</h4>
                <Form.Item name="name">
                  <Input
                    placeholder="Name ..."
                    className={styles.item}
                    disabled={disabled}
                  ></Input>
                </Form.Item>
              </div>
              <div className={styles.formItem}>
                <h4>Description:</h4>
                <Form.Item name="description">
                  <Input placeholder="Description ..." disabled={disabled}></Input>
                </Form.Item>
              </div>
            </div>
            <div className={styles.session2}>
              <h3 className={styles.sessionHeader}>
                <span style={{ color: "red" }}>
                  {feature != "CREATE" && blackListDetail?.vehicles?.length}
                </span>
                {`Identity Object:`}
              </h3>
              <Form.Item name="users">
                <Select
                  disabled={disabled}
                  mode="multiple"
                  showArrow
                  tagRender={tagRender}
                  options={options}
                  placeholder="Vehicle ..."
                  onSelect={(value) => onSelect(value)}
                  onDeselect={(value) => onDeselect(value)}
                ></Select>
              </Form.Item>
              {!disabled && (
                <div style={{ textAlign: "right" }}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" style={{background:"red"}}>
                      Save
                    </Button>
                  </Form.Item>
                </div>
              )}
              <div className={styles.user}>
                {listCard?.map((vehicle) => {
                  return (
                    <div className={styles.card}>
                      <div className={styles.cardHeader}>
                        <Image
                          className={styles.img}
                          src={`${baseURL}${vehicle.image}`}
                        ></Image>
                        <div className={styles.info}>
                          <h3>ID: {vehicle.id}</h3>
                          <h3>License Plate: {vehicle.number_plate}</h3>
                          <h3>
                            Color: {vehicle.color ? vehicle.color : empty}
                          </h3>
                          <h3>
                            Brand: {vehicle.brand ? vehicle.brand : empty}
                          </h3>
                          <h3>
                            Type: {vehicle.body_style ? vehicle.body_style : empty}
                          </h3>
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

export default ANPRBlackListUpdate;
