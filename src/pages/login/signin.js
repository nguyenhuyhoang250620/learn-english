import CustomButtonCommon from "@common/button/custom-button";
import { images } from "@common/images/image";
import CustomInput from "@common/input/custom-input";
import CustomText from "@common/text/custom-text";
import TYPE_ACTION from "@constants/action";
import colors from "@constants/colors";
import PATH from "@constants/path";
import { Form } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import "@style/styles-sign-in.css";

const Login = () => {
  //redux
  const dispatch = useDispatch();
  //router
  const navigate = useNavigate();
  //hook
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onFinish = () => {
    navigate("/" + PATH.MANAGERMENT + "/" + PATH.HOME);
    // const data = {
    //   username: username,
    //   password: password,
    // };
    // console.log("data",data);
    // try {
    //   const callback = () => {
    //     navigate("/" + PATH.MANAGERMENT + "/" + PATH.HOME);
    //   };
    //   dispatch({
    //     type: TYPE_ACTION.AUTH.SIGN_IN,
    //     payload: {data:data,callback},
    //   });
    // } catch (error) {
    //   console.log(error.response);
    // }
  };
  return (
    <div className="h-[100vh] w-[100vw]">
      <div
        className="h-[100vh] w-full bg-cover flex justify-end items-center"
        style={{
          backgroundImage: `url(${images.background_login})`,
        }}
      >
        <div className="w-[800px] h-[800px] flex justify-center items-center bg-transparent">
          <div className="w-[450px] h-[700px] flex justify-center items-center bg-[#000000c5] backdrop-blur-[10px]">
            <div className="h-[90%] w-4/5 flex flex-col justify-center items-center">
              <div className="flex flex-col mb-[90px] justify-center items-center">
                <img className="w-auto h-[80px]" alt="#" src={images.logo} />
                <h2 style={{ color: `${colors.redGlobal}` }}>
                  Social Camera Discovery System
                </h2>
              </div>
              <Form au>
                <div className="flex-[2_2_0%]">
                  <Form.Item name="username">
                    <CustomInput
                      width="200px"
                      title="Username"
                      name="username"
                      onInputChange={(e) => setUsername(e)}
                    />
                  </Form.Item>
                  <Form.Item name="password">
                    <CustomInput
                      title="Username"
                      name="password"
                      onInputChange={(e) => setPassword(e)}
                      isPassWord={true}
                    />
                  </Form.Item>
                  <div className="flex justify-between">
                    <CustomText
                      text="Forgot your password"
                      color={colors.textBase}
                    />
                    <CustomText
                      text="Sign In with SSO"
                      color={colors.textBase}
                    />
                  </div>
                </div>
                <div className="flex mt-16 justify-center">
                  <CustomButtonCommon
                    htmlType={"submit"}
                    backgroundColor={colors.redGlobal}
                    text={"Đăng nhập"}
                    onClick={() => onFinish()}
                  />
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
