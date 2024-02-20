import { Dropdown, Menu } from 'antd';
import styles from "./Layout.module.scss";
import ApiService from '../../services/ConfigService/ApiService';
import vietnam from "../../assets/images/co_viet_nam_new.png";
import english from "../../assets/images/co_nuoc_anh_new.jpeg";
import React,{useState,useEffect} from 'react';
import i18n from "../../locales/locales";

function CustomChangLanguage() {

    const [change,setChange] = useState(true)

    const handleChangeLanguage =(value)=>{
        if(value === 'vn'){
            setChange(true)
        }
        else if(value === 'en'){
            setChange(false)
        }
        localStorage.setItem("language", value);
        i18n.changeLanguage(value);
    }
    useEffect(()=>{
        if(localStorage.getItem("language")){
            handleChangeLanguage(localStorage.getItem("language"))
        }
        else{
            handleChangeLanguage('en')
        }    
    },[])
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <div style={{height:"30px",display:"flex",flexDirection:"row",alignItems:"center"}} onClick={()=>handleChangeLanguage("vn")}>
            <div style={{border:"1px solid #ccc",height:"30px",width:"30px",marginRight:"5px"}}> <img src={vietnam} style={{height:"30px",width:"30px"}}/></div>
            <h5>Tiếng việt</h5>
        </div>
      </Menu.Item>
      <Menu.Item key="2">
        <div style={{height:"30px",display:"flex",flexDirection:"row",alignItems:"center"}} onClick={()=>handleChangeLanguage("en")}>
            <div style={{border:"1px solid #ccc",height:"30px",width:"30px",marginRight:"5px"}}><img src={english} style={{height:"30px",width:"30px"}}/></div>
            <h5>English</h5>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <div className={styles.logout}><img src={change?vietnam:english} style={{height:"40px",width:"40px"}}/></div>
    </Dropdown>
  );
}
export default CustomChangLanguage;