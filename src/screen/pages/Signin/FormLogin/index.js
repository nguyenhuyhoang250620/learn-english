import { Button, Form, Input} from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import styles from "./FormLogin.module.scss";
import { useState } from "react";
import ApiService from "../../../../services/ConfigService/ApiService";

export const domain = window.SystemConfig.REACT_APP_API_SpringBoot;
export const baseURL = `http://${domain}`;
const FormLogin = () => {
    const navigate = useNavigate();
  
    const[exception,setException] = useState(false)

    const onFinish = async (values) => {
        try {
            const response = await ApiService('login').post(`${baseURL}/api/auth/login`, {
                username: values.username,
                password: values.password,
            });
            localStorage.setItem("token",response.data.jwt);
            localStorage.setItem("refreshToken",response.data.refreshToken);
            localStorage.setItem("username", values.username);
            // loadUserInfo();
            if(!localStorage.getItem("language")){
                localStorage.setItem("language", "en")
            }
            navigate("/event");
        } catch (error) {
            setException(true)
            console.log(error.response);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };



    return (
        <Form
            name="basic"
            wrapperCol={{
                span: 16,
                offset: 4,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: <span className={styles.message}>Username is empty</span>,
                    },
                ]}
            >
                <Input className={styles.input_style} placeholder="Username" />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: <span className={styles.message}>Password is empty</span>,
                    },
                ]}
            >
                <Input.Password   className={styles.input_style} placeholder="Password" type="password"/>
            </Form.Item>

            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 4,
                    span: 16,
                }}
            >
                {
                    exception?<div style={{textAlign:"center"}}><span style={{color:"red"}}>The username or password is incorrect!</span></div>:<span></span>
                }
                <div style={{display:"flex",justifyContent:"space-between"}}>
                    {/* <a style={{color:"white"}}>Forgot your password</a>
                    <a style={{color:"white"}}>Sign In with SSO</a> */}
                </div>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 12,
                    span: 16,
                }}
            >
                <Button className={styles.button} type="primary" htmlType="submit" >
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormLogin;
