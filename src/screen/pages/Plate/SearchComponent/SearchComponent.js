import { Button, Form, Input, Select,Checkbox } from "antd";
import styles from "./SearchComponent.module.scss";
import { useTranslation} from 'react-i18next';
import { useState } from "react";
import bike from "../../../../assets/images_new/bike.png"
import motor from "../../../../assets/images_new/motorcycle.png"
import car from "../../../../assets/images_new/carB.png"
import trucks from "../../../../assets/images_new/truck.png"
import bus from "../../../../assets/images_new/bus.png"
import iconExpand from "../../../../assets/images_new/expand.png"
import {
  ReloadOutlined,
  CarOutlined
} from "@ant-design/icons";

const SearchComponent = ({ loadPlateData, filterRef, form ,actionFilter}) => {
  const {t} = useTranslation()
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [defaults,setDefaults] = useState([])
  const getBrandList = () => {
    return [
        "Toyota",
        "Honda",
        "Hyundai",
        "Audi",
        "BMW",
        "Ford",
        "Kia",
        "Lexus",
        "Nissan",
        "Vinfast",
        "Mitsubishi",
        "Mercedes",
        "Suzuki",
        "Mazda",
        "Peugeot",
    ].map(option => ({
      value:option,
      label: <CustomOptionBrand option={option} />,
    }));
  };
  const handleCheckboxChange = (checkedValues) => {
    setSelectedOptions(checkedValues);
  };
  const CustomOptionBrand = ({ option }) => (
    <div style={{display:"flex",alignItems:"center"}}>
      <CarOutlined style={{color:"#B5122E"}}/>
      <span style={{paddingLeft:"10px",fontWeight:"lighter"}}>{option}</span>
      {/* Thêm các thành phần khác và truyền dữ liệu vào đây */}
    </div>
     
  );


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
        color:"Black",
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
    <div style={{display:"flex",alignItems:"center"}}>
      <div style={{height:"5px",width:"5px",padding:"10px",background:`${option.code}`,border:"1px solid grey",borderRadius:"50%"}}></div>
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
    <div style={{display:"flex",alignItems:"center"}}>
      <img style={{height:"25px",width:"25px"}} src={option.code} alt="Image" />
      <span style={{paddingLeft:"10px",fontWeight:"lighter"}}>{t(`${option.vehical}`)}</span>
      {/* Thêm các thành phần khác và truyền dữ liệu vào đây */}
    </div>
  );
  

  const onFinish = (values) => {
    filterRef.current.color = values.color;
    filterRef.current.brand = values.brand;
    filterRef.current.body_style = values.bodyStyle;
    loadPlateData();
    if(filterRef.current.color || filterRef.current.brand || filterRef.current.body_style){
      actionFilter()
    }
  };
  const onReload = (values) =>{
    setFieldValues()
    filterRef.current.color = null;
    filterRef.current.brand = null;
    filterRef.current.body_style = null;
    loadPlateData();
  }

  const setFieldValues = () => {
      form.setFieldsValue({
        color: undefined,
        brand: undefined,
        bodyStyle:undefined,
      });
  };
  
  return (
    <div className={styles.container}>
      <Form form={form} onFinish={onFinish}>
        <div className={styles.selects}>
          <div className={styles.selectWrapper}>
            <h4>{t('color')}</h4>
            <Form.Item name="color">
              <Select
                    className={styles.select}
                    autoFocus
                    allowClear
                    suffixIcon ={<img src={iconExpand} width={12}/>}
                    placeholder={t('color')} 
                    options={getColorList()}
                  >
                </Select>
            </Form.Item>
          </div>
          <div className={styles.selectWrapper}>
            <h4>{t('brand')}</h4>
            <Form.Item name="brand">
            <Select
                  className={styles.select}
                  autoFocus
                  suffixIcon ={<img src={iconExpand} width={12}/>}
                  allowClear
                  placeholder={t('brand')}
                  options={getBrandList()}
                ></Select>
            </Form.Item>
          </div>
          <div className={styles.selectWrapper}>
            <h4>{t('type')}</h4>
            <Form.Item name="bodyStyle">
            <Select
                  className={styles.select}
                  autoFocus
                  suffixIcon ={<img src={iconExpand} width={12}/>}
                  allowClear
                  placeholder={t('type')}
                  options={getTypeList()}
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
          </div>
        </div>
        <div className={styles.buttons}>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{backgroundColor:"#B5122E"}}>
            {t('search')}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default SearchComponent;
