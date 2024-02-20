import { Dropdown, Menu } from 'antd';
import styles from "./Layout.module.scss";
import PATH from "../../constants/itemsContants";
import {useNavigate } from "react-router-dom";
import User from "../../assets/images_new/userAdd.png"
export const domain = window.SystemConfig.REACT_APP_API_SpringBoot;
export const baseURL = `http://${domain}`;
function CustomLogout() {
    const navigate = useNavigate();
    const SignOut = async () => {
      try {
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');

        // const response = await ApiService('login').post(`${baseURL}/api/auth/logout`, {
        //   token: token,
        //   refreshToken: refreshToken,
        // });
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('username');
        navigate(`/${PATH.SIGNIN}`);
      } catch (error) {
        // Xử lý lỗi nếu có
        console.error( error);
      }
    };


  const menu = (
    <Menu>
      <Menu.Item key="1" style={{pointerEvents:"none"}} >
        <div style={{height:"80px",display:"flex",flexDirection:"row"}}>
            <div style={{display:"flex",justifyContent:"center",marginRight:"50px"}}><img src={User} style={{height:"80px"}}/></div>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <span>Username: </span>
                <h3>{localStorage.getItem('username')}</h3>
            </div>
        </div>
      </Menu.Item>
      <Menu.Item key="2" style={{pointerEvents:"visible"}}>
        <div 
         style={{
           width:"300px",
           display:"flex",
           justifyContent:"end"
         }}
        ><div onClick={SignOut} style={{
            width:"80px",
            display:"flex",
            justifyContent:"center",
            alignContent:"center",
            borderRadius:"8px",
            padding:"10px",
            border:"1px solid #B5122E"}}>
            <span style={{color:"#B5122E",fontWeight:"bold"}}>
            Sign out
            </span>
        </div>
        
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <div className={styles.logout}><img src={User} style={{width:"40px"}}/></div>
    </Dropdown>
  );
}
export default CustomLogout;