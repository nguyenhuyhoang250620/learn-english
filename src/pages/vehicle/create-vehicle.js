import { CarOutlined, CaretDownOutlined } from "@ant-design/icons";
import CustomButtonCommon from "@common/button/custom-button";
import CustomInput from "@common/input/custom-input";
import CustomSelect from "@common/select/custom-select";
import TYPE_ACTION from "@constants/action";
import colors from "@constants/colors";
import { baseURL } from "@redux/services/api-service";
import { Col, Form, Tag, message } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BiKey } from "react-icons/bi";
import { FaMotorcycle } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const CreateVehicle = () => {
    // ---- Constants
    const [form] = Form.useForm();
    const navigate = useNavigate();
  
    // --- State
    const [disabledLicense, setDisabledLicense] = useState(false);
    
    // ---- Dispatchs
    const dispatch = useDispatch();
    
    // ---- Selectors
  
    // ---- UseRef
    const filterGroupRef = useRef({
      id: null,
      name: null,
      users: null,
      page_size: 12,
    }); 
    const formRef = useRef(null);
  
    // ---- UseEffect
    useEffect(() => {
      const callBack = (data)=>{}
      dispatch({
        type: TYPE_ACTION.BLACKLIST.GET_BLACKLIST,
        payload: {body:filterGroupRef.current,callBack},
      });
    }, []);
  
    // ---- handle Data
    const getColorList = () =>
      [
        {
          color: "Red",
          code: "red",
        },
        {
          color: "Green",
          code: "green",
        },
        {
          color: "Blue",
          code: "blue",
        },
        {
          color: "Dark",
          code: "black",
        },
        {
          color: "Orange",
          code: "orange",
        },
        {
          color: "Yellow",
          code: "yellow",
        },
        {
          color: "Light",
          code: "white",
        },
      ].map((option) => ({
        value: option.code,
        label: <CustomOption option={option} />,
      }));
    const getTypeList = () =>
      [
        {
          vehical: "bike",
          code: BiKey,
        },
        {
          vehical: "motor",
          code: FaMotorcycle,
        },
        {
          vehical: "car",
          code: CarOutlined,
        },
        {
          vehical: "truck",
          code: FaTruckFast,
        }
      ].map((option) => ({
        value: option.vehical,
        label: <CustomOptionType option={option} />,
      }));
    const getBrandList = () =>
      [
        {
          vehical: "Toyota",
          code: 1,
        },
        {
          vehical: "Honda",
          code: 2,
        },
        {
          vehical: "Hyundai",
          code: 3,
        },
        {
          vehical: "Audi",
          code: 4,
        },
        {
          vehical: "BMW",
          code: 5,
        },
        {
          vehical: "Ford",
          code: 6,
        },
        {
          vehical: "Kia",
          code: 7,
        },
        {
          vehical: "Lexus",
          code: 8,
        },
        {
          vehical: "Nissan",
          code: 9,
        },
        {
          vehical: "Vinfast",
          code: 10,
        },
        {
          vehical: "Mitsubishi",
          code: 11,
        },
        {
          vehical: "Mercedes",
          code: 12,
        },
        {
          vehical: "Suzuki",
          code: 13,
        },
        {
          vehical: "Mazda",
          code: 14,
        },
        {
          vehical: "Peugeot",
          code: 15,
        },
      ].map((option) => ({
        value: option.vehical,
        label: <CustomOptionBrand option={option.vehical} />,
      }));
      const blackListData = [];
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
    
    // custom Option
    const CustomOptionBrand = ({ option }) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <CarOutlined style={{ color: "#B5122E" }} />
        <span style={{ paddingLeft: "10px", fontWeight: "lighter" }}>
          {option}
        </span>
        {/* Thêm các thành phần khác và truyền dữ liệu vào đây */}
      </div>
    );
    const CustomOption = ({ option }) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            height: "10px",
            width: "10px",
            padding: "10px",
            background: `${option.code}`,
            border: "1px solid grey",
            borderRadius: "50%",
          }}
        ></div>
        <span style={{ paddingLeft: "10px", fontWeight: "lighter" }}>
          {(`${option.code}`)}
        </span>
        {/* Thêm các thành phần khác và truyền dữ liệu vào đây */}
      </div>
    );
    const CustomOptionType = ({ option }) => (
      <div style={{ display: "flex" , alignItems:'center'}}>
        <img
          style={{ height: "20px", width: "20px" }}
          src={option.code}
          alt="img"
        />
        <span style={{ paddingLeft: "10px", fontWeight: "lighter" }}>
          {(`${option.vehical}`)}
        </span>
        {/* Thêm các thành phần khác và truyền dữ liệu vào đây */}
      </div>
    );
    //render
    const tagRenders = (props) => {
      const { label } = props;
      return (
        <Tag
          color={colors.redGlobal}
          closable={null}
          style={{
            marginRight: 3,
          }}
        >
          {label}
        </Tag>
      );
    };
  
    // onClick
    const onFinish = () => {
      formRef.current
        .validateFields()
        .then((values) => {
          form.validateFields().then(async (values) => {
            const obj = { ...values };
            const { group } = obj;
            const callBack = (data) => {
              try {
                const formData = new FormData();
                if(group){
                  group.map(async (item) => {
                    formData.append("id", item);
                    formData.append("vehicles", data.id);
                    const response = await axios.patch(
                      `${baseURL}/api/cctv/profile/add-user-vehicle/`,
                      formData,
                      {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                      }
                    );
                    
                  });
                }
                navigate(-1);
              } catch (error) {
                console.error(error);
              }
            };
            dispatch({
              type: TYPE_ACTION.PLATE.NEW_PLATE,
              payload: { obj, callBack },
            });
          });
        })
        .catch((error) => {
          console.log("Failed:", error);
          message.error(("form_validation_failed"));
        });
    };
  
    return (
      <div className="w-full h-[91vh]">
        <div className="grid grid-cols-12 gap-2 h-[94%] w-full overflow-auto scroll_default">
          <div
          className="lg:col-span-4 col-span-12 overflow-auto py-2 px-5 pt-5 scroll_default"
          style={{
            background: colors.background_side,
            borderRadius: 6,
          }}
          >
            <Form form={form} ref={formRef}>
              <Col span={24}>
                <CustomInput
                  placeholder={("license_plate")}
                  readOnly={disabledLicense}
                  style={{ height: "40px" }}
                  name="number_plate"
                  required={true}
                />
              </Col>
              <Col span={24}>
                <CustomSelect
                  name="group"
                  mode="multiple"
                  maxTag={3}
                  suffixIcon={<CaretDownOutlined />}
                  tagRender={tagRenders}
                  placeholder={("group_name")}
                  title={("group_name")}
                  options={getBlackList()}
                />
              </Col>
              <Col span={24}>
                <CustomSelect
                  name="color"
                  suffixIcon={<CaretDownOutlined style={{paddingTop:'10px'}}/>}
                  tagRender={tagRenders}
                  placeholder={("color")}
                  title={("color")}
                  options={getColorList()}
                />
              </Col>
              <Col span={24}>
                <CustomSelect
                  name="brand"
                  tagRender={tagRenders}
                  placeholder={("brand")}
                  title={("brand")}
                  options={getBrandList()}
                />
              </Col>
              <Col span={24}>
                <CustomSelect
                  name="body_style"
                  tagRender={tagRenders}
                  placeholder={("type")}
                  title={("type")}
                  options={getTypeList()}
                />
              </Col>
            </Form>
          </div>
          <div
          className="lg:col-span-8 col-span-12  overflow-auto p-2 space-y-4 scroll_default"
          style={{
            background: colors.background_side,
            borderRadius: 6,
          }}
          >
          </div>
        </div>
        <div className="h-[6%] overflow-hidden flex justify-center items-center">
          <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="space-x-2"
          >
            <CustomButtonCommon             
              title={("save")} 
              color={'white'}
              backgroundColor={'rgb(181, 18, 46)'} 
              onClick={() => onFinish()} 
            />
            <CustomButtonCommon
              title={("cancel")}
              color={'#B5122E'}
              border={"1px solid #B5122E"}
              backgroundColor={'transparent'}
              onClick={() => navigate(-1)}
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default CreateVehicle;