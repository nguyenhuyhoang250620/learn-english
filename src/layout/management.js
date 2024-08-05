/* eslint-disable array-callback-return */
import { ConfigProvider, Layout } from "antd";
import colors from "@constants/colors";
import "./tab-style.css";
import ActionLeft from "@components/management/action-left";
import ActionRight from "@components/management/action-right";
import { useSelector, useDispatch } from "react-redux";
import {
  selectItemTab,
  selectKeyActive,
  handleOnChangeKey,
  handleRemoveTab,
  handleAddTabs
} from "@redux/slice/tabs-slice";
import { Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PATH from "@constants/path";
import { IoClose } from "react-icons/io5";
import { useEffect } from "react";
import { listTabs } from "@utils/index";
const { Header, Content } = Layout;

const Management = () => {
  const items = useSelector(selectItemTab);
  const activeKey = useSelector(selectKeyActive);
  const location = useLocation()
  const data = localStorage.getItem("LIST");
  const part = location.pathname.split("/")[2]
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSelectTabs = (item) => {
    dispatch(handleOnChangeKey(item.key));
  };
  const handleCloseTabs =(key)=>{
    dispatch(handleRemoveTab(key));
  }
  useEffect(() => {
    handle()
  },[])
  useEffect(()=>{
    if(activeKey){
      navigate(`/${PATH.MANAGERMENT}/${activeKey}`);
    }
    else{
      navigate(`/${PATH.MANAGERMENT}/home`);
    }
  },[activeKey, navigate])

  // list Tab
  const handle = ()=>{
    let ar = data?.toString().split(',')
    listTabs.map((item)=>{
      ar?.map((key)=>{
        if(item.key === key) {
          dispatch(handleAddTabs({
            key:item.key,
            path:item.path,
            label:item.title,
            icon:item.iconTab
          }))
        }
      })
    })
  }
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgBase: colors.bg_input,
        },
      }}
    >
      <Layout>
        <Header className="flex relative">
          <ActionLeft />
          <div className="flex h-[37px]">
            {items.map((item, index) => {
              return (
                <div className="flex relative" style={{borderRight:`1px solid ${colors.textBase}`}}>
                  <div
                  className={`flex items-center ${
                    part === item.key ? "bg-[#4E4F53]" : "bg-[#17171A]"
                  } h-full w-max px-5 cursor-pointer space-x-2`}
                  onClick={() => handleSelectTabs(item)}
                  onMouseDown={(event)=>{
                    if(event.button===1){
                      handleCloseTabs(item.key)
                    }
                  }}
                >
                  {item.icon}
                  <h4>{item.label}</h4> 
                </div>
                <IoClose className="absolute right-0" onClick={()=>handleCloseTabs(item.key)}/>
                </div>
              );
            })}
          </div>
          <ActionRight/>
        </Header>
        <Content
          className="scroll_default"
          style={{
            height: "95vh",
            overflow: "hidden",
            paddingTop:"5px",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </ConfigProvider>
  );
};
export default Management;
